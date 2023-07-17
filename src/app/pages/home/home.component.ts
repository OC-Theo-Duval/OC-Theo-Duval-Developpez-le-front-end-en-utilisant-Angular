import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Observable, map, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
Chart.register(...registerables);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private olympicService: OlympicService) { }

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
    const myChart = new Chart("MyChart", {

      //type de graphique
      type: 'pie',

      data: {
        labels: labeldata,
        datasets: [{
          label: this.Medaille,
          data: realdata,
          // data: [300, 240, 100, 432, 253],
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
        aspectRatio: 2.5
      }
    });
  }

}
