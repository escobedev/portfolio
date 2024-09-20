import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';
import Prism from 'prismjs';

@Component({
  selector: 'app-code-text',
  standalone: true,
  imports: [],
  templateUrl: './code-text.component.html',
  styleUrl: './code-text.component.scss'
})
export class CodeTextComponent {
  @Input() code = '';
  @Input() language = '';
  @Input()
  get snippet() { return this._snippet; }
  set snippet(value: BooleanInput) {
    this._snippet = coerceBooleanProperty(value);
  }
  private _snippet = false;
  protected html = '';

  constructor() {
    
  }

  ngAfterViewInit() {
    try {
      this.html = Prism.highlight(this.code, Prism.languages[this.language], this.language);
    } catch(error) {
      this.html = this.code;
      console.error(error);
    }
  }
}
