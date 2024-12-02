import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../core/_services/shared-data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-detail-chart',
  templateUrl: './detail-chart.component.html',
  styleUrls: ['./detail-chart.component.scss']
})
export class DetailChartComponent implements OnInit {
  chartdata: any;
  labeldata: any[] = [];
  medaldata: any[] = [];
  realdata: any[] = [];
  data: any[] = [];
  totalAthletes: any[] = [];

  listmedal: any[] = [];
  listyear: any[] = [];

  numberEntries: number = 0;

  countMedal: number = 0;
  countAthletes: number = 0;
  medalperyear: string = "Médailles par année";

  constructor(
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const clickedLabel = this.sharedDataService.getClickedLabel();
      const clickedMedal = this.sharedDataService.getClickedMedal();
      const clickedValue = this.sharedDataService.getClickedValue();
      const clickedData = this.sharedDataService.getClickedData();

      this.labeldata.push(clickedLabel);
      this.medaldata.push(clickedMedal);
      this.realdata.push(clickedValue);
      this.data.push(clickedData);

      if(this.data != null){

        for(let i = 0; i < this.data.length; i++){

          // Calcul du nombre d'entrée au JO pour le pays selectionné
          this.numberEntries = this.data[i].participations.length;

          this.countAthletes = 0;
          for(let cAth of this.data[i].participations){
            //Ajout de la somme des athletes pour chaque JOs
            this.countAthletes += cAth.athleteCount;

            //Ajout des médaille à la list des médailles
            this.listmedal.push(cAth.medalsCount);

            //Ajout des années de participation à la liste des années
            this.listyear.push(cAth.year)
          }
          //Attribution de la somme
          this.totalAthletes.push(this.countAthletes);
        }
      }
    })

    //Affichage du chart en lui passant les listes de données
    this.RenderChart(this.labeldata, this.listmedal, this.listyear);
  }

  RenderChart(labeldata: any, listmedal: any[], listyear: any[]) {

    this.chartdata = new Chart("MyChart", {

      //type de graphique
      type: 'line',
      data: {
        labels: labeldata,
        datasets: [{
          label: this.medalperyear,
          data: listmedal,
          backgroundColor: 'rgb(0, 0, 0)',
          borderColor: 'rgb(0, 0, 0)'
        }],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            type: 'category',
            labels: listyear,
          },
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  }
}
