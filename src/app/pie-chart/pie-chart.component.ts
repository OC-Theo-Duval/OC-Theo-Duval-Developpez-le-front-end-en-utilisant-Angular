import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../core/_services/olympic.service';
import { Observable, of } from 'rxjs';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { ChartEvent } from 'chart.js/auto';
import { SharedDataService } from '../core/_services/shared-data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private sharedDataService: SharedDataService,
  ) { }

  // @ViewChild('chartCanvas') MyChart: any;

  public olympics$: Observable<any> = of(null);

  chartdata: any;
  Medaille: string = "Nombres de médailles";
  labeldata: any[] = [];
  realdata: any[] = [];
  count: number = 0;
  ngOnInit(): void {
    this.olympicService.getOlympics()
      .subscribe(result => {
        this.chartdata = result;

        if (this.chartdata != null) {
          for (let i = 0; i < this.chartdata.length; i++) {
            this.count = 0;
            //On insère les pays dans le liste
            this.labeldata.push(this.chartdata[i].country);

            for (let part of this.chartdata[i].participations) {
              //Création de la somme des médailles par pays organisateur
              this.count += part.medalsCount;
            }
            //Insertion de la somme des médailles par pays organisateur dans la liste
            this.realdata.push(this.count);
          }
          //Affichage du chart en lui passant les listes de données
          this.RenderChart(this.labeldata, this.realdata);
        }

      })
  }

  RenderChart(labeldata: any, realdata: any) {

    this.chartdata = new Chart("MyChart", {

      //type de graphique
      type: 'pie',

      data: {
        labels: labeldata,
        datasets: [{
          label: this.Medaille,
          data: realdata,
          backgroundColor: [
            '#009246',
            '#AD1519',
            'pink',
            '#FFCC00',
            '#318ce7',
          ],
          hoverOffset: 20
        }],
      },
      options: {
        aspectRatio: 2.5,
        onClick: (event: ChartEvent, elements: any[], chart: any) => {
          const nativeEvent = event.native as MouseEvent;
          if (elements.length > 0) {
            const clickedElementIndex = elements[0].index;
            const clickedLabel = labeldata[clickedElementIndex];
            const clickedValue = realdata[clickedElementIndex];

            //On stock les données dans le service
            this.sharedDataService.setClickedData(clickedLabel, clickedValue);

            this.router.navigate(['/detail-chart']);
          }
        }
      }
    });
  }

}
