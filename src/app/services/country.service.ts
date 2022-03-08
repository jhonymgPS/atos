import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Country} from "../models/country.model";
import {CountryItemModel} from "../models/countryItem.model";
import {CountryUtils} from "../common/utils/country.utils";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private static ALL_COUNTRIES_URL = "https://restcountries.com/v3.1/all";
  private static COUNTRY_SUMMARY_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/";

  constructor(private http: HttpClient) { }

  public getCountries(): Observable<CountryItemModel[]> {
    return this.http.get<CountryItemModel[]>(CountryService.ALL_COUNTRIES_URL).pipe(
      map((items: any[]) => items.map((item: any) => {
        return CountryUtils.mapCountry(item);
      }))
    );
  }

  public getCountrySummary(countryName: string): Observable<any> {
    return this.http.get<any>(CountryService.COUNTRY_SUMMARY_URL+countryName);
  }
}
