import { Component, OnInit, HostListener } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Observable, of, map, switchMap } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-linechart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {
  public olympics$!: Observable<OlympicCountry[]>;
  public lineChartData$!: Observable<{ name: string, series: { name: string, value: number }[] }[]>;
  public colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#793d52', '#89a1db', '#9780a1', '#bfe0f1', '#956065'],
  };
  public view: [number, number] = [0, 0];
  public country: string = '';
  public tooltipData: any;
  public tooltipX: number;
  public tooltipY: number;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {
    this.updateChartSize();
    this.tooltipX = 0; 
    this.tooltipY = 0; 
  }

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
        this.lineChartData$ = of([{
          name: olympic.country,
          series: olympic.participations.map(participation => ({
            name: participation.year.toString(),
            value: participation.medalsCount
          }))
        }]);
      }
    });
    this.updateChartSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateChartSize();
  }

  updateChartSize(): void {
    this.view = [window.innerWidth * 0.7, window.innerHeight * 0.45];
  }
}