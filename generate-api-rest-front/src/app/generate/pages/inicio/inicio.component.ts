import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClassModel } from '../../interfaces/classModel';
import { AttributeModel } from '../../interfaces/attributeModel';
import { AttributeNormalModel } from '../../interfaces/attributeNormalModels';
import { AttributeFKModel } from '../../interfaces/attributeFKModels';
import { TablaNormalComponent } from '../../components/tabla-normal/tabla-normal.component';
import { TablaForaneosComponent } from '../../components/tabla-foraneos/tabla-foraneos.component';
import { ApiService } from 'src/app/service/api.service';
import { EntityComponent } from '../../components/entity/entity.component';
import { MatDialog } from '@angular/material/dialog';
import { RepositoryComponent } from '../../components/repository/repository.component';
import { ServComponent } from '../../components/serv/serv.component';
import { ServImplComponent } from '../../components/serv-impl/serv-impl.component';
import { ControladorComponent } from '../../components/controlador/controlador.component';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { DialogErrorComponent } from '../../components/dialog-error/dialog-error.component';
import { Console } from 'console';

export interface Atributos {
  typePK: string;
  namePK: string;
  namePKBD: string;
}

let ELEMENT_DATA_NORMALES: Atributos[] = [];

export interface AtributosForaneos {
  typePK: string;
  namePK: string;
  namePKBD: string;
  cardinality: string;
}

let ELEMENT_DATA_FORANEOS: AtributosForaneos[] = [];

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  isVeryNice: boolean = true;

  pn = new FormControl('', [Validators.required]);
  nameClase = new FormControl('', [Validators.required]);
  nameTable = new FormControl('', [Validators.required]);
  typePK = new FormControl('', [Validators.required]);
  namePK = new FormControl('', [Validators.required]);
  isSerial = new FormControl('', [Validators.required]);
  nameColumnDB = new FormControl('', [Validators.required]);

  constructor(private api: ApiService, public dialog: MatDialog) { 
    
  }

  onSubmit() {
    // Aquí maneja la lógica del envío del formulario
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        'submit',
        function (event: any) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        },
        false
      );
    });
  }

  @ViewChild(TablaNormalComponent) childComponent!: TablaNormalComponent; // Referencia al componente hijo

  @ViewChild(TablaForaneosComponent)
  tablaForaneosComponent!: TablaForaneosComponent; // Referencia al componente hijo

  attributeNormalModel: AttributeNormalModel[] = [
    
  ];

  attributeFKModel: AttributeFKModel[] = [
  ];

  attributeModel: AttributeModel = {
    typePK: 'int',
    namePK: 'idAlumno',
    isSerial: false,
    nameColumnDB: 'id_alumno',
    attributeNormalModels: this.attributeNormalModel,
    attributeFKModels: this.attributeFKModel,
  };

  body: ClassModel = {
    packageName: 'mx.unach',
    nameClase: 'Alumno',
    nameTable: 'alumnos',
    attributeModel: this.attributeModel,
  };

  receivedAttributeFromChild: Atributos[] | undefined;

  getErrorMessage() {
    return 'Atributo Requerido';
  }

  isSerialValid = true;

  onInputBlur() {
    if (this.attributeModel.typePK=='int' ||
        this.attributeModel.typePK=='Integer' ||
        this.attributeModel.typePK=='long' ||
        this.attributeModel.typePK=='Long') {
          this.isSerialValid = false;
    } else {
      this.isSerialValid = true;
      this.attributeModel.isSerial = false;
    }
  }

  receiveAttribute(attribute: AttributeNormalModel[]) {
    console.log('AttributeNormalModel: ',attribute)
    this.body.attributeModel!.attributeNormalModels = attribute;
  }

  receiveAttributeFK(attribute: AttributeFKModel[]) {
    console.log('AttributeFKModel: ', attribute)
    this.body.attributeModel!.attributeFKModels = attribute;
  }

  disabled: boolean = true

  async generar() {
    this.childComponent.sendAttribute();
    this.tablaForaneosComponent.sendAttribute();
    if (this.body.packageName!=null && this.body.nameClase!=null &&
        this.body.nameTable!=null && this.body.attributeModel?.typePK!=null &&
        this.body.attributeModel.namePK!=null &&
        this.body.attributeModel.nameColumnDB!=null && this.body.attributeModel.attributeNormalModels?.length!>0) {
          
      localStorage.clear();


      if (this.body.attributeModel.attributeFKModels?.length!>0) {

        for (let i = 0; i < this.attributeModel.attributeFKModels!.length; i++) {
          switch(this.attributeModel.attributeFKModels![i].relacion) {
            case '1 A 1':
              this.attributeModel.attributeFKModels![i].relacion = 'UNO_A_UNO';
              break;
            case '1 A N':
              this.attributeModel.attributeFKModels![i].relacion = 'UNO_A_MUCHOS';
              break;
            case 'N A 1':
              this.attributeModel.attributeFKModels![i].relacion = 'MUCHOS_A_UNO';
              break;
            case 'N A M':
              this.attributeModel.attributeFKModels![i].relacion = 'MUCHOS_A_MUCHOS';
              break;
          }
        }
      }
      
      console.log(JSON.stringify(this.body))
      
      await this.api.getEntity(this.body);
      await this.api.getRepository(this.body);
      await this.api.getService(this.body);
      await this.api.getServiceImpl(this.body);
      await this.api.getController(this.body);

      this.disabled = false;

    } else  {
      localStorage.clear();
      this.disabled = true
      this.openDialogError()
    }

  }

  openDialogEntity(): void {
    const dialogRef = this.dialog.open(EntityComponent, {
      disableClose: true,
      backdropClass: 'bg-color'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openDialogRepository(): void {
    const dialogRef = this.dialog.open(RepositoryComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openDialogService(): void {
    const dialogRef = this.dialog.open(ServComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openDialogServiceImpl(): void {
    const dialogRef = this.dialog.open(ServImplComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openDialogController(): void {
    const dialogRef = this.dialog.open(ControladorComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }


  openDialogError() {
    this.dialog.open(DialogErrorComponent);
  }

}

/*
this.body.attributeModel.attributeNormalModels![0].typeNormal !=null &&
        this.body.attributeModel.attributeNormalModels![0].nameNormal !=null &&
        this.body.attributeModel.attributeNormalModels![0].nameColumnDB !=null &&
        this.body.attributeModel.attributeFKModels![0].typeFK!=null &&
        this.body.attributeModel.attributeFKModels![0].nameFK!=null &&
        this.body.attributeModel.attributeFKModels![0].cardinality!=null &&
        this.body.attributeModel.attributeFKModels![0].nameColumnDB!=null
*/

// Example starter JavaScript for disabling form submissions if there are invalid fields
