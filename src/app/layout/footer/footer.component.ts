import { Component } from '@angular/core';
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
        PrivacyPolicyComponent,
        TermsOfServiceComponent,
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {

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
    return this.theme.currentTheme ?? 'dark';
  }
}
