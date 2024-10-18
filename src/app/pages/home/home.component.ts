import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympics } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympics[] | null> = of(); // Permettre à l'Observable de renvoyer null
  public olympicData: Olympics[] = []; // Propriété pour stocker les données

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    // Souscrire à l'Observable pour obtenir les données
    this.olympicService.loadInitialData().subscribe(data => {
      this.olympicData = data;
    });
  }
}
