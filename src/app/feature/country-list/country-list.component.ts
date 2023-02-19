import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryService } from 'src/app/service/country.service';

@Component({
  selector: 'pm-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent implements OnInit, OnDestroy, OnChanges {
  constructor(private country: CountryService) {}

  sub!: Subscription;
  countryBasic: any = [];
  countryBasicFiltered: any = [];
  private _searchQuery: string = '';

  get searchQuery(): string {
    return this._searchQuery;
  }

  set searchQuery(query: string) {
    this._searchQuery = query;
    this.countryBasicFiltered = this.performFilter(query);
  }

  performFilter(query: string): any {
    return this.countryBasic.filter((el: any) => {
      return el.name.toLowerCase().includes(query.toLowerCase());
    });
  }

  ngOnInit(): void {
    this.sub = this.country.getAllCountry().subscribe({
      next: (c) => {
        const data: any = c.map((el: any) => {
          const dataObj: object = {
            flag: el.flags.png,
            name: el.name.common,
          };
          this.countryBasic.push(dataObj);
          this.countryBasicFiltered = this.countryBasic;
          console.log(dataObj);
        });
      },
    });
  }
  ngOnChanges(): void {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
