import { Component } from '@angular/core';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  privacyPolicyVisible = false;
  termsOfServiceVisible = false;

  openPrivacyPolicy() {
    this.privacyPolicyVisible = true;
  }
  
  openTermsOfService() {
    this.termsOfServiceVisible = true;
  }

  closeDialog() {
    this.privacyPolicyVisible = false;
    this.termsOfServiceVisible = false;
  }
}
