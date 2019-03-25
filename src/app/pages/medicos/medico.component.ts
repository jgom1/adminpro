import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

// Servicios
import { HospitalService } from './../../services/hospital/hospital.service';
import { MedicoService } from './../../services/medico/medico.service';
import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';

// Models
import { Medico } from './../../models/medico.model';
import { Hospital } from './../../models/hospital.model';

@Component( {
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
} )
export class MedicoComponent implements OnInit {

  // Lista de hospitales para cargar no select.
  hospitales: Hospital[] = [];
  // Obxeto médico co nome e id do hospital para crear médico no service.
  medico: Medico = new Medico( '', '', '', '', '' );
  // Variable de tipo hospital que queremos mostrar na foto do hospital
  hospital: Hospital = new Hospital( '' );

  constructor ( public _medicoService: MedicoService,
     public _hospitalService: HospitalService,
      public router: Router,
       public activatedRoute: ActivatedRoute,
       public _modalUplocadService: ModalUploadService ) {
    // No constructor poñer a escoitar o que ven da url.
    this.activatedRoute.params.subscribe( params => {
      let id = params[ 'id' ];
      // Se non ven nuevo significa que é o id dun médico creado así que se chama a función cargarMedico
      if ( id !== 'nuevo' ) {
        this.cargarMedico( id );
      }
    } );
  }

  ngOnInit() {
    // Cargar os hospitales para meter no select.
    this._hospitalService.cargarHospitales().subscribe( resp => this.hospitales = resp );
    // Subscribirse aos cambios do modal da imaxe para saber cando se cambia a imaxe do médico.
    this._modalUplocadService.notificacion.subscribe((resp:any)=>{
      this.medico.img = resp.medico.img;
    });
  }

  cargarMedico( id: string ) {
    // Función que devolve un médico conreto en función do id e o asigna á propiedade médico da clase.
    this._medicoService.cargarMedico( id ).subscribe( ( resp: any ) => {
      this.medico = resp;
      // Na resposta do servidor o hospitl do médico ven coma un obxeto con todos os datos, pero nós só necesitamos o _id.
      this.medico.hospital = resp.hospital._id;
      this.cambioHospital(this.medico.hospital);
    } );
  }

  guardarMedico( f: NgForm ) {
    // Verificar se o formulario é válido.
    if ( f.invalid ) {
      return;
    }
    this._medicoService.guardarMedico( this.medico ).subscribe( ( medico: Medico ) => {
      // Asignarlle o médico recién creado á propiedade médico do componente.
      this.medico._id = medico._id;
      // Ao crear o médico redireccionar á páxina de editar médico pa poñerlle a foto.
      this.router.navigate( [ '/medico', medico._id ] );
    } );
  }

  cambioHospital( id: string ) {
    // Función chamada cada vez que seleccionamos un hospital no select. Do evento obtemos o id do hospital seleccionado que é o value do option.
    // Esta función devolve o hospital cuxo id se lle mandou por parámetro.
    this._hospitalService.obtenerHospital( id ).subscribe( resp => this.hospital = resp );

  }

  cambiarFoto(){
    // Mostrar o modal para cambiar a imaxe do médico.
    this._modalUplocadService.mostrarModal('medicos',this.medico._id);
  }

}
