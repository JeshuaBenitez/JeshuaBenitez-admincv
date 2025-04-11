import { Component } from '@angular/core';
import { HeaderService } from '../../services/header-service/header.service';
import { header } from '../models/header/header.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  myHeader: header = new header();
  header: header[] = [];
  btntxt: string = 'Agregar';
  selectedHeaderId: string | null = null;

  constructor(private headerService: HeaderService) {
    this.headerService.getHeader().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.header = data;
    });
  }

  onSubmit() {
    if (this.selectedHeaderId) {
      if (window.confirm('¿Deseas actualizar este header?')) {
        this.headerService.updateHeader(this.selectedHeaderId, this.myHeader).then(() => {
          alert('¡Header actualizado!');
          this.resetForm();
        });
      }
    } else {
      if (window.confirm('¿Deseas agregar este header?')) {
        this.headerService.createHeader(this.myHeader).then(() => {
          alert('Header agregado correctamente');
          this.resetForm();
        });
      }
    }
  }

  editarHeader(headerObj: header): void {
    if (window.confirm('¿Seguro que deseas editar este registro?')) {
      this.myHeader = { ...headerObj };
      this.selectedHeaderId = headerObj.id ?? null;
      this.btntxt = 'Actualizar';
    }
  }

  deleteHeader(id?: string) {
    if (id && window.confirm('¿Seguro que deseas eliminar este header?')) {
      this.headerService.deleteHeader(id).then(() => {
        console.log('Header eliminado correctamente');
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.myHeader = new header();
    this.selectedHeaderId = null;
    this.btntxt = 'Agregar';
  }
}

