import { Component } from '@angular/core';
import { ThmBadgeComponent } from '../components/badges/thm-badge/thm-badge.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ ThmBadgeComponent ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  isLoaded = false;
  constructor() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  }
}