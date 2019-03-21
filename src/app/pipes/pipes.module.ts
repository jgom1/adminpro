import { NgModule } from '@angular/core';

// Pipes
import { ImagenPipe } from './imagen.pipe';

@NgModule( {
  declarations: [
    ImagenPipe
  ],
  imports: [

  ],
  exports: [
    ImagenPipe
  ]
} )
export class PipesModule { }
