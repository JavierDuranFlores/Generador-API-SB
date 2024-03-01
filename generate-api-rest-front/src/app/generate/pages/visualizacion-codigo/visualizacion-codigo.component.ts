import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import * as beautify from 'js-beautify';

@Component({
  selector: 'app-visualizacion-codigo',
  templateUrl: './visualizacion-codigo.component.html',
  styleUrls: ['./visualizacion-codigo.component.css'],
})
export class VisualizacionCodigoComponent {

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  js: any = `const codigoJavaFormateado = prettier.format(codigoJavaSinFormato, {
    parser: 'java',
    plugins: [require('prettier/parser-java')]
});`
  entity: String = ``
  repository: String = ``
  service: String = ``
  serviceImpl: String = ``
  controller: String = ``
  constructor(private http: ApiService) {
    
    this.entity = beautify.js_beautify(formatearTexto(localStorage.getItem('entity')!))

    this.repository = beautify.js_beautify(formatearTexto(localStorage.getItem('repository')!))
    this.service = beautify.js_beautify(formatearTexto(localStorage.getItem('service')!))
    this.serviceImpl = beautify.js_beautify(formatearTexto(localStorage.getItem('serviceImpl')!))
    this.controller = beautify.js_beautify(formatearTexto(localStorage.getItem('controller')!))
    console.log('Entity: ', this.entity)
  }


  
  
  body: any = ''
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