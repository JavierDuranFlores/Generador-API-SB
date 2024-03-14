import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AttributosNormalesComponent } from '../attributos-normales/attributos-normales.component';
import { MatDialog } from '@angular/material/dialog';
import { AttributeNormalModel } from '../../interfaces/attributeNormalModels';

export interface Atributos {
  typePK: string;
  namePK: string;
  namePKBD: string;
}

let ELEMENT_DATA_NORMALES: AttributeNormalModel[] = [
  {
    tipo: 'String',
    nombre: 'nombre',
    columna: 'nombre'
  },
  {
    tipo: 'int',
    nombre: 'edad',
    columna: 'edad'
  }
];


@Component({
  selector: 'app-tabla-normal',
  templateUrl: './tabla-normal.component.html',
  styleUrls: ['./tabla-normal.component.css'],
  /*standalone: true,
  imports: [MatPaginatorModule, MatTableModule, SharedModule]*/
})
export class TablaNormalComponent {

  @Output() sendAttributeToParent: EventEmitter<AttributeNormalModel[]> = new EventEmitter<AttributeNormalModel[]>();

  attributeNormalModel: AttributeNormalModel = {
    tipo: '',
    nombre: '',
    columna: ''
  }


  displayedColumns: string[] = ['tipo', 'nombre', 'columna', 'accion'];

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<AttributeNormalModel>(ELEMENT_DATA_NORMALES);
  }

  dataSource!: MatTableDataSource<AttributeNormalModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  openDialog(): void {

    const dialogRef = this.dialog.open(AttributosNormalesComponent, {
      data: { tipo: this.attributeNormalModel.tipo, nombre: this.attributeNormalModel.nombre, columna: this.attributeNormalModel.columna },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result!=null) {
        this.attributeNormalModel.tipo = result.tipo;
        this.attributeNormalModel.nombre = result.nombre;
        this.attributeNormalModel.columna = result.columna;
        this.insertar()
        
      }


    });
  }

  insertar(): void {
    ELEMENT_DATA_NORMALES.push({ tipo: this.attributeNormalModel.tipo, nombre: this.attributeNormalModel.nombre, columna: this.attributeNormalModel.columna })
    this.dataSource = new MatTableDataSource<AttributeNormalModel>(ELEMENT_DATA_NORMALES);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  sendAttribute() {
    console.log(ELEMENT_DATA_NORMALES)
    this.sendAttributeToParent.emit(ELEMENT_DATA_NORMALES);
  }

  eliminar(element: any) {
    if (element!=null) {
      const index = ELEMENT_DATA_NORMALES.indexOf(element);
    if (index !== -1) {
      ELEMENT_DATA_NORMALES.splice(index, 1);
    }
    }
    this.dataSource = new MatTableDataSource<AttributeNormalModel>(ELEMENT_DATA_NORMALES);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  actualizar(element: any) {
    console.log('actualizar: ');
    const index = ELEMENT_DATA_NORMALES.indexOf(element);
    const dialogRef = this.dialog.open(AttributosNormalesComponent, {
      data: { tipo: element.tipo, 
        nombre: element.nombre, 
        columna: element.columna, relacion: element.relacion, titulo: 'ACTUALIZAR' },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      
        if (result!=null) {
          ELEMENT_DATA_NORMALES[index].tipo = result.tipo;
          ELEMENT_DATA_NORMALES[index].nombre = result.nombre;
          ELEMENT_DATA_NORMALES[index].columna = result.columna;
        }
      
    });
  }

}
