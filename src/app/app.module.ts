import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { GridViewComponent } from './Components/grid-view/grid-view.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptorService } from './Services/loader-intercept.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FiltersComponent } from './Components/filters/filters.component';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from './Common/material.module';
import { ChartsComponent } from './Components/charts/charts.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent, 
    DashboardComponent, NavbarComponent, GridViewComponent, ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    FiltersComponent,
    FormsModule,
    BaseChartDirective
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
