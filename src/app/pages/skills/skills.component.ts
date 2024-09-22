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
  protected readonly hardSkillsTags: Skills[] = [];
  protected readonly softSkillsTags: SoftSkills[] = [];
  protected readonly languageTags: Skills[] = [];

  constructor(private readonly db: FirestoreService) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.load.set(true);
      setTimeout(() => {
        this.hide.set(true);
      }, 1000);
    }, 100 * (this.title.length + 1));
    db
    .loadDoc('data', 'skills')
    .subscribe((data: any) => {
      const hardList = data['hard-skills'];
      const softList = data['soft-skills'] as SoftSkills[];
      const langList = data['languages'];

      for (const field of hardSkills) {
        db
        .queryCollection('tags', 'type', field)
        .subscribe((tags: Tag[]) => {
          const cleanTags: Tag[] = [];
          for (const tag of tags)
            if (hardList.includes(tag.path))
              cleanTags.push(tag);
          if (cleanTags.length > 0)
            this.hardSkillsTags.push({
              name: field,
              skills: cleanTags,
            });
        });
      }

      for (const set of softList) {
        let tags: SoftSkillTag[] = [];
        for (const tag of set.skills)
          db
          .loadDoc('soft-skill-tags', tag as string)
          .subscribe((tag: SoftSkillTag) => {
            tags.push(tag);
          });
        this.softSkillsTags.push({
          name: set.name,
          image: set.image,
          skills: tags,
        });
      }

      for (const field of languages) {
        db
        .queryCollection('tags', 'type', field)
        .subscribe((tags: Tag[]) => {
          const cleanTags: Tag[] = [];
          for (const tag of tags)
            if (langList.includes(tag.path))
              cleanTags.push(tag);
          if (cleanTags.length > 0)
            this.languageTags.push({
              name: field,
              skills: cleanTags,
            });
        });
      }

      this.loaded.set(true);
    })
  }

  protected toSSTag(tag: string | SoftSkillTag) {
    return tag as SoftSkillTag;
  }
  protected avgLevels(tags: (string | SoftSkillTag)[]) {
    let sum = 0;
    for (const tag of tags)
      sum += this.toSSTag(tag).level * 10;
    return sum / tags.length;
  }

}
