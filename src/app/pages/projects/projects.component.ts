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
  protected allTags: Tag[] = [];
  protected allProjects: Project[] = [];
  protected selectedTags: string[] = [];
  private readonly soon = new Project('Coming Soon', '', '', [], [], [], '', '');

  constructor(
    private readonly db: FirestoreService,
  ) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.load.set(true);
    }, 100 * (this.title.length + 1));
    this.loadProjects();
  }

  private loadProjects() {
    this.db
      .loadCollection('projects')
      .subscribe((projects: Project[]) => {
        this.allProjects = projects;
        this.loadTags();
      });
  }

  private loadTags() {
    const tagsPaths = [
      ...new Set(this.allProjects.flatMap((project) => project.tags))
    ];
    this.db
      .queryData(
        'tags',
        this.db.whereConstraint('path', 'in', tagsPaths)
      )
      .subscribe((tags: Tag[]) => this.allTags = tags);
  }

  protected filterProjects(field: string) {
    this.projects.set([]);
    this.selected.set(field);
    this.projects.set([...this.allProjects.filter((project) => project.type === field), this.soon]);
    this.dataLoaded.set(true);
  }

  protected toggleTag(tag: Tag) {
    this.projects.set([]);
    if (!this.selectedTags.includes(tag.path))
      this.selectedTags.push(tag.path);
    else
      this.selectedTags.splice(this.selectedTags.indexOf(tag.path), 1);
    setTimeout(() => {
      if (this.selectedTags.length > 0)
        this.projects.set(
          [
            ...this.allProjects.filter((project) => {
              if (project.type === this.selected())
                for (const tagPath of project.tags)
                  if (this.selectedTags.includes(tagPath))
                    return true;
              return false;
            }),
            this.soon,
          ]
        );
      else this.filterProjects(this.selected() ?? '');
    });
  }

  protected getTagsByType(tagsType: string) {
    return this.allTags.filter((tag) => tagsType === tag.type)
  }

  protected getTags(tagsPaths: string[]) {
    return this.allTags.filter((tag) => tagsPaths.includes(tag.path));
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
