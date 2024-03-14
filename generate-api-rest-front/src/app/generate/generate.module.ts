import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InicioComponent } from './pages/inicio/inicio.component';
import { VisualizacionCodigoComponent } from './pages/visualizacion-codigo/visualizacion-codigo.component';
import { SharedModule } from "../shared/shared.module";
import { AttributosForaneosComponent } from './components/attributos-foraneos/attributos-foraneos.component';
import { TablaNormalComponent } from "./components/tabla-normal/tabla-normal.component";
import { TablaForaneosComponent, AtributosForaneos } from './components/tabla-foraneos/tabla-foraneos.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatPaginatorModule } from "@angular/material/paginator";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AttributosNormalesComponent } from "./components/attributos-normales/attributos-normales.component";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MaterialModule } from "../material/material.module";
import { HttpClientModule } from "@angular/common/http";
import { EntityComponent } from './components/entity/entity.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { ServComponent } from './components/serv/serv.component';
import { ServImplComponent } from './components/serv-impl/serv-impl.component';
import { ControladorComponent } from './components/controlador/controlador.component';
import { DialogErrorComponent } from './components/dialog-error/dialog-error.component';
import { DialogCopyComponent } from './components/dialog-copy/dialog-copy.component';
import { DocumentacionComponent } from './pages/documentacion/documentacion.component';

@NgModule({
    declarations: [
        VisualizacionCodigoComponent,
        TablaNormalComponent,
        TablaForaneosComponent,
        AttributosForaneosComponent,
        AttributosNormalesComponent,
        InicioComponent,
        EntityComponent,
        RepositoryComponent,
        ServComponent,
        ServImplComponent,
        ControladorComponent,
        DialogErrorComponent,
        DialogCopyComponent,
        DocumentacionComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule
    ],
    exports: [
        VisualizacionCodigoComponent,
        TablaNormalComponent,
        TablaForaneosComponent,
        AttributosForaneosComponent,
        AttributosNormalesComponent,
        InicioComponent
    ]

})
export class GenerateModule {

    

}