import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-terms-of-service',
    imports: [
        MatButtonModule,
        MatDialogModule,
    ],
    templateUrl: './terms-of-service.component.html',
    styleUrl: './terms-of-service.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsOfServiceComponent {

}
