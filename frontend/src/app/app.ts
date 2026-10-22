import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface StoryOption {
  id: string;
  title: string;
  value: string;
}

interface Story extends StoryOption {
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
  readonly story = signal<Story | null>(null);
  readonly error = signal('');
  readonly loading = signal(false);
  readonly readingStyle = signal<'print' | 'uppercase' | 'cursive'>('print');

  constructor() {
    this.http.get<StoryOption[]>('/api/stories').subscribe({
      next: (options) => this.options.set(options),
      error: () => this.error.set('No se ha podido conectar con el servidor local.'),
    });
  }

  createStory(): void {
    this.loading.set(true);
    this.error.set('');
    this.http.post<Story>('/api/stories', {
      story_id: this.selectedId(),
      child_name: this.childName().trim() || 'Emma',
    }).subscribe({
      next: (story) => {
        this.story.set(story);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se ha podido crear el cuento. Comprueba que el backend está iniciado.');
        this.loading.set(false);
      },
    });
  }

  selectStory(id: string): void {
    this.selectedId.set(id);
    this.story.set(null);
  }
}
