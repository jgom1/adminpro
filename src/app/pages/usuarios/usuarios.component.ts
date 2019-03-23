import { Component, OnInit } from '@angular/core';

// Models
import { Usuario } from 'src/app/models/usuario.model';

// Servicios
import { UsuarioService } from './../../services/usuario/usuario.service';
import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';

declare var swal: any

@Component( {
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
} )
export class UsuariosComponent implements OnInit {

  // Array cos usuarios devoltos polo servidor.
  usuarios: Usuario[] = [];
  // Parámetro desde que se envía na petición GET para paxinar os resultados.
  desde: number = 0;
  // Número total de usuarios devoltos na resposta do servidor.
  totalRegistros: number = 0;
  // Propiedade para ocultar ou mostrar o mensaxe de cargando.
  cargando: boolean = true;

  constructor ( public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService ) {}

  ngOnInit () {
    // Cargar os primeiros usuarios ao iniciar o componente.
    this.cargarUsuarios();
    // Estar atento ás notificacións que poidan enviar os modals que cambian as imaxes dos usuarios.
    this._modalUploadService.notificacion.subscribe((resp:any)=>{
      // Neste caso únicamente imos recargar a lista de usuarios para que actualice o usuario modificado coa foto nova.
      this.cargarUsuarios();
    });
  }

  cargarUsuarios () {
    // Mostrar mensaxe de 'Cargando'
    this.cargando = true;
    // Chamar á función cargarUsuarios de usuario service.
    this._usuarioService.cargarUsuarios( this.desde ).subscribe( ( resp: any ) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      // Ocultar mensaxe de 'Cargando'
      this.cargando = false;
    } );
  }

  cambiarDesde ( valor: number ) {
    // Establecer unha variable local para facer as validacións.
    let desde = this.desde + valor;
    // Validar que ao clicar en seguinte non se pidan máis rexistros dos que hai.
    if ( desde >= this.totalRegistros ) {
      return;
    }
    // Validar que non se pidan rexistros en posición menor a 0.
    if ( desde < 0 ) {
      return;
    }
    // Incrementar ou diminuir a propiedade desde da clase en función do valor recibido.
    this.desde += valor;
    // Chamar á función que interacciona co servicio e obtén e asigna os novos usuarios.
    this.cargarUsuarios();
  }

  buscarUsuario ( termino: string ) {
    // Validar a lonxitude do término de búsqueda para que por exemplo non chame ao servidor se o input está vacío ou escribimos menos de 4 caracteres.
    if ( termino.length <= 3 ) {
      if ( termino.length === 0 ) {
        // Mostrar os usuarios correspondentes sen criterio de búsqueda cando borramos o termo de busca.
        this.cargarUsuarios();
      }
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios( termino ).subscribe( ( respuesta: Usuario[] ) => {
      // Asignar os usuarios obtidos pola resposta do servidor á propiedade usuarios da clase.
      this.usuarios = respuesta;
      this.cargando = false;
    } );
  }

  borrarUsuario ( usuario: Usuario ) {
    // Verificar que o usuario recibido para ser borrado non é o propio usuario logueado que está borrando usuario, é decir, evitar que un usuario se poida borrar a sí mesmo.
    if ( usuario._id === this._usuarioService.usuario._id ) {
      swal( 'No puede borrar usuario', 'No se puede borrar a sí mismo', 'error' );
      return;
    }
    // Mostrar cadro de verificación preguntándolle ao usuario de se está seguro de querer borrar ese usuario.
    swal( {
      title: "¿Está seguro de borrar?",
      text: 'Está apunto de borrar a ' + usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    } )
      .then( borrar => {
        if ( borrar ) {
          // Borrar = true
          this._usuarioService.borrarUsuario( usuario._id ).subscribe( ( resp: boolean ) => {
            // Unha vez borrado o usuario, volver cargar os usuarios.
            this.cargarUsuarios();
          } )
        } else {
          // Borrar = null -> Non facer nada.
        }
      }
      );
  }

  guardarUsuario( usuario: Usuario ) {
    // Actualizar os datos cambiados do usuario.
    this._usuarioService.actualizarUsuario( usuario ).subscribe();
  }

  mostarModal (id: string){
    // Función para chamar ao servicio _modalUploadService que mostra o modal para poder cambiar a imaxe.
    this._modalUploadService.mostrarModal('usuarios',id);
  }

}
