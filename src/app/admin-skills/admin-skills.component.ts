import { Component } from '@angular/core';
import { Skill } from '../models/skills/skills.model';
import { SkillsService } from '../../services/skills-service/skills.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css']
})
export class AdminSkillsComponent {
  skills: Skill[] = [];
  mySkill: Skill = new Skill();
  selectedSkillId: string | null = null;
  btntxt: string = "Agregar";

  constructor(private skillsService: SkillsService) {
    this.skillsService.getSkills().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.skills = data;
    });
  }

  agregarSkill() {
    if (this.selectedSkillId) {
      if (confirm('¿Deseas editar esta habilidad?')) {
        this.skillsService.updateSkill(this.selectedSkillId, this.mySkill).then(() => {
          this.mySkill = new Skill();
          this.btntxt = "Agregar";
          this.selectedSkillId = null;
        });
      }
    } else {
      this.skillsService.createSkill(this.mySkill).then(() => {
        this.mySkill = new Skill();
      });
    }
  }

  editarSkill(skill: Skill) {
    if (confirm('¿Deseas cargar esta habilidad para editar?')) {
      this.mySkill = { ...skill };
      this.selectedSkillId = skill.id!;
      this.btntxt = "Editar";
    }
  }

  deleteSkill(id?: string) {
    if (confirm('¿Deseas eliminar esta habilidad?')) {
      this.skillsService.deleteSkill(id);
    }
  }
}

