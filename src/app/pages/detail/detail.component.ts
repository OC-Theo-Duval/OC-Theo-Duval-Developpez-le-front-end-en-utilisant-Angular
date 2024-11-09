import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  country: string = '';
  numberOfEntries$: Observable<number> = of(0);
  totalNumberOfMedals$: Observable<number> = of(0);
  totalNumberOfAthletes$: Observable<number> = of(0);
  lineChartData$: Observable<any[]> = of([]);
  errorMessage: string = '';
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private router: Router, private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.pipe(
      map(params => params.get('country')!),
      switchMap(country => {
        this.country = country;
        return this.olympicService.getOlympics().pipe(
          map(olympics => {
            const olympic = olympics.find(olympic => olympic.country === country);
            if (!olympic) {
              throw new Error('Country not found');
            }
            return olympic;
          }),
          catchError(error => {
            this.errorMessage = error.message;
            return of(null);
          })
        );
      })
    ).subscribe(olympic => {
      if (olympic) {
        this.numberOfEntries$ = of(olympic.participations.length);
        this.totalNumberOfMedals$ = of(olympic.participations.reduce((sum, p) => sum + p.medalsCount, 0));
        this.totalNumberOfAthletes$ = of(olympic.participations.reduce((sum, p) => sum + p.athleteCount, 0));
        this.lineChartData$ = of(olympic.participations.map(p => ({
          name: p.year.toString(),
          value: p.medalsCount
        })));
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}