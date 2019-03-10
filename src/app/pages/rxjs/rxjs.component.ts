import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
    .pipe(
      // retry(2) // Reintentar o subscribe se hai un erro
    )
    .subscribe(
      numero => console.log( 'Subs', numero ), // observer.next
      ( error ) => console.error( 'Error en el obs', error ), // observer.error
      () => console.log( 'El observador terminó' ) // observer.complete
    );

   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    // Chámase xunto antes de que a instancia sea destruída.
    // Neste caso, cando se cerra a páxina.
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable<any>( observer => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        observer.next( contador );
        if ( contador == 3 ) {
          observer.complete();
          clearInterval( intervalo );
        }
        // if ( contador == 2 ) {
        //   clearInterval( intervalo );
        //   observer.error( 'Hubo un error' );
        // }
      }, 1000 );
    } ).pipe(
       map( resp => {
         return resp;
      })
    );
  }

}
