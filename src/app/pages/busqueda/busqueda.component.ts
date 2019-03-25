import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Models
import { Usuario } from './../../models/usuario.model';
import { Medico } from './../../models/medico.model';
import { Hospital } from './../../models/hospital.model';

// Config
import { URL_SERVICIOS } from './../../config/config';

@Component( {
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
} )
export class BusquedaComponent implements OnInit {

  // Crear 3 arrays onde se gardarán os posibles resultados das búsquedas.
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor ( public activatedRoute: ActivatedRoute, public http: HttpClient ) {
    // Escoitar o parámetro que ven pola url que é o término de búsqueda.
    this.activatedRoute.params.subscribe( params => {
      let termino = params[ 'termino' ];
      this.buscar( termino );
    } );
  }

  ngOnInit() {
  }

  buscar( termino: string ) {
    // Función que fai realiza a búsqueda chamando ao servidor.
    // Crear a url para chamar ao servidor. Ex: http://localhost:3000/busqueda/todo/norte
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get( url ).subscribe( ( resp: any ) => {
      // Asignar os resultados da resposta a cada array.
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    } );
  }
}
