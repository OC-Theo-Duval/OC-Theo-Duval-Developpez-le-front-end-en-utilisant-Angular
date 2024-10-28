import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);

  constructor(private http: HttpClient) {}

  /**
   * Loads the initial data for the olympic games.
   *
   * @return {Observable<OlympicType[]>} An observable that emits an array of OlympicType objects.
   */
  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value: OlympicCountry[]) => this.olympics$.next(value)),
      catchError((error: any, caught: Observable<OlympicCountry[]>) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  /**
   * Retrieves the full list of olympics data.
   *
   * @return {Observable<OlympicType[]>} The observable for the olympics$.
   */
  getOlympics(): Observable<OlympicCountry[]> {
    return this.olympics$.asObservable();
  }}
  