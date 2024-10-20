import { Component, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { ProjectBoxComponent } from '../../shared/components/project-box/project-box.component';
import { TypingTextComponent } from "../../shared/components/typing-text/typing-text.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { FirestoreService } from '../../shared/services/firestore.service';
import { Project } from '../../shared/models/project';
import { Tag } from '../../shared/models/tag';
import { PageCommons } from '../../shared/utils/page-commons';

/**
 * Component for the projects page.
 * @class ProjectsComponent
 */
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
export class ProjectsComponent extends PageCommons {
  protected readonly dataLoaded = signal(false);
  protected readonly selected = signal<string | null>(null);
  protected readonly projects = signal<Project[]>([]);
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
  protected allTags: Tag[] = [];
  protected allProjects: Project[] = [];
  private readonly selectedTags: string[] = [];
  private readonly soon = new Project('Coming Soon', '', '', [], [], [], '', '');
  
  /**
   * Constructs a new instance of ProjectsComponent.
   * @constructor
   * @param db Firestore service.
   */
  constructor(private readonly db: FirestoreService) {
    super('Projects');
    this.loadProjects();
  }

  /**
   * Loads the projects from the database.
   * @function loadProjects
   */
  private loadProjects() {
    this.db.getDataWithCache(
      'projects',
      () => this.db.loadCollection('projects')
    ).subscribe((projects: Project[]) => {
      this.allProjects = projects;
      this.loadTags();
    });
  }

  /**
   * Loads the tags from the database.
   * @function loadTags
   */
  private loadTags() {
    const tagsPaths = [
      ...new Set(this.allProjects.flatMap(project => project.tags))
    ];
    this.db.getDataWithCache(
      'tags',
      () => this.db.loadCollection('tags')
    ).subscribe((tags: Tag[]) => this.allTags = tags.filter(tag => tagsPaths.includes(tag.path)));
  }

  /**
   * Filters the projects by the selected tags.
   * @function filterProjectsBySelectedTags
   */
  private filterProjectsBySelectedTags() {
    setTimeout(() => {
      if (this.selectedTags.length > 0)
        this.projects.set(
          [
            ...this.allProjects.filter(project => {
              if (project.type === this.selected())
                for (const tagPath of project.tags)
                  if (this.selectedTags.includes(tagPath))
                    return true;
              return false;
            }),
            this.soon,
          ]
        );
      else this.filterProjectsByField(this.selected() ?? '');
    });
  };

  /**
   * Filters the projects by the given field.
   * @function filterProjectsByField
   * @param field Field to filter by.
   */
  protected filterProjectsByField(field: string) {
    this.projects.set([]);
    this.selected.set(field);
    this.projects.set([
      ...this.allProjects.filter(project => project.type === field), 
      this.soon]
    );
    this.dataLoaded.set(true);
  }

  /**
   * Toggles the given tag and updates the list of projects accordingly.
   * @function toggleTag
   * @param tag Tag to toggle.
   */
  protected toggleTag(tag: Tag) {
    this.projects.set([]);
    if (!this.selectedTags.includes(tag.path))
      this.selectedTags.push(tag.path);
    else
      this.selectedTags.splice(this.selectedTags.indexOf(tag.path), 1);
    this.filterProjectsBySelectedTags();
  }

  /**
   * Gets the tags by their given type, from the list of all tags.
   * @function getTagsByType
   * @param tagsType Tags' type.
   * @returns List of tags.
   */
  protected getTagsByType(tagsType: string) {
    return this.allTags.filter(tag => tagsType === tag.type)
  }

  /**
   * Gets the tags by their given paths, from the list of all tags.
   * @function getTags
   * @param tagsPaths Tags' firestore paths.
   * @returns List of tags.
   */
  protected getTags(tagsPaths: string[]) {
    return this.allTags.filter(tag => tagsPaths.includes(tag.path));
  }
}
