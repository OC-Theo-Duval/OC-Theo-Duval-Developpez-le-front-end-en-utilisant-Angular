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
  private olympics$ = new BehaviorSubject<Country[]>([]);

  constructor(private http: HttpClient) {
    const storedData = localStorage.getItem('olympicsData');
    if (storedData) {
      this.olympics$.next(JSON.parse(storedData)); // Load data from local storage
    } else {
      this.loadInitialData(); // Fetch data if not in local storage
    }
  }

  loadInitialData(): void {
    this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((data) => {
        console.log('Full Olympics Data:', data);
        localStorage.setItem('olympicsData', JSON.stringify(data)); 
        this.olympics$.next(data); // Populate the BehaviorSubject
      }),
      catchError((error) => {
        console.error('Error loading data:', error);
        this.olympics$.next([]); // Set to an empty array on error
        return of([]); // Return an empty array
      })
    ).subscribe(); // Subscribe to trigger the HTTP request
  }
  refreshData(): void {
    this.loadInitialData(); // Call the method to reload data
  }
  getOlympics() {
    return this.olympics$.asObservable();
  }

  // Mise à jour de la fonction qui permet de récupérer un pays par son id en observable pour l'utilisation de l'interface Country  

  getCountrybyidv2(id?: number): Observable<Country> {
    return this.olympics$.asObservable().pipe(
      map((olympics) => {
        console.log("ID being searched for:", id); // Log the ID being searched
        console.log("Full AGAIN Olympics data:", olympics); // Log the current olympics data
        const country = olympics.find((country: Country) => country.id === id);
        if (!country) {
          throw new Error(`Country with ID ${id} not found`);
        }
        return country;
      }),
      catchError((error) => {
        console.error('Error occurred while fetching country data:', error);
        throw error;
        })
    );
  }

// Function to get the number of countries from an observable
getNumberOfCountriesv2(olympics$: Observable<Country[]>): Observable<number> {
  return olympics$.pipe(
    map((olympics) => olympics.length), // Return the length of the array
    catchError((error) => {
      console.error('Error occurred while fetching number of countries:', error);
      return of(0); // Return 0 in case of error
    })
  );
}

// Function to get the maximum ID of participations from an observable
getNumberOfJOsv2(olympics$: Observable<Country[]>): Observable<number> {
  return olympics$.pipe(
    map((olympics) => {
      let maxId = 0;
      olympics.forEach(country => {
        country.participations.forEach((participation: { id: number }) => {
          if (participation.id > maxId) {
            maxId = participation.id; // Update maxId if a larger ID is found
          }
        });
      });
      return maxId; // Return the maximum ID found
    }),
    catchError((error) => {
      console.error('Error occurred while fetching number of JOs:', error);
      return of(0); // Return 0 in case of error
    })
  );
}

// Function to get the total number of medals from an observable of countries
getTotalMedalsv2(olympics$: Observable<Country[]>): Observable<number> {
  return olympics$.pipe(
    map((olympics) => {
      // Use reduce to calculate the total medals for all countries
      return olympics.reduce((totalMedals, country) => {
        // Sum the medals for the current country
        const countryTotalMedals = country.participations.reduce((total, participation) => 
          total + participation.medalsCount, 0
        );
        // Add the current country's total to the overall total
        return totalMedals + countryTotalMedals;
      }, 0); // Initialize totalMedals to 0
    }),
    catchError((error) => {
      console.error('Error occurred while fetching total medals:', error);
      return of(0); // Return 0 in case of error
    })
  );
}

getCountryMedalsv2(country: Observable<Country>): Observable<number> {
  return country.pipe(
    map((country) => country.participations.reduce((total, participation) => 
        total + participation.medalsCount, 0)), 

    catchError((error, caught) => {
      console.error('Error occurred while fetching country medals:', error);
      return caught;
    })
  );
}

getNumberOfEntriesv2(country: Observable<Country>): Observable<number>{
  return country.pipe(
    map((country) => country.participations.length),
    catchError((error, caught) => {
      console.error('Error occurred while fetching number of entries:', error);
      return caught;
    })
  );
}


getNumberOfAthletesv2(country: Observable<Country>): Observable<number>{
  return country.pipe(
    map((country) => country.participations.reduce((total, participation) => 
      total + participation.athleteCount, 0)),
    
    catchError((error, caught) => {
        console.error('Error occurred while fetching country data:', error);
        return caught;
      })
  );
}


  getChartDimensions(width: number): [number, number] {
    if (width < 768) {
      return [width * 0.9, 300]; // Adjust for mobile
    } else {
      return [700, 400]; // Default for larger screens
    }
  }
  
}