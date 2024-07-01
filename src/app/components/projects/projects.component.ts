import { Component, signal } from '@angular/core';
import { Project, projects } from '../../interfaces/project.interface';
import { ProjectBoxComponent } from './project-box/project-box.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ ProjectBoxComponent ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  isLoaded = false;
  protected readonly projects = signal<Project[]>([]);

  constructor() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
    this.loadProject(0);
  }

  Projects = projects

  private loadProject(index: number) {
    if (index < this.Projects.length)
      this.projects.update(oldProjects => {
        return [...oldProjects, this.Projects[index]];
      });
  }
  loaded(name: string) {
    if (name) this.loadProject(this.projects().length);
  }
}
