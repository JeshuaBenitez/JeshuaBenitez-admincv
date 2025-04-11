import { Component } from '@angular/core';
import { Interest } from '../models/interests/interests.model';
import { InterestsService } from '../../services/interests-service/interests.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrls: ['./admin-interests.component.css']
})
export class AdminInterestsComponent {
  interests: Interest[] = [];
  myInterest: Interest = new Interest();
  selectedInterestId: string | null = null;
  btntxt: string = "Agregar";

  constructor(private interestsService: InterestsService) {
    this.interestsService.getInterests().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.interests = data;
    });
  }

  agregarInterest() {
    if (this.selectedInterestId) {
      if (confirm('¿Deseas editar este interés?')) {
        this.interestsService.updateInterest(this.selectedInterestId, this.myInterest).then(() => {
          this.myInterest = new Interest();
          this.btntxt = "Agregar";
          this.selectedInterestId = null;
        });
      }
    } else {
      this.interestsService.createInterest(this.myInterest).then(() => {
        this.myInterest = new Interest();
      });
    }
  }

  editarInterest(interes: Interest) {
    if (confirm('¿Deseas cargar este interés para editar?')) {
      this.myInterest = { ...interes };
      this.selectedInterestId = interes.id!;
      this.btntxt = "Editar";
    }
  }

  deleteInterest(id?: string) {
    if (confirm('¿Deseas eliminar este interés?')) {
      this.interestsService.deleteInterest(id);
    }
  }
}

