import {Component, Inject} from '@angular/core';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { InicioComponent } from '../../pages/inicio/inicio.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog'
import {FormControl, Validators} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

export interface DialogData {
  typePK: string;
  namePK: string;
  namePKBD: string;
}


@Component({
  selector: 'app-attributos-normales',
  templateUrl: './attributos-normales.component.html',
  /*standalone: true,
  imports: [SharedModule,CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, FormsModule, MatSelectModule, MatInputModule, ReactiveFormsModule]*/
})
export class AttributosNormalesComponent {

  typePK = new FormControl('', [Validators.required]);
  namePK = new FormControl('', [Validators.required]);
  namePKBD = new FormControl('', [Validators.required]);

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
