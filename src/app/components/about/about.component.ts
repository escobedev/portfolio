import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { jobEntries } from '../../interfaces/job-entry.interface';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ RouterModule, MatSlideToggleModule ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  years_of_experience = new Date(Date.now()).getFullYear() - new Date('2023-01-01').getFullYear();
  isLoaded = false;

  constructor() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100)
  }

  last_job = jobEntries[0];

  scrollUp() {
    window.scrollTo({ top: 0 });
  }

}
