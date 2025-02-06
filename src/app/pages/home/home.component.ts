import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../layout/footer/footer.component";
import { TypingTextComponent } from "../../shared/components/typing-text/typing-text.component";
import { ThemeService } from '../../core/theme.service';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Project } from '../../shared/models/project';
import { Tag } from '../../shared/models/tag';
import { PageCommons } from '../../shared/utils/page-commons';

/**
 * Home page.
 * @class HomeComponent
 * @extends PageCommons
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    RouterLink,
    FooterComponent,
    TypingTextComponent,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends PageCommons {
  protected readonly projectsLoadingError = signal(false);
  protected readonly step = signal(0);
  protected allTags: Tag[] = [];
  protected latest_projects: Project[] = [];

  /**
   * Constructs the Home page.
   * @constructor
   * @param theme Theme service.
   * @param db Firestore service.
   */
  constructor(
    private readonly theme: ThemeService,
    private readonly db: FirestoreService,
  ) {
    super('Hello', 200);
    this.loadLatestsProjects(() => this.loadTags());
  }

  /**
   * Sets the current step.
   * @function setStep
   * @param index Step index.
   */
  protected setStep(index: number) {
    this.step.set(index);
  }

  /**
   * Loads the 5 latest projects.
   * @function loadLatestsProjects
   * @param callback Callback function.
   */
  private loadLatestsProjects(callback: () => void = () => {}) {
    this.db.getDataWithCache(
      'projects_limit_5',
      () => this.db.queryData('projects', this.db.limitConstraint(5))
    ).subscribe((projects: Project[]) => {
      this.latest_projects = projects;
      callback();
    });
  }

  /**
   * Loads the tags of the 5 latest projects.
   * @function loadTags
   */
  private loadTags() {
    const tagsPaths = [
      ...new Set(this.latest_projects.flatMap(project => project.tags))
    ];
    this.db.getDataWithCache(
      'tags',
      () => this.db.loadCollection('tags')
    ).subscribe((tags: Tag[]) => this.allTags = tags.filter(tag => tagsPaths.includes(tag.path)));
  }

  /**
   * Gets the Tag class by its given path.
   * @function getTag
   * @param tag Tag firebase path.
   * @returns Tag class.
   */
  protected getTag(tag: string) {
    return this.allTags.find(t => t.path === tag) ?? new Tag('Unknown', '', '', '', '');
  }

  /**
   * Gets the current theme.
   * @function get currentTheme
   * @returns Current theme.
   */
  get currentTheme() {
    return this.theme.currentTheme ?? 'dark';
  }
}
