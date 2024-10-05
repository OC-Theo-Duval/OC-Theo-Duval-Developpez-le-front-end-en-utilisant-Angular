import { Olympic } from './../../core/models/Olympic';
import { Component, OnInit } from '@angular/core';
import { Observable, of, partition } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { MedalsByCountry, createMedalsByCountry } from 'src/app/core/models/MedalsByCountry';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public medals$?: Observable<MedalsByCountry[]>;
  constructor(private olympicService: OlympicService) { }

  view: [number, number] = [700, 400]; // Dimensions du graphique
  // Options de personnalisation
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false; // Définit si le graphique est en forme de "doughnut" ou non
  customColorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    group: ScaleType.Ordinal,
    name: 'Custom Scheme',
    selectable: true
  };

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.medals$ = this.getMedals();
  }

  getMedals(): Observable<MedalsByCountry[]> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => {
        const result: MedalsByCountry[] = []; // Initialise le tableau de résultats

        olympics.forEach(element => {
          let totalMedals: number = 0; // Réinitialise totalMedals pour chaque pays

          // Accède aux participations de chaque olympique et les ajoute au tableau
          if (element.participations) {
            element.participations.forEach(partition => {
              totalMedals += partition.medalsCount; // Correction de la façon d'additionner
            });
          }
          result.push(createMedalsByCountry(element.country, totalMedals)); // Ajoute le pays et le total
        });
console.log(result)
        return result; // Retourne le tableau de résultats
      })
    );
  }

}
