import { Component, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Project } from '../../utils/project';
import { Tag } from '../../utils/tag';

@Component({
  selector: 'app-project-box',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinner,
    MatTooltipModule,
    RouterLink,
  ],
  templateUrl: './project-box.component.html',
  styleUrl: './project-box.component.scss'
})
export class ProjectBoxComponent {
  @Input() project: Project = {} as Project;
  @Input() index: number = 0;

  protected toTag(tag: string | Tag) {
    return tag as Tag;
  }
}
