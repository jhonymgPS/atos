import { Component, OnInit } from '@angular/core';
import {CountryService} from "../../services/country.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.sass']
})
export class CountryDetailComponent implements OnInit {
  countryDetail!: any;
  constructor(private countryService: CountryService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const countryName = this.activeRoute.snapshot.paramMap.get("country");
    if (countryName != null) {
      this.countryService.getCountrySummary(countryName).subscribe(
        (detail) => {
          this.countryDetail = detail;
          // this.countryDetail = JSON.parse(JSON.stringify(detail,
          //   Object.keys(detail).sort()));
        }
      );
    }
  }

}
