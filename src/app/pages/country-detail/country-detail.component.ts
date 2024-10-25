// Importation des modèles, modules et services nécessaires
import { SerieData, createSerieData } from './../../core/models/SerieData';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts'; // Module de graphiques ngx-charts
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // Permet d'accéder aux paramètres de la route active
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from './../../core/models/Olympic';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MedalsPerDate, createMedalsPerDate } from './../../core/models/MedalsPerDate';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-country-detail', // Sélecteur du composant
  standalone: true, // Le composant est autonome (standalone)
  templateUrl: './country-detail.component.html', // Fichier HTML du template associé
  styleUrl: './country-detail.component.scss', // Fichier de styles SCSS associé
  imports: [CommonModule, NgxChartsModule,RouterLink] // Importation des modules nécessaires
})
export class CountryDetailComponent {
  countryName!: string; // Nom du pays (sera initialisé dans ngOnInit)

  // Observable contenant la liste des données olympiques
  public olympics$: Observable<Olympic[]> = of([]);

  // Observable contenant les données de séries pour le graphique
  public serie$: Observable<SerieData[]> = of([]);

  // Observables pour les statistiques du pays
  public TotalMedals$: Observable<number> = of(0);
  public TotalAthletes$: Observable<number> = of(0);
  public NumberEntries$: Observable<number> = of(0);
  public isValideCountry!: Boolean

  // Constructeur du composant, injectant ActivatedRoute pour accéder aux paramètres de route
  // et OlympicService pour récupérer les données des Jeux Olympiques
  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router) { }

  // Propriétés pour configurer les options du graphique
  showLegend: boolean = false; // Afficher la légende
  showXAxis: boolean = true; // Afficher l'axe des X
  showYAxis: boolean = true; // Afficher l'axe des Y
  timeline: boolean = true;  // Afficher la chronologie
  autoScale: boolean = true; // Ajuster automatiquement les données (autoscaling)

  // Schéma de couleurs personnalisé pour le graphique
  colorScheme: Color = {
    domain: ['#5AA454'], // Couleur principale du graphique
    group: ScaleType.Ordinal, // Type d'échelle (ordinal)
    name: 'custom', // Nom du schéma de couleurs
    selectable: true // Permet de sélectionner les couleurs
  };

  // Méthode appelée au chargement du composant
  ngOnInit(): void {
    // Récupérer la liste des données olympiques via le service OlympicService
    this.olympics$ = this.olympicService.getOlympics();


    // Récupérer les paramètres de la route active (ici, le nom du pays)
    // Récupération du paramètre de l'URL
    this.route.params.subscribe(params => {
      this.countryName = params['name'];
      //Vérifier si countryName est dans la liste des pays participants
      this.isCountryValid(this.countryName).subscribe((result: boolean) => {
        this.isValideCountry = result;  // Here you get the value
      });
      // Si le nom du pays est invalide ou introuvable, rediriger vers la page Not Found
      if (!this.isValideCountry) {
        this.router.navigate(['/countrynotfound']);
      } else {
        // Initialiser les observables avec des méthodes récupérant les données filtrées pour le pays donné
        this.serie$ = this.getParticipationsByContry(this.countryName); // Données pour le graphique
        this.TotalMedals$ = this.getTotalMedals(this.countryName); // Total des médailles
        this.TotalAthletes$ = this.getTotalAthletes(this.countryName); // Total des athlètes
        this.NumberEntries$ = this.getNumberEntries(this.countryName); // Nombre total de participations
      }
    });
  }

  //Méthode pour vérifier si country est dans la liste des pays dans olympics
  isCountryValid(country: string): Observable<boolean> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => {
        // Créer un tableau des pays valides
        let validCountries: string[] = olympics.map(element => element.country);
        // Vérifier si le pays est dans la liste
        return validCountries.includes(country);
      })
    );
  }

  // Méthode pour récupérer les participations d'un pays donné sous forme de séries de données
  getParticipationsByContry(country: string): Observable<SerieData[]> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => {
        let result: SerieData[] = [];
        olympics.forEach(element => {
          // Si le pays correspond
          if (element.country == country) {
            let tab: MedalsPerDate[] = [];

            // Si l'élément contient des participations, on les transforme en séries de données
            if (element.participations) {
              element.participations.forEach(participation => {
                tab.push(createMedalsPerDate(participation.year.toString(), participation.medalsCount));
              });

              result.push(createSerieData(country, tab)); // Ajoute les données pour le pays
            }
          }
        });
        return result; // Retourne les séries de données sous forme observable
      })
    );
  }

  // Méthode pour calculer le total des médailles d'un pays donné
  getTotalMedals(country: string): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => {
        let somme: number = 0;
        olympics.forEach(element => {
          if (element.country == country && element.participations) {
            element.participations.forEach(participation => {
              somme += participation.medalsCount; // Additionne les médailles
            });
          }
        });
        return somme; // Retourne le total des médailles
      })
    );
  }

  // Méthode pour calculer le nombre total d'athlètes d'un pays donné
  getTotalAthletes(country: string): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => {
        let somme: number = 0;
        olympics.forEach(element => {
          if (element.country == country && element.participations) {
            element.participations.forEach(participation => {
              somme += participation.athleteCount; // Additionne les athlètes
            });
          }
        });
        return somme; // Retourne le total des athlètes
      })
    );
  }

  // Méthode pour récupérer le nombre d'entrées (participations) pour un pays donné
  getNumberEntries(country: string): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => {
        let numberEntries: number = 0;
        olympics.forEach(element => {
          if (element.country == country && element.participations) {
            numberEntries = element.participations.length; // Compte le nombre de participations
          }
        });
        return numberEntries; // Retourne le nombre total d'entrées
      })
    );
  }
}
