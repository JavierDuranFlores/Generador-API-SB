import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AttributosForaneosComponent } from '../attributos-foraneos/attributos-foraneos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AttributeFKModel } from '../../interfaces/attributeFKModels';

export interface AtributosForaneos {
  typePK: string;
  nombre: string;
  namePKBD: string;
  cardinality: string;
}


let ELEMENT_DATA_FORANEOS: AttributeFKModel[] = [
  {
    tipo: "Casa",
    nombre: "idCasa",
    relacion: "1 A 1",
    columna: "id_casa"
  },
  {
    tipo: "Universidad",
    nombre: "idUniversidad",
    relacion: "1 A N",
    columna: "id_universidad"
  },
  {
    tipo: "Profesor",
    nombre: "idProfesor",
    relacion: "N A M",
    columna: "id_profesor"
  }
]


@Component({
  selector: 'app-tabla-foraneos',
  templateUrl: './tabla-foraneos.component.html',
  styleUrls: ['./tabla-foraneos.component.css'],
  
  /*standalone: true,
  imports: [MatPaginatorModule, MatTableModule, SharedModule]*/
})
export class TablaForaneosComponent {

  @Output() sendAttributeToParent: EventEmitter<AttributeFKModel[]> = new EventEmitter<AttributeFKModel[]>();

  attributeFKModel: AttributeFKModel = {
    tipo:   '',
    nombre:   '',
    columna: '',
    relacion: ''
  }

  dataSourceForaneos!:  MatTableDataSource<AttributeFKModel>;
  displayedColumnsForaneos: string[] = ['tipo', 'nombre', 'column', 'relacion', 'accion'];

  @ViewChild(MatPaginator) paginatorForaneos!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(public dialog: MatDialog) {
    this.dataSourceForaneos = new MatTableDataSource<AttributeFKModel>(ELEMENT_DATA_FORANEOS);
    this.dataSourceForaneos.sort = this.sort;
    this.dataSourceForaneos.paginator = this.paginatorForaneos;
  }

  openDialogForaneos(): void {
    const dialogRef = this.dialog.open(AttributosForaneosComponent, {
      data: { tipo: this.attributeFKModel.tipo, 
        nombre: this.attributeFKModel.nombre, 
        columna: this.attributeFKModel.columna, relacion: this.attributeFKModel.relacion, titulo: 'ATRIBUTO SECUNDARIO' },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      
            if (result!=null) {
              this.attributeFKModel.tipo = result.tipo;
            this.attributeFKModel.nombre = result.nombre;
            this.attributeFKModel.columna = result.columna;
            this.attributeFKModel.relacion = result.relacion
            console.log(this.attributeFKModel.relacion)
            this.insertarForaneos()
            }
    });
  }

  insertarForaneos(): void {
    ELEMENT_DATA_FORANEOS.push({ tipo: this.attributeFKModel.tipo, nombre: this.attributeFKModel.nombre, columna: this.attributeFKModel.columna, relacion: this.attributeFKModel.relacion })
    this.dataSourceForaneos = new MatTableDataSource<AttributeFKModel>(ELEMENT_DATA_FORANEOS);
    this.dataSourceForaneos.sort = this.sort;
    this.dataSourceForaneos.paginator = this.paginatorForaneos;
  }

  sendAttribute() {
    this.sendAttributeToParent.emit(ELEMENT_DATA_FORANEOS);
  }

  eliminar(element: any) {
    if (element!=null) {
      const index = ELEMENT_DATA_FORANEOS.indexOf(element);
    if (index !== -1) {
      ELEMENT_DATA_FORANEOS.splice(index, 1);
    }
    }
    this.dataSourceForaneos = new MatTableDataSource<AttributeFKModel>(ELEMENT_DATA_FORANEOS);
    this.dataSourceForaneos.sort = this.sort;
    this.dataSourceForaneos.paginator = this.paginatorForaneos;
  }

  actualizar(element: any) {
    console.log('actualizar: ');
    const index = ELEMENT_DATA_FORANEOS.indexOf(element);
    const dialogRef = this.dialog.open(AttributosForaneosComponent, {
      data: { tipo: element.tipo, 
        nombre: element.nombre, 
        columna: element.columna, relacion: element.relacion, titulo: 'ACTUALIZAR' },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      
        if (result!=null) {
          ELEMENT_DATA_FORANEOS[index].tipo = result.tipo;
          ELEMENT_DATA_FORANEOS[index].nombre = result.nombre;
          ELEMENT_DATA_FORANEOS[index].columna = result.columna;
          ELEMENT_DATA_FORANEOS[index].relacion = result.relacion
        }
      
    });
  }

}
