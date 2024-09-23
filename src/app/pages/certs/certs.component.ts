import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { CertBoxComponent } from "../../components/cert-box/cert-box.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { TypingTextComponent } from "../../layout/typing-text/typing-text.component";
import { FirestoreService } from '../../services/firestore.service';
import { Certificate } from '../../utils/certificate';
import { Entity } from '../../utils/entity';
import { Tag } from '../../utils/tag';

@Component({
  selector: 'app-certs',
  standalone: true,
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    CertBoxComponent,
    FooterComponent,
    TypingTextComponent,
],
  templateUrl: './certs.component.html',
  styleUrl: './certs.component.scss'
})
export class CertsComponent {
  protected readonly title: string = 'Certificates';
  protected readonly dataLoaded = signal(false);
  protected readonly hide = signal(false);
  protected readonly load = signal(false);
  protected readonly certs = signal<Certificate[]>([]);
  protected readonly allCerts: Certificate[] = [];
  protected readonly allTags: Tag[] = [];
  protected readonly allEntities: Entity[] = [];
  protected selectedTags: string[] = [];
  protected selectedEntities: string[] = [];

  constructor(private readonly db: FirestoreService) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.load.set(true);
      setTimeout(() => {
        this.hide.set(true);
      }, 1000);
    }, 100 * (this.title.length + 1));
    this.loadCertificates();
  }

  private loadCertificates() {
    this.db
    .loadCollection('certs')
    .subscribe((certs: Certificate[]) => {
      this.allCerts.push(...certs);
      this.certs.set(certs);
      this.loadTags();
    });
  }

  private loadTags() {
    const tagsPaths = [
      ...new Set(this.certs().flatMap((cert) => cert.tags))
    ];
    this.db
      .queryData(
        'tags',
        this.db.whereConstraint('path', 'in', tagsPaths)
      )
      .subscribe((tags: Tag[]) => {
        this.allTags.push(...tags);
        this.loadEntities();
      });
  }

  private loadEntities() {
    const enititiesPaths = [
      ...new Set(this.certs().flatMap((cert) => cert.issuer))
    ];
    this.db
      .queryData(
        'entities',
        this.db.whereConstraint('path', 'in', enititiesPaths)
      )
      .subscribe((entities: Entity[]) => {
        this.allEntities.push(...entities);
        this.dataLoaded.set(true);
      });
  }

  protected toggleTag(tag: Tag) {
    if (!this.selectedTags.includes(tag.path))
      this.selectedTags.push(tag.path);
    else
      this.selectedTags.splice(this.selectedTags.indexOf(tag.path), 1);
    this.queryFilteredSelection();
  }

  protected toggleEntity(entity: Entity) {
    if (!this.selectedEntities.includes(entity.path))
      this.selectedEntities.push(entity.path);
    else
      this.selectedEntities.splice(this.selectedEntities.indexOf(entity.path), 1);
    this.queryFilteredSelection();
  }

  private queryFilteredSelection() {
    this.certs.set([]);
    setTimeout(() => {
      if (this.selectedEntities.length > 0 || this.selectedTags.length > 0)
        this.certs.set(
          this.allCerts.filter(cert => this.selectedEntities.includes(cert.issuer) || this.selectedTags.some(tag => cert.tags.includes(tag)))
        );
      else this.certs.set(this.allCerts);
    });
  }

  protected getTags(tagsPaths: string[]) {
    return this.allTags.filter(tag => tagsPaths.includes(tag.path));
  }

  protected getEntity(entityPath: string) {
    return this.allEntities.find(entity => entityPath === entity.path) ?? new Entity('Unknown', '', '', '');
  }

  protected scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
