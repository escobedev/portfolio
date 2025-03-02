import { Component, computed, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TypingTextComponent } from "../../shared/components/typing-text/typing-text.component";
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
    imports: [
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        JobBoxComponent,
        TypingTextComponent,
    ],
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.scss'
})
export class ExperienceComponent extends PageCommons {
  protected readonly jobs = signal<Job[]>([]);
  protected readonly allTags = signal<Tag[]>([]);
  protected readonly allSSTags = signal<SoftSkillTag[]>([]);
  protected readonly allJobs = signal<Job[]>([]);
  protected readonly allCompanies = signal<Company[]>([]);
  protected readonly softSkills = signal<SoftSkills[]>([]);
  protected readonly loaded = computed(() => {
    return this.allJobs().length > 0 &&
      this.allCompanies().length > 0 &&
      this.allTags().length > 0 &&
      this.allSSTags().length > 0 &&
      this.softSkills().length > 0;
  });

  constructor(private readonly db: FirestoreService) {
    super('Job Experience');
    this.jobEffect();
    this.tagsEffect();
    this.loadSSTags();
    this.loadCompanies();
    this.loadData();
    this.loadAllJobs();
  }

  private jobEffect() {
    effect(() => {
      if (this.loaded()) this.loadJob(0);
    });
  }

  private loadCompanies() {
    this.db.getDataWithCache<Company[]>(
      'companies',
      () => this.db.queryData('companies')
    ).subscribe(companies => this.allCompanies.set(companies ?? []));
  }

  /**
   * Loads all jobs.
   * @function loadAllJobs
   * @param callback Callback function.
   */
  private loadAllJobs(callback: () => void = () => {}) {
    this.db.getDataWithCache<Job[]>(
      'jobs',
      () => this.db.queryData('jobs')
    ).subscribe({
      next: jobs => this.allJobs.set(jobs?.reverse() ?? []),
      complete: () => callback(),
    });
  }

  /**
   * Loads the tags of the 5 latest projects.
   * @function tagsEffect
   */
  private tagsEffect() {
    effect(() => {
      const tagsPaths = [
        ...new Set(this.allJobs().flatMap(job => job.hardSkills)),
        ...new Set(this.allJobs().flatMap(job => job.softSkills)),
      ];
      const sub = this.db.getDataWithCache<Tag[]>(
        'tags',
        () => this.db.loadCollection('tags')
      ).subscribe(tags => this.allTags.set(tags?.filter(tag => tagsPaths.includes(tag.path)) ?? []));
      return () => sub.unsubscribe();
    });
  }

  /**
   * Loads the tags of the 5 latest projects.
   * @function loadSSTags
   */
  private loadSSTags() {
    this.db.getDataWithCache<SoftSkillTag[]>(
      'sstags',
      () => this.db.loadCollection('soft-skill-tags')
    ).subscribe(ssTags => this.allSSTags.set(ssTags ?? []));
  }

  private loadData() {
    this.db.getDataWithCache<any>(
      'data_skills',
      () => this.db.loadDoc('data', 'skills')
    ).subscribe(data => this.softSkills.set(data['soft-skills'] as SoftSkills[]));
  }

  private loadJob(index: number) {
    if (index < this.allJobs().length)
      this.jobs.update(olds => [...olds, this.allJobs()[index]]);
  }

  protected loadNextJob(name: string) {
    if (name) this.loadJob(this.jobs().length);
  }

  protected getCompany(company: string) {
    return this.allCompanies().find(t => t.path === company) ?? new Company('Unknown', '', '', '', new Place('Unkown'), '');
  }

  /**
   * Finds the Tags by their given paths.
   * @function getTags
   * @param tagsPaths List of tags' firestore paths.
   * @returns List of Tags.
   */
  protected getTags(tagsPaths: string[]) {
    return this.allTags().filter(tag => tagsPaths.includes(tag.path));
  }

  /**
   * Finds the Tags by their given paths.
   * @function getSSTags
   * @param tagsPaths List of tags' firestore paths.
   * @returns List of Tags.
   */
  protected getSSTags(tagsPaths: string[]) {
    return this.allSSTags().filter(ssTag => tagsPaths.includes(ssTag.path));
  }
}
