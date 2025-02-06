import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TypingTextComponent } from "../../shared/components/typing-text/typing-text.component";
import { FooterComponent } from '../../layout/footer/footer.component';
import { JobBoxComponent } from '../../shared/components/job-box/job-box.component';
import { PageCommons } from '../../shared/utils/page-commons';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Job } from '../../shared/models/job';
import { Company } from '../../shared/models/company';
import { Tag } from '../../shared/models/tag';
import { Place } from '../../shared/models/place';
import { SoftSkillTag, SoftSkills } from '../../shared/models/soft-skills';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    JobBoxComponent,
    TypingTextComponent,
    FooterComponent,
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent extends PageCommons {
  protected readonly loaded = signal(false);
  protected readonly jobs = signal<Job[]>([]);
  protected allTags: Tag[] = [];
  protected allSSTags: SoftSkillTag[] = [];
  protected allJobs: Job[] = [];
  protected allCompanies: Company[] = [];
  protected softSkills: SoftSkills[] = [];

  constructor(private readonly db: FirestoreService) {
    super(
      'Job Experience',
      undefined,
      undefined,
      () => this.loadCompanies(() => this.loadAllJobs(() => {
        this.loadTags();
        this.loadSSTags();
        this.loadData();
        this.loadJob(0);
        this.loaded.set(true);
      }))
    );
  }

  protected loadCompanies(callback: () => void = () => {}) {
    this.db.getDataWithCache(
      'companies',
      () => this.db.queryData('companies')
    ).subscribe((companies: Company[]) => {
      this.allCompanies = companies;
      callback();
    });
  }

  /**
   * Loads all jobs.
   * @function loadAllJobs
   * @param callback Callback function.
   */
  private loadAllJobs(callback: () => void = () => {}) {
    this.db.getDataWithCache(
      'jobs',
      () => this.db.queryData('jobs')
    ).subscribe((jobs: Job[]) => {
      this.allJobs = jobs.reverse();
      callback();
    });
  }

  /**
   * Loads the tags of the 5 latest projects.
   * @function loadTags
   */
  private loadTags() {
    const tagsPaths = [
      ...new Set(this.allJobs.flatMap(job => job.hardSkills)),
      ...new Set(this.allJobs.flatMap(job => job.softSkills)),
    ];
    this.db.getDataWithCache(
      'tags',
      () => this.db.loadCollection('tags')
    ).subscribe((tags: Tag[]) => this.allTags = tags.filter(tag => tagsPaths.includes(tag.path)));
  }

  /**
   * Loads the tags of the 5 latest projects.
   * @function loadSSTags
   */
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
    ).subscribe((data: any) => this.softSkills = data['soft-skills'] as SoftSkills[]);
  }

  private loadJob(index: number) {
    if (index < this.allJobs.length)
      this.jobs.update(olds => [...olds, this.allJobs[index]]);
  }

  protected loadNextJob(name: string) {
    if (name) this.loadJob(this.jobs().length);
  }

  protected getCompany(company: string) {
    return this.allCompanies.find(t => t.path === company) ?? new Company('Unknown', '', '', '', new Place('Unkown'), '');
  }

  /**
   * Finds the Tags by their given paths.
   * @function getTags
   * @param tagsPaths List of tags' firestore paths.
   * @returns List of Tags.
   */
  protected getTags(tagsPaths: string[]) {
    return this.allTags.filter(tag => tagsPaths.includes(tag.path));
  }

  /**
   * Finds the Tags by their given paths.
   * @function getSSTags
   * @param tagsPaths List of tags' firestore paths.
   * @returns List of Tags.
   */
  protected getSSTags(tagsPaths: string[]) {
    return this.allSSTags.filter(ssTag => tagsPaths.includes(ssTag.path));
  }
}
