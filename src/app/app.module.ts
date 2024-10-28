import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from 'src/app/component/header/header.component';
import { PiechartComponent } from 'src/app/component/piechart/piechart.component';
import { TitleCardComponent } from 'src/app/component/title-card/title-card.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';




@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, HeaderComponent, PiechartComponent, TitleCardComponent, NgxChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}