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
import { Certificate } from '../../utils/certificate';
import { Achievement } from '../../utils/achievement';
import { Badge } from '../../utils/badge';
import { Project } from '../../utils/project';
import { Job } from '../../utils/job';
import { Entity } from '../../utils/entity';
import { Tag } from '../../utils/tag';
import { Company } from '../../utils/company';
import { Place } from '../../utils/place';
import { SoftSkillTag } from '../../utils/soft-skills';

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
    protected title: string = '';
    protected path: string = '';
    protected selection: string = '';
    protected readonly tag = signal<Tag | null>(null);
    protected readonly hide = signal(false);
    protected readonly load = signal(false);
    protected readonly allTags: Tag[] = [];
    protected readonly allSSTags: SoftSkillTag[] = [];
    protected readonly allEntities: Entity[] = [];
    protected readonly allCompanies: Company[] = [];
    protected readonly relatedCertificates = signal<Certificate[]>([]);
    protected readonly relatedAchievements = signal<Achievement[]>([]);
    protected readonly relatedBadges = signal<Badge[]>([]);
    protected readonly relatedProjects = signal<Project[]>([]);
    protected readonly relatedJobs = signal<Job[]>([]);

    constructor(
        private readonly route: ActivatedRoute,
        private readonly db: FirestoreService,
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            window.scrollTo(0, 0);
            this.tag.set(null);
            this.selection = '';
            this.relatedAchievements.set([]);
            this.relatedBadges.set([]);
            this.relatedCertificates.set([]);
            this.relatedProjects.set([]);
            this.hide.set(false);
            this.load.set(false);
            this.path = params.get('skill') ?? '';
            this.loadRelatedCertificates();
        });
    }

    private loadRelatedCertificates() {
        this.db
            .queryData(
                'certs',
                this.db.whereConstraint('tags', 'array-contains', this.path)
            )
            .subscribe((certs: Certificate[]) => {
                this.relatedCertificates.set(certs);
                this.loadRelatedAchievements();
            });
    }

    private loadRelatedAchievements() {
        this.db
            .queryData(
                'achievements',
                this.db.whereConstraint('tags', 'array-contains', this.path)
            )
            .subscribe((achievements: Achievement[]) => {
                this.relatedAchievements.set(achievements);
                this.loadRelatedBadges();
            });
    }

    private loadRelatedBadges() {
        this.db
            .queryData(
                'badges',
                this.db.whereConstraint('tags', 'array-contains', this.path)
            )
            .subscribe((badges: Badge[]) => {
                this.relatedBadges.set(badges);
                this.loadRelatedProjects();
            });
    }

    private loadRelatedProjects() {
        this.db
            .queryData(
                'projects',
                this.db.whereConstraint('tags', 'array-contains', this.path)
            )
            .subscribe((projects: Project[]) => {
                this.relatedProjects.set(projects);
                this.loadRelatedJobs();
            });
    }

    private loadRelatedJobs() {
        this.db
            .queryData(
                'jobs',
                this.db.whereConstraint('tags', 'array-contains', this.path)
            )
            .subscribe((jobs: Job[]) => {
                this.relatedJobs.set(jobs);
                this.loadTags();
            });
    }

    private loadTags() {
        const tagsPaths = [
          ...new Set(this.relatedCertificates().flatMap((cert) => cert.tags)),
          ...new Set(this.relatedAchievements().flatMap((achievement) => achievement.tags)),
          ...new Set(this.relatedBadges().flatMap((badge) => badge.tags)),
          ...new Set(this.relatedProjects().flatMap((project) => project.tags)),
          ...new Set(this.relatedJobs().flatMap((job) => job.hardSkills)),
        ];
        if (tagsPaths.length > 0)
            this.db
                .queryData(
                    'tags',
                    this.db.whereConstraint('path', 'in', tagsPaths)
                )
                .subscribe((tags: Tag[]) => {
                    this.allTags.push(...tags);
                    this.loadSSTags();
                });
        else this.loadSSTags();
    }

    private loadSSTags() {
        const ssTagsPaths = [
          ...new Set(this.relatedCertificates().flatMap((cert) => cert.tags)),
          ...new Set(this.relatedAchievements().flatMap((achievement) => achievement.tags)),
          ...new Set(this.relatedBadges().flatMap((badge) => badge.tags)),
          ...new Set(this.relatedProjects().flatMap((project) => project.tags)),
          ...new Set(this.relatedJobs().flatMap((job) => job.softSkills)),
        ];
        if (ssTagsPaths.length > 0)
            this.db
                .queryData(
                    'soft-skill-tags',
                    this.db.whereConstraint('path', 'in', ssTagsPaths)
                )
                .subscribe((sstags: SoftSkillTag[]) => {
                    this.allSSTags.push(...sstags);
                    this.loadEntities();
                });
        else this.loadEntities();
    }

    private loadEntities() {
        const entitiesPaths = [
          ...new Set(this.relatedCertificates().flatMap((cert) => cert.issuer)),
          ...new Set(this.relatedAchievements().flatMap((achievement) => achievement.issuer)),
          ...new Set(this.relatedBadges().flatMap((badge) => badge.issuer)),
        ];
        if (entitiesPaths.length > 0)
            this.db
                .queryData(
                    'entities',
                    this.db.whereConstraint('path', 'in', entitiesPaths)
                )
                .subscribe((entities: Entity[]) => {
                    this.allEntities.push(...entities);
                    this.loadCompanies();
                });
        else this.loadCompanies();
    }

    private loadCompanies() {
        const companiesPaths = [
          ...new Set(this.relatedJobs().flatMap((job) => job.hardSkills)),
        ];
        if (companiesPaths.length > 0)
            this.db
                .queryData(
                    'companies',
                    this.db.whereConstraint('path', 'in', companiesPaths)
                )
                .subscribe((companies: Company[]) => {
                    this.allCompanies.push(...companies);
                    this.tag.set(this.allTags.find((tag) => tag.path === this.path) ?? null);
                    this.title = this.tag()?.name ?? 'Not Found';
                    setTimeout(() => {
                        this.load.set(true);
                        setTimeout(() => {
                            this.hide.set(true);
                        }, 1000);
                    }, 100 * (this.title.length + 1));
                });
        else {
            this.tag.set(this.allTags.find((tag) => tag.path === this.path) ?? null);
            this.title = this.tag()?.name ?? 'Not Found';
            setTimeout(() => {
                this.load.set(true);
                setTimeout(() => {
                    this.hide.set(true);
                }, 1000);
            }, 100 * (this.title.length + 1));
        }
    }

    protected getTags(tagsPaths: string[]) {
        return this.allTags.filter((tag) => tagsPaths.includes(tag.path));
    }

    protected getSSTags(tagsPaths: string[]) {
        return this.allSSTags.filter((tag) => tagsPaths.includes(tag.path));
    }

    protected getEntity(entityPath: string) {
        return this.allEntities.find((entity) => entityPath === entity.path) ?? new Entity('Unknown', '', '', '');
    }

    protected getCompany(companyPath: string) {
        return this.allCompanies.find((company) => companyPath === company.path) ?? new Company('Unknown', '', '', '',new Place('Unknown'), '');
    }

    protected scrollUp() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
