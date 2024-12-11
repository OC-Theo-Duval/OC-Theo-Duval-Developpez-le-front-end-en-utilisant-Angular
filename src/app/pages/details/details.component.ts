import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  country: any;
  lineChartData: any[] = [];
  view: [number, number] = [700, 400];
   // options
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
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.olympicService.getCountry(id).subscribe({
        next: (country) => {
          console.log('Country Data:', country); // Log the entire country data
          if (country) {
            this.country = country;
            this.updateChartData();
          } else {
            console.warn('Country data is null');
          }
        },
        error: (err) => {
          console.error('Error loading country data:', err);
        }
      });
    } else {
      console.warn('No ID found in route');
    }
  }


  updateChartData(): void {
    if (this.country && this.country.participations) {
      this.lineChartData = [
        {
          name: this.country.country,
          series: this.country.participations.map((p: any) => ({
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

}