import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { ThemeService } from '../../core/theme.service';

@Component({
    selector: 'app-footer',
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatListModule,
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private readonly theme = inject(ThemeService);
  private readonly dialog = inject(MatDialog);

  constructor() {}

  get isDarkMode() { return this.theme.isDarkMode; }
  get year() { return (new Date()).getFullYear(); }

  protected openDialog(component: 'privacy-policy' | 'terms-of-service') {
    switch (component) {
      case 'privacy-policy':
        this.dialog.open(PrivacyPolicyComponent);
        break;
      case 'terms-of-service':
        this.dialog.open(TermsOfServiceComponent);
        break;
    }
  }
}
