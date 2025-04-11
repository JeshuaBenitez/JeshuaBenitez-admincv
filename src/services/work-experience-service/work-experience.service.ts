import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { workexperience } from '../../app/models/work-experience/work-experience.model';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  private dbPath = '/work-experience';
  workExperienceRef: AngularFirestoreCollection<workexperience>;

  constructor(private db: AngularFirestore){
    this.workExperienceRef = db.collection(this.dbPath);
  }

  getWorkExperience(): AngularFirestoreCollection<workexperience>{
    return this.workExperienceRef;
  }

  createWorkExperience(myJob: workexperience): any {
    return this.workExperienceRef.add({ ...myJob});
  }

  deleteWorkExperience(id?: string): Promise<void> {
    return this.workExperienceRef.doc(id).delete();
  }

  updateWorkExperience(id: string, data: workexperience): Promise<void> {
    return this.workExperienceRef.doc(id).update(data);
  }  
}
