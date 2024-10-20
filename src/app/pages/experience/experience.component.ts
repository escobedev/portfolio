import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TypingTextComponent } from "../../shared/components/typing-text/typing-text.component";
import { FooterComponent } from '../../layout/footer/footer.component';
import { JobBoxComponent } from '../../shared/components/job-box/job-box.component';
import { JobEntry, jobEntries } from '../../shared/interfaces/job-entry.interface';
import { companies } from '../../shared/interfaces/company.interface';
import { PageCommons } from '../../shared/utils/page-commons';

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
export class ExperienceComponent extends PageCommons {
  protected readonly jobEntries = signal<JobEntry[]>([]);
  protected readonly JobEntries = jobEntries;
  protected readonly companies = companies;

  constructor() {
    super('Job Experience', undefined, undefined, () => this.loadJobEntry(0));
  }

  private loadJobEntry(index: number) {
    if (index < this.JobEntries.length)
      this.jobEntries.update(oldEntries => {
        return [...oldEntries, this.JobEntries[index]];
      });
  }
  protected loaded(name: string) {
    if (name) this.loadJobEntry(this.jobEntries().length);
  }
}
