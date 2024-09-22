import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { JobEntry } from '../../interfaces/job-entry.interface';

@Component({
  selector: 'app-job-box',
  standalone: true,
  imports: [
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './job-box.component.html',
  styleUrl: './job-box.component.scss'
})
export class JobBoxComponent implements OnInit {
  @Input() job: JobEntry = {} as JobEntry;
  @Input() index: number = 0;
  @Output() loaded = new EventEmitter<string>();

  ngOnInit() {
    this.loaded.emit(this.job.position);
  }

  protected convertDate(startDate: Date, endDate: Date) {
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getUTCMonth() - startDate.getUTCMonth();
    return `${ years ? years + 'years, ' : '' }${ months < 0 ? months + 13 : months + 1 } months`;
  }
}
