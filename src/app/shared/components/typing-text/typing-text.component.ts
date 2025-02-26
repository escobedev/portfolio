import { Component, Input, signal } from '@angular/core';

@Component({
    selector: 'app-typing-text',
    imports: [],
    templateUrl: './typing-text.component.html',
    styleUrl: './typing-text.component.scss'
})
export class TypingTextComponent {
  @Input() text: string = '';
  @Input() speed: number = 100;
  @Input() delay: number = 0;
  @Input() infinite: boolean = true;
  protected typing_text = signal('');
  private spd: number = this.speed;
  
  ngOnInit() {
    setTimeout(() => {
      this.spd = this.speed;
      const timer = setInterval(() => {
        if (this.text[this.typing_text().length] === '<') {
          while(this.text[this.typing_text().length] !== '>')
          this.typing_text.update(value => value += this.text[this.typing_text().length]);
        }
        this.typing_text.update(value => value += this.text[this.typing_text().length]);
        if (this.typing_text() === this.text) clearInterval(timer);
      }, this.spd);
    }, this.delay);
  }

  cleanText(text: string) {
    return text.replace(/<[^>]*>/g, '');
  }
}
