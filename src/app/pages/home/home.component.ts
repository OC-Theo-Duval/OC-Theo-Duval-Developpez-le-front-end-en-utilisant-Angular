import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { ChartModule } from 'primeng/chart';
import {PieController} from "chart.js";
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of();

  public data: any;

  public chartOptions: any;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.subscribe(data => {
      if (data != null) {
        let pieOlympicArray = data.map((olympic: Olympic) => {
          return {
            id: olympic.id,
            country: olympic.country,
            medalsCount: this.countMedals(olympic)
          }
        });

        let labels = new Array<String>();
        let medalsCount = new Array<Number>();

        for (const poa of pieOlympicArray) {
          labels.push(poa.country);
          medalsCount.push(poa.medalsCount);
        }

      this.data = {
          labels: labels,
          datasets: [
            {
              data: medalsCount
            }
          ]
        };

      this.chartOptions = {
          plugins: {
            legend: {
              labels: {
                color: '#495057'
              }
            }
          }
        }
      }
    });
  }

  countMedals(olympic: Olympic): number {
    let count = 0;

    for (let participation of olympic.participations) {
      count += participation.medalsCount;
    }

    return count;
  }

  handleClick(event: any) {
    console.log(event);
    const id = event.element.index;
    this.router.navigateByUrl(`/details/${id}`);
  }
}
