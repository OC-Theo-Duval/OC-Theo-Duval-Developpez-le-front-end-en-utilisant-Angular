import { SerieData, createSerieData } from './../../core/models/SerieData';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from './../../core/models/Olympic';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MedalsPerDate, createMedalsPerDate } from './../../core/models/MedalsPerDate'
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
  imports: [CommonModule, NgxChartsModule]
})
export class CountryDetailComponent {
  countryName!: string;
  public olympics$: Observable<Olympic[]> = of([]);
  public serie$: Observable<SerieData[]> = of([]);
  public TotalMedals$: Observable<number> = of(0);
  public TotalAthletes$: Observable<number> = of(0);
  public NumberEntries$: Observable<number> = of(0);

  constructor(private route: ActivatedRoute, private olympicService: OlympicService) { }

  view: [number, number] = [700, 400]; // Dimensions du graphique
  showLegend: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  timeline: boolean = true;  // Pour afficher la chronologie
  autoScale: boolean = true; // Auto scale pour ajuster la plage des données

  colorScheme: Color = {
    domain: ['#5AA454'],
    group: ScaleType.Ordinal,
    name: 'custom',
    selectable: true
  };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.countryName = params['name']; // Récupérer le nom du pays depuis les paramètres
    });
    this.olympics$ = this.olympicService.getOlympics();
    this.serie$ = this.getParticipationsByContry(this.countryName)
    this.TotalMedals$ = this.getTotalMedals(this.countryName)
    this.TotalAthletes$ = this.getTotalAthletes(this.countryName)
    this.NumberEntries$ = this.getNumberEntries(this.countryName)
  }

  getParticipationsByContry(country: string): Observable<SerieData[]> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => {
        let result: SerieData[] = [];
        olympics.forEach(element => {
          if (element.country == country) {
            let tab: MedalsPerDate[] = [];
            if (element.participations) {
              element.participations.forEach(participation => {
                tab.push(createMedalsPerDate(participation.year.toString(), participation.medalsCount))
              })

              result.push(createSerieData(country, tab));
            }
          }
        })
        return result;
      }))
  }

  getTotalMedals(country: string): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => {
        let somme: number = 0;
        olympics.forEach(element => {
          if (element.country == country) {
            if (element.participations) {
              element.participations.forEach(participation => {
                somme += participation.medalsCount
              })
            }
          }
        })
        return somme;
      }
      ))

  }

  getTotalAthletes(country: string): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => {
        let somme: number = 0;
        olympics.forEach(element => {
          if (element.country == country) {
            if (element.participations) {
              element.participations.forEach(participation => {
                somme += participation.athleteCount
              })
            }
          }
        })
        return somme;
      }
      ))
  }

  getNumberEntries(country: string): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => {
        let numberEntries: number = 0
        olympics.forEach(element => {
          if (element.country == country) {
            if (element.participations) {
              numberEntries = element.participations.length
            }
          }
        })
        return numberEntries;
      }
      ))
  }
}
