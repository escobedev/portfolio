import { Component, effect, input } from '@angular/core';

@Component({
  selector: 'app-staggered-text',
  imports: [],
  templateUrl: './staggered-text.component.html',
  styleUrl: './staggered-text.component.scss'
})
export class StaggeredTextComponent {
  public readonly text = input('');
  public readonly delay = input(0);
  protected words: string[] = [];

  constructor() {
    this.textEffect();
  }

  private textEffect() {
    effect(() => {
      const value = this.text().trim();
      this.words = value ? value.split(/\s+/) : [];
    });
  }
}
