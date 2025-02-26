import { Component, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../core/theme.service';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Project } from '../../shared/models/project';
import { Tag } from '../../shared/models/tag';

@Component({
    selector: 'app-home',
    imports: [
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatExpansionModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        RouterLink,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly projectsLoadingError = signal(false);
  protected readonly step = signal(0);

  protected readonly scale = signal(1);
  protected readonly opacity = signal(1);

  protected allTags: Tag[] = [];
  protected latest_projects: Project[] = [];

  constructor(
    private readonly theme: ThemeService,
    private readonly db: FirestoreService,
  ) {
    this.parallaxEffect();
    this.loadLatestsProjects(() => this.loadTags());
  }

  get isDarkMode() { return this.theme.isDarkMode; }

  private parallaxEffect() {
    effect(() => {
      const setPosition = () => {
        const displacement = document.scrollingElement?.scrollTop ?? 0;
        this.scale.set(Math.exp(displacement / 1200));
        this.opacity.set(Math.exp(- displacement / 600));
      };
      window.addEventListener('scroll', setPosition);
      return () => window.removeEventListener('scroll', setPosition);
    });
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
}
