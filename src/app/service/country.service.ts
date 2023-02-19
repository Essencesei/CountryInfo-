import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getAllCountry(): Observable<any> {
    return this.http.get<any>('https://restcountries.com/v3.1/all').pipe(
      tap((result) => console.log('Success', JSON.stringify(result))),
      catchError(this.errorHandler)
    );
  }
  errorHandler(err: HttpErrorResponse) {
    return throwError(() => console.log(err));
  }
}
