import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../../layout/footer/footer.component";
import { TypingTextComponent } from "../../layout/typing-text/typing-text.component";
import { FirestoreService } from '../../services/firestore.service';
import { jobEntries } from '../../interfaces/job-entry.interface';
import { Certificate } from '../../utils/certificate';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTooltipModule,
    RouterModule,
    TypingTextComponent,
    FooterComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  protected readonly title: string = 'About Me';
  protected readonly paragraphs: string[] = [
    "Hello! I'm Bruno Escobedo, a passionate self-taught software developer based in Lima, Peru.",
    "My passion for software development has driven me to enhance my skills through coding in various programming languages such as Python, C, C++, C#, JavaScript, TypeScript, SQL, and using frameworks such as Angular and .NET.",
    `Additionally, I am deeply interested in cybersecurity and have been learning about ethical hacking through <abbr role="Catch The Flag">CTF</abbr> platforms like <abbr role="Hack The Box">HTB</abbr> and <abbr role="TryHackMe">THM</abbr>.`,
    "I also love learning spoken languages, I have a more than a 500-days streak in Duolingo learning French, German, Portuguese and so on.",
    "I am committed to continuous learning and eager to contribute to a proactive software developing and cybersecurity team.",
  ];
  protected readonly years_of_experience = new Date(Date.now()).getFullYear() - new Date('2023-01-01').getFullYear();
  protected readonly last_job = jobEntries[0];
  protected readonly load = signal(false);
  protected latestCerts: Certificate[] = [];

  constructor(private readonly db: FirestoreService) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.load.set(true);
    }, 100 * (this.title.length + 1));
    this.queryLatestCertificates();
  }

  protected queryLatestCertificates() {
    this.db
    .queryData(
      'certs',
      this.db.limitConstraint(5)
    )
    .subscribe((certs: Certificate[]) => {
      this.latestCerts = certs;
    });
  }
  
  protected getDelay(index: number, speed: number) {
    let length = 0;
    for (let n = 0; n < index; n++) {
      length += this.paragraphs[n].replace(/<[^>]*>/g, '').length + 1;
    }
    return speed * length;
  }
}
