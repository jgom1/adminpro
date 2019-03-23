import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo:string;
  public id:string;
  // Controlar se o modal está oculto ou privado. Por defecto estará oculto. O string fai referencia á clase do modal, se é oculto = non aparecerá.
  public oculto: string = 'oculto';
  // Poder notificarlle ás outras pantallas que xa se subiu o do modal.
  public notificacion = new EventEmitter<any>();

  constructor() { 
    
  }

  ocultarModal(){
    // Función encargada de ocultar o modal.
    this.oculto = 'oculto';
    // Evitar que estas propiedades queden seteadas.
    this.id = null;
    this.tipo = null;
  }

  mostrarModal( tipo: string, id: string){
    // Función encargada de facer que apareza o modal.
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}
