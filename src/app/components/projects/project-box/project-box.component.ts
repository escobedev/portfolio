import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Project } from '../../../interfaces/project.interface';

@Component({
  selector: 'app-project-box',
  standalone: true,
  imports: [],
  templateUrl: './project-box.component.html',
  styleUrl: './project-box.component.css'
})
export class ProjectBoxComponent {
  @Input() animate = false;
  @Input() transparent = false;
  @Input() project: Project = {} as Project;

  @Output() loaded = new EventEmitter<string>();
  ngOnInit() {
    this.loaded.emit(this.project.name);
  }
}
