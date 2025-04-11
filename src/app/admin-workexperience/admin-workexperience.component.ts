import { Component, OnInit } from '@angular/core';
import { workexperience } from '../models/work-experience/work-experience.model';
import { WorkExperienceService } from '../../services/work-experience-service/work-experience.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrls: ['./admin-workexperience.component.css']
})
export class AdminWorkexperienceComponent{
  itemCount: number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  workExperience: workexperience[] = [];
  myWorkExperience: workexperience = new workexperience();
  selectedJobId: string | null = null;

  constructor(public workExperienceService: WorkExperienceService){
    console.log(this.workExperienceService);
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.workExperience = data;
      console.log(this.workExperience);
    });
  }

  AgregarJob() {
    if (this.selectedJobId) {
      this.workExperienceService.updateWorkExperience(this.selectedJobId, this.myWorkExperience).then(() => {
        console.log('Updated item successfully!');
        this.selectedJobId = null;
        this.btntxt = "Agregar";
        this.myWorkExperience = new workexperience();
      });
    } else {
      this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
        console.log('Created new item successfully!');
        this.myWorkExperience = new workexperience();
      });
    }
  }
  
  EditarJob(job: workexperience) {
    const confirmEdit = confirm(`¿Estás seguro de que quieres editar este registro de ${job.company}?`);
    if (confirmEdit) {
      this.myWorkExperience = { ...job };
      this.btntxt = "Actualizar";
    }
  }
  
  deleteJob(id?: string) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.');
    if (confirmDelete && id) {
      this.workExperienceService.deleteWorkExperience(id).then(() => {
        console.log('Registro eliminado correctamente');
      });
    }
  }  
}

