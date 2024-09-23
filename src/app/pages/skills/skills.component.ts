import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../layout/footer/footer.component";
import { TypingTextComponent } from "../../layout/typing-text/typing-text.component";
import { FirestoreService } from '../../services/firestore.service';
import { Tag } from '../../utils/tag';
import { Skills } from '../../utils/skills';
import { SoftSkillTag, SoftSkills } from '../../utils/soft-skills';
import { hardSkills, languages } from '../../utils/skills-lists';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    DecimalPipe,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTooltipModule,
    RouterLink,
    TypingTextComponent,
    FooterComponent,
],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  protected readonly title: string = 'Skills';
  protected readonly hide = signal(false);
  protected readonly load = signal(false);
  protected readonly loaded = signal(false);
  protected readonly hardSkills: Skills[] = [];
  protected readonly softSkills: SoftSkills[] = [];
  protected readonly languages: Skills[] = [];
  protected readonly tagsPaths: string[] = [];
  protected readonly allTags: Tag[] = [];
  protected readonly allSSTags: SoftSkillTag[] = [];


  constructor(private readonly db: FirestoreService) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.load.set(true);
      setTimeout(() => {
        this.hide.set(true);
      }, 1000);
    }, 100 * (this.title.length + 1));
    this.loadTags();
    this.loadSSTags();
    this.loadData();
  }

  private loadTags() {
    this.db
      .loadCollection('tags')
      .subscribe((tags: Tag[]) => this.allTags.push(...tags));
  }

  private loadSSTags() {
    this.db
      .loadCollection('soft-skill-tags')
      .subscribe((ssTags: SoftSkillTag[]) => this.allSSTags.push(...ssTags));
  }

  private loadData() {
    this.db
      .loadDoc('data', 'skills')
      .subscribe((data: any) => {
        this.tagsPaths.push(...data['hard-skills'] as string[], ...data['languages'] as string[]);
        this.softSkills.push(...data['soft-skills'] as SoftSkills[]);
        for (const field of hardSkills) {
          const tags = this.getTagsByType(field);
          if (tags.length > 0)
            this.hardSkills.push({
              name: field,
              skills: tags,
            });
        }
        for (const field of languages) {
          const tags = this.getTagsByType(field);
          if (tags.length > 0)
            this.languages.push({
              name: field,
              skills: tags,
            });
        }
        this.loaded.set(true);
      })
  }

  private getTagsByType(tagsType: string) {
    return this.allTags.filter(tag => tagsType === tag.type && this.tagsPaths.includes(tag.path));
  }

  protected getSSTag(ssTagPath: string) {
    return this.allSSTags.find(ssTag => ssTagPath === ssTag.path) ?? {} as SoftSkillTag;
  }

  protected avgLevels(tags: string[]) {
    let sum = 0;
    for (const tag of tags)
      sum += this.getSSTag(tag).level * 10;
    return sum / tags.length;
  }
}
