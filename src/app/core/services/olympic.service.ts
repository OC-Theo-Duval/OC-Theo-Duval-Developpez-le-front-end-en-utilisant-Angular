import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);
  public loading = new BehaviorSubject<boolean>(false);
  public errorMessage = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    this.loading.next(true);
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
        this.loading.next(false);
      }),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        this.errorMessage.next('Error loading data');
        this.loading.next(false);
        return[];
        // can be useful to end loading state and let the user know something went wrong
        //this.olympics$.next(null);
        //return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getTotalGames(): number {
    const olympicData = this.olympics$.getValue();
    if (!olympicData) return 0;
    const yearSet = new Set<number>();
    olympicData.forEach((olympic) => {
      olympic.participations.forEach((participation: Participation) =>
        yearSet.add(participation.year)
      );
    });
    return yearSet.size;
  }
}
