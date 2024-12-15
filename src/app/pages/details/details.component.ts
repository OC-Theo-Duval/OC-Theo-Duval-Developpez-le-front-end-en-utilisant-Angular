import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Location } from '@angular/common';
import { Observable,of } from 'rxjs';
import { Country } from '../../core/models/Country';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  // Variables Country
  countrydata: Observable<Country> | null = null;
  countryname: Country| null = null;
  participantdata: Observable<number> | null = null;
  entredata: Observable<number> | null = null;
  medaldata: Observable<number> | null = null;


  // Variables Line Chart
  lineChartData: any[] = [];
  view: [number, number] = [700, 400];

   // options GRAPHIQUES
   showXAxis = true;
   showYAxis = true;
   gradient = false;
   showLegend = true;
   showXAxisLabel = true;
   xAxisLabel = 'Year'; 
   showYAxisLabel = true;
   yAxisLabel = 'Medals';
   colorScheme = {
     domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
   };

  constructor(
    private route: ActivatedRoute,
    public olympicService: OlympicService,
    private location: Location,
    private router: Router 
    
  ) {}

  ngOnInit(): void {
    
    this.updateChartDimensions(window.innerWidth);
    const idString = this.route.snapshot.paramMap.get('id');
    const id = idString ? Number(idString) : null; // Convert string to number
    
    if (id !== null) { // Check if id is not null to display
      this.countrydata = this.olympicService.getCountrybyidv2(id);
      this.participantdata = this.olympicService.getNumberOfAthletesv2(this.countrydata);
      this.medaldata = this.olympicService.getCountryMedalsv2(this.countrydata);
      this.entredata = this.olympicService.getNumberOfEntriesv2(this.countrydata);
      
      //console.log("test",this.participantdata)  display test
      
      // navigation route with id
      this.countrydata.subscribe({
        next: (country) => {
          console.log('Country Data:', country); // Log the entire country data
          if (country) {
            this.countryname = country;
            this.updateChartData();
          } else {
            console.warn('Country data is null');
            this.router.navigate(['/not-found']); // Handle null case
          }
        },
        error: (err) => {
          console.error('Error loading country data:', err);
          this.router.navigate(['/not-found']);
        }
      });
    } else {
      this.router.navigate(['/not-found']);
    }   
  }

  updateChartData(): void {
    if (this.countryname && this.countryname.participations) {
      this.lineChartData = [
        {
          name: this.countryname.country,
          series: this.countryname.participations.map((p: any) => ({
            name: p.year.toString(),
            value: p.medalsCount
          }))
        }
      ];
      console.log('Line Chart Data:', this.lineChartData); // Log chart data for debugging
    } else {
      this.lineChartData = [];
      console.log('No valid participations found for country'); // Log if no data
    }
  }

  goBack(): void {
    this.location.back(); // Use Location service to go back
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateChartDimensions(event.target.innerWidth);
  }

  updateChartDimensions(width: number) {
    this.view = this.olympicService.getChartDimensions(width);
  }
}