import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { provideCharts, withDefaultRegisterables, BaseChartDirective } from 'ng2-charts';
import { CamembertChartComponent } from './camembert-chart/camembert-chart.component';
import { RouterOutlet } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    CamembertChartComponent
      ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BaseChartDirective,
    RouterOutlet
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
