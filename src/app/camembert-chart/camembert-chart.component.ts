import { Component, OnInit } from '@angular/core';
import { Olympics } from '../core/models/Olympic';
import { OlympicService } from '../core/services/olympic.service'; // Import du service

@Component({
  selector: 'app-camembert-chart',
  templateUrl: './camembert-chart.component.html',
  styleUrls: ['./camembert-chart.component.scss']
})
export class CamembertChartComponent implements OnInit {
  public olympics!: Olympics[]; // Les données olympiques seront reçues ici
  public chartData: any;
  public chartOptions: any = {
    responsive: true,
    type: 'pie',
    plugins: {
      legend: {
        display: false, // Désactive la légende
      },
    },
    
  };

  // Propriétés pour afficher le nombre de JO et le nombre de pays
  public numberOfOlympics: number = 0;
  public numberOfCountries: number = 0;

  // Injection du service dans le constructeur
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // Abonnement aux données
    this.olympicService.getOlympics().subscribe(
      (data: Olympics[]) => {
        if (data) {
          this.olympics = data;
          this.formatChartData();
        }
      },
      (error) => {
        console.error('Error loading Olympics data:', error);
      }
    );
  }
  
  /* Initialisation graphique des données */
  formatChartData(): void {
    if (this.olympics && this.olympics.length) {
      // Compte le nombre total de JO
      this.numberOfOlympics = this.olympics.reduce((total, olympic) => total + olympic.participations.length, 0);

      // Compte le nombre de pays uniques
      const uniqueCountries = new Set(this.olympics.map(olympic => olympic.country));
      this.numberOfCountries = uniqueCountries.size;

      this.chartData = {
        labels: this.olympics.map(olympic => olympic.country), // Noms des pays
        datasets: [{
          data: this.olympics.map(olympic => 
            olympic.participations.reduce((total, participation) => total + participation.medalsCount, 0)
          ), // Total des médailles par pays
          backgroundColor: ['#956065', '#B8CBE7', '#89A1DB', '#733C50', '#9780A1'], // Couleurs prédéfinies
        }]
      };
    }
  }
}
