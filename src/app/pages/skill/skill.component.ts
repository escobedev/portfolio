import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CertBoxComponent } from "../../shared/components/cert-box/cert-box.component";
import { ProjectBoxComponent } from "../../shared/components/project-box/project-box.component";
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
    imports: [
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule,
        CertBoxComponent,
        ProjectBoxComponent,
        TypingTextComponent,
    ],
    templateUrl: './skill.component.html',
    styleUrl: './skill.component.scss'
})
export class SkillComponent {
    private readonly router = inject(Router);
    private readonly db = inject(FirestoreService);

    protected title: string = '';
    protected path: string = '';
    protected selection: string = '';
    
    protected readonly allTags = signal<Tag[]>([]);
    protected readonly allSSTags = signal<SoftSkillTag[]>([]);
    protected readonly allEntities = signal<Entity[]>([]);
    protected readonly allCompanies = signal<Company[]>([]);
    protected readonly tag = signal<Tag | null>(null);
    protected readonly hide = signal(false);
    protected readonly load = signal(false);
    protected readonly relatedCertificates = signal<Certificate[]>([]);
    protected readonly relatedAchievements = signal<Achievement[]>([]);
    protected readonly relatedBadges = signal<Badge[]>([]);
    protected readonly relatedProjects = signal<Project[]>([]);
    protected readonly relatedJobs = signal<Job[]>([]);

    private readonly tagsPaths = computed(() => [
        ...new Set(this.relatedCertificates().flatMap(cert => cert.tags)),
        ...new Set(this.relatedAchievements().flatMap(achievement => achievement.tags)),
        ...new Set(this.relatedBadges().flatMap(badge => badge.tags)),
        ...new Set(this.relatedProjects().flatMap(project => project.tags)),
        ...new Set(this.relatedJobs().flatMap(job => job.hardSkills)),
    ]);
    private readonly ssTagsPaths = computed(() => [
        ...new Set(this.relatedCertificates().flatMap(cert => cert.tags)),
        ...new Set(this.relatedAchievements().flatMap(achievement => achievement.tags)),
        ...new Set(this.relatedBadges().flatMap(badge => badge.tags)),
        ...new Set(this.relatedProjects().flatMap(project => project.tags)),
        ...new Set(this.relatedJobs().flatMap(job => job.softSkills)),
    ]);
    private readonly entitiesPaths = computed(() => [
        ...new Set(this.relatedCertificates().flatMap(cert => cert.issuer)),
        ...new Set(this.relatedAchievements().flatMap(achievement => achievement.issuer)),
        ...new Set(this.relatedBadges().flatMap(badge => badge.issuer)),
    ]);

    constructor(private readonly route: ActivatedRoute) {
        this.tagsEffect();
        this.ssTagsEffect();
        this.entitiesEffect();
        this.companiesEffect();
        this.tagEffect();
    }

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
            this.loadRelatedAchievements();
            this.loadRelatedBadges();
            this.loadRelatedProjects();
            this.loadRelatedJobs();
        });
    }

    private loadRelatedCertificates() {
        this.db.getDataWithCache<Certificate[]>(
            'certs_orderby_date_desc',
            () => this.db.queryData(
                'certs',
                this.db.orderByConstraint('date', 'desc')
            )
        ).subscribe(certs => this.relatedCertificates.set(certs?.filter(cert => cert.tags.includes(this.path)) ?? []));
    }

    private loadRelatedAchievements() {
        this.db.getDataWithCache<Achievement[]>(
            'achievements_orderby_date_desc',
            () => this.db.queryData(
                'achievements',
                // this.db.orderByConstraint('date', 'desc')
            )
        ).subscribe(achievements => this.relatedAchievements.set(achievements?.filter(achievement => achievement.tags.includes(this.path)) ?? []));
    }

    private loadRelatedBadges() {
        this.db.getDataWithCache<Badge[]>(
            'badges_orderby_date_desc',
            () => this.db.queryData(
                'badges',
                // this.db.orderByConstraint('date', 'desc')
            )
        ).subscribe(badges => this.relatedBadges.set(badges?.filter(badge => badge.tags.includes(this.path)) ?? []));
    }

    private loadRelatedProjects() {
        this.db.getDataWithCache<Project[]>(
            'projects',
            () => this.db.loadCollection('projects')
        ).subscribe(projects => this.relatedProjects.set(projects?.filter(project => project.tags.includes(this.path)) ?? []));
    }

    private loadRelatedJobs() {
        this.db.getDataWithCache<Job[]>(
            'jobs_orderby_enddate_desc',
            () => this.db.queryData(
                'jobs',
                // this.db.orderByConstraint('endDate', 'desc')
            )
        ).subscribe(jobs => this.relatedJobs.set(jobs?.filter(job => job.hardSkills.includes(this.path)) ?? []));
    }

    private tagsEffect() {
        effect(() => {
            const sub = this.db.getDataWithCache<Tag[]>(
                'tags',
                () => this.db.loadCollection('tags')
            ).subscribe(tags => this.allTags.set(tags?.filter(tag => this.tagsPaths().includes(tag.path)) ?? []));
            return () => sub.unsubscribe();
        });
    }

    private ssTagsEffect() {
        effect(() => {
            const sub = this.db.getDataWithCache<SoftSkillTag[]>(
                'sstags',
                () => this.db.loadCollection('soft-skill-tags')
            ).subscribe(sstags => this.allSSTags.set(sstags?.filter(sstag => this.ssTagsPaths().includes(sstag.path)) ?? []));
            return () => sub.unsubscribe();
        });
    }

    private entitiesEffect() {
        effect(() => {
            const sub = this.db.getDataWithCache<Entity[]>(
                'entities',
                () => this.db.loadCollection('entities')
            ).subscribe(entities => this.allEntities.set(entities?.filter(entity => this.entitiesPaths().includes(entity.path)) ?? []));
            return () => sub.unsubscribe();
        });
    }

    private companiesEffect() {
        effect(() => {
            const companiesPaths = [ ...new Set(this.relatedJobs().flatMap(job => job.hardSkills)), ];
            const sub = this.db.getDataWithCache<Company[]>(
                'companies',
                () => this.db.loadCollection('companies')
            ).subscribe(companies => this.allCompanies.set(companies?.filter(company => companiesPaths.includes(company.path)) ?? []));
            return () => sub.unsubscribe();
        });
    }

    private tagEffect() {
        effect(() => {
            if (this.allTags().length > 0) {
                const currentTag = this.allTags()?.find(tag => tag.path === this.path);
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
            }
        });
    }

    protected getTags(tagsPaths: string[]) {
        return this.allTags().filter((tag) => tagsPaths.includes(tag.path));
    }

    protected getSSTags(tagsPaths: string[]) {
        return this.allSSTags().filter((tag) => tagsPaths.includes(tag.path));
    }

    protected getEntity(entityPath: string) {
        return this.allEntities().find((entity) => entityPath === entity.path) ?? new Entity('Unknown', '', '', '');
    }

    protected getCompany(companyPath: string) {
        return this.allCompanies().find((company) => companyPath === company.path) ?? new Company('Unknown', '', '', '',new Place('Unknown'), '');
    }

    protected scrollUp() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
