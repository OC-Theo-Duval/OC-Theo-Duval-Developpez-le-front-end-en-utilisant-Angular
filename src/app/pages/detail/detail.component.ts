import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Olympic } from '../../core/models/Olympic';
import { OlympicService } from '../../core/services/olympic.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, NgxChartsModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  countryId: number = 0;
  countryDetails: Olympic | null = null;
  totalMedals: number = 0;
  totalAthletes: number = 0;
  lineChartData: any[] = [];
  view: [number, number] = [700, 400];

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
  const target = event?.target as Window;
  if (innerWidth > 300 && innerWidth < 700) {
    this.view = [target.innerWidth, 400];
  } else if (innerWidth > 700) {
    this.view = [700, 400];
  } else if (innerWidth < 300) {
    this.view = [300, 400];
  }}

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('countryId');
      this.countryId = idParam ? +idParam : 0;
      this.loadCountryDetails();
    });
  }

  private loadCountryDetails(): void {
    this.olympicService.loadInitialData().subscribe({
      next: (data: Olympic[]) => {
        if (data) {
          this.countryDetails =
            data.find((item) => item.id === this.countryId) || null;
          if (this.countryDetails) {
            this.lineChartData = [
              {
                name: this.countryDetails.country,
                series: this.countryDetails.participations.map(
                  (participation) => ({
                    name: participation.year.toString(),
                    value: participation.medalsCount,
                  })
                ),
              },
            ];
          }

          this.processCountryData();
        }
      },
      error: (error) => {
        console.error('Error loading country details:', error);
      },
    });
  }

  private processCountryData(): void {
    // Общее количество медалей и спортсменов
    if (this.countryDetails && this.countryDetails.participations) {
      this.totalMedals = this.countryDetails.participations.reduce(
        (sum, p) => sum + p.medalsCount,
        0
      );

      this.totalAthletes = this.countryDetails.participations.reduce(
        (sum, p) => sum + p.athleteCount,
        0
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
