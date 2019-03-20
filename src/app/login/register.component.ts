import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert'; //Sweet alert

// Models
import { Usuario } from './../models/usuario.model';

// Servicios
import { UsuarioService } from './../services/service.index';

// Poder chamar cargar scripts externos en componentes de Angular. Neste caso de assets/js/custom.js
declare function init_plugins ();

@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './login.component.css' ]
} )
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public _usuarioService: UsuarioService, public router:Router) { }

  sonIguales(campo1: string,campo2: string){
    return (group: FormGroup)=>{
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[ campo2 ].value;

      if( pass1 === pass2 ) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup( {
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [ Validators.required, Validators.email ] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    },{validators: this.sonIguales('password','password2')} );

    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario(){

    if(this.forma.invalid){
      return;
    }

    if(!this.forma.value.condiciones){
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }

    // Créase unha instancia de usuario co nome, correo e contrasinal.
    let usuario = new Usuario( this.forma.value.nombre, this.forma.value.correo, this.forma.value.password);
    // Chamar ao servicio para subilo mediante a chamada post de crearUsuario.
    this._usuarioService.crearUsuario(usuario).subscribe((respuesta)=>{
      console.log(respuesta);
      // Redireccionar ao login tras facer o rexistro.
      this.router.navigate(['/login']);
    });
  }

}
