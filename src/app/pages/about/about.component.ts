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
    "Hello! I'm Bruno Escobedo, a passionate software developer based in Lima, Peru. I am a dedicated and detail-oriented professional with a background in fiber optic projects, currently transitioning into the dynamic fields of software development and cybersecurity.",
    "With a strong foundation in technical problem-solving, project management, and risk assessment, I bring a unique perspective to the challenges of protecting digital assets and better software development practices.",
    `My passion for cybersecurity has driven me to learn about ethical hacking through <abbr role="Catch The Flag">CTF</abbr> platforms like <abbr role="Hack The Box">HTB</abbr> and <abbr role="TryHackMe">THM</abbr>, which helped me gain hands-on experience with tools like Nmap, Metasploit and Linux.`,
    "Additionally, I am deeply interested in software engineering and have been enhancing my skills through coding in various programming languages such as Python, C, C++, JavaScript, TypeScript, SQL, and using frameworks such as Angular.",
    "Driven by a passion for protecting digital assets and developing robust software solutions, I am committed to continuous learning and eager to contribute to a proactive cybersecurity and software engineering team. My goal is to leverage my technical expertise and collaborative spirit to enhance information security, resilience, and software development practices.",
  ];
  protected readonly years_of_experience = new Date(Date.now()).getFullYear() - new Date('2023-01-01').getFullYear();
  protected readonly last_job = jobEntries[0];
  protected readonly load = signal(false);
  protected readonly latestCerts = signal<Certificate[]>([]);

  constructor(private readonly db: FirestoreService) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.load.set(true);
    }, 100 * (this.title.length + 1));
    db.loadCollection('certs', 5).subscribe((certs: Certificate[]) => {
      this.latestCerts.set(certs);
    });
  }
  
  getDelay(index: number, speed: number) {
    let length = 0;
    for (let n = 0; n < index; n++) {
      length += this.paragraphs[n].replace(/<[^>]*>/g, '').length + 1;
    }
    return speed * length;
  }
}
