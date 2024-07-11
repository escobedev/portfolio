import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { projects } from '../../interfaces/project.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoaded = false;
  constructor() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  }

  scrollUp() {
    window.scrollTo({ top: 0 });
  }

  latest_projects = [...projects].slice(0, 3);
}
