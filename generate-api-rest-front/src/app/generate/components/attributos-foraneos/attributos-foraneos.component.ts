import {Component, Inject} from '@angular/core';
import { InicioComponent } from '../../pages/inicio/inicio.component';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog'
import {FormControl, Validators} from '@angular/forms';

export interface DialogData {
  typePK: string;
  namePK: string;
  namePKBD: string;
  cardinality: string
}

@Component({
  selector: 'app-attributos-foraneos',
  templateUrl: './attributos-foraneos.component.html',
  styleUrls: ['./attributos-foraneos.component.css'],
  /*standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, FormsModule, MatSelectModule, MatInputModule, ReactiveFormsModule]*/
})
export class AttributosForaneosComponent {

  typePK = new FormControl('', [Validators.required]);
  namePK = new FormControl('', [Validators.required]);
  namePKBD = new FormControl('', [Validators.required]);
  cardinality = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<InicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    console.log('Name ',this.data)
    this.dialogRef.close();
  }

  getErrorMessage() {
      return 'Atributo Requerido';
  }


}
