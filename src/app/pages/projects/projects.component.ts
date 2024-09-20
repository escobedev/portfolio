import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectBoxComponent } from '../../components/project-box/project-box.component';
import { TypingTextComponent } from "../../layout/typing-text/typing-text.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { Project, blockchain_projects, cyber_security_projects, data_analytics_projects, desktop_projects, game_dev_projects, mobile_projects, multiplatform_projects, projects, web_projects } from '../../interfaces/project.interface';
import { FirestoreService } from '../../services/firestore.service';
import { Project as Pro } from '../../utils/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ProjectBoxComponent,
    TypingTextComponent,
    FooterComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  protected readonly title = 'Projects';
  protected readonly load = signal(false);
  protected readonly selected = signal(false);
  protected readonly Projects = signal<Pro[]>([]);
  protected readonly WebProjects = web_projects;
  protected readonly MobileProjects = mobile_projects;
  protected readonly DesktopProjects = desktop_projects;
  protected readonly MultiplatformProjects = multiplatform_projects;
  protected readonly DataAnalyticsProjects = data_analytics_projects;
  protected readonly CyberSecurityProjects = cyber_security_projects;
  protected readonly BlockchainProjects = blockchain_projects;
  protected readonly GameDevProjects = game_dev_projects;
  protected readonly projects = signal<Pro[]>([]);
  protected readonly soon = new Pro(
    'Coming Soon',
    '', '', [], [], [], '', ''
  );

  constructor(
    private readonly db: FirestoreService,
  ) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.load.set(true);
    }, 100 * (this.title.length + 1));
  }

  fetchProjects(index: number) {
    this.projects.set([]);
    this.db
    .queryCollection('projects', 'type', this.fields[index].name)
    .subscribe((projects: Pro[]) => {
      this.Projects.set([...(projects as Pro[]), this.soon]);
      this.loadProject(0);
    });
    this.selected.set(true);
  }

  private loadProject(index: number) {
    if (index < this.Projects().length)
      this.projects.update(oldProjects => {
        return [...oldProjects, this.Projects()[index]];
      });
  }

  loaded(name: string) {
    if (name) this.loadProject(this.projects().length);
  }

  scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected readonly fields = [
    { name: 'Web', icon: 'web' },
    { name: 'Mobile', icon: 'smartphone' },
    { name: 'Desktop', icon: 'computer' },
    { name: 'Multiplatform', icon: 'devices' },
    { name: 'Data Analytics', icon: 'analytics' },
    { name: 'Cyber Security', icon: 'security' },
    { name: 'Blockchain', icon: 'currency_bitcoin' },
    { name: 'Game Dev', icon: 'sports_esports' },
  ];
}
