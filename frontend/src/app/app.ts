import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

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

type StoryBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; position: StoryIllustration['position'] };

interface Story extends StoryOption {
  blocks: StoryBlock[];
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
})
export class App {
  private readonly http = inject(HttpClient);
  readonly options = signal<StoryOption[]>([]);
  readonly selectedId = signal('kite');
  readonly story = signal<Story | null>(null);
  readonly error = signal('');
  readonly readingStyle = signal<'print' | 'uppercase' | 'cursive'>('cursive');
  readonly optionIcons = ['🪁', '🔎', '🍃', '🥾', '✨', '🐸', '🌳', '🐌', '🌙', '🔘'];

  constructor() {
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

    const middle = selected.illustrations.find((illustration) => illustration.position === 'middle');
    const blocks: StoryBlock[] = [];
    const start = selected.illustrations.find((illustration) => illustration.position === 'start');
    const end = selected.illustrations.find((illustration) => illustration.position === 'end');
    if (start) blocks.push({ type: 'image', src: start.src, alt: start.alt, position: start.position });
    selected.paragraphs.forEach((text, index) => {
      blocks.push({ type: 'paragraph', text });
      if (middle && index + 1 === middle.afterParagraph) {
        blocks.push({ type: 'image', src: middle.src, alt: middle.alt, position: middle.position });
      }
    });
    if (end) blocks.push({ type: 'image', src: end.src, alt: end.alt, position: end.position });

    this.story.set({
      ...selected,
      blocks,
    });
  }

  selectStory(id: string): void {
    this.selectedId.set(id);
    this.story.set(null);
  }
}
