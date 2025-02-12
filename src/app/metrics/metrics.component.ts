import { Component, AfterViewInit } from '@angular/core';
// npm install chart.js
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements AfterViewInit {
  ngOnInit() {
    console.log('Entrando a Metrics');
  }
  
  ngAfterViewInit() {
    this.createChart('queryChart', [10, 20, 30, 25], 'Consultas');
    this.createChart('uploadChart', [5, 15, 10, 20], 'Subidas');
  }

  createChart(chartId: string, data: number[], label: string) {
    new Chart(chartId, {
      type: 'line',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
          label: label,
          data: data,
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.2)'
        }]
      }
    });
  }
}
