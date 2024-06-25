import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';

export const routes: Routes = [
    { path: '', title: 'Bruno Escobedo', component: HomeComponent },
    { path: 'about', title: 'Bruno Escobedo - About', component: AboutComponent },
    { path: 'contact', title: 'Bruno Escobedo - Contact', component: ContactComponent },
    { path: 'projects', title: 'Bruno Escobedo - Projects', component: ProjectsComponent },
    { path: 'skills', title: 'Bruno Escobedo - Skills', component: SkillsComponent },
    { path: 'experience', title: 'Bruno Escobedo - Experience', component: ExperienceComponent },
    { path: '**', redirectTo: '/home' }
];
