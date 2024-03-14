import { Component, Inject, OnInit } from '@angular/core';
import { InicioComponent } from '../../pages/inicio/inicio.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../attributos-foraneos/attributos-foraneos.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogCopyComponent } from '../dialog-copy/dialog-copy.component';

@Component({
  selector: 'app-serv',
  templateUrl: './serv.component.html',
  styleUrls: ['./serv.component.css']
})
export class ServComponent implements OnInit {
  service: String = ``

  ngOnInit(): void {
    
  }

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<InicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.service = formatearTexto(localStorage.getItem('service')!)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar() {
    this.snackBar.openFromComponent(DialogCopyComponent, {
      duration: 3 * 1000,
    });
  }


  copiarTexto() {
    // Seleccionar el elemento <pre> con la clase 'java'
    const elementoPre = document.querySelector('pre.java') as HTMLPreElement;
    
    if (elementoPre) {
      // Crear un elemento de texto temporal
      const elementoTemporal = document.createElement('textarea');
      elementoTemporal.value = elementoPre.textContent || '';
  
      // Ocultar el elemento temporal
      elementoTemporal.style.position = 'fixed';
      elementoTemporal.style.opacity = '0';
      document.body.appendChild(elementoTemporal);
  
      // Seleccionar el texto dentro del elemento temporal
      elementoTemporal.select();
      elementoTemporal.setSelectionRange(0, 99999); // Para dispositivos móviles
  
      // Copiar el texto seleccionado al portapapeles
      document.execCommand('copy');
  
      // Eliminar el elemento temporal
      document.body.removeChild(elementoTemporal);
  
      // Notificar al usuario que el texto ha sido copiado
      this.openSnackBar()
    } else {
    }
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