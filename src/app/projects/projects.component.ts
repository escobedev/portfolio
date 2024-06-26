import { Component } from '@angular/core';
import { projects } from '../interfaces/project.interface';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  isLoaded = false;
  constructor() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  }

  projects = projects;
}
