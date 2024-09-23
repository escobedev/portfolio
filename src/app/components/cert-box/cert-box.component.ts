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
import { Certificate } from '../../utils/certificate';
import { Entity } from '../../utils/entity';
import { Software } from '../../utils/software';
import { Tag } from '../../utils/tag';

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
}
