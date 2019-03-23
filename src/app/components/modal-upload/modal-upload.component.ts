import { Component, OnInit } from '@angular/core';

// Servicios
import { SubirArchivoService } from './../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  // Ten tamén o tipo ArrayBuffer porque reader.result pode devolve string ou arrayBuffer e se se deixa sólo con string da un erro.
  imagenTemp: string | ArrayBuffer;

  constructor(public _subirArchivoService: SubirArchivoService, public _modalUploadService: ModalUploadService) { 
    console.log('Modal listo');
  }

  ngOnInit() {
  }

  cerrarModal(){
    // Evitar que queden as imaxes seteadas.
    this.imagenTemp = null;
    this.imagenSubir = null;
    // Chamar ao servicio para ocultar o modal asignándolle a clase oculto.
    this._modalUploadService.ocultarModal();
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
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => {
      // reader.result devolve a imaxe en base64.
      this.imagenTemp = reader.result;
    };
  }

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir,this._modalUploadService.tipo, this._modalUploadService.id).then(
      resp=>{
        console.log(resp);
        // Se o archivo se subiu correctamente, hai que emitir un mensaxe a todo o mundo que esté subscrito ou pendente de se se subiu a imaxe decíndolle que se subiu correctamente.
        // O que se vai emitir vai ser a resposta do servidor traída dende o servicio.
        this._modalUploadService.notificacion.emit(resp);
        // Unha vez emitido ocultar o modal.
        this.cerrarModal();
      }
    ).catch(
      // Se houbo algún erro.
      err=>console.error('Error en la carga')
    );
  }

}
