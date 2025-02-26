import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../../layout/footer/footer.component";
import { TypingTextComponent } from "../../shared/components/typing-text/typing-text.component";
import { FirestoreService } from '../../shared/services/firestore.service';
import { jobEntries } from '../../shared/interfaces/job-entry.interface';
import { Certificate } from '../../shared/models/certificate';
import { PageCommons } from '../../shared/utils/page-commons';
import { Tag } from '../../shared/models/tag';
import { SoftSkillTag } from '../../shared/models/soft-skills';

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
        FooterComponent,
    ],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent extends PageCommons {
  protected readonly paragraphs: string[] = [
    "Hello! I'm Bruno Escobedo, a passionate self-taught software developer based in Lima, Peru.",
    "My passion for software development has driven me to enhance my skills through coding in various programming languages such as Python, C, C++, C#, JavaScript, TypeScript, SQL, and using frameworks such as Angular and .NET.",
    `Additionally, I am deeply interested in cybersecurity and have been learning about ethical hacking through <abbr role="Catch The Flag">CTF</abbr> platforms like <abbr role="Hack The Box">HTB</abbr> and <abbr role="TryHackMe">THM</abbr>.`,
    "I also love learning spoken languages, I have a more than a 700-days streak in Duolingo learning French, German, Portuguese and so on.",
    "I am committed to continuous learning and eager to contribute to a proactive software developing and cybersecurity team.",
  ];
  protected readonly years_of_experience = new Date(Date.now()).getFullYear() - new Date('2023-01-01').getFullYear();
  protected readonly last_job = jobEntries[0];
  protected latestCerts: Certificate[] = [];
  protected principalLangs: Tag[] = [];
  protected principalHSTags: Tag[] = [];
  protected principalSSTags: SoftSkillTag[] = [];

  /**
   * Constructs the About Me page.
   * @constructor
   * @param db Firestore service.
   */
  constructor(private readonly db: FirestoreService) {
    super('About Me');
    this.getPrincipalTags();
    this.getPrincipalSSTags();
    this.getLatestCertificates();
  }

  /**
   * Queries the principal skills with high level.
   * @function getPrincipalTags
   */
  private getPrincipalTags() {
    this.db.getDataWithCache(
      'tags_where_level_in_high_expert_b2_native',
      () => this.db.queryData(
        'tags',
        this.db.whereConstraint('level', 'in', ['High', 'Expert', 'B2', 'Native']),
      )
    ).subscribe((tags: Tag[]) => {
      this.principalLangs = tags.filter(tag => ['B2', 'Native'].includes(tag.level));
      this.principalHSTags = tags.filter(tag => ['High', 'Expert'].includes(tag.level));
    });
  }

  /**
   * Queries the principal soft skills with level 10.
   * @function getPrincipalSSTags
   */
  private getPrincipalSSTags() {
    this.db.getDataWithCache(
      'sstags_where_level_eq_10',
      () => this.db.queryData(
        'soft-skill-tags',
        this.db.whereConstraint('level', '==', 10),
      )
    ).subscribe((ssTags: SoftSkillTag[]) => {
      this.principalSSTags = ssTags;
    });
  }

  /**
   * Queries the 5 latest certificates.
   * @function getLatestCertificates
   */
  private getLatestCertificates() {
    this.db.getDataWithCache(
      'certs_orderby_date_desc_lim_5',
      () => this.db.queryData(
        'certs',
        this.db.orderByConstraint('date', 'desc'),
        this.db.limitConstraint(5),
      )
    ).subscribe((certs: Certificate[]) => {
      this.latestCerts = certs;
    });
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
