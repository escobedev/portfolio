import { ElementSchemaRegistry } from '@angular/compiler';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  isLoaded = false;
  
  constructor() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  }

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });

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
