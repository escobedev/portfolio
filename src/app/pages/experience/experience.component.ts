import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TypingTextComponent } from "../../layout/typing-text/typing-text.component";
import { FooterComponent } from '../../layout/footer/footer.component';
import { JobBoxComponent } from '../../components/job-box/job-box.component';
import { JobEntry, jobEntries } from '../../interfaces/job-entry.interface';
import { companies } from '../../interfaces/company.interface';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    JobBoxComponent,
    TypingTextComponent,
    FooterComponent,
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  protected readonly title: string = 'Job Experience';
  protected readonly jobEntries = signal<JobEntry[]>([]);
  protected readonly load = signal(false);

  constructor() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.load.set(true);
      this.loadJobEntry(0);
    }, 100 * (this.title.length + 1));
  }

  JobEntries = jobEntries;
  companies = companies;

  private loadJobEntry(index: number) {
    if (index < this.JobEntries.length)
      this.jobEntries.update(oldEntries => {
        return [...oldEntries, this.JobEntries[index]];
      });
  }
  loaded(name: string) {
    if (name) this.loadJobEntry(this.jobEntries().length);
  }

  scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
