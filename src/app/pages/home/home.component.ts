import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of();

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    // Create root and chart
    let root = am5.Root.new("chartdiv");
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
      })
    );

    this.olympics$.subscribe(data => {
      if (data != null) {
        let pieOlympicArray = data.map((olympic: Olympic) => {
          return {
            id: olympic.id,
            country: olympic.country,
            medalsCount: this.countMedals(olympic)
          }
        });

        let series = chart.series.push(
          am5percent.PieSeries.new(root, {
            name: "Medals count",
            valueField: "medalsCount",
            categoryField: "country"
          })
        );
        series.data.setAll(pieOlympicArray);

// Add legend
        let legend = chart.children.push(am5.Legend.new(root, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          layout: root.horizontalLayout
        }));

        legend.data.setAll(series.dataItems);
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
}
