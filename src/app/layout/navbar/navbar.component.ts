import { Component, effect, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public readonly isDarkMode = input(false);
  public readonly toggleTheme = input(() => {});
  
  private readonly prevScrollPos = signal(window.scrollY);
  protected readonly isHidden = signal(false);

  protected readonly menu = [
      { name: 'Home', path: 'home', icon: 'home' },
      { name: 'About', path: 'about', icon: 'person' },
      { name: 'Projects', path: 'projects', icon: 'token' },
      { name: 'Skills', path: 'skills', icon: 'electric_bolt' },
      { name: 'Experience', path: 'experience', icon: 'work' },
      { name: 'Contact', path: 'contact', icon: 'mail' },
      { name: 'Codex', path: 'codex', icon: 'api' },
    ];

  constructor() {
    this.scrollEffect();
  }

  private scrollEffect() {
    effect(() => {
      const scrollHandler = () => {
        const currentScrollPos = window.scrollY;
        this.isHidden.set(currentScrollPos > this.prevScrollPos());
        this.prevScrollPos.set(currentScrollPos);
      };
      window.addEventListener('scroll', scrollHandler);
      return () => window.removeEventListener('scroll', scrollHandler);
    });
  }
}
