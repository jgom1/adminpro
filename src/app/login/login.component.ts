import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Models
import { Usuario } from './../models/usuario.model';

// Servicios
import { UsuarioService } from './../services/usuario/usuario.service';

// Poder chamar cargar scripts externos en componentes de Angular. Neste caso de assets/js/custom.js
declare function init_plugins();
// Declarar unha constante da Google Api que ven do script de Google que se inserta no head do index.
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {

  // Variable para pasarlle un valor por defecto ao checkbox recuérdame.
  public recuerdame: boolean = false;
  // Variable de correo para comprobar se está gardado no local storage (opción recuérdame) e poñelo no input correspondente.
  public email: string;

  // Obxeto para o Sign-In de Google.
  public auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit(); // Iniciar función que permite autenticarse coa conta de Google.
    // Comprobar se o correo está gardado no local storage(opción recuérdame).
    // Se non está gardado devolvería undefined, polo que lle poñemos o operador OR para asignarlle un string vacío nese caso.
    // Este asígnase ao email no html [ngModel]="email"
    // Faise no ngOnInit porque é o que se executa cando se carga a páxina.
    this.email = localStorage.getItem('email') || '';
    if(this.email.length>1){
      // Se o email existe, poñemos o checkbox de recuérdame a true para que apareza seleccionado e persista mentres o correo estea gardado no local storage.
      this.recuerdame = true;
    }
  }

  googleInit(){
    // Función con toda a inicialización do plugin de autenticación de google.
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '958965655244-um0tku2mfavp2jftgqelld9dnj4lmamd.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email' // Datos que queremos obter da persoa que se está logueando.
      });
      // Asignarlle o evento ao botón correspondente de Google no html.
      this.attachSignin( document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element){
    // Definir o que fara o botón do html de autenticarse con Google.
    this.auth2.attachClickHandler(element,{},(googleUser) => {
      // GoogleUser son os datos que nos devolve o callback ao clicar sobre o botón de autenticarse con Google.
      // let profile = googleUser.getBasicProfile(); // Obter o perfil do usuario autenticado.
      let token = googleUser.getAuthResponse().id_token; // Obter o token de Google.
      console.log( 'Token de Google', token );
      // Chamar á función login google de usuarioService.
      this._usuarioService.loginGoogle(token).subscribe(() => {
        // Ao realizar a autenticación correctamente, redireccionar ao dashboard.
        this.router.navigate( [ '/dashboard' ] );
      });

    });
  }

  ingresar(forma: NgForm) {
    // Comprobar que o formulario sexa válido antes de facer o login.
    if(forma.invalid){
      return;
    }

    // Crear o obxeto usuario que será o que se lle mande como argumento á función login do servicio.
    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    //Chamar a función de login do servicio.
    this._usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe(correcto => {
      // Tras realizar o login correctamente -> redireccionar ao dashboard
      this.router.navigate(['/dashboard']);
    });

    
  }

}
