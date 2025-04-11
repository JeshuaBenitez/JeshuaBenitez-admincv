import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Skill } from '../../app/models/skills/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private dbPath = '/Skills';
  skillsRef: AngularFirestoreCollection<Skill>;

  constructor(private db: AngularFirestore) {
    this.skillsRef = db.collection(this.dbPath);
  }

  getSkills(): AngularFirestoreCollection<Skill> {
    return this.skillsRef;
  }

  createSkill(skill: Skill): any {
    return this.skillsRef.add({ ...skill });
  }

  updateSkill(id: string, skill: Skill): Promise<void> {
    return this.skillsRef.doc(id).update(skill);
  }

  deleteSkill(id?: string): Promise<void> {
    return this.skillsRef.doc(id).delete();
  }
}
