import { Component } from '@angular/core';
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { Anchor } from './layout/navbar/anchor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ NavbarComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EscobeDev';
  menu: Anchor[] = [
    { name: 'Home', route: '', icon: 'home' },
    { name: 'About', route: 'about', icon: 'person' },
    { name: 'Projects', route: 'projects', icon: 'token' },
    { name: 'Skills', route: 'skills', icon: 'electric_bolt' },
    { name: 'Experience', route: 'experience', icon: 'work' },
    { name: 'Contact', route: 'contact', icon: 'mail' },
    { name: 'Codex', route: 'codex', icon: 'api' },
  ];
}
