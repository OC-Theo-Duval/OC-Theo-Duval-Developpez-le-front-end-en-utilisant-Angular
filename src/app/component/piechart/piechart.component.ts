import { Component, OnInit , HostListener } from '@angular/core';
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
    domain: ['#793d52', '#89a1db', '#9780a1', '#bfe0f1', '#956065'],
  };
  public view: [number, number] = [0, 0];
  public tooltipData: any;
  public tooltipX: number;
  public tooltipY: number;

  constructor(private olympicService: OlympicService, private router: Router) {
    this.updateChartSize();
    this.tooltipX = 0; 
    this.tooltipY = 0; 
  }

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
    this.updateChartSize();
    
  }
    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
      this.updateChartSize();
    }
  
    updateChartSize(): void {
      const width = window.innerWidth;
      const heightRatio = width <= 740 ? 0.37 : 0.6;
      this.view = [width * 0.7, window.innerHeight * heightRatio];
    }

    onClick(data: any): void {
      this.router.navigate(['/detail', data.name]);
    }
  }