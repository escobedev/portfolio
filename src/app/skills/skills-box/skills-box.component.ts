import { Component, Input } from '@angular/core';
import { Badge } from '../../interfaces/badge.interface';

@Component({
  selector: 'app-skills-box',
  standalone: true,
  imports: [],
  templateUrl: './skills-box.component.html',
  styleUrl: './skills-box.component.css'
})
export class SkillsBoxComponent {
  @Input() animate = false;
  @Input() transparent = false;
  @Input() box: Box = {
    name: '',
    skills: [],
  };
}

export interface Box {
  name: string;
  skills: Skills[];
}

export interface Skills {
  name: string;
  badges: Badge[];
}