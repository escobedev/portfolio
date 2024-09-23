import { Routes } from '@angular/router';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ExperienceComponent } from './pages/experience/experience.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Bruno Escobedo',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'about',
        title: 'Bruno Escobedo - About',
        pathMatch: 'full',
        loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    },
    {
        path: 'contact',
        title: 'Bruno Escobedo - Contact',
        pathMatch: 'full',
        loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    },
    {
        path: 'projects',
        title: 'Bruno Escobedo - Projects',
        pathMatch: 'full',
        loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent),
    },
    {
        path: 'skills',
        title: 'Bruno Escobedo - Skills',
        pathMatch: 'full',
        loadComponent: () => import('./pages/skills/skills.component').then(m => m.SkillsComponent),
    },
    {
        path: 'skills/:skill',
        title: 'Bruno Escobedo - Skills',
        pathMatch: 'full',
        loadComponent: () => import('./pages/skill/skill.component').then(m => m.SkillComponent),
    },
    {
        path: 'experience',
        title: 'Bruno Escobedo - Experience',
        pathMatch: 'full',
        loadComponent: () => import('./pages/experience/experience.component').then(m => m.ExperienceComponent),
    },
    {
        path: 'certs',
        title: 'Bruno Escobedo - Certifications',
        pathMatch: 'full',
        loadComponent: () => import('./pages/certs/certs.component').then(m => m.CertsComponent),
    },
    {
        path: '404',
        title: 'Bruno Escobedo - Not Found',
        pathMatch: 'full',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    },
    {
        path: '**',
        redirectTo: '',
    }
];
