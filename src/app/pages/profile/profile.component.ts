import { Component, OnInit } from '@angular/core';

// Models
import { Usuario } from './../../models/usuario.model';

// Servicios
import { UsuarioService } from './../../services/usuario/usuario.service';

@Component( {
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
} )
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  // Ten tamén o tipo ArrayBuffer porque reader.result pode devolve string ou arrayBuffer e se se deixa sólo con string da un erro.
  imagenTemp: string | ArrayBuffer;

  constructor ( public _usuarioService: UsuarioService ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit () {
  }

  guardar ( usuario: Usuario ) {
    // Ao clicar no botón de gardar asignar os valores do formulario ao obxeto usuario desta clase para logo modificalos na base de datos con _usuarioService.
    this.usuario.nombre = usuario.nombre;
    // Controlar que se o usuario é de google, non poida modificar o correo.
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }
    // Actualizar o usuario.
    this._usuarioService.actualizarUsuario( this.usuario ).subscribe( resp => {
      console.log( resp );
    } );
  }

  seleccionImage ( archivo: File ) {

    // Validar que recibimos o arquivo. O evento vaise chamar sempre que cambie o botón de seleccionar archivo e a veces ao mellor non seleccionamos ningunha imaxe.
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    // Validar que o archivo seleccionado é unha imaxe.
    if ( archivo.type.indexOf( 'image' ) < 0 ) {
      swal( 'Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error' );
      this.imagenSubir = null;
      return;
    }
    
    this.imagenSubir = archivo;

    // Isto é javascript puro para ler a imaxe cargada cun reader.
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = ()=>{
      // reader.result devolve a imaxe en base64.
      this.imagenTemp = reader.result;
    };

  }

  cambiarImagen () {
    // Función que chama ao servicio de usuario para subir a imaxe ao servidor.
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
