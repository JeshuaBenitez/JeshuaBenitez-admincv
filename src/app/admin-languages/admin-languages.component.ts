import { Component } from '@angular/core';
import { Language } from '../models/languages/languages.model';
import { LanguagesService } from '../../services/languages-service/language.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.css']
})
export class AdminLanguagesComponent {
  languages: Language[] = [];
  myLanguage: Language = new Language();
  selectedLangId: string | null = null;
  btntxt: string = "Agregar";

  constructor(private languagesService: LanguagesService) {
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.languages = data;
    });
  }

  agregarLanguage() {
    if (this.selectedLangId) {
      if (confirm('¿Deseas editar este idioma?')) {
        this.languagesService.updateLanguage(this.selectedLangId, this.myLanguage).then(() => {
          this.myLanguage = new Language();
          this.btntxt = "Agregar";
          this.selectedLangId = null;
        });
      }
    } else {
      this.languagesService.createLanguage(this.myLanguage).then(() => {
        this.myLanguage = new Language();
      });
    }
  }

  editarLanguage(lang: Language) {
    if (confirm('¿Deseas cargar este idioma para editar?')) {
      this.myLanguage = { ...lang };
      this.selectedLangId = lang.id!;
      this.btntxt = "Editar";
    }
  }

  deleteLanguage(id?: string) {
    if (confirm('¿Deseas eliminar este idioma?')) {
      this.languagesService.deleteLanguage(id);
    }
  }
}
