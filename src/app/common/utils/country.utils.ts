import {CountryItemModel} from "../../models/countryItem.model";

export class CountryUtils {

  static mapCountry(data: any): CountryItemModel{
    let country = new CountryItemModel();
    country.name = data.name.official;
    country.capital = data.capital != null ? data.capital[0] : "Does not have capital";
    country.region = data.region;
    country.languages = data.languages != null ? Object.values(data.languages) : ["Does not have language"];
    country.population = data.population;
    country.flag = data.flag;
    return country;
  }
}
