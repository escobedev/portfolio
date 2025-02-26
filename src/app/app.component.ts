import { Component } from '@angular/core';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
    selector: 'app-root',
    imports: [NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  // protected readonly title = 'EscobeDev';
  // protected readonly menu: Anchor[] = [
  //   { name: 'Home', route: 'home', icon: 'home' },
  //   { name: 'About', route: 'about', icon: 'person' },
  //   { name: 'Projects', route: 'projects', icon: 'token' },
  //   { name: 'Skills', route: 'skills', icon: 'electric_bolt' },
  //   { name: 'Experience', route: 'experience', icon: 'work' },
  //   { name: 'Contact', route: 'contact', icon: 'mail' },
  //   { name: 'Codex', route: 'codex', icon: 'api' },
  // ];
  // protected readonly random = signal('');
  // protected readonly randomText = signal('');
  // protected readonly mobileQuery: MediaQueryList;
  // private _mobileQueryListener: () => void;
  // protected isAuth: boolean = false;

  // constructor(
  //   private theme: ThemeService,
  //   private dialog: MatDialog,
  // ) {
  //   const changeDetectorRef = inject(ChangeDetectorRef);
  //   const media = inject(MediaMatcher);

  //   this.mobileQuery = media.matchMedia('(max-width: 1000px)');
  //   this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  //   this.mobileQuery.addListener(this._mobileQueryListener);

  //   const buffer = ['@', '#', '$', '%', '&', '/', '\\', '?', '!', '<', '>', ':', ';', '=', '{', '}', '[', ']', '| ', '(', ')', '*', '+', '-', '.'];
  //   const alpha_buffer = 'abcdefghijklmnopqrstuvwxyz';
  //   setInterval(() => {
  //     let text = '', alpha_text = '';
  //     for (let i = 0; i < 8; i++) text += buffer[Math.floor(Math.random() * buffer.length)];
  //     for (let i = 0; i < 8; i++) alpha_text += alpha_buffer[Math.floor(Math.random() * alpha_buffer.length)];
  //     this.random.set(text);
  //     this.randomText.set(alpha_text);
  //   }, 1);
  // }

  // ngOnDestroy(): void {
  //   this.mobileQuery.removeListener(this._mobileQueryListener);
  // }

  // openDialog() {
  //   this.dialog.open(ComingSoonDialogComponent);
  // }

  // toggleTheme() {
  //   this.theme.toggleTheme();
  // }

  // get currentTheme() {
  //   return this.theme.currentTheme ?? 'dark';
  // }

  protected isDarkMode: boolean;

  constructor() {
    const theme = window.localStorage.getItem('themePreference') || "light-mode";
    this.isDarkMode = theme === 'dark-mode';
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark-mode' : 'light-mode');
    window.localStorage.setItem('themePreference', theme);
  }

  toggleTheme = () => {
    this.isDarkMode = ! this.isDarkMode;
    const newTheme = this.isDarkMode ? 'dark-mode' : 'light-mode';
    document.documentElement.setAttribute('data-theme', newTheme);
    window.localStorage.setItem('themePreference', newTheme);
  }
}
