import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-spinner',
    imports: [
        DecimalPipe,
        MatProgressSpinnerModule,
    ],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  protected floater: number = 0;
  @Input() value: number = 0;
  @Input() speed: number = 50;
  @Input() diameter?: number;
  @Input() step?: number;

  constructor() {
    const animation = setInterval(() => {
      this.floater += this.step ?? this.value / 20;
      if (this.floater > this.value) {
        this.floater = this.value;
        clearInterval(animation);
      }
    }, this.speed);
  }
}
