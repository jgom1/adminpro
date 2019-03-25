import { Component, OnInit } from '@angular/core';

// Servicios
import { HospitalService } from './../../services/hospital/hospital.service';
import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';

// Models
import { Hospital } from './../../models/hospital.model';

declare var swal: any;

@Component( {
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
} )
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];

  constructor ( public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService ) { }

  ngOnInit () {
    // Cargar os hospitales cando se inicia o componente.
    this.cargarHospitales();
    // Subscribirnos ás notificacións do modal uploadServices cada vez que emita algo por actualizar as imaxe dun hospital.
    this._modalUploadService.notificacion.subscribe(()=>this.cargarHospitales()); // O ideal sería actualizar únicamente o hospital modificado. 
  }

  cargarHospitales () {
    // Función para cargar todos os hospitales.
    this._hospitalService.cargarHospitales().subscribe( ( resp: Hospital[] ) => {
      // Asignar á propiedade hospitales a resposta do servidor => array de hospitales.
      this.hospitales = resp;
    } );
  }

  buscarHospital ( termino: string ) {
    // Función para buscar un hospital dado un término de búsqueda.
    // Validar a lonxitude do término de búsqueda para que por exemplo non chame ao servidor se o input está vacío ou escribimos menos de 4 caracteres.
    if ( termino.length <= 3 ) {
      if ( termino.length === 0 ) {
        // Mostrar os hospitales correspondentes sen criterio de búsqueda cando borramos o termo de busca.
        this.cargarHospitales();
      }
      return;
    }
    this._hospitalService.buscarHospital( termino ).subscribe( ( resp: Hospital[] ) => {
      // Asignar a resposta á propiedade hospitales da clase.
      this.hospitales = resp;
    } );
  }

  crearHospital () {
    // Mostrar o alert para introducir o nome do hospital que se quere crear.
    swal( {
      title: 'Crear hospital',
      text: 'Introduzca el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    } ).then( ( valor: string ) => {
      // Validar que hai algo introducido no input.
      if ( !valor || valor.length === 0 ) {
        return;
      }
      // Tras crear exitosamente o novo hospital, cargar a lista de hospitais.
      this._hospitalService.crearHospital(valor).subscribe(()=>this.cargarHospitales());
    } );
  }

  actualizarHospital ( hospital: Hospital ) {
    // Función que recibe un hospital e o garda.
    this._hospitalService.actualizarHospital( hospital ).subscribe();

  }

  borrarHospital ( hospital: Hospital ) {
    // Función que recibe un hospital e o borra.
    // Tras borrar o hospital e mostrar un alert(faise no servicio), volver cargar a lista de hospitais.
    this._hospitalService.borrarHospital( hospital._id ).subscribe( () => this.cargarHospitales() );

  }

  actualizarImagen ( hospital: Hospital ) {
    // Función que actualiza a imaxe do hospital.
    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );
  }

}
