import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Anchor } from './anchor';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() menu: Anchor[] = [];
  protected readonly title = '';
  protected readonly random = signal('');
  protected readonly randomText = signal('');
  protected readonly mobileQuery: MediaQueryList;
  private readonly route = inject(ActivatedRoute);
  private _mobileQueryListener: () => void;
  protected isAuth: boolean = false;

  constructor(private theme: ThemeService) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    const buffer = ['@', '#', '$', '%', '&', '/', '\\', '?', '!', '<', '>', ':', ';', '=', '{', '}', '[', ']', '| ', '(', ')', '*', '+', '-', '.'];
    const alpha_buffer = 'abcdefghijklmnopqrstuvwxyz';
    setInterval(() => {
      let text = '';
      let alpha_text = '';
      for (let i = 0; i < 8; i++) text += buffer[Math.floor(Math.random() * buffer.length)];
      for (let i = 0; i < 8; i++) alpha_text += alpha_buffer[Math.floor(Math.random() * alpha_buffer.length)];
      this.random.set(text);
      this.randomText.set(alpha_text);
    }, 1);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  isActivated(route: string) {
    return this.route.snapshot.firstChild?.routeConfig?.path === route;
  }

  toggleTheme() {
    this.theme.toggleTheme();
  }

  get currentTheme() {
    return this.theme.currentTheme;
  }
}
