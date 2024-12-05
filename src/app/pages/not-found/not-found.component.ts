import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ViewportScroller } from '@angular/common';
import { Chart, ChartConfiguration, TooltipItem } from 'chart.js/auto';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  country: any;
  lineChart: any;

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    const navigation = window.history.state;
    this.country = navigation.country;
    this.viewportScroller.scrollToPosition([0, 0]);
    
    setTimeout(() => {
      if (this.country) {
        this.createLineChart();
      }
    }, 0);
  }

  private createLineChart(): void {
    const ctx = document.getElementById('participationsChart') as HTMLCanvasElement;
    
    const years = this.country.participations.map((p: any) => p.year);
    const medalsCount = this.country.participations.map((p: any) => p.medalsCount);

    const config: ChartConfiguration<'line'> = { 
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'Number of medals',
          data: medalsCount,
          borderColor: '#008B8B',
          tension: 0,
          borderWidth: 2,
          fill: false,
          pointBackgroundColor: '#008B8B',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
     options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#E5E5E5'
          }
        },
        x: {
          grid: {
            color: '#E5E5E5'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        datalabels: {
          display: true,
          align: 'start',
          anchor: 'start', 
          offset: 10,
          color: '#008B8B',
          font: {
            weight: 'bold'
          },
          formatter: (value) => value
        }
      }
    }
  };
    this.lineChart = new Chart(ctx, config);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getNumberOfEntries(): number {
    return this.country?.participations?.length || 0;
  }

  getTotalMedals(): number {
    return this.country?.participations?.reduce((total: number, participation: any) => 
      total + participation.medalsCount, 0) || 0;
  }
  getNumberOfAthletes(): number {
    return this.country?.participations?.reduce((total: number, participation: any) => 
      total + participation.athleteCount, 0) || 0;
  }
}