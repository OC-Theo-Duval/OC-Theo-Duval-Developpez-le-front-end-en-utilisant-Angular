import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public chartData: any[] = [];
  private countryIdMap: { [key: string]: string } = {}; 
  
  // Options du graphique
  view: [number, number] = [700, 400];
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  
  // Personnalisation des couleurs
  colorScheme = {
    domain: [
      '#8B6F7C', // Italy
      '#6B4C5E', // Germany
      '#A7BBE6', // United States
      '#8E7B9D', // France
      '#B8D0E6', // UK
      '#C4D7E6', // Spain
    ]
  };

  constructor(
    public olympicService: OlympicService,
    private router: Router
    ) {}

    ngOnInit(): void {
      this.olympics$ = this.olympicService.getOlympics();
      this.olympics$.subscribe(data => {
        if (data) {
          this.chartData = data.map((country: any) => {
            this.countryIdMap[country.country] = country.id; // Populate the mapping
            return {
              name: country.country,
              value: this.olympicService.getTotalMedals([country]),
              // id: country.id, // ID is not used directly in the chart
              country: country
            };
          });
          console.log('Chart Data:', this.chartData);
        }
      });
    }

    onSelect(event: any): void {
      console.log('Graph clicked:', event);
      const countryName = event.name; // Use name to find the ID
      const countryId = this.countryIdMap[countryName]; // Retrieve ID from the map
      if (countryId) {
        this.router.navigate(['/country', countryId]);
      } else {
        console.error('Country ID not found for name:', countryName);
      }
    }
  }
  