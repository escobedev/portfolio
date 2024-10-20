import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { TypingTextComponent } from "../../shared/components/typing-text/typing-text.component";
import { ThemeService } from '../../core/theme.service';
import { PageCommons } from '../../shared/utils/page-commons';

/**
 * Contact Me page.
 * @class ContactComponent
 * @extends PageCommons
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    TypingTextComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent extends PageCommons {
  protected readonly contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    message: new FormControl('', [Validators.required, Validators.maxLength(2000)])
  });

  /**
   * Constructs the Contact Me page.
   * @constructor
   * @param theme Theme service.
   */
  constructor(private theme: ThemeService) {
    super('Contact me');
  }

  /**
   * Get the current theme.
   * @function get currentTheme
   * @returns Current theme.
   */
  get currentTheme() {
    return this.theme.currentTheme ?? 'dark';
  }

  /**
   * Send an email.
   * @function sendEmail
   */
  sendEmail() {
    const name = this.contactForm.value.name ?? '';
    const email = this.contactForm.value.email ?? '';
    const subject = this.contactForm.value.subject ?? '';
    const message = this.contactForm.value.message ?? '';

    if (this.contactForm.valid) {
      const mailtoLink = `mailto:bruno.jair.ea@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Hi, I'm " + name + "\n" + message)}`;
      window.location.href = mailtoLink;
      this.contactForm.reset();
    }
  }
}
