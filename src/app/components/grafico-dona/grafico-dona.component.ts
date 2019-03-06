import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() private data: SingleDataSet = [];
  @Input() private labels: string[] = [];
  @Input() private chartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
