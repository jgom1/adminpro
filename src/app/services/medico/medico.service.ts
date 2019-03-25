import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// Servicios
import { UsuarioService } from './../usuario/usuario.service';

// Models
import { Medico } from './../../models/medico.model';

// Config
import { URL_SERVICIOS } from './../../config/config';

@Injectable( {
  providedIn: 'root'
} )
export class MedicoService {

  public totalMedicos: number = 0;

  constructor ( public http: HttpClient, public _usuarioService: UsuarioService ) { }

  cargarMedicos() {
    // Función para cargar todos os médicos.
    // Crear a url para chamar ao servidor. Ex: http://localhost:3000/medico
    let url = URL_SERVICIOS + '/medico';
    return this.http.get( url ).pipe(
      map( ( resp: any ) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      } )
    );
  }

  cargarMedico( id: string ) {
    // Función para cargar un médico dado un id.
    // Crear a url para chamar ao servidor. Ex: http://localhost:3000/medico/5c895dc56a0fd732b8d33200
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get( url ).pipe(
      map( ( resp: any ) => {
        return resp.medico;
      } )
    );
  }

  buscarMedicos( termino: string ) {
    // Función para buscar medicos en función dun termo dado.
    // Url da chamada ao servidor. Ex: http://localhost:3000/busqueda/coleccion/medicos/Pepe
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url ).pipe(
      map( ( resp: any ) => {
        // Devolver unicamente o array medicos da resposta.
        return resp.medicos;
      } )
    );
  }

  guardarMedico( medico: Medico ) {
    // Función para crear ou actualizar un médico dado un nombre e un hospital.
    let url = URL_SERVICIOS + '/medico';
    // Comprobar se se está actualizando ou creando.
    if ( medico._id ) {
      // Actualizando
      // Crear url para chamar ao servidor. Ex: http://localhost:3000/medico/dfweiurhiwrtfyiggf?token=eyJhbGciOiJIUzI1Ni
      url += '/' + medico._id + '?token=' + this._usuarioService.token;
      return this.http.put( url, medico ).pipe(
        map( ( resp: any ) => {
          swal( 'Médico actualizado', resp.medico.nombre, 'success' );
          return resp.medico;
        } )
      );
    } else {
      // Creando
      // Crear url para chamar ao servidor. Ex: http://localhost:3000/medico?token=eyJhbGciOiJIUzI1Ni
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, medico ).pipe(
        map( ( resp: any ) => {
          swal( 'Médico creado', resp.medico.nombre, 'success' );
          return resp.medico;
        } )
      );
    }
  }


  borrarMedico( id: string ) {
    // Función para eliminar un medico dado un determinado id.
    // Crear url para chamar ao servidor. Ex: http://localhost:3000/medico/5c8806eb3f530d18341b4654?token=sdfuhisduhfiudsfhiuhfsd
    let url = URL_SERVICIOS + '/medico/' + id;
    // Engadirlle o token.
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url ).pipe(
      map( ( resp: any ) => {
        // Mostrar un alert indicando que o médico se eliminou correctamente.
        swal( 'Médico borrado', 'Eliminado correctamente', 'success' );
        return resp;
      } )
    );
  }


}
