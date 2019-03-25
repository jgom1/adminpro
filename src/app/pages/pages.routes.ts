import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Guard
import { LoginGuardGuard } from './../services/guards/login-guard.guard';
import { AdminGuard } from './../services/guards/admin.guard';

// Componentes
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const pageRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuardGuard], // Guard para protexer estas rutas mediante login.
    children: [
      // A propiedade data é opcional e nela pódense meter datos adicionais.
      // Neste caso un obxeto que dentro leva o título da páxina para usar nas breadcrumbs.
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { titulo: "Dashboard" }
      },
      {
        path: "progress",
        component: ProgressComponent,
        data: { titulo: "Progress" }
      },
      {
        path: "graficas1",
        component: Graficas1Component,
        data: { titulo: "Gráficas" }
      },
      {
        path: "promesas",
        component: PromesasComponent,
        data: { titulo: "Promesas" }
      },
      { path: "rxjs",
       component: RxjsComponent,
        data: { titulo: "RxJs" } 
    },
      {
        path: "account-settings",
        component: AccountSettingsComponent,
        data: { titulo: "Ajustes del Tema" }
      },
      {
        path: "profile",
        component: ProfileComponent,
        data: { titulo: "Perfil del usuario" }
      },
      {
        path: "busqueda/:termino",
        component: BusquedaComponent,
        data: { titulo: "Buscador" }
      },

      // Mantenimientos
      {
        path: "usuarios",
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: "Mantenimiento de usuarios" }
      },
      {
        path: "medicos",
        component: MedicosComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: "Mantenimiento de medicos" }
      },
      {
        path: "medico/:id",
        component: MedicoComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: "Mantenimiento de medico" }
      },
      {
        path: "hospitales",
        component: HospitalesComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: "Mantenimiento de hospitales" }
      },
      { path: "", component: DashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(pageRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
