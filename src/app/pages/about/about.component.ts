import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TypingTextComponent } from "../../shared/components/typing-text/typing-text.component";
import { FirestoreService } from '../../shared/services/firestore.service';
import { Certificate } from '../../shared/models/certificate';
import { PageCommons } from '../../shared/utils/page-commons';
import { Tag } from '../../shared/models/tag';
import { SoftSkillTag } from '../../shared/models/soft-skills';
import { Job } from '../../shared/models/job';
import { Company } from '../../shared/models/company';

/**
 * About Me page.
 * @class AboutComponent
 * @extends PageCommons
 */
@Component({
    selector: 'app-about',
    imports: [
        DatePipe,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        MatListModule,
        MatSlideToggleModule,
        MatTooltipModule,
        RouterModule,
        TypingTextComponent,
    ],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent extends PageCommons {
  protected readonly paragraphs: string[] = [
    "Hello! I'm Bruno Escobedo, a software developer based in Lima, Peru, specializing in Angular, .NET, and PostgreSQL. I build modern, scalable, and secure applications, always striving for clean architecture and performance.",
    "I'm also passionate about cybersecurity, actively sharpening my skills in ethical hacking through <abbr role=\"Catch The Flag\">CTF</abbr> platforms like <abbr role=\"Hack The Box\">HTB</abbr> and <abbr role=\"TryHackMe\">THM</abbr>. Currently, I'm expanding my expertise into React and Next.js to broaden my development stack.",
    "Beyond coding, I love learning languages like French, German, and Portuguese. I'm always eager to explore new technologies and contribute to innovative projects in software development and cybersecurity.",
  ];
  protected readonly years_of_experience = new Date(Date.now()).getFullYear() - new Date('2023-01-01').getFullYear();
  protected lastJob = signal({} as Job);
  protected lastCompany = signal({} as Company);
  protected latestCerts: Certificate[] = [];
  protected principalLangs: Tag[] = [];
  protected learningLangs: Tag[] = [];
  protected principalHSTags: Tag[] = [];
  protected principalSSTags: SoftSkillTag[] = [];

  /**
   * Constructs the About Me page.
   * @constructor
   * @param db Firestore service.
   */
  constructor(private readonly db: FirestoreService) {
    super('About Me');
    this.getLastJob();
    this.getPrincipalTags();
    this.getPrincipalSSTags();
    this.getLatestCertificates();
  }

  /**
   * Queries the last job experience.
   * @function getLastJob
   * @param callback Callback function.
   */
  private getLastJob() {
    this.db.getDataWithCache<Job[]>(
      'jobs_where_endDate_eq_null',
      () => this.db.queryData(
        'jobs',
        this.db.whereConstraint('endDate', '==', null),
      )
    ).subscribe({
      next: jobs => this.lastJob.set(jobs ? jobs[0] : {} as Job),
      complete: () => this.getLastCompany(this.lastJob().company),
    });
  }

  /**
   * Queries the last job experience company.
   * @function getLastCompany
   */
  private getLastCompany(companyId: string) {
    this.db.getDataWithCache<Company>(
      'last_company_test5',
      () => this.db.loadDoc('companies', companyId),
    ).subscribe(company => this.lastCompany.set(company ?? {} as Company));
  }

  /**
   * Queries the principal skills with high level.
   * @function getPrincipalTags
   */
  private getPrincipalTags() {
    this.db.getDataWithCache<Tag[]>(
      'tags_where_level_in_high_expert_b2_b1_a2_a1_native',
      () => this.db.queryData(
        'tags',
        this.db.whereConstraint('level', 'in', ['High', 'Expert', 'B2', 'B1', 'A2', 'A1', 'Native']),
      )
    ).subscribe(tags => {
      this.principalLangs = tags?.filter(tag => ['B2', 'Native'].includes(tag.level)) ?? [];
      this.learningLangs = tags?.filter(tag => ['B1', 'A2', 'A1'].includes(tag.level)) ?? [];
      this.principalHSTags = tags?.filter(tag => ['High', 'Expert'].includes(tag.level)) ?? [];
    });
  }

  /**
   * Queries the principal soft skills with level 10.
   * @function getPrincipalSSTags
   */
  private getPrincipalSSTags() {
    this.db.getDataWithCache<SoftSkillTag[]>(
      'sstags_where_level_eq_10',
      () => this.db.queryData(
        'soft-skill-tags',
        this.db.whereConstraint('level', '==', 10),
      )
    ).subscribe(ssTags => this.principalSSTags = ssTags ?? []);
  }

  /**
   * Queries the 5 latest certificates.
   * @function getLatestCertificates
   */
  private getLatestCertificates() {
    this.db.getDataWithCache<Certificate[]>(
      'certs_orderby_date_desc_lim_5',
      () => this.db.queryData(
        'certs',
        this.db.orderByConstraint('date', 'desc'),
        this.db.limitConstraint(5),
      )
    ).subscribe(certs => this.latestCerts = certs ?? []);
  }
  
  /**
   * Calculates the delay time for the typing text.
   * @function getDelay
   * @param index Paragraph Index.
   * @param speed Speed of typing text.
   * @returns Delay time.
   */
  protected getDelay(index: number, speed: number) {
    let length = 0;
    for (let n = 0; n < index; n++)
      length += this.paragraphs[n].replace(/<[^>]*>/g, '').length + 1;
    return speed * length;
  }
}
