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

let ELEMENT_DATA_NORMALES: AttributeNormalModel[] = [];


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
    typeNormal:   '',
    nameNormal:   '',
    nameColumnDB: ''
  }


  displayedColumns: string[] = ['typeNormal', 'nameNormal', 'nameColumnDB'];

  constructor(public dialog: MatDialog) {
  }

  dataSource!: MatTableDataSource<AttributeNormalModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort1!: MatSort;

  openDialog(): void {

    const dialogRef = this.dialog.open(AttributosNormalesComponent, {
      data: { typeNormal: this.attributeNormalModel.typeNormal, nameNormal: this.attributeNormalModel.nameNormal, nameColumnDB: this.attributeNormalModel.nameColumnDB }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.attributeNormalModel.typeNormal = result.typePK;
      this.attributeNormalModel.nameNormal = result.namePK;
      this.attributeNormalModel.nameColumnDB = result.namePKBD;
      this.insertar()
      console.log(this.dataSource)
      console.log(this.attributeNormalModel.typeNormal)
      console.log(this.attributeNormalModel.nameNormal)
      console.log(this.attributeNormalModel.nameColumnDB)

    });
  }
  
  insertar(): void {
    ELEMENT_DATA_NORMALES.push({ typeNormal: this.attributeNormalModel.typeNormal, nameNormal: this.attributeNormalModel.nameNormal, nameColumnDB: this.attributeNormalModel.nameColumnDB })
    this.dataSource = new MatTableDataSource<AttributeNormalModel>(ELEMENT_DATA_NORMALES);
    this.dataSource.sort = this.sort1;
    this.dataSource.paginator = this.paginator;
  }

  sendAttribute() {
    this.sendAttributeToParent.emit(ELEMENT_DATA_NORMALES);
  }

}
