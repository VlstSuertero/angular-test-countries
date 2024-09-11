import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T); // return void if error
    };
  }

  searchCountries(searchQuery: string): Observable<any> {
    return this.http
      .get(this.apiUrl + '/CountryInfo/' + searchQuery)
      .pipe(catchError(this.handleError('searchCountries', [])));
  }

  getAllCountries(): Observable<any> {
    return this.http
      .get(this.apiUrl + '/AvailableCountries/')
      .pipe(catchError(this.handleError('getAllCountries', [])));
  }

  getCountryInfo(countryCode: string): Observable<any> {
    return this.http
      .get(this.apiUrl + '/CountryInfo/' + countryCode)
      .pipe(catchError(this.handleError('getCountryInfo', [])));
  }

  getCountryNextHoliday(countryCode: string): Observable<any> {
    return this.http
      .get(this.apiUrl + '/NextPublicHolidays/' + countryCode)
      .pipe(catchError(this.handleError('getCountryInfo', [])));
  }

  getHolidaysForYear(year: number, countryCode: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/PublicHolidays/${year}/${countryCode}`)
      .pipe(catchError(this.handleError('getHolidaysForYear', [])));
  }

  getRandomCountries(countries: any[]): Observable<any[]> {
    const max = countries.length;
    const selectedCountries: any[] = [];

    while (selectedCountries.length < 3) {
      const randomIdx = Math.floor(Math.random() * max);
      const selectedCountry = countries[randomIdx];

      if (!selectedCountries.includes(selectedCountry)) {
        selectedCountries.push(selectedCountry);
      }
    }

    const countryHolidayObservables = selectedCountries.map((country) =>
      this.getCountryNextHoliday(country.countryCode)
    );

    return forkJoin(countryHolidayObservables).pipe(
      map((holidayDataArray) => {
        return holidayDataArray.map((holidays, index) => {
          const holiday = holidays[0];
          const country = selectedCountries[index];

          return {
            countryName: country.name,
            holidayName: holiday.name,
            date: holiday.date,
          };
        });
      })
    );
  }
}
