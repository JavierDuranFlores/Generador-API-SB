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
  namePK: string;
  namePKBD: string;
  cardinality: string;
}


let ELEMENT_DATA_FORANEOS: AttributeFKModel[] = [];


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
    typeFK:   '',
    nameFK:   '',
    cardinality: '',
    nameColumnDB: ''
  }

  dataSourceForaneos!:  MatTableDataSource<AttributeFKModel>;
  displayedColumnsForaneos: string[] = ['typeFK', 'nameFK', 'nameColumnDB', 'cardinality'];

  @ViewChild(MatPaginator) paginatorForaneos!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(public dialog: MatDialog) {
  }

  openDialogForaneos(): void {
    const dialogRef = this.dialog.open(AttributosForaneosComponent, {
      data: { typeFK: this.attributeFKModel.typeFK, 
        namePK: this.attributeFKModel.nameFK, 
        nameColumnDB: this.attributeFKModel.nameColumnDB, cardinality: this.attributeFKModel.cardinality }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.attributeFKModel.typeFK = result.typePK;
      this.attributeFKModel.nameFK = result.namePK;
      this.attributeFKModel.nameColumnDB = result.namePKBD;
      this.attributeFKModel.cardinality = result.cardinality
      this.insertarForaneos()

    });
  }

  insertarForaneos(): void {
    ELEMENT_DATA_FORANEOS.push({ typeFK: this.attributeFKModel.typeFK, nameFK: this.attributeFKModel.nameFK, nameColumnDB: this.attributeFKModel.nameColumnDB, cardinality: this.attributeFKModel.cardinality })
    this.dataSourceForaneos = new MatTableDataSource<AttributeFKModel>(ELEMENT_DATA_FORANEOS);
    this.dataSourceForaneos.sort = this.sort;
    this.dataSourceForaneos.paginator = this.paginatorForaneos;
  }

  sendAttribute() {
    this.sendAttributeToParent.emit(ELEMENT_DATA_FORANEOS);
  }

}
