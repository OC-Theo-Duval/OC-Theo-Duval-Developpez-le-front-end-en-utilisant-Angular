import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../core/_services/shared-data.service';

@Component({
  selector: 'app-detail-chart',
  templateUrl: './detail-chart.component.html',
  styleUrls: ['./detail-chart.component.scss']
})
export class DetailChartComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const clickedLabel = this.sharedDataService.getClickedLabel();
      const clickedValue = this.sharedDataService.getClickedValue();
      console.log('label', clickedLabel);
      console.log('value', clickedValue);
      
    })
  }

}
