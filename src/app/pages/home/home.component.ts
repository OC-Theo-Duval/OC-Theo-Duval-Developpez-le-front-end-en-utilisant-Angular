import { Component, OnInit, OnDestroy } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgxChartsModule,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
    FontAwesomeModule
  
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,
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
  public view: [number, number] = [700, 400]; 
  public showLegend: boolean = true;
  public faMedal = faMedal;
  imageUrl: string = "/assets/fonts/icons/medal.png";
  

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
    if (!data || data.length === 0) {
      console.warn('Data is empty or undefined.');
      this.barChartLabels = [];
      this.barChartData = [];
      this.countryIds = [];
      return;
    }
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
    setTimeout(() => {
      console.log('Clicked event: ', event);
      const countryIndex = this.barChartData.findIndex(
        (data) => data.name === event.name
      );
  
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
    }, 100);
  }
}