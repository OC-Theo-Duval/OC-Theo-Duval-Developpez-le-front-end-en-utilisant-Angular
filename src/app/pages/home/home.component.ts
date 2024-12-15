import { Component, OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of,forkJoin } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Country } from '../../core/models/Country';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  // Variables Country
  olympicsdata: Observable<Country[]> = of([]);
  public chartData: any[] = [];
  private countryIdMap: { [key: string]: number } = {};

  // Variables to hold the number of countries and JOs
  numberOfCountries: Observable<number> | null = null;
  numberOfJOs: Observable<number> | null = null;
  totalMedals: Observable<number> | null = null;

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
      this.updateChartDimensions(window.innerWidth);
      this.olympicsdata = this.olympicService.getOlympics();

      this.olympicService.getNumberOfCountriesv2(this.olympicsdata).subscribe(count => {
      this.numberOfCountries = of(count); // Store the number of countries as Observable
      });

      this.olympicService.getNumberOfJOsv2(this.olympicsdata).subscribe(maxId => {
      this.numberOfJOs = of(maxId); // Store the maximum ID of participations
      });

      this.olympicService.getTotalMedalsv2(this.olympicsdata).subscribe(totalMedals => {
        this.totalMedals = of(totalMedals); // Store the total number of medals as Observable
      });

      this.olympicsdata.subscribe(data => {
        if (data) {
          const countryObservables = data.map((country: Country) => {
            this.countryIdMap[country.country] = country.id; // Store ID as a number
 
            // Use getCountryMedalsv2 to get the medals for each country
            return this.olympicService.getCountryMedalsv2(of(country)).pipe(
              map(medals => ({
                name: country.country,
                value: medals // Use the medals count from the observable
              }))
            );
          });
  
          // Use forkJoin to wait for all observables to complete
          forkJoin(countryObservables).subscribe(results => {
            this.chartData = results as any[]; // Type assertion to fix type error
           // console.log('Chart Data:', this.chartData); // Log the chart data
          });
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

    @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateChartDimensions(event.target.innerWidth);
  }

  updateChartDimensions(width: number) {
       this.view = this.olympicService.getChartDimensions(width);
     }
  }
  