import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Badge, badges } from '../../interfaces/badge.interface';

@Component({
  selector: 'app-skills-box',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
  ],
  templateUrl: './skills-box.component.html',
  styleUrl: './skills-box.component.scss'
})
export class SkillsBoxComponent implements OnInit {
  @Input() box: Box = {} as Box;
  @Output() loaded = new EventEmitter<string>();
  badgeHider: { [key: string]: boolean } = {};

  constructor() {
    this.initializeBadgeHider();
  }

  ngOnInit() {
    this.loaded.emit(this.box.name);
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