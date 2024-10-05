import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartConfiguration,ChartData } from 'chart.js';
import { Participation } from '../core/models/Participation';
import { Olympic } from '../core/models/Olympic';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartLabels: string[] =[];
  public barChartData: ChartData <'bar'> = {
    labels: [],
    datasets: [],
  };

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe((data: Olympic[]) => {
      if (data) {
        this.processData(data);
      }
    });
  }

  private processData (data: Olympic []): void {
    this.barChartLabels = data.map((item) => item.country);
    this.barChartData.datasets = [
      {
        data: data.map((item) => item.participations.reduce((sum : number , p : Participation ) => sum + p.medalsCount, 0)),
        label: 'Medals count',
      }
    ]
  }
}
