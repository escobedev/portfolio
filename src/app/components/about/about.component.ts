import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  years_of_experience = new Date(Date.now()).getFullYear() - new Date('2023-01-01').getFullYear();

  isLoaded = false;
  constructor() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  }
}
