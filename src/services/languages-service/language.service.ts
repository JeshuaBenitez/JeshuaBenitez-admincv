import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Language } from '../../app/models/languages/languages.model';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private dbPath = '/Languages';
  languagesRef: AngularFirestoreCollection<Language>;

  constructor(private db: AngularFirestore) {
    this.languagesRef = db.collection(this.dbPath);
  }

  getLanguages(): AngularFirestoreCollection<Language> {
    return this.languagesRef;
  }

  createLanguage(lang: Language): any {
    return this.languagesRef.add({ ...lang });
  }

  updateLanguage(id: string, lang: Language): Promise<void> {
    return this.languagesRef.doc(id).update(lang);
  }

  deleteLanguage(id?: string): Promise<void> {
    return this.languagesRef.doc(id).delete();
  }
}
