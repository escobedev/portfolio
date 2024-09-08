import { Component, signal } from '@angular/core';
import { Project, projects } from '../../interfaces/project.interface';
import { ProjectBoxComponent } from '../../components/project-box/project-box.component';
import { TypingTextComponent } from "../../layout/typing-text/typing-text.component";
import { FooterComponent } from "../../layout/footer/footer.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectBoxComponent, TypingTextComponent, FooterComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  protected readonly title = 'Projects';
  protected readonly load = signal(false);
  protected readonly Projects = projects;
  protected readonly projects = signal<Project[]>([]);
  protected readonly soon: Project = {
    name: "Coming Soon",
    technologies: [],
    details: [],
    link: "",
    github: "",
    icon: "",
  };

  constructor() {
    setTimeout(() => {
      this.load.set(true);
    }, 100 * (this.title.length + 1));
  }
  ngOnInit() {
    this.loadProject(0);
  }


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
