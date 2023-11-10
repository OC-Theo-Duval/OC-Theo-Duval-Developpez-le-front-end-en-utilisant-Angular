import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  olympicData: any[] = [];
  chartData: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }


  ngOnInit(): void {

    this.http.get<any[]>('assets/mock/olympic.json').subscribe(response => {
      this.olympicData = response;
      this.chartData = this.transformToChartData(this.olympicData);

    });
  }

  transformToChartData(rawData: any[]): any[] {
    return rawData.map(country => ({
      name: country.country,
      value: country.participations.reduce((sum: number, p: { medalsCount: number }) => sum + p.medalsCount, 0)
    }));
  }


  onSelect(event: any) {
    this.router.navigateByUrl(`/country-details/${event.name}`);

  }

  customTooltipTextFunction(item: any): string {
    return `<strong>Country:</strong> ${item.name} <br> <strong>Medals:</strong> ${item.value}`;
  }
}
