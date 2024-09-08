import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '../../interfaces/project.interface';

@Component({
  selector: 'app-project-box',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './project-box.component.html',
  styleUrl: './project-box.component.scss'
})
export class ProjectBoxComponent {
  @Input() project: Project = {} as Project;
  @Output() loaded = new EventEmitter<string>();

  ngOnInit() {
    this.loaded.emit(this.project.name);
  }
}
