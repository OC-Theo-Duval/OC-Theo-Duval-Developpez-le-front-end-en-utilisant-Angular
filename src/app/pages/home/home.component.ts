import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<OlympicCountry[]> = of([]);
  public numberOfOlympics$: Observable<number> = of(0);
  public numberOfCountries$: Observable<number> = of(0);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.numberOfOlympics$ = this.olympics$.pipe(
      map(data => Math.max(...data.flatMap(country => country.participations.map(p => p.id))))
    );
    this.numberOfCountries$ = this.olympics$.pipe(
      map(data => new Set(data.map(item => item.country)).size)
    );
  }
}