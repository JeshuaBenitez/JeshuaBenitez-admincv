import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { education } from '../../app/models/education/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private dbPath = '/education';
  educationRef: AngularFirestoreCollection<education>;

  constructor(private db: AngularFirestore){ 
    this.educationRef = db.collection(this.dbPath);
  }

  getEducation(): AngularFirestoreCollection<education>{
    return this.educationRef;
  }

  createEducation(myEdu: education): any {
    return this.educationRef.add({ ...myEdu})
  }

  deleteEducation(id?: string): Promise<void> {
    return this.educationRef.doc(id).delete();
  }

  updateEducation(id: string, data: education): Promise<void> {
    return this.educationRef.doc(id).update(data);
  }
  
}
