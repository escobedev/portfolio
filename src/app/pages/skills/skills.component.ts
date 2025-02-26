import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { TypingTextComponent } from "../../shared/components/typing-text/typing-text.component";
import { FirestoreService } from '../../shared/services/firestore.service';
import { Tag } from '../../shared/models/tag';
import { Skills } from '../../shared/models/skills';
import { SoftSkillTag, SoftSkills } from '../../shared/models/soft-skills';
import { hardSkills, languages } from '../../shared/models/skills-lists';
import { PageCommons } from '../../shared/utils/page-commons';
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";

@Component({
    selector: 'app-skills',
    imports: [
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatTooltipModule,
        RouterLink,
        TypingTextComponent,
        SpinnerComponent
    ],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss'
})
export class SkillsComponent extends PageCommons {
  protected readonly loaded = signal(false);
  protected hardSkills: Skills[] = [];
  protected softSkills: SoftSkills[] = [];
  protected languages: Skills[] = [];
  protected tagsPaths: string[] = [];
  protected allTags: Tag[] = [];
  protected allSSTags: SoftSkillTag[] = [];


  constructor(private readonly db: FirestoreService) {
    super('Skills');
    this.loadTags();
    this.loadSSTags();
    this.loadData();
  }

  private loadTags() {
    this.db.getDataWithCache(
      'tags',
      () => this.db.loadCollection('tags')
    ).subscribe((tags: Tag[]) => this.allTags = tags);
  }

  private loadSSTags() {
    this.db.getDataWithCache(
      'sstags',
      () => this.db.loadCollection('soft-skill-tags')
    ).subscribe((ssTags: SoftSkillTag[]) => this.allSSTags = ssTags);
  }

  private loadData() {
    this.db.getDataWithCache(
      'data_skills',
      () => this.db.loadDoc('data', 'skills')
    ).subscribe((data: any) => {
      this.tagsPaths = [...data['hard-skills'] as string[], ...data['languages'] as string[]];
      this.softSkills = data['soft-skills'] as SoftSkills[];
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
