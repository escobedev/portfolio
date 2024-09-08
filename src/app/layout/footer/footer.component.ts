import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  privacyPolicyVisible = false;
  termsOfServiceVisible = false;

  constructor(
    private theme: ThemeService,
    private dialog: MatDialog,
  ) { }

  openPrivacyPolicy() {
    this.dialog.open(PrivacyPolicyComponent);
  }
  
  openTermsOfService() {
    this.dialog.open(TermsOfServiceComponent);
  }

  get currentTheme() {
    return this.theme.currentTheme;
  }
}
