import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { JobEntry } from '../../../interfaces/job-entry.interface';
@Component({
  selector: 'app-job-box',
  standalone: true,
  imports: [],
  templateUrl: './job-box.component.html',
  styleUrl: './job-box.component.css'
})
export class JobBoxComponent implements OnInit {
  @Input() animate = false;
  @Input() transparent = false;
  @Input() job: JobEntry = {} as JobEntry;
  @Output() loaded = new EventEmitter<string>();

  ngOnInit() {
    this.loaded.emit(this.job.position);
  }

  convertDate(date: Date) {
    return date.toLocaleDateString('en-US', { month: 'short' }) + ' ' + date.getFullYear();
  }
}
