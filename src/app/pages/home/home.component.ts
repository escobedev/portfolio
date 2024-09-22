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
  protected readonly load = signal(false);
  protected readonly hide = signal(false);
  protected readonly step = signal(0);
  protected latest_projects: Project[] = [];

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
    db.loadCollection('projects', 5).subscribe((projects: Project[]) => {
      this.latest_projects = projects;
      this.loadProjectTags();
    });
  }

  protected setStep(index: number) {
    this.step.set(index);
  }

  private loadProjectTags() {
    for (const project of this.latest_projects) {
        let tags: Tag[] = [];
        for (const tag of project.tags)
            this.db
            .loadDoc('tags', tag as string)
            .subscribe((tagData: Tag) => {
                tags.push(tagData);
            });
        const index = this.latest_projects.findIndex((c) => c.name === project.name);
        this.latest_projects[index].tags = tags;
    }
  }

  protected toTag(tag: string | Tag) {
    return tag as Tag;
  }

  get currentTheme() {
    return this.theme.currentTheme ?? 'dark';
  }
}
