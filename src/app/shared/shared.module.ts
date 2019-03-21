import { CommonModule } from '@angular/common'; // Necesario para facer directivas ngFor, ngIf, etc.
import { RouterModule } from '@angular/router'; // Necesario para facer routerLink e routerActive
import { NgModule } from '@angular/core';

// Pipes
import { PipesModule } from '../pipes/pipes.module';


// Componentes
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule( {
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent
    ]
} )

export class SharedModule { }