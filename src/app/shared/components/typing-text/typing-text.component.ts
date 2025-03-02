import { Component, input, Input, signal } from '@angular/core';

@Component({
    selector: 'app-typing-text',
    imports: [],
    templateUrl: './typing-text.component.html',
    styleUrl: './typing-text.component.scss'
})
export class TypingTextComponent {
  public readonly text = input('');
  public readonly speed = input(100);
  public readonly delay = input(0);
  public readonly infinite = input(true);
  protected readonly typingText = signal('');

  ngOnChanges() {
    this.typingText.set('');
    setTimeout(() => {
      const timer = setInterval(() => {
        if (this.text()[this.typingText().length] === '<') {
          while(this.text()[this.typingText().length] !== '>')
          this.typingText.update(value => value += this.text()[this.typingText().length]);
        }
        this.typingText.update(value => value += this.text()[this.typingText().length]);
        if (this.typingText() === this.text()) clearInterval(timer);
      }, this.speed());
    }, this.delay());
  }

  cleanText() { return this.text().replace(/<[^>]*>/g, ''); }
}
