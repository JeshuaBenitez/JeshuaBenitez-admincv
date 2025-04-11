import { Component } from '@angular/core';
import { education } from '../models/education/education.model';
import { EducationService } from '../../services/education-service/education.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrls: ['./admin-education.component.css']
})
export class AdminEducationComponent {
  btntxt: string = "Agregar";
  education: education[] = [];
  myEducation: education = new education();
  selectedEduId: string | null = null;

  constructor(public educationService: EducationService) {
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id, ...c.payload.doc.data()
        }))
      )
    ).subscribe(data => {
      this.education = data;
    });
  }

  AgregarEdu() {
    if (this.selectedEduId) {
      if (confirm('¿Estás seguro que quieres editar esta entrada de educación?')) {
        this.educationService.updateEducation(this.selectedEduId, this.myEducation).then(() => {
          console.log('Item actualizado correctamente');
          this.resetForm();
        });
      }
    } else {
      this.educationService.createEducation(this.myEducation).then(() => {
        console.log('Item agregado correctamente');
        this.resetForm();
      });
    }
  }

  deleteEducation(id?: string) {
    if (confirm('¿Estás seguro que deseas eliminar esta entrada?')) {
      this.educationService.deleteEducation(id).then(() => {
        console.log('Item eliminado correctamente');
      });
    }
  }

  EditarEdu(edu: education) {
    this.myEducation = { ...edu };
    this.selectedEduId = edu.id ?? null;
    this.btntxt = "Actualizar";
  }

  resetForm() {
    this.myEducation = new education();
    this.selectedEduId = null;
    this.btntxt = "Agregar";
  }
}
