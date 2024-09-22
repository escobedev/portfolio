import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { ProjectBoxComponent } from '../../components/project-box/project-box.component';
import { TypingTextComponent } from "../../layout/typing-text/typing-text.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { FirestoreService } from '../../services/firestore.service';
import { Project } from '../../utils/project';
import { Tag } from '../../utils/tag';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    ProjectBoxComponent,
    TypingTextComponent,
    FooterComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  protected readonly title = 'Projects';
  protected readonly dataLoaded = signal(false);
  protected readonly hide = signal(false);
  protected readonly load = signal(false);
  protected readonly selected = signal<string | null>(null);
  protected readonly projects = signal<Project[]>([]);
  protected readonly allTags = signal<Tag[]>([]);
  protected selectedTags: string[] = [];
  private readonly soon = new Project('Coming Soon', '', '', [], [], [], '', '');

  constructor(
    private readonly db: FirestoreService,
  ) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.load.set(true);
    }, 100 * (this.title.length + 1));
  }

  protected fetchProjects(field: string) {
    this.projects.set([]);
    this.selected.set(field);
    this.db
    .queryCollection('projects', 'type', field)
    .subscribe((projects: Project[]) => {
      this.projects.set([...projects, this.soon]);
      this.loadTags();
    });
  }

  private loadTags() {
    for (const project of this.projects()) {
      if (project.name === 'Coming Soon')
        continue;
      let tags: Tag[] = [];
      for (const tag of project.tags)
        this.db
        .loadDoc('tags', tag as string)
        .subscribe((tagData: Tag) => {
          tags.push(tagData);
          this.allTags.update((tags) => {
            if (tags.every(tag => tag.name !== tagData.name))
              tags.push(tagData);
            this.dataLoaded.set(true);
            return tags;
          });
        });
      this.projects.update((projects) => {
        const index = projects.findIndex((c) => c.name === project.name);
        projects[index].tags = tags;
        return projects;
      });
    }
  }

  protected toggleTag(tag: Tag) {
    if (!this.selectedTags.includes(tag.path))
      this.selectedTags.push(tag.path);
    else
      this.selectedTags.splice(this.selectedTags.indexOf(tag.path), 1);
    this.loadSelections();
  }

  private loadSelections() {
    this.projects.set([]);
    const field = this.selected() as string;
    if (this.selectedTags.length === 0)
      this.db
      .queryCollectionByTags(
        'projects', this.selectedTags,
        'type', [ field ]
      )
      .subscribe((projects: Project[]) => {
        this.projects.set([...projects, this.soon]);
        this.loadTags();
      });
    else this.fetchProjects(field);
  }

  protected scrollUp() {
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
