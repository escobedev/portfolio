import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { TypingTextComponent } from "../../layout/typing-text/typing-text.component";
import { ThemeService } from '../../services/theme.service';

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
export class ContactComponent {
  protected readonly title: string = 'Contact Me';
  protected readonly load = signal(false);
  protected readonly hide = signal(true);

  constructor(private theme: ThemeService) {
    setTimeout(() => {
      this.load.set(true);
    }, 100 * (this.title.length + 1));
  }

  get currentTheme() {
    return this.theme.currentTheme;
  }

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    message: new FormControl('', [Validators.required, Validators.maxLength(2000)])
  });

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

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
