import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { CountryDetailService } from 'src/app/service/country-detail.service';

@Component({
  selector: 'pm-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryDetail: CountryDetailService,
    private sanitizer: DomSanitizer
  ) {}

  countryData: any = [];

  sub!: Subscription;
  private _queryCountry: string | null = '';

  onBack(): void {
    this.router.navigate(['/country']);
  }
  ngOnInit(): void {
    this._queryCountry = this.route.snapshot.paramMap.get('name');
    this.sub = this.countryDetail
      .getCountryDetail(this._queryCountry)
      .subscribe({
        next: (cd) => {
          console.log(cd);

          const dataObj = {
            name: cd[0].name.common,
            flag: cd[0].flags.png,
            alt: cd[0].flags.alt,
            capital: cd[0].capital,
            population: cd[0].population,
            coa: cd[0].coatOfArms.png,
            map: this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://maps.google.com/maps?q=${cd[0].name.common.toLowerCase()}&t=e&z=5&ie=UTF8&iwloc=&output=embed`
            ),
          };

          this.countryData.push(dataObj);

          console.log(this.countryData);
        },
        error: (err: HttpErrorResponse) => {
          return throwError(() => console.log(err));
        },
      });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
