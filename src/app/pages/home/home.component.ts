import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { projects } from '../../interfaces/project.interface';
import { FooterComponent } from "../../layout/footer/footer.component";
import { TypingTextComponent } from "../../layout/typing-text/typing-text.component";
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
    FooterComponent,
    TypingTextComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly title: string = 'Hello';
  protected readonly load = signal(false);
  protected readonly hide = signal(false);
  protected readonly step = signal(0);

  constructor(private theme: ThemeService) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.load.set(true);
      setTimeout(() => {
        this.hide.set(true);
      }, 1000);
    }, 200 * (this.title.length + 1));
  }

  setStep(index: number) {
    this.step.set(index);
  }

  get currentTheme() {
    return this.theme.currentTheme;
  }

  latest_projects = [...projects].slice(0, 3);
}
