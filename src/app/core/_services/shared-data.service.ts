import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
private clickedLabel: string = "";
private clickedValue: number = 0;

  constructor() { }

  setClickedData(label: string, value: number){
    this.clickedLabel = label;
    this.clickedValue = value;
  }

  getClickedLabel(): string {
    return this.clickedLabel;
  }

  getClickedValue(): number{
    return this.clickedValue;
  }
}
