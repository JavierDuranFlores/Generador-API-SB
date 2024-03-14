import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './generate/pages/inicio/inicio.component';
import { VisualizacionCodigoComponent } from './generate/pages/visualizacion-codigo/visualizacion-codigo.component';
import { DocumentacionComponent } from './generate/pages/documentacion/documentacion.component';


const routes: Routes = [
    /*{
        path: 'home',
        component: HomePageComponent
    },*/
    {
        path: 'inicio',
        component: InicioComponent
    },
    {
        path: 'documentacion',
        component: DocumentacionComponent
    },
    {
        path: '**',
        redirectTo: 'inicio'
    }
]

@NgModule({
    declarations: [],
    imports: [ 
        CommonModule,
        RouterModule.forRoot(routes)
     ],
    exports: [
        RouterModule
    ],
    providers: [],
})
export class AppRoutingModule {}