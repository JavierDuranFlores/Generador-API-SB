import {Component, Inject} from '@angular/core';
import { InicioComponent } from '../../pages/inicio/inicio.component';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog'
import {FormControl, Validators} from '@angular/forms';

export interface DialogData {
  tipo: string;
  nombre: string;
  columna: string;
  relacion: string
}

@Component({
  selector: 'app-attributos-foraneos',
  templateUrl: './attributos-foraneos.component.html',
  styleUrls: ['./attributos-foraneos.component.css'],
  /*standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, FormsModule, MatSelectModule, MatInputModule, ReactiveFormsModule]*/
})
export class AttributosForaneosComponent {

  tipo = new FormControl('', [Validators.required]);
  nombre = new FormControl('', [Validators.required]);
  columna = new FormControl('', [Validators.required]);
  relacion = new FormControl('', [Validators.required]);

  is1a1: boolean = false
  is1aN: boolean = false
  isNa1: boolean = false
  isNaM: boolean = false

  titulo: string = ''
  constructor(
    public dialogRef: MatDialogRef<InicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.titulo = data.titulo
    switch(data.relacion) {
      case '1A1':
        this.is1a1=true;
        break;
      case '1AN':
        this.is1aN=true;
        break;
      case 'NA1':
        this.isNa1=true;
        break;
      case 'NAM':
        this.isNaM=true;
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessage() {
      return 'Atributo Requerido';
  }


}
