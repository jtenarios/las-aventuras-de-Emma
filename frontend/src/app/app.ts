import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface StoryOption {
  id: string;
  order: number;
  title: string;
  value: string;
  paragraphs: string[];
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
})
export class App {
  private readonly http = inject(HttpClient);
  readonly options = signal<StoryOption[]>([]);
  readonly selectedId = signal('kite');
  readonly childName = signal('Emma');
  readonly story = signal<StoryOption | null>(null);
  readonly error = signal('');
  readonly readingStyle = signal<'print' | 'uppercase' | 'cursive'>('print');

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

    const safeName = this.childName().trim().slice(0, 24) || 'Emma';
    this.story.set({
      ...selected,
      title: selected.title.replaceAll('Emma', safeName),
      paragraphs: selected.paragraphs.map((paragraph) => paragraph.replaceAll('Emma', safeName)),
    });
  }

  selectStory(id: string): void {
    this.selectedId.set(id);
    this.story.set(null);
  }
}
