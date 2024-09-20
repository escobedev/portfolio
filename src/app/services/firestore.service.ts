import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  docData,
  collection,
  collectionData,
  orderBy,
  limit,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private readonly collectionsWithDate = [
    'certs',
    'achievements',
    'badges',
    'jobs'
  ];

  constructor(private firestore: Firestore) { }

  loadSkill = (path: string) => {
    const query = doc(this.firestore, 'skills', path);
    return docData(query);
  }

  /**
   * Loads a document from the database.
   * @param path The path of the document to load from the database, including the collection name and document name. "{collection}/{document}"
   * @returns The document data as an observable.
   */
  loadDoc = (collection: string, path: string) => {
    const query = doc(this.firestore, collection, path);
    return docData(query);
  }

  /**
   * Loads a collection from the database.
   * @param col The collection to load from the database.
   * @param lim The number of documents to load.
   * @returns The collection data as an observable.
   */
  loadCollection = (col: string, lim: number | null = null) => {
    let queryConstraints: any = [];
    if (this.collectionsWithDate.includes(col))
      queryConstraints.push(orderBy('date', 'desc'));
    if (lim !== null)
      queryConstraints.push(limit(lim));
    const q = query(
      collection(this.firestore, col),
      ...queryConstraints
    );
    return collectionData(q);
  }

  /**
   * Queries a collection from the database.
   * @param col The collection to query.
   * @param field The field to query.
   * @param value The value to query.
   * @returns The collection data as an observable.
   */
  queryCollection = (col: string, field: string, value: string) => {
    let queryConstraints: any = [ where(field, '==', value) ];
    if (this.collectionsWithDate.includes(col))
      queryConstraints.push(orderBy('date', 'desc'));
    const q = query(
      collection(this.firestore, col),
      ...queryConstraints
    );
    return collectionData(q);
  }

  /**
   * Queries a collection from the database for those that contains a tag.
   * @param col The collection to query.
   * @param tag Thr tag to query.
   * @returns Thr collection data as an observable.
   */
  queryCollectionByTag = (col: string, tag: string) => {
    let queryConstraints: any = [ where('tags', 'array-contains', tag) ];
    if (this.collectionsWithDate.includes(col))
      queryConstraints.push(orderBy('date', 'desc'));
    const q = query(
      collection(this.firestore, col),
      ...queryConstraints
    );
    return collectionData(q);
  }

  /**
   * Queries a collection from the database for those that contains a tag.
   * @param col The collection to query.
   * @param tags The tags to query.
   * @param field The field to query.
   * @param array The array to query.
   * @returns Thr collection data as an observable.
   */
  queryCollectionByTags = (col: string, tags: string[], field: string | null = null, array: string[] | null = null) => {
    let queryConstraints: any = [];
    if (tags.length > 0)
      queryConstraints.push(where('tags', 'array-contains-any', tags));
    if (field !== null && array !== null && array.length > 0)
      queryConstraints.push(where(field, 'in', array));
    if (this.collectionsWithDate.includes(col))
      queryConstraints.push(orderBy('date', 'desc'));
    const q = query(
      collection(this.firestore, col),
      ...queryConstraints
    );
    return collectionData(q);
  }
}
