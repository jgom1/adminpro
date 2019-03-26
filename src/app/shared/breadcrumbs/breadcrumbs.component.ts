import { Router, ActivationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser'; // Para poder cambiar o título e os metatítulos da páxina

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

 public titulo: string;

  constructor(private router: Router, private title: Title, private meta: Meta) { 
  this.getDataRoute().subscribe( data => {
    this.titulo = data;
    // Cambiarlle o título á páxina en función da ruta na que estea.
    this.title.setTitle(this.titulo);
    // Crear un metatag
    const metaTag: MetaDefinition = {
      name: 'description',
      content: this.titulo
    };
    // Asignar o metatag á páxina.
    this.meta.updateTag(metaTag);
  })
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(
    // Deixar pasar só as instancias de ActivationEnd
    filter( event => event instanceof ActivationEnd),
    // Que teñan firstChild igual a null
    filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
    // Devolver unicamente no subscribe o título que metemos no obxeto data da ruta.
    map((event: ActivationEnd) => {return event.snapshot.data.titulo})
    );
  }

}
