import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Badge, badges } from '../../../interfaces/badge.interface';

@Component({
  selector: 'app-skills-box',
  standalone: true,
  imports: [],
  templateUrl: './skills-box.component.html',
  styleUrl: './skills-box.component.css'
})
export class SkillsBoxComponent implements OnInit {
  @Input() animate = false;
  @Input() transparent = false;
  @Input() box: Box = {} as Box;

  @Output() loaded = new EventEmitter<string>();
  ngOnInit() {
    this.loaded.emit(this.box.name);
  }

  badgeHider: { [key: string]: boolean } = {};

  constructor() {
    this.initializeBadgeHider();
  }

  initializeBadgeHider(): void {
    badges.forEach(badge => {
      this.badgeHider[badge.name] = true;
    });
  }

  toggleBadgeLevel(badgeName: string): void {
    this.badgeHider[badgeName] = !this.badgeHider[badgeName];
  }

  getLevelSS(badge: Badge) {
    if (this.badgeHider[badge.name]) return '';
    return badge.level + '/5';
  }

  getLevel(badge: Badge) {
    if (this.badgeHider[badge.name]) return '';
    return badge.level;
  }
}

export interface Box {
  name: string;
  skills: Skills[];
}

export interface Skills {
  name: string;
  badges: Badge[];
}