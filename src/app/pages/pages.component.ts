import { Component, OnInit } from '@angular/core';

// Poder chamar cargar scripts externos en componentes de Angular. Neste caso de assets/js/custom.js
declare function init_plugins();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
