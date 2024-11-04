import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  country: string = '';
  numberOfEntries$: Observable<number> = of(0);
  totalNumberOfMedals$: Observable<number> = of(0);
  totalNumberOfAthletes$: Observable<number> = of(0);
  lineChartData$: Observable<any[]> = of([]);

  constructor(private route: ActivatedRoute, private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('country')!),
      switchMap(country => {
        this.country = country;
        return this.olympicService.getOlympics().pipe(
          map(olympics => olympics.find(olympic => olympic.country === country))
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
      }
    });
  }
}