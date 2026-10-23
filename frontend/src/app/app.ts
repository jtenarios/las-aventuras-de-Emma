import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';

interface StoryIllustration {
  position: 'start' | 'middle' | 'end';
  afterParagraph: number;
  src: string;
  alt: string;
}

interface StoryOption {
  id: string;
  order: number;
  title: string;
  value: string;
  paragraphs: string[];
  question: string;
  illustrations: StoryIllustration[];
}

interface StoryPage {
  blocks: StoryBlock[];
}

type StoryBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'image'; image: StoryIllustration };

interface Story extends StoryOption {
  pages: StoryPage[];
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
})
export class App {
  @ViewChild('book') private bookRef?: ElementRef<HTMLElement>;
  private readonly http = inject(HttpClient);
  readonly options = signal<StoryOption[]>([]);
  readonly selectedId = signal('kite');
  readonly story = signal<Story | null>(null);
  readonly pageIndex = signal(0);
  readonly error = signal('');
  readonly readingStyle = signal<'print' | 'uppercase' | 'cursive'>('cursive');
  readonly showFontTip = signal(true);
  readonly optionIcons = ['🪁', '🔎', '🍃', '🥾', '✨', '🐸', '🌳', '🐌', '🌙', '🔘'];
  private readonly fontTipKey = 'emma-font-tip-seen-v1';

  constructor() {
    try {
      this.showFontTip.set(localStorage.getItem(this.fontTipKey) !== '1');
    } catch {
      this.showFontTip.set(true);
    }
    this.http.get<StoryOption[]>('stories/index.json').subscribe({
      next: (options) => {
        this.options.set(options);
        if (options.length && !options.some((option) => option.id === this.selectedId())) {
          this.selectedId.set(options[0].id);
        }
      },
      error: () => this.error.set('No se ha podido cargar el catálogo de cuentos.'),
    });
  }

  createStory(): void {
    const selected = this.options().find((option) => option.id === this.selectedId());
    if (!selected) return;

    const start = selected.illustrations.find((image) => image.position === 'start');
    const middle = selected.illustrations.find((image) => image.position === 'middle');
    const end = selected.illustrations.find((image) => image.position === 'end');
    if (!start || !middle || !end) {
      this.error.set('Faltan ilustraciones de este cuento.');
      return;
    }

    const length = selected.paragraphs.length;
    const breaks = [0, Math.ceil(length / 3), Math.ceil((length * 2) / 3), length];
    const pages: StoryPage[] = [0, 1, 2].map((pageNumber) => {
      const blocks: StoryBlock[] = [];
      if (pageNumber === 0) blocks.push({ type: 'image', image: start });
      for (let index = breaks[pageNumber]; index < breaks[pageNumber + 1]; index++) {
        blocks.push({ type: 'paragraph', text: selected.paragraphs[index] });
        if (index + 1 === middle.afterParagraph) blocks.push({ type: 'image', image: middle });
        if (index + 1 === end.afterParagraph) blocks.push({ type: 'image', image: end });
      }
      return { blocks };
    });

    this.story.set({
      ...selected,
      pages,
    });
    this.pageIndex.set(0);
    this.error.set('');
    this.scrollToBook();
  }

  selectStory(id: string): void {
    this.selectedId.set(id);
    this.story.set(null);
    this.pageIndex.set(0);
  }

  goToPage(index: number): void {
    const story = this.story();
    if (!story || index < 0 || index >= story.pages.length) return;
    this.pageIndex.set(index);
    this.scrollToBook();
  }

  setReadingStyle(style: 'print' | 'uppercase' | 'cursive'): void {
    this.readingStyle.set(style);
    this.dismissFontTip();
  }

  dismissFontTip(): void {
    this.showFontTip.set(false);
    try {
      localStorage.setItem(this.fontTipKey, '1');
    } catch {
      // La lectura sigue funcionando cuando el navegador impide el almacenamiento local.
    }
  }

  private scrollToBook(): void {
    requestAnimationFrame(() => this.bookRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }
}
