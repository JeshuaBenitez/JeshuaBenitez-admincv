import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Interest } from '../../app/models/interests/interests.model';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {
  private dbPath = '/Interests';
  interestsRef: AngularFirestoreCollection<Interest>;

  constructor(private db: AngularFirestore) {
    this.interestsRef = db.collection(this.dbPath);
  }

  getInterests(): AngularFirestoreCollection<Interest> {
    return this.interestsRef;
  }

  createInterest(interes: Interest): any {
    return this.interestsRef.add({ ...interes });
  }

  updateInterest(id: string, interes: Interest): Promise<void> {
    return this.interestsRef.doc(id).update(interes);
  }

  deleteInterest(id?: string): Promise<void> {
    return this.interestsRef.doc(id).delete();
  }
}
