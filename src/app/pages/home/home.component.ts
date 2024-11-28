import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Chart,registerables } from 'chart.js/auto';  // Add this import

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public chart: any; 

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    
    // Subscribe to the olympics$ observable to create chart when data arrives
    this.olympics$.subscribe(data => {
      //console.log('Data received:', data); 
      if (data) {
        setTimeout(() => {
        this.createChart(data);
      }, 0);
      }
    });
  }

  private createChart(data: any): void {
    const ctx = document.getElementById('olympicsChart') as HTMLCanvasElement;
    
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map((d: any) => d.country),
        datasets: [{
          data: data.map((d: any) => this.getCountryMedals(d)), // Use getCountryMedals
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FF6384',
            '#C9CBCF'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 15, // Reduce legend box size
              padding: 10 
            }
            },
          title: {
            display: true,
            text: 'Olympic Medals by Country'
            
          }
        }
      }
    });
  }

// Data Jo calculations to re-use

// Total des pays
getNumberOfCountries(olympics: any[]): number {
  return olympics.length; 
}
// Nombres de JOs
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

// Total des médailles par pays
 getCountryMedals(country: any): number {
  return country.participations.reduce((total: number, participation: any) => 
    total + participation.medalsCount, 0);
}
// Total des médailles de tous les pays
getTotalMedals(olympics: any[]): number {
  return olympics.reduce((total, country) => 
    total + this.getCountryMedals(country), 0);
}
}