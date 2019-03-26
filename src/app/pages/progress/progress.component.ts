import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
} )
export class ProgressComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
  public progreso_azul: number = 50;
  public progreso_verde: number = 50;

  constructor () { }

  ngOnInit() {
  }

  actualizar( event: number ) {
    console.log( 'Evento ', event );
  }

}
