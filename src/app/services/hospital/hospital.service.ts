import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// Models
import { Hospital } from './../../models/hospital.model';

// Servicios
import { UsuarioService } from './../usuario/usuario.service';

// Config
import { URL_SERVICIOS } from './../../config/config';

@Injectable( {
  providedIn: 'root'
} )
export class HospitalService {

  public totalHospitales: number = 0;

  constructor ( public http: HttpClient, public _usuarioService: UsuarioService ) { }

  cargarHospitales () {
    // Función que retorna un observable con todos os hospitais.
    // Crear url para chamar ao servidor. Ex: http://localhost:3000/hospital
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get( url ).pipe(
      map( ( resp: any ) => {
        this.totalHospitales = resp.total;
        // Devolver unicamente o array onde veñen os datos dos hospitais.
        return resp.hospitales;
      } )
    );
  }

  obtenerHospital ( id: string ) {
    // Recibe o id de un hospital e retorna toda a información do mesmo.
    // Crear url para chamar ao servidor. Ex: http://localhost:3000/hospital/5c881e1733a4e4020058f6ae
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url ).pipe(
      map( ( resp: any ) => {
        // Devolver unicamente o obxeto onde veñen os datos do hospital.
        return resp.hospital;

      } )
    );
  }

  borrarHospital ( id: string ) {
    // Función para eliminar un hospital dado un determinado id.
    // Crear url para chamar ao servidor. Ex: http://localhost:3000/hospital/5c8806eb3f530d18341b4654?token=sdfuhisduhfiudsfhiuhfsd
    let url = URL_SERVICIOS + '/hospital/' + id;
    // Engadirlle o token.
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url ).pipe(
      map( ( resp: any ) => {
        // Mostrar un alert indicando que o hospital se eliminou correctamente.
        swal( 'Hospital borrado', 'Eliminado correctamente', 'success' );
      } )
    );
  }

  crearHospital ( nombre: string ) {
    // Función que crea un hospital recibindo o nome do futuro hospital como parámetro.
    // Crear url para chamar ao servidor. Ex: http://localhost:3000/hospital?token=eyJhbGciOiJIUzI1NiIsInR5cCI
    let url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;
    return this.http.post( url, { nombre } ).pipe(
      map( ( resp: any ) => {
        // Devolver o obxeto cos datos do novo hospital creado.
        return resp.hospital;
      } )
    );
  }

  buscarHospital ( termino: string ) {
    // Obter un hospital que responda ao criterio de búsqueda dun término dado.
    // Url da chamada ao servidor. Ex: http://localhost:3000/busqueda/coleccion/hospitales/norte
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url ).pipe(
      map( ( resp: any ) => {
        // Devolver unicamente o array hospitales da resposta.
        return resp.hospitales;
      } )
    );
  }

  actualizarHospital ( hospital: Hospital ) {
    // Recibe un determinado hospital y lo actualiza.
    // Url da chamada ao servidor. Ex: http://localhost:3000/hospital/5c8806eb3f530d18341b4654?token=eyJhbGciOiJIUzI1NiIsInR5c
    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;
    return this.http.put( url, hospital ).pipe(
      map( ( resp: any ) => {
        swal('Hospital actualizado', resp.hospital.nombre, 'success')
        // Devolver unicamente o obxeto co hospital actualizado.
        return resp.hospital;
      } )
    );
  }

}
