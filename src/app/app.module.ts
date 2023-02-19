import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryListComponent } from './feature/country-list/country-list.component';
import { CountryDetailsComponent } from './feature/country-details/country-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, CountryListComponent, CountryDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'country',
        component: CountryListComponent,
      },
      {
        path: 'country/:name',
        component: CountryDetailsComponent,
      },
      {
        path: '',
        component: CountryListComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
