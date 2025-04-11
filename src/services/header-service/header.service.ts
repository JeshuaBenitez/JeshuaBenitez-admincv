import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { header } from '../../app/models/header/header.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private dbPath = '/header';
  headerRef: AngularFirestoreCollection<header>

  constructor(private db: AngularFirestore) {
    this.headerRef = db.collection(this.dbPath);
  }

  getHeader(): AngularFirestoreCollection<header> {
    return this.headerRef;
  }

  updateHeader(id: string, data: header): Promise<void> {
    return this.db.collection(this.dbPath).doc(id).update(data);
  }

  deleteHeader(id: string): Promise<void> {
    return this.headerRef.doc(id).delete();
  }  
}

