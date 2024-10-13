import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, Observable, of } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { RouterModule } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgxChartsModule,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<any> = of(null);
  public barChartLabels: string[] = [];
  public barChartData: any[] = [];
  public countryIds: number[] = [];
  public totalGames: number = 0;
  public loading: boolean = true;
  public errorMessage: string = '';
  private subscription: Subscription = new Subscription();
  public view: [number, number] = [700, 400]; // Размер графика
  public showLegend: boolean = true;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this.olympicService.loadInitialData().subscribe({
        next: (data: Olympic[]) => {
          this.processData(data);
          this.totalGames = this.olympicService.getTotalGames();
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error loading data';
          console.error('Error loading data', error);
          this.loading = false;
        },
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private processData(data: Olympic[]): void {
    this.barChartLabels = data.map((item) => item.country);
    this.barChartData = data.map((item) => ({
      name: item.country,
      value: item.participations.reduce(
        (sum: number, p: Participation) => sum + p.medalsCount,
        0
      ),
    }));
    this.countryIds = data.map((item) => item.id);
    console.log('Country Ids:', this.countryIds);
  }

  onCountryClick(event: any): void {
    console.log('Clicked event: ', event);
    const countryIndex = this.barChartData.findIndex(
      (data) => data.name === event.name
    );

    // Index valid?
    if (countryIndex >= 0 && countryIndex < this.countryIds.length) {
      const countryId = this.countryIds[countryIndex];
      if (countryId !== undefined) {
        this.router.navigate(['detail', countryId]);
      } else {
        console.error('Country ID is undefined for index:', countryIndex);
      }
    } else {
      console.error('Invalid country index:', countryIndex);
    }
  }
}
