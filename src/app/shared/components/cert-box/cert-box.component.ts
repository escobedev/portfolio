import { Component, Input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Certificate } from '../../models/certificate';
import { Entity } from '../../models/entity';
import { Tag } from '../../models/tag';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-cert-box',
  standalone: true,
  imports: [
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    RouterLink,
  ],
  templateUrl: './cert-box.component.html',
  styleUrl: './cert-box.component.scss'
})
export class CertBoxComponent {
  @Input() certificate: Certificate = {} as Certificate;
  @Input() index: number = 0;
  @Input() tags: Tag[] = [];
  @Input() entity: Entity = {} as Entity;

  protected getTag(tagPath: string) {
    return this.tags.find((t) => t.path === tagPath) ?? new Tag('Unknown', '', '', '', '');
  }

  /**
     * Gets the date from the given timestamp.
     * @function getDate
     * @param date Timestamp.
     * @returns Date.
     */
  protected getDate(date: Timestamp) {
    const timestamp = new Timestamp(date.seconds, date.nanoseconds);
    return timestamp.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
