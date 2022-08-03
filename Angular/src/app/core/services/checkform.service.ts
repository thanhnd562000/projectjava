import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from 'src/app/common/country.model';
import { State } from 'src/app/common/state.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckformService {
  private countriesUrl=  environment.shopApiUrl+"/countries";
  private stateUrl=  environment.shopApiUrl+ "/states";

  constructor(private httpClient:HttpClient) {}
  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data);
  }
  getCreditCardYear(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }
    return of(data);
  }
  getCoutries():Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl)
    .pipe(map((res)=>res._embedded.countries))
  }

  getStates(thecountryCode : string):Observable<State[]>{

    /// url
    const searchStatesUrl=`${this.stateUrl}/search/findByCountryCode?code=${thecountryCode}`
    return this.httpClient.get<GetResponseStates>(searchStatesUrl)
    .pipe(map((res)=>res._embedded.states))
  }
  
}
interface GetResponseCountries{
  _embedded:{
    countries:Country[];
  }
}
interface GetResponseStates{
  _embedded:{
    states:State[];
  }
}
