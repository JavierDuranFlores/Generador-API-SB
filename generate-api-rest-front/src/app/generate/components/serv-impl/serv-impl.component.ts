import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InicioComponent } from '../../pages/inicio/inicio.component';
import { DialogData } from '../attributos-foraneos/attributos-foraneos.component';

@Component({
  selector: 'app-serv-impl',
  templateUrl: './serv-impl.component.html',
  styleUrls: ['./serv-impl.component.css']
})
export class ServImplComponent implements OnInit {

  serviceImpl: String = ``

  ngOnInit(): void {
    
  }

  constructor(
    public dialogRef: MatDialogRef<InicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.serviceImpl = formatearTexto(localStorage.getItem('serviceImpl')!)
  }

  onNoClick(): void {
    console.log('Name ',this.data)
    this.dialogRef.close();
  }

}

function formatearTexto(texto: string): string {
  // Reemplazar '\t' por cuatro espacios
  const textoConTabsReemplazados = texto.replace(/\\t/g, '    ');
  // Reemplazar '\n' por una nueva línea
  const textoConNuevasLineasReemplazadas = textoConTabsReemplazados.replace(/\\n/g, '\n');

  const textEliminarSlash = textoConNuevasLineasReemplazadas.replace(/\\/g, '')
  // Devolver el texto formateado
  return textEliminarSlash.slice(1).slice(0, -1);
}