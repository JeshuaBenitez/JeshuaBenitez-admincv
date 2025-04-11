import { Component } from '@angular/core';
import { certificate } from '../models/certificates/certificates.model';
import { CertificatesService } from '../../services/certificates-service/certificates.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrls: ['./admin-certificates.component.css']
})
export class AdminCertificatesComponent {
  btntxt: string = "Agregar";
  certificates: certificate[] = [];
  myCertificate: certificate = new certificate();
  selectedCertificateId: string | null = null;

  constructor(public certificatesService: CertificatesService) {
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.certificates = data;
    });
  }

  AgregarCertificate() {
    if (this.selectedCertificateId) {
      if (confirm("¿Deseas actualizar este certificado?")) {
        this.certificatesService.updateCertificate(this.selectedCertificateId, this.myCertificate).then(() => {
          this.resetForm();
        });
      }
    } else {
      if (confirm("¿Deseas agregar este certificado?")) {
        this.certificatesService.createCertificate(this.myCertificate).then(() => {
          this.resetForm();
        });
      }
    }
  }

  deleteCertificate(id?: string) {
    if (confirm("¿Seguro que deseas eliminar este certificado?")) {
      this.certificatesService.deleteCertificate(id).then(() => {
        console.log('Certificado eliminado correctamente');
      });
    }
  }

  EditarCertificate(cert: certificate) {
    this.myCertificate = { ...cert };
    this.selectedCertificateId = cert.id ?? null;
    this.btntxt = "Editar";
  }

  resetForm() {
    this.myCertificate = new certificate();
    this.selectedCertificateId = null;
    this.btntxt = "Agregar";
  }
}

