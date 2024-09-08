import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-typing-text',
  standalone: true,
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
  ngOnInit() {
    setTimeout(() => {
      const timer = setInterval(() => {
        this.typing_text.update(value => value += this.text[this.typing_text().length]);
        if (this.typing_text() === this.text) clearInterval(timer);
      }, this.speed);
    }, this.delay);
  }
}
