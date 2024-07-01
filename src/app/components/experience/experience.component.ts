import { Component, signal } from '@angular/core';
import { JobBoxComponent } from './job-box/job-box.component';
import { JobEntry, jobEntries } from '../../interfaces/job-entry.interface';
import { companies } from '../../interfaces/company.interface';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ JobBoxComponent ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  isLoaded = false;

  protected readonly jobEntries = signal<JobEntry[]>([]);

  constructor() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
    this.loadJobEntry(0);
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
}
