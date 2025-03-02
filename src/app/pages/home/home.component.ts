import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../core/theme.service';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Project } from '../../shared/models/project';
import { Tag } from '../../shared/models/tag';
import { StaggeredTextComponent } from '../../shared/components/staggered-text/staggered-text.component';

@Component({
    selector: 'app-home',
    imports: [
        StaggeredTextComponent,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatExpansionModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        RouterLink,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    private readonly theme = inject(ThemeService);
    private readonly db = inject(FirestoreService);

    protected readonly projectsLoadingError = signal(false);
    protected readonly step = signal(0);

    protected readonly scale = signal(1);
    protected readonly opacity = signal(1);

    protected readonly allTags = signal<Tag[]>([]);
    protected readonly latestProjects = signal<Project[]>([]);

    constructor() {
        this.parallaxEffect();
        this.tagsEffect();
        this.loadLatestsProjects();
    }

    get isDarkMode() { return this.theme.isDarkMode; }

    private parallaxEffect() {
        effect(() => {
            const setPosition = () => {
                const displacement = document.scrollingElement?.scrollTop ?? 0;
                const maxChange = window.innerWidth * 2;
                const change = displacement > maxChange ? maxChange : displacement;
                this.scale.set(Math.exp(change / 1200));
                this.opacity.set(Math.exp(-(change / 600)));
            };
            window.addEventListener('scroll', setPosition);
            return () => window.removeEventListener('scroll', setPosition);
        });
    }

    protected setStep(index: number) { this.step.set(index); }

    private loadLatestsProjects() {
        this.db.getDataWithCache<Project[]>(
            'projects_limit_5',
            () => this.db.queryData('projects', this.db.limitConstraint(5))
        ).subscribe(projects => this.latestProjects.set(projects ?? []));
    }

    private tagsEffect() {
        effect(() => {
            const tagsPaths = [ ...new Set(this.latestProjects().flatMap(project => project.tags)) ];
            const sub = this.db.getDataWithCache<Tag[]>(
                'tags',
                () => this.db.loadCollection('tags')
            ).subscribe(tags => this.allTags.set(tags?.filter(tag => tagsPaths.includes(tag.path)) ?? []));
            return () => sub.unsubscribe();
        });
    }

    protected getTag(tag: string) {
        return this.allTags().find(t => t.path === tag) ?? new Tag('Unknown', '', '', '', '');
    }
}
