import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { CertBoxComponent } from "../../components/cert-box/cert-box.component";
import { ProjectBoxComponent } from "../../components/project-box/project-box.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { TypingTextComponent } from "../../layout/typing-text/typing-text.component";
import { FirestoreService } from '../../services/firestore.service';
import { Achievement } from '../../utils/achievement';
import { Badge } from '../../utils/badge';
import { Certificate } from '../../utils/certificate';
import { Entity } from '../../utils/entity';
import { Tag } from '../../utils/tag';
import { Project } from '../../utils/project';

@Component({
    selector: 'app-skill',
    standalone: true,
    imports: [
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule,
        CertBoxComponent,
        ProjectBoxComponent,
        FooterComponent,
        TypingTextComponent,
    ],
    templateUrl: './skill.component.html',
    styleUrl: './skill.component.scss'
})
export class SkillComponent {
    protected title = '';
    protected tag: Tag | null = null;
    protected selection: string = '';
    protected readonly allEntities = signal<Entity[]>([]);
    protected readonly hide = signal(false);
    protected readonly load = signal(false);
    protected readonly relatedAchievements = signal<Achievement[]>([]);
    protected readonly relatedBadges = signal<Badge[]>([]);
    protected readonly relatedCertificates = signal<Certificate[]>([]);
    protected readonly relatedProjects = signal<Project[]>([]);

    constructor(
        private readonly route: ActivatedRoute,
        private readonly db: FirestoreService,
    ) {
        window.scrollTo(0, 0);
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.tag = null;
            this.selection = '';
            this.allEntities.set([]);
            this.relatedAchievements.set([]);
            this.relatedBadges.set([]);
            this.relatedCertificates.set([]);
            this.relatedProjects.set([]);
            this.hide.set(false);
            this.load.set(false);
            window.scrollTo(0, 0);
            const path = params.get('skill') ?? '';
            this.db
            .loadDoc('tags', path)
            .subscribe((data: any) => {
                this.tag = data;
                this.title = data.name;
                setTimeout(() => {
                    this.load.set(true);
                    setTimeout(() => {
                        this.hide.set(true);
                    }, 1000);
                }, 100 * (this.title.length + 1));
            });
            this.db
            .queryCollectionByTag('certs', path)
            .subscribe((data: Certificate[]) => {
                this.relatedCertificates.set(data);
                console.log(data);
                this.loadCertTags();
            });
            this.db
            .queryCollectionByTag('projects', path)
            .subscribe((data: Project[]) => {
                this.relatedProjects.set(data);
                this.loadProjectTags();
            });
        });
    }

    private loadCertTags() {
        for (const cert of this.relatedCertificates()) {
            let tags: Tag[] = [];
            for (const tag of cert.tags)
                this.db
                .loadDoc('tags', tag as string)
                .subscribe((tagData: Tag) => {
                    tags.push(tagData);
                });
            this.relatedCertificates.update((certs) => {
                const index = certs.findIndex((c) => c.code === cert.code);
                certs[index].tags = tags;
                return certs;
            });
            this.db
            .loadDoc('entities', cert.issuer)
            .subscribe((entityData: Entity) => {
                this.allEntities.update((entities) => {
                    if (entities.every(entity => entity.name !== entityData.name))
                        entities.push(entityData);
                    return entities;
                });
            });
        }
    }

    private loadProjectTags() {
        for (const project of this.relatedProjects()) {
            let tags: Tag[] = [];
            for (const tag of project.tags)
                this.db
                .loadDoc('tags', tag as string)
                .subscribe((tagData: Tag) => {
                    tags.push(tagData);
                });
            this.relatedProjects.update((projects) => {
                const index = projects.findIndex((c) => c.name === project.name);
                projects[index].tags = tags;
                return projects;
            });
        }
    }

    protected scrollUp() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
