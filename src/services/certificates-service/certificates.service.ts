import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { certificate } from '../../app/models/certificates/certificates.model';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private dbPath = '/certificates';
  certificatesRef: AngularFirestoreCollection<certificate>;

  constructor(private db: AngularFirestore) {
    this.certificatesRef = db.collection(this.dbPath);
  }

  getCertificates(): AngularFirestoreCollection<certificate> {
    return this.certificatesRef;
  }

  createCertificate(cert: certificate): any {
    return this.certificatesRef.add({ ...cert });
  }

  deleteCertificate(id?: string): Promise<void> {
    return this.certificatesRef.doc(id).delete();
  }

  updateCertificate(id: string, cert: certificate): Promise<void> {
    return this.certificatesRef.doc(id).update(cert);
  }
}
