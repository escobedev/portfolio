import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { CertBoxComponent } from "../../shared/components/cert-box/cert-box.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { TypingTextComponent } from "../../shared/components/typing-text/typing-text.component";
import { FirestoreService } from '../../shared/services/firestore.service';
import { Certificate } from '../../shared/models/certificate';
import { Entity } from '../../shared/models/entity';
import { Tag } from '../../shared/models/tag';
import { PageCommons } from '../../shared/utils/page-commons';

/**
 * Certificates page.
 * @class CertsComponent
 * @extends PageCommons
 */
@Component({
    selector: 'app-certs',
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
export class CertsComponent extends PageCommons {
  protected readonly dataLoaded = signal(false);
  protected readonly certs = signal<Certificate[]>([]);
  protected allCerts: Certificate[] = [];
  protected allTags: Tag[] = [];
  protected allEntities: Entity[] = [];
  protected selectedTags: string[] = [];
  protected selectedEntities: string[] = [];
  
  /**
   * Constructs the Certificates page.
   * @constructor
   * @param db Firestore service.
   */
  constructor(private readonly db: FirestoreService) {
    super('Certificates');
    this.loadCertificates();
  }

  /**
   * Loads the certificates from the database.
   * @function loadCertificates
   */
  private loadCertificates() {
    this.db.getDataWithCache(
      'certs_orderby_date_desc',
      () => this.db.queryData(
        'certs',
        this.db.orderByConstraint('date', 'desc')
      )
    ).subscribe((certs: Certificate[]) => {
      this.allCerts = certs;
      this.certs.set(certs);
      this.loadTags();
    });
  }

  /**
   * Loads the tags from the database.
   * @function loadTags
   */
  private loadTags() {
    const tagsPaths = [
      ...new Set(this.certs().flatMap(cert => cert.tags))
    ];
    this.db.getDataWithCache(
      'tags',
      () => this.db.loadCollection('tags')
    ).subscribe((tags: Tag[]) => {
      this.allTags = tags.filter(tag => tagsPaths.includes(tag.path));
      this.loadEntities();
    });
  }

  /**
   * Loads the entities from the database.
   * @function loadEntities
   */
  private loadEntities() {
    const enititiesPaths = [
      ...new Set(this.certs().flatMap(cert => cert.issuer))
    ];
    this.db.getDataWithCache(
      'entities',
      () => this.db.loadCollection('entities')
    ).subscribe((entities: Entity[]) => {
      this.allEntities = entities.filter(entity => enititiesPaths.includes(entity.path));
      this.dataLoaded.set(true);
    });
  }

  /**
   * Toggles the tag and updates the selected tags.
   * @function toggleTag
   * @param tag Tag to toggle.
   */
  protected toggleTag(tag: Tag) {
    if (!this.selectedTags.includes(tag.path))
      this.selectedTags.push(tag.path);
    else
      this.selectedTags.splice(this.selectedTags.indexOf(tag.path), 1);
    this.filteredSelection();
  }

  /**
   * Toggles the entity and updates the selected entities.
   * @function toggleEntity
   * @param entity Entity to toggle.
   */
  protected toggleEntity(entity: Entity) {
    if (!this.selectedEntities.includes(entity.path))
      this.selectedEntities.push(entity.path);
    else
      this.selectedEntities.splice(this.selectedEntities.indexOf(entity.path), 1);
    this.filteredSelection();
  }

  /**
   * Filters the certificates based on the selected tags and entities.
   * @function filteredSelection
   */
  private filteredSelection() {
    this.certs.set([]);
    setTimeout(() => {
      if (this.selectedEntities.length > 0 || this.selectedTags.length > 0)
        this.certs.set(
          this.allCerts.filter(cert => {
            if (this.selectedEntities.length > 0 && this.selectedTags.length > 0)
              return this.selectedEntities.some(entity => cert.issuer.includes(entity)) && this.selectedTags.some(tag => cert.tags.includes(tag));
            else if (this.selectedTags.length > 0)
              return this.selectedTags.some(tag => cert.tags.includes(tag));
            else if (this.selectedEntities.length > 0)
              return this.selectedEntities.some(entity => cert.issuer.includes(entity));
            else
              return false;
          })
        );
      else this.certs.set(this.allCerts);
    });
  }

  /**
   * Finds the Tags by their given paths.
   * @function getTags
   * @param tagsPaths List of tags' firestore paths.
   * @returns List of Tags.
   */
  protected getTags(tagsPaths: string[]) {
    return this.allTags.filter(tag => tagsPaths.includes(tag.path));
  }

  /**
   * Finds the Entity class by the given path from the list of entities or returns a default 'Unknown' Entity class.
   * @function getEntity
   * @param entityPath Firestore path to the entity.
   * @returns An Entity class.
   */
  protected getEntity(entityPath: string) {
    return this.allEntities.find(entity => entityPath === entity.path) ?? new Entity('Unknown', '', '', '');
  }
}
