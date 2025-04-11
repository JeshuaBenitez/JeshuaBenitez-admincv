import { Component, OnInit } from '@angular/core';
import { workexperience } from '../models/work-experience/work-experience.model';
import { WorkExperienceService } from '../../services/work-experience-service/work-experience.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrls: ['./admin-workexperience.component.css']
})
export class AdminWorkexperienceComponent {
  itemCount: number = 0;
  btntxt: string = "Agregar";
  workExperience: workexperience[] = [];
  myWorkExperience: workexperience = new workexperience();
  selectedJobId: string | null = null;

  constructor(public workExperienceService: WorkExperienceService) {
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.workExperience = data;
    });
  }

  AgregarJob() {
    if (this.selectedJobId) {
      // Si hay un selectedJobId, entonces es una actualización
      this.workExperienceService.updateWorkExperience(this.selectedJobId, this.myWorkExperience)
        .then(() => {
          console.log('Registro actualizado exitosamente');
          this.resetForm(); // Resetea el formulario después de la actualización
        })
        .catch(err => console.log('Error al actualizar el trabajo:', err));
    } else {
      // Si no hay selectedJobId, entonces es una creación
      this.workExperienceService.createWorkExperience(this.myWorkExperience)
        .then(() => {
          console.log('Trabajo creado exitosamente');
          this.resetForm(); // Resetea el formulario después de la creación
        })
        .catch((err: any) => console.log('Error al agregar el trabajo:', err));
    }
  }
  

  EditarJob(job: workexperience) {
    if (confirm(`¿Estás seguro de que quieres editar este trabajo de ${job.company}?`)) {
      if (job.id) {
        this.myWorkExperience = { ...job }; // Copiar todo el objeto
        this.selectedJobId = job.id; // Asignar el id correctamente
        this.btntxt = "Actualizar"; // Cambiar el texto del botón
      } else {
        console.error('El trabajo seleccionado no tiene un id.');
      }
    }
  }
  

  deleteJob(id?: string) {
    if (!id) return;
    if (confirm('¿Seguro que deseas eliminar este registro? Esta acción no se puede deshacer.')) {
      this.workExperienceService.deleteWorkExperience(id).then(() => {
        alert('Trabajo eliminado correctamente');
      });
    }
  }

  resetForm() {
    this.myWorkExperience = new workexperience();
    this.selectedJobId = null;
    this.btntxt = "Agregar";
  }
}

