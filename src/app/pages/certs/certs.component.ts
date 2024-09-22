import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { CertBoxComponent } from "../../components/cert-box/cert-box.component";
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
  protected readonly allTags = signal<Tag[]>([]);
  protected readonly allEntities = signal<Entity[]>([]);
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
    this.reset();
  }

  private reset() {
    this.db
    .loadCollection('certs')
    .subscribe((data: Certificate[]) => {
      this.certs.set(data);
      this.loadTags();
    });
  }

  private loadTags() {
    for (const cert of this.certs()) {
      let tags: Tag[] = [];
      for (const tag of cert.tags)
        this.db
        .loadDoc('tags', tag as string)
        .subscribe((tagData: Tag) => {
          tags.push(tagData);
          this.allTags.update((tags) => {
            if (tags.every(tag => tag.name !== tagData.name)) tags.push(tagData);
            return tags;
          });
        });
      this.certs.update((certs) => {
        const index = certs.findIndex((c) => c.code === cert.code);
        certs[index].tags = tags;
        return certs;
      });
      this.db
      .loadDoc('entities', cert.issuer)
      .subscribe((entityData: Entity) => {
        this.allEntities.update((entities) => {
          if (entities.every(entity => entity.name !== entityData.name)) entities.push(entityData);
          return entities;
        });
        this.dataLoaded.set(true);
      });
    }
  }

  protected toggleTag(tag: Tag) {
    if (!this.selectedTags.includes(tag.path))
      this.selectedTags.push(tag.path);
    else
      this.selectedTags.splice(this.selectedTags.indexOf(tag.path), 1);
    this.loadSelections();
  }

  protected toggleEntity(entity: Entity) {
    if (!this.selectedEntities.includes(entity.path))
      this.selectedEntities.push(entity.path);
    else
      this.selectedEntities.splice(this.selectedEntities.indexOf(entity.path), 1);
    this.loadSelections();
  }

  private loadSelections() {
    this.certs.set([]);
    if (this.selectedEntities.length > 0 || this.selectedTags.length > 0)
      this.db
      .queryCollectionByTags(
        'certs', this.selectedTags,
        'issuer', this.selectedEntities
      )
      .subscribe((data: Certificate[]) => {
        this.certs.set(data);
        this.loadTags();
      });
    else this.reset();
  }

  protected scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
