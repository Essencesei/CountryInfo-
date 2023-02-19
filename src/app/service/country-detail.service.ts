import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { CountryService } from './country.service';

@Injectable({
  providedIn: 'root',
})
export class CountryDetailService {
  constructor(
    private http: HttpClient,
    private countryService: CountryService
  ) {}

  getCountryDetail(query: string | null): Observable<any> {
    return this.http
      .get<any>(`https://restcountries.com/v3.1/name/${query}`)
      .pipe(
        tap((result) => console.log(JSON.stringify(result))),
        catchError(this.countryService.errorHandler)
      );
  }
}
