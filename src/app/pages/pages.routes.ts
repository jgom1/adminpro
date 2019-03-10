import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Componentes
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

const pageRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
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
      { path: "", component: DashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(pageRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
