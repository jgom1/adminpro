import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: []
})
export class IncrementadorComponent implements OnInit {

  // @ViewChild identifica elemento no html con #txtProgress.
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() private leyenda: string = 'Leyenda';
  @Input() private progreso: number = 50;
  @Output() private cambioValor: EventEmitter<number> = new EventEmitter();


  constructor() {
  }

  ngOnInit() {

  }


  onChanges( newValue: number) {
    // Función chamada co evento ngModelChange cando introducimos un número a man no input:number.
    if ( newValue > 100) {
      this.progreso = 100;
    } else if ( newValue < 0 || newValue == null ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // Dado que a variable progreso xa está controlada nos ifs anteriores, aquí pódese asignar directamente ao value do input.
    // this.txtProgress é o viewChild que identifica ese elemento no html.
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso );
  }

  cambiarValor( valor: number ) {
    // Controlar que progreso non sexa maior a 100 nin menor a 0.
    if ( this.progreso >= 100 && valor > 0 ) {
      return;
    }

    if ( this.progreso <= 0 && valor < 0 ) {
      return;
    }

    this.progreso += valor;
    // Cando cambiar o valor o output emite ese evento con ese número.
    this.cambioValor.emit(this.progreso);
    // Poñer o foco no input cando pulsemos o botón + ou - do elemento.
    this.txtProgress.nativeElement.focus();
  }


}
