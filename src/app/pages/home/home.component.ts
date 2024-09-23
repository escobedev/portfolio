import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../layout/footer/footer.component";
import { TypingTextComponent } from "../../layout/typing-text/typing-text.component";
import { ThemeService } from '../../services/theme.service';
import { FirestoreService } from '../../services/firestore.service';
import { Project } from '../../utils/project';
import { Tag } from '../../utils/tag';

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
    RouterLink,
    FooterComponent,
    TypingTextComponent,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly title: string = 'Hello';
  protected readonly allTags: Tag[] = [];
  protected readonly latest_projects: Project[] = [];
  protected readonly projectsLoadingError = signal(false);
  protected readonly load = signal(false);
  protected readonly hide = signal(false);
  protected readonly step = signal(0);

  constructor(
    private readonly theme: ThemeService,
    private readonly db: FirestoreService,
  ) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.load.set(true);
      setTimeout(() => {
        this.hide.set(true);
      }, 1000);
    }, 200 * (this.title.length + 1));
    this.loadLatestsProjects();
  }

  protected setStep(index: number) {
    this.step.set(index);
  }

  private loadLatestsProjects() {
    this.db
    .queryData(
      'projects',
      this.db.limitConstraint(5)
    )
    .subscribe((projects: Project[]) => {
      this.latest_projects.push(...projects);
      this.loadTags();
    });
  }

  private loadTags() {
    const tagsPaths = [
      ...new Set(this.latest_projects.flatMap((project) => project.tags))
    ];
    this.db
      .queryData(
        'tags',
        this.db.whereConstraint('path', 'in', tagsPaths)
      )
      .subscribe((tags: Tag[]) => this.allTags.push(...tags));
  }

  protected toTag(tag: string) {
    return this.allTags.find((t) => t.path === tag) ?? new Tag('Unknown', '', '', '', '');
  }

  get currentTheme() {
    return this.theme.currentTheme ?? 'dark';
  }
}
