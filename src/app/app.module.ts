import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DetailChartComponent } from './detail-chart/detail-chart.component';
import { PieChartRoutingModule } from './pie-chart/pie-chart-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    PieChartComponent,
    DetailChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PieChartRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
