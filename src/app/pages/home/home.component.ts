import { Olympic } from './../../core/models/Olympic';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { MedalsByCountry, createMedalsByCountry } from 'src/app/core/models/MedalsByCountry';
import { TooltipData, CountryClickEvent } from 'src/app/core/models/Tooltip'
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home', // Nom du composant utilisé dans le HTML
  templateUrl: './home.component.html', // Chemin du fichier template HTML
  styleUrls: ['./home.component.scss'], // Chemin du fichier de styles SCSS
  changeDetection: ChangeDetectionStrategy.OnPush, // Utilisation de la détection de changement pour optimiser les performances
})
export class HomeComponent implements OnInit {
  // Observable pour récupérer les données des olympiques
  public olympics$: Observable<Olympic[]> = of([]);
  // Observable pour les données des médailles
  public medals$?: Observable<MedalsByCountry[]>;

  // Constructeur injectant les services nécessaires
  constructor(private olympicService: OlympicService, private sanitizer: DomSanitizer, private router: Router) { }

  // Taille par défaut du graphique [largeur, hauteur]
  view: [number, number] = [700, 400];

  // Options pour personnaliser l'affichage du graphique
  showLabels: boolean = true; // Afficher les étiquettes sur le graphique
  isDoughnut: boolean = false; // Si vrai, le graphique sera de type "doughnut"
  customColorScheme: Color = { // Personnalisation des couleurs du graphique
    domain: ['#BC8F8F', '#683A21', '#B983FF', '#94B3FD', '#99FEFF'], // Palette de couleurs
    group: ScaleType.Ordinal, // Type de groupe de couleurs (Ordinal pour des valeurs discrètes)
    name: 'Custom Scheme', // Nom du jeu de couleurs personnalisé
    selectable: true // Si vrai, permet de sélectionner des segments du graphique
  };

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupération des données olympiques via le service
    this.olympics$ = this.olympicService.getOlympics();
    // Transformation des données pour obtenir les médailles par pays
    this.medals$ = this.getMedals();
  }

  // Fonction pour obtenir le nombre de participations à partir des données olympiques
  getNumberParticipation(): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => {
        if (olympics && olympics.length > 0) {
          // Renvoie le nombre de participations pour le premier pays dans la liste
          return olympics[0].participations.length;
        }
        return 0; // Si aucune participation, renvoie 0
      })
    );
  }

  // Fonction pour transformer les données olympiques en médailles par pays
  getMedals(): Observable<MedalsByCountry[]> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => {
        const result: MedalsByCountry[] = []; // Tableau pour stocker les résultats
        olympics.forEach(element => {
          let totalMedals: number = 0; // Variable pour stocker le total des médailles par pays
          // Si le pays a des participations, on calcule le total des médailles
          if (element.participations) {
            element.participations.forEach(participation => {
              totalMedals += participation.medalsCount; // Ajout du nombre de médailles
            });
          }
          // On crée une entrée dans le tableau des résultats pour chaque pays
          result.push(createMedalsByCountry(element.country, totalMedals));
        });
        return result; // Retourne les résultats sous forme d'un tableau
      })
    );
  }

  // Fonction pour générer le texte de l'infobulle affichée lors du survol des segments du graphique
  getTooltipText(data: TooltipData): SafeHtml {
    if (data && data.data) {
      // Construction du texte HTML pour l'infobulle
      const htmlString = `<div>${data.data.name} <br> <i class="fas fa-medal"></i> ${data.data.value}</div>`;
      // Utilisation du sanitizer pour éviter les injections de code malveillant
      const safeHtml = this.sanitizer.bypassSecurityTrustHtml(htmlString);
      return safeHtml;
    }
    // Texte par défaut si aucune donnée disponible
    return this.sanitizer.bypassSecurityTrustHtml('<h3>No data available</h3>');
  }

  // Fonction appelée lors du clic sur un pays dans le graphique
  onCountryClick(event: CountryClickEvent) {
    const countryName = event.name; // Récupère le nom du pays depuis l'événement du graphique
    // Redirige vers la page détaillée du pays cliqué
    this.router.navigate(['/country', countryName]);
  }
}
