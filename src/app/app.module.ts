import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
