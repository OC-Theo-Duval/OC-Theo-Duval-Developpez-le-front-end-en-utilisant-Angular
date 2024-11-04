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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailComponent } from './pages/detail/detail.component';
import { LinechartComponent } from 'src/app/component/linechart/linechart.component';



@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent , DetailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, HeaderComponent, PiechartComponent, TitleCardComponent, NgxChartsModule, FontAwesomeModule,LinechartComponent ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}