import { inject, Injectable } from '@angular/core';
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
  QueryConstraint,
  DocumentData,
  DocumentReference,
  Query,
  CollectionReference,
} from '@angular/fire/firestore';
import { Observable, of, tap } from 'rxjs';

const TOKEN_KEY = 'Token';

/**
 * Firestore service.
 * @Injectable
 * @class FirestoreService
 */
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private readonly firestore = inject(Firestore);

  constructor() { }

  /**
   * Gets the cached data from the local storage or the data from the Firestore query.
   * @function getDataWithCache
   * @param cachedDataPath Path of the cached data.
   * @param fireFn Firestore query function.
   * @returns The cached data or the data from the Firestore query.
   */
  public getDataWithCache<T>(cachedDataPath: string, fireFn: () => Observable<T | undefined>) {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) localStorage.setItem(TOKEN_KEY, `token_${Date.now()}`);
    const cachedData = localStorage.getItem(cachedDataPath);
    if (cachedData)
      return of(JSON.parse(cachedData) as T);
    else
      return fireFn().pipe(tap({
        next: data => localStorage.setItem(cachedDataPath, JSON.stringify(data)),
      }));
  }

  /**
   * It creates a query where constraint for the Firestore database.
   * @function whereConstraint
   * @param fieldPath The field to compare.
   * @param opStr The operation to perform.
   * @param value The value to compare to.
   * @returns The where constraint.
   */
  public whereConstraint(
    fieldPath: string,
    opStr: '<' | '<=' | '==' | '!=' | '>=' | '>' | 'in' | 'array-contains' | 'array-contains-any',
    value: any
  ) {
    return where(fieldPath, opStr, value);
  }

  /**
   * It creates a query order-by constraint for the Firestore database.
   * @function orderByConstraint
   * @param fieldPath The field to order by.
   * @param directionStr The direction to order by.
   * @returns The order-by constraint.
   */
  public orderByConstraint(
    fieldPath: string,
    directionStr: 'asc' | 'desc'
  ) {
    return orderBy(fieldPath, directionStr);
  }

  /**
   * It creates a query limit constraint for the Firestore database.
   * @function limitConstraint
   * @param lim The number of documents to limit.
   * @returns The limit constraint.
   */
  public limitConstraint(
    lim: number
  ) {
    return limit(lim);
  }

  /**
   * It loads a document from the database.
   * @function loadDoc
   * @param collectionPath The collection to load from the database.
   * @param docPath The path of the document to load from the database, including the collection name and document name. "{collection}/{document}"
   * @returns The document data as an observable.
   */
  public loadDoc<T>(
    collectionPath: string,
    docPath: string
  ) {
    const docRef = doc(
      this.firestore,
      collectionPath,
      docPath
    ) as DocumentReference<T, DocumentData>;
    return docData<T>(docRef);
  }

  /**
   * It loads a collection from the database.
   * @function loadCollection
   * @param collectionPath The collection to load from the database.
   * @returns The collection data as an observable.
   */
  public loadCollection<T>(
    collectionPath: string
  ) {
    const collectionRef = collection(
      this.firestore,
      collectionPath
    ) as Query<T, DocumentData>;
    return collectionData<T>(collectionRef);
  }

  /**
   * It creates a query for the Firestore database.
   * @function queryData
   * @param collectionPath The path of the collection to query.
   * @param queryConstraints The constraints to apply to the query.
   * @returns The collection data as an observable.
   */
  public queryData<T>(
    collectionPath: string,
    ...queryConstraints: QueryConstraint[]
  ) {
    const collectionRef = collection(
      this.firestore,
      collectionPath
    ) as CollectionReference<T>;
    const queryResult = query(
      collectionRef,
      ...queryConstraints
    );
    return collectionData<T>(queryResult);
  }
}
