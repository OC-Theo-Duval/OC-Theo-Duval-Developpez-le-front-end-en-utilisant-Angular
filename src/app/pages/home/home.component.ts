import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the plugin globally
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public chart: any;
  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe(data => {
      if (data) {
        setTimeout(() => {
          this.createChart(data);
        }, 0);
      }
    });
  }
  private createChart(data: any): void {
    const ctx = document.getElementById('olympicsChart') as HTMLCanvasElement;
    
    const customDatalabels = {
      id: 'customDatalabels',
      afterDraw(chart: any) {
        const { ctx, data, chartArea } = chart;
        const centerX = chartArea.left + (chartArea.right - chartArea.left) / 2;
        const centerY = chartArea.top + (chartArea.bottom - chartArea.top) / 2;
        const radius = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top) / 2;

        data.labels.forEach((label: string, i: number) => {
          const meta = chart.getDatasetMeta(0);
          const arc = meta.data[i];
          const angle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2;

          const segmentColor = data.datasets[0].backgroundColor[i];

          // Draw connecting line and country name for all countries
          const startX = centerX + Math.cos(angle) * radius;
          const startY = centerY + Math.sin(angle) * radius;

          const lineLength = 150;
          const endX = startX + (startX < centerX ? -lineLength : lineLength);
          const endY = startY;

          // Draw connecting line
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = segmentColor;
          ctx.lineWidth = 4;
          ctx.stroke();

          // Draw country name
          ctx.font = 'bold 18px Arial';
          ctx.fillStyle = '#000';
          ctx.textAlign = endX > centerX ? 'left' : 'right';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            label,
            endX + (endX > centerX ? 20 : -20),
            endY
          );
        });
      }
    };
    const config: ChartConfiguration<'pie'> = {
      type: 'pie' as const,
      data: {
        labels: data.map((d: any) => d.country),
        datasets: [{
          data: data.map((d: any) => this.getCountryMedals(d)),
          backgroundColor: [
            '#8B6F7C', // Italy
            '#6B4C5E', // Germany
            '#A7BBE6', // United States
            '#8E7B9D', // France
            '#B8D0E6', // UK
            '#C4D7E6', // Spain
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        onClick: (event, elements) => {
          if (elements && elements.length > 0) {
            const clickedIndex = elements[0].index;
            const country = data[clickedIndex];
            // Navigate to not-found with country data
            this.router.navigate(['/not-found'], {
              state: { country: country }
            });
          }
        },
        layout: {
          padding: {
            top: 50,
            right: 150,
            bottom: 50,
            left: 150
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#008B8B',
            padding: 10,
            titleFont: {
              size: 16,
              weight: 'bold'
            },
            bodyFont: {
              size: 14
            },
            displayColors: false, 
            callbacks: {
              label: function(context) {
                return '🏅 ' + context.parsed + ' medals';
              }
            }
          },
          datalabels: {
            display: false
          }
        }
      },
      plugins: [customDatalabels]
    };
    
    this.chart = new Chart(ctx, config);
  }
    // Utility functions
    getNumberOfCountries(olympics: any[]): number {
      return olympics.length;
    }
  
    getNumberOfJOs(olympics: any[]): number {
      let maxId = 0;
      olympics.forEach(country => {
        country.participations.forEach((participation: { id: number }) => {
          if (participation.id > maxId) {
            maxId = participation.id;
          }
        });
      });
      return maxId;
    }
  
    getCountryMedals(country: any): number {
      return country.participations.reduce((total: number, participation: any) => 
        total + participation.medalsCount, 0);
    }
  
    getTotalMedals(olympics: any[]): number {
      return olympics.reduce((total, country) => 
        total + this.getCountryMedals(country), 0);
    }
  }

  