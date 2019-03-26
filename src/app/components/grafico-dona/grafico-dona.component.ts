import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() public data: SingleDataSet = [];
  @Input() public labels: string[] = [];
  @Input() public chartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
