import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CertBoxComponent } from "../../shared/components/cert-box/cert-box.component";
import { ProjectBoxComponent } from "../../shared/components/project-box/project-box.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { TypingTextComponent } from "../../shared/components/typing-text/typing-text.component";
import { FirestoreService } from '../../shared/services/firestore.service';
import { Certificate } from '../../shared/models/certificate';
import { Achievement } from '../../shared/models/achievement';
import { Badge } from '../../shared/models/badge';
import { Project } from '../../shared/models/project';
import { Job } from '../../shared/models/job';
import { Entity } from '../../shared/models/entity';
import { Tag } from '../../shared/models/tag';
import { Company } from '../../shared/models/company';
import { Place } from '../../shared/models/place';
import { SoftSkillTag } from '../../shared/models/soft-skills';

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
    protected allTags: Tag[] = [];
    protected allSSTags: SoftSkillTag[] = [];
    protected allEntities: Entity[] = [];
    protected allCompanies: Company[] = [];
    protected readonly tag = signal<Tag | null>(null);
    protected readonly hide = signal(false);
    protected readonly load = signal(false);
    protected readonly relatedCertificates = signal<Certificate[]>([]);
    protected readonly relatedAchievements = signal<Achievement[]>([]);
    protected readonly relatedBadges = signal<Badge[]>([]);
    protected readonly relatedProjects = signal<Project[]>([]);
    protected readonly relatedJobs = signal<Job[]>([]);
    private readonly router = inject(Router);

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
            setTimeout(() => this.loadRelatedCertificates());
        });
    }

    private loadRelatedCertificates() {
        this.db.getDataWithCache(
            'certs_orderby_date_desc',
            () => this.db.queryData(
                'certs',
                this.db.orderByConstraint('date', 'desc')
            )
        ).subscribe((certs: Certificate[]) => {
            this.relatedCertificates.set(certs.filter(cert => cert.tags.includes(this.path)));
            this.loadRelatedAchievements();
        });
    }

    private loadRelatedAchievements() {
        this.db.getDataWithCache(
            'achievements_orderby_date_desc',
            () => this.db.queryData(
                'achievements',
                // this.db.orderByConstraint('date', 'desc')
            )
        ).subscribe((achievements: Achievement[]) => {
            this.relatedAchievements.set(achievements.filter(achievement => achievement.tags.includes(this.path)));
            this.loadRelatedBadges();
        });
    }

    private loadRelatedBadges() {
        this.db.getDataWithCache(
            'badges_orderby_date_desc',
            () => this.db.queryData(
                'badges',
                // this.db.orderByConstraint('date', 'desc')
            )
        ).subscribe((badges: Badge[]) => {
            this.relatedBadges.set(badges.filter(badge => badge.tags.includes(this.path)));
            this.loadRelatedProjects();
        });
    }

    private loadRelatedProjects() {
        this.db.getDataWithCache(
            'projects',
            () => this.db.loadCollection('projects')
        ).subscribe((projects: Project[]) => {
            this.relatedProjects.set(projects.filter(project => project.tags.includes(this.path)));
            this.loadRelatedJobs();
        });
    }

    private loadRelatedJobs() {
        this.db.getDataWithCache(
            'jobs_orderby_enddate_desc',
            () => this.db.queryData(
                'jobs',
                // this.db.orderByConstraint('endDate', 'desc')
            )
        ).subscribe((jobs: Job[]) => {
            this.relatedJobs.set(jobs.filter(job => job.hardSkills.includes(this.path)));
            this.loadTags();
        });
    }

    private loadTags() {
        const tagsPaths = [
          ...new Set(this.relatedCertificates().flatMap(cert => cert.tags)),
          ...new Set(this.relatedAchievements().flatMap(achievement => achievement.tags)),
          ...new Set(this.relatedBadges().flatMap(badge => badge.tags)),
          ...new Set(this.relatedProjects().flatMap(project => project.tags)),
          ...new Set(this.relatedJobs().flatMap(job => job.hardSkills)),
        ];
        if (tagsPaths.length > 0)
            this.db.getDataWithCache(
                'tags',
                () => this.db.loadCollection('tags')
            ).subscribe((tags: Tag[]) => {
                this.allTags = tags.filter(tag => tagsPaths.includes(tag.path));
                this.loadSSTags();
            });
        else this.loadSSTags();
    }

    private loadSSTags() {
        const ssTagsPaths = [
          ...new Set(this.relatedCertificates().flatMap(cert => cert.tags)),
          ...new Set(this.relatedAchievements().flatMap(achievement => achievement.tags)),
          ...new Set(this.relatedBadges().flatMap(badge => badge.tags)),
          ...new Set(this.relatedProjects().flatMap(project => project.tags)),
          ...new Set(this.relatedJobs().flatMap(job => job.softSkills)),
        ];
        if (ssTagsPaths.length > 0)
            this.db.getDataWithCache(
                'sstags',
                () => this.db.loadCollection('soft-skill-tags')
            ).subscribe((sstags: SoftSkillTag[]) => {
                this.allSSTags = sstags.filter(sstag => ssTagsPaths.includes(sstag.path));
                this.loadEntities();
            });
        else this.loadEntities();
    }

    private loadEntities() {
        const entitiesPaths = [
          ...new Set(this.relatedCertificates().flatMap(cert => cert.issuer)),
          ...new Set(this.relatedAchievements().flatMap(achievement => achievement.issuer)),
          ...new Set(this.relatedBadges().flatMap(badge => badge.issuer)),
        ];
        if (entitiesPaths.length > 0)
            this.db.getDataWithCache(
                'entities',
                () => this.db.loadCollection('entities')
            ).subscribe((entities: Entity[]) => {
                this.allEntities = entities.filter(entity => entitiesPaths.includes(entity.path));
                this.loadCompanies();
            });
        else this.loadCompanies();
    }

    private loadCompanies() {
        const companiesPaths = [
          ...new Set(this.relatedJobs().flatMap(job => job.hardSkills)),
        ];
        if (companiesPaths.length > 0)
            this.db.getDataWithCache(
                'companies',
                () => this.db.loadCollection('companies')
            ).subscribe((companies: Company[]) => {
                this.allCompanies = companies.filter(company => companiesPaths.includes(company.path));
                const currentTag = this.allTags.find(tag => tag.path === this.path) ?? null;
                this.tag.set(currentTag);
                this.title = currentTag?.name ?? 'Not Found';
                this.load.set(false);
                setTimeout(() => {
                    this.load.set(true);
                    setTimeout(() => {
                        this.hide.set(true);
                    }, 1000);
                }, 100 * (this.title.length + 1));
            });
        else this.loadTag();
    }

    private loadTag() {
        this.db.getDataWithCache(
            'tags',
            () => this.db.loadCollection('tags')
        ).subscribe((tags: Tag[]) => {
            const currentTag = tags.find(tag => tag.path === this.path);
            if (currentTag === undefined)
                this.router.navigate(['/404']);
            this.tag.set(currentTag ?? null);
            this.title = currentTag?.name ?? 'Not Found';
            this.load.set(false);
            setTimeout(() => {
                this.load.set(true);
                setTimeout(() => {
                    this.hide.set(true);
                }, 1000);
            }, 100 * (this.title.length + 1));
        });
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
