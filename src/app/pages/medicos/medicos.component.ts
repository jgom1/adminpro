import { Component, OnInit } from '@angular/core';

// Models
import { Medico } from './../../models/medico.model';

// Services.
import { MedicoService } from './../../services/medico/medico.service';

@Component( {
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
} )
export class MedicosComponent implements OnInit {
  

  public medicos: Medico[] = [];

  constructor ( public _medicoService: MedicoService ) { }

  ngOnInit () {
    // Cargar os médicos ao iniciar o componente.
    this.cargarMedicos();
  }

  cargarMedicos () {
    // Función para cargar todos os médicos.
    this._medicoService.cargarMedicos().subscribe( resp => this.medicos = resp );
  }

  buscarMedico ( termino: string ) {
    // Función para buscar un medico dado un término de búsqueda.
    // Validar a lonxitude do término de búsqueda para que por exemplo non chame ao servidor se o input está vacío ou escribimos menos de 4 caracteres.
    if ( termino.length <= 3 ) {
      if ( termino.length === 0 ) {
        // Mostrar os hospitales correspondentes sen criterio de búsqueda cando borramos o termo de busca.
        this.cargarMedicos();
      }
      return;
    }
    this._medicoService.buscarMedicos( termino ).subscribe( resp => this.medicos = resp );
  }

  borrarMedico ( medico: Medico ) {
    // Función que recibe un médico e o borra.
    // Tras borrar o médico e mostrar un alert(faise no servicio), volver cargar a lista de médicos.
    this._medicoService.borrarMedico( medico._id ).subscribe( () => this.cargarMedicos() );
  }


}
