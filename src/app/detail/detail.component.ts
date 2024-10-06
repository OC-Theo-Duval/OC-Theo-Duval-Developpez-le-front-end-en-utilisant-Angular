import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Olympic } from '../core/models/Olympic';
import { OlympicService } from '../core/services/olympic.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  countryId: number = 0;
  countryDetails: Olympic | null= null;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('countryId')
      this.countryId = idParam ? + idParam: 0;
      this.loadCountryDetails();
    });
  }

  private loadCountryDetails(): void {
    this.olympicService.loadInitialData().subscribe({
      next: (data: Olympic[]) => {
        if (data) {
          this.countryDetails = data.find(item => item.id === this.countryId) || null;
        }
      },
      error: (error) => {
        console.error('Error loading country details:', error);
      }
    });
  }
}