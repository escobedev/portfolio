import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { CertBoxComponent } from "../../components/cert-box/cert-box.component";
import { ProjectBoxComponent } from "../../components/project-box/project-box.component";
import { TypingTextComponent } from "../../layout/typing-text/typing-text.component";
import { FirestoreService } from '../../services/firestore.service';
import { Certificate } from '../../utils/certificate';
import { Entity } from '../../utils/entity';
import { Tag } from '../../utils/tag';

@Component({
    selector: 'app-skill',
    standalone: true,
    imports: [
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    ProjectBoxComponent,
    TypingTextComponent,
    CertBoxComponent
],
    templateUrl: './skill.component.html',
    styleUrl: './skill.component.scss'
})
export class SkillComponent {
    protected tag?: Tag;
    protected title = '';
    protected readonly load = signal(false);
    protected readonly hide = signal(false);
    protected readonly relatedProjects = signal([]);
    protected readonly relatedCertificates = signal<Certificate[]>([]);
    protected readonly allEntities = signal<Entity[]>([]);

    constructor(
        private route: ActivatedRoute,
        private db: FirestoreService,
    ) {
        window.scrollTo(0, 0);
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            window.scrollTo(0, 0);
            const path = params.get('skill') ?? '';
            this.db.loadDoc('tags', path).subscribe((data: any) => {
                this.tag = data;
                this.title = data.name;
                setTimeout(() => {
                    this.load.set(true);
                    setTimeout(() => {
                        this.hide.set(true);
                    }, 1000);
                }, 100 * (this.title.length + 1));
            });
            this.db.queryCollectionByTag('certs', path).subscribe((data: Certificate[]) => {
                this.relatedCertificates.set(data);
                console.log(data);
                this.loadTags();
            });
            this.db.queryCollectionByTag('projects', path).subscribe((data: any) => {
                this.relatedProjects.set(data);
            });
        });
    }

    private loadTags() {
        for (const cert of this.relatedCertificates()) {
            let tags: Tag[] = [];
            for (const tag of cert.tags)
                this.db.loadDoc('tags', tag).subscribe((tagData: Tag) => {
                    tags.push(tagData);
                });
            this.relatedCertificates.update((certs) => {
                const index = certs.findIndex((c) => c.code === cert.code);
                certs[index].skills = tags;
                return certs;
            });
            this.db.loadDoc('entities', cert.issuer).subscribe((entityData: Entity) => {
                this.allEntities.update((entities) => {
                    if (entities.every(entity => entity.name !== entityData.name)) entities.push(entityData);
                    return entities;
                });
            });
        }
    }

    scrollUp() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
