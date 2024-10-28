import { Component, OnInit } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-piechart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
  public olympics$!: Observable<OlympicCountry[]>;
  public graphData$!: Observable<{ name: string, value: number }[]>;
  public colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff', '#ff0', '#f0f'],
  };

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.graphData$ = this.olympics$.pipe(
      map((olympics) => {
        if (!olympics) {
          return [];
        }
        return olympics.map((country) => {
          return {
            name: country.country,
            value: country.participations.reduce((sum, participation) => sum + participation.medalsCount, 0)
          };
        });
      })
    );
  }

}