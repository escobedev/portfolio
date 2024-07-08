import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navigation = 0;
  isNavActive = false;
  
  router = inject(Router);
  currentNav = '';

  constructor() { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentNav = this.router.url.split('/').join('').split('?')[0];
      switch (this.currentNav) {
        case '':
          this.navigation = 0;
          break;
        case 'about':
          this.navigation = 1;
          break;
        case 'projects':
          this.navigation = 2;
          break;
        case 'skills':
          this.navigation = 3;
          break;
        case 'experience':
          this.navigation = 4;
          break;
        case 'contact':
          this.navigation = 5;
          break;
        default:
          this.navigation = 0;
      }
    });
  }

  toggleNav() {
    this.isNavActive = !this.isNavActive;
  }

  scrollUp(){
    window.scrollTo({ top: 0 });
  }
}
