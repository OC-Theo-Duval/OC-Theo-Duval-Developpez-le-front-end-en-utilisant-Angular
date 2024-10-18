import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Olympics } from '../core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-olympic',
  standalone: true,
  imports: [],
  templateUrl: './olympic.component.html',
  styleUrl: './olympic.component.scss'
})
export class OlympicComponent {
  public olympics$!: Observable<Olympics[]>; // Changez le type en fonction de votre modèle

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.loadOlympicsData(); // Appel de la méthode pour charger les données
  }

  loadOlympicsData(): void {
    this.olympicService.loadInitialData().subscribe(
      () => {
        this.olympics$ = this.olympicService.getOlympics(); // Récupérer les données du BehaviorSubject
      },
      (error) => {
        console.error('Erreur lors du chargement des données', error);
      }
    );
  }
}
