import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

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
      catchError((error: HttpErrorResponse, caught: Observable<OlympicCountry[]>) => {
              console.error('Error status:', error.status);
              console.error('Error message:', error.message);
              // can be useful to end loading state and let the user know something went wrong
              this.olympics$.next([]);
              return throwError(() => new Error('Something went wrong; please try again later.'));
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
  