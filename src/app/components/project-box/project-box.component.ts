import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
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
    RouterLink,
  ],
  templateUrl: './project-box.component.html',
  styleUrl: './project-box.component.scss'
})
export class ProjectBoxComponent {
  @Input() project: Project = {} as Project;
  @Input() index: number = 0;
  @Output() loaded = new EventEmitter<string>();
  protected readonly tags = signal<Tag[]>([]);

  constructor(private readonly db: FirestoreService) { }

  ngOnInit() {
    this.loaded.emit(this.project.name);
    this.project.tags.forEach((tag: string) => {
      this.db.loadDoc('tags', tag).subscribe((data: Tag) => {
        this.tags.update(oldTags => {
          return [...oldTags, data];
        });
      });
    });
  }
}
