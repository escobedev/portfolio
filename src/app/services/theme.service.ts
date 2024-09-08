import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme = localStorage.getItem('theme');

  constructor() {
    if (this.currentTheme) {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }
  
  toggleTheme() {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    this.currentTheme = localStorage.getItem('theme');
  }
}
