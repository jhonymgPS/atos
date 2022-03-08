import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Country} from "../../models/country.model";
import {CountryService} from "../../services/country.service";
import {CountryItemModel} from "../../models/countryItem.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

const COUNTRY_DATA: Country[] = [
  { name: "Mexico", languages:["Español", "Ingles"]},
  { name: "USA", languages:["Chino", "Ingles"]},
  { name: "China", languages:["Chino", "Ingles"]}
];

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.sass']
})

export class CountryListComponent implements OnInit, AfterViewInit {
  displayedColumns = ["name", "capital", "region", "languages", "population", "flag"];
  dataSource = COUNTRY_DATA;
  dataSource2 = new MatTableDataSource<CountryItemModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private countryService: CountryService,
              private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(
      (countries) => {
        this.dataSource2.data = countries;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
  }
}
