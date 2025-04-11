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
  headerId: string = '';
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

  actualizarHeader() {
    if (confirm('¿Deseas actualizar los datos del encabezado?')) {
      this.headerService.updateHeader(this.headerId, this.myHeader).then(() => {
        alert('¡Header actualizado!');
      });
    }
  }
  
  editarHeader(headerObj: header): void {
    if (confirm('¿Seguro que deseas editar este registro?')) {
      this.myHeader = { ...headerObj };
      this.selectedHeaderId = headerObj.id!;
      this.btntxt = 'Actualizar';
    }
  }
  
  
  deleteHeader(id?: string) {
    if (!id) return;
    if (confirm('¿Seguro que deseas eliminar este header?')) {
      this.headerService.deleteHeader(id).then(() => {
        console.log('Header eliminado correctamente');
      });
    }
  }  
}
