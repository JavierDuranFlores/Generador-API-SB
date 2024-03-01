import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttributosForaneosComponent } from './generate/components/attributos-foraneos/attributos-foraneos.component';


export interface AtributosForaneos {
  typePK: string;
  namePK: string;
  namePKBD: string;
  cardinality: string;
}


let ELEMENT_DATA_FORANEOS: AtributosForaneos[] = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'generate-api-rest-front';


  dataSourceForaneos!:  MatTableDataSource<any>;
  displayedColumnsForaneos: string[] = ['typePK', 'namePK', 'namePKBD', 'cardinality'];


  typePkForaneos!: string;
  namePKForaneos!: string;
  namePKBDForaneos!: string;
  cardinality!: string;

  @ViewChild(MatPaginator) paginatorForaneos!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(public dialog: MatDialog) {
  }

  openDialogForaneos(): void {
    const dialogRef = this.dialog.open(AttributosForaneosComponent, {
      data: { typePk: this.typePkForaneos, namePK: this.namePKForaneos, namePKBD: this.namePKBDForaneos, cardinality: this.cardinality }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.typePkForaneos = result.typePK;
      this.namePKForaneos = result.namePK;
      this.namePKBDForaneos = result.namePKBD;
      this.cardinality = result.cardinality
      this.insertarForaneos()

    });
  }

  insertarForaneos(): void {
    ELEMENT_DATA_FORANEOS.push({ namePK: this.namePKForaneos, typePK: this.typePkForaneos, namePKBD: this.namePKBDForaneos, cardinality: this.cardinality })
    this.dataSourceForaneos = new MatTableDataSource<AtributosForaneos>(ELEMENT_DATA_FORANEOS);
    this.dataSourceForaneos.sort = this.sort;
    this.dataSourceForaneos.paginator = this.paginatorForaneos;
  }
}
