import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  imports: [CommonModule, NgxChartsModule],
  standalone: true,
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
 
  public pieChartData = [
    {
      "name": "Series A",
      "value": 65
    },
    {
      "name": "Series B",
      "value": 28
    },
    {
      "name": "Series C",
      "value": 80
    },
    {
      "name": "Series D",
      "value": 19
    }
  ];
  
  public colorScheme = 'vivid'; 
  public view: [number, number] = [700, 400];
  public showLegend = true;
  public animations = true;
}