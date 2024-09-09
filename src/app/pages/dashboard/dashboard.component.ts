import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [AsyncPipe, CommonModule],
})
export class DashboardComponent implements OnInit {
  ngOnInit() {
    console.log('DashboardComponent initialized');
  }
}
