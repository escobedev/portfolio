import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Job } from '../../models/job';
import { Company } from '../../models/company';
import { Timestamp } from '@angular/fire/firestore';
import { Tag } from '../../models/tag';
import { SoftSkillTag, SoftSkills } from '../../models/soft-skills';

@Component({
    selector: 'app-job-box',
    imports: [
        DatePipe,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule,
        RouterLink,
    ],
    templateUrl: './job-box.component.html',
    styleUrl: './job-box.component.scss'
})
export class JobBoxComponent implements OnInit {
  @Input() job: Job = {} as Job;
  @Input() company: Company = {} as Company;
  @Input() tags: Tag[] = [];
  @Input() ssTags: SoftSkillTag[] = [];
  @Input('soft-skills') softSkills: SoftSkills[] = [];
  @Input() index: number = 0;
  @Output() loaded = new EventEmitter<string>();

  ngOnInit() {
    this.loaded.emit(this.job.position);
  }

  protected convertDate(startTimestamp: Timestamp, endTimestamp: Timestamp) {
    const startDate = new Date(this.getDate(startTimestamp) ?? new Date());
    const endDate = new Date(this.getDate(endTimestamp) ?? new Date());
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth() + 1;
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return `${years ? years + (years === 1 ? ' year, ' : ' years, ') : ''}${months} month${months !== 1 ? 's' : ''}`;
  }

  /**
     * Gets the date from the given timestamp.
     * @function getDate
     * @param date Timestamp.
     * @returns Date.
     */
  protected getDate(date: Timestamp) {
    if (date) {
      const timestamp = new Timestamp(date.seconds, date.nanoseconds);
      return timestamp.toDate().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } else return null;
  }

  protected getTag(tagPath: string) {
    return this.tags.find(t => t.path === tagPath);
  }

  protected getSSTag(tagPath: string) {
    return this.ssTags.find(t => t.path === tagPath) ?? { name: 'Unknown' } as SoftSkillTag;
  }

  protected getSS(tagPath: string) {
    return this.softSkills.find(ss => ss.skills.includes(tagPath));
  }
}
