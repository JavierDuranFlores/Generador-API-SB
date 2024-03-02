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

  constructor(private api: ApiService, public dialog: MatDialog) { }

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
    {
      typeNormal: '',
      nameNormal: '',
      nameColumnDB: '',
    },
  ];

  attributeFKModel: AttributeFKModel[] = [
    {
      typeFK: '',
      nameFK: '',
      cardinality: '',
      nameColumnDB: '',
    },
  ];

  attributeModel: AttributeModel = {
    typePK: '',
    namePK: '',
    isSerial: true,
    nameColumnDB: '',
    attributeNormalModels: this.attributeNormalModel,
    attributeFKModels: this.attributeFKModel,
  };

  body: ClassModel = {
    packageName: '',
    nameClase: '',
    nameTable: '',
    attributeModel: this.attributeModel,
  };

  receivedAttributeFromChild: Atributos[] | undefined;

  getErrorMessage() {
    return 'Atributo Requerido';
  }

  receiveAttribute(attribute: AttributeNormalModel[]) {
    this.body.attributeModel!.attributeNormalModels = attribute;
  }

  receiveAttributeFK(attribute: AttributeFKModel[]) {
    this.body.attributeModel!.attributeFKModels = attribute;
  }

  async generar() {
    localStorage.clear();
    this.childComponent.sendAttribute();
    this.tablaForaneosComponent.sendAttribute();
    await this.api.getEntity(this.body);
    await this.api.getRepository(this.body);
    await this.api.getService(this.body);
    await this.api.getServiceImpl(this.body);
    await this.api.getController(this.body);
    console.log(this.api.entity);
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
    const dialogRef = this.dialog.open(RepositoryComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openDialogService(): void {
    const dialogRef = this.dialog.open(ServComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openDialogServiceImpl(): void {
    const dialogRef = this.dialog.open(ServImplComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openDialogController(): void {
    const dialogRef = this.dialog.open(ControladorComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
