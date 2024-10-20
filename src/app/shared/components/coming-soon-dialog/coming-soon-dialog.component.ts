import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-coming-soon-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './coming-soon-dialog.component.html',
  styleUrl: './coming-soon-dialog.component.scss'
})
export class ComingSoonDialogComponent {

}
