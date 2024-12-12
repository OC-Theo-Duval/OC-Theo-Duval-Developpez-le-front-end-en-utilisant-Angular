import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap,map } from 'rxjs/operators';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {
    // Load data automatically when service is instantiated
    this.loadInitialData().subscribe();
  }

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => {
        console.log('Loaded Olympics Data:', value); // Log the loaded data
        this.olympics$.next(value);
        //this.saveToLocalStorage(value);
      }),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getCountrybyid(id?: string): Observable<any> {
    const countryId = id || this.getLastCountryId();
    if (!countryId) {
      console.warn('No ID provided or stored');
      return of(null);
    }

    return this.olympics$.asObservable().pipe(
      map((olympics) => {
        if (!olympics || olympics.length === 0) {
          console.error('Olympics data is not loaded');
          return this.getStoredCountry(countryId); // Attempt to retrieve from local storage
        }
        const country = olympics.find((o: any) => o.id.toString() === countryId);
        if (!country) {
          console.error(`Country with ID ${countryId} not found`);
        } else {
          this.storeLastCountryId(countryId);
          this.storeOlympicsData(olympics); // Store the data in local storage
        }
        return country;
      }),
      catchError((error) => {
        console.error('Error occurred while fetching country data:', error);
        return of(null);
      })
    );
  }

  // getCountrybyidbis(id?: string): Observable<Country> {
  //   return this.olympics$.asObservable().pipe(
  //     map(
  //       (olympics) => {
  //         return olympics.find((country: any) => country.id.toString() === id);
  //       }
  //       ),

  //       catchError((error, caught) => {
  //         console.error('Error occurred while fetching country data:', error);
  //         return caught;
  //       })
  //   );
  // }

  // getNumberOfAthletesbis(country: Observable<Country>): Observable<number>{
  //   return country.pipe(
  //     map((country) => country.participations.reduce((total, participation) => 
  //       total + participation.athleteCount, 0)),
      
  //     catchError((error, caught) => {
  //         console.error('Error occurred while fetching country data:', error);
  //         return caught;
  //       })
  //   );
    
  // }


  
    private storeLastCountryId(id: string): void {
    localStorage.setItem('lastCountryId', id);
  }

  private getLastCountryId(): string | null {
    return localStorage.getItem('lastCountryId');
  }

  private storeOlympicsData(data: any[]): void {
    localStorage.setItem('olympicsData', JSON.stringify(data));
  }

  private getStoredOlympicsData(): any[] | null {
    const data = localStorage.getItem('olympicsData');
    return data ? JSON.parse(data) : null;
  }

  private getStoredCountry(id: string): any | null {
    const data = this.getStoredOlympicsData();
    return data ? data.find((o: any) => o.id.toString() === id) : null;
  }
  
  getNumberOfCountries(olympics: any[]): number {
    return olympics.length;
  }

  getNumberOfJOs(olympics: any[]): number {
    let maxId = 0;
    olympics.forEach(country => {
      country.participations.forEach((participation: { id: number }) => {
        if (participation.id > maxId) {
          maxId = participation.id;
        }
      });
    });
    return maxId;
  }

  getCountryMedals(country: any): number {
    return country.participations.reduce((total: number, participation: any) => 
      total + participation.medalsCount, 0);
  }

  getTotalMedals(olympics: any[]): number {
    return olympics.reduce((total, country) => 
      total + this.getCountryMedals(country), 0);
  }

  getNumberOfEntries(country: any): number {
    return country?.participations?.length || 0;
  }
  getNumberOfAthletes(country: any): number {
    return country?.participations?.reduce((total: number, participation: any) => 
      total + participation.athleteCount, 0) || 0;
  }

  getChartDimensions(width: number): [number, number] {
    if (width < 768) {
      return [width * 0.9, 300]; // Adjust for mobile
    } else {
      return [700, 400]; // Default for larger screens
    }
  }
  
}