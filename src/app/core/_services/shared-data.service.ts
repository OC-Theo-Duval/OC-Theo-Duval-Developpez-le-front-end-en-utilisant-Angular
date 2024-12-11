import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
private clickedLabel: string = "";
private clickedMedal: number = 0;
private clickedValue: [] = [];
private clickeData: [] = [];

  constructor() { }

  setClickedData(label: string, medal: number, value: [], data: []){
    this.clickedLabel = label;
    this.clickedMedal = medal;
    this.clickedValue = value;
    this.clickeData = data;

  }

  getClickedLabel(): string {
    return this.clickedLabel;
  }

  getClickedMedal(): number{
    return this.clickedMedal;
  }

  getClickedValue(): []{
    return this.clickedValue;
  }

  getClickedData(): []{
    return this.clickeData;
  }
}
