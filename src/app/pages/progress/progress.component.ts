import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

// tslint:disable-next-line: no-inferrable-types
  private progreso_azul: number = 50;
  private progreso_verde: number = 50;

  constructor() { }

  ngOnInit() {
  }

  actualizar(event: number){
    console.log('Evento ', event);
  }

}
