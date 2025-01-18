import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {Observable, of} from "rxjs";
import {Olympic} from "../../core/models/Olympic";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of();
  private id!: number;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.id = this.route.snapshot.params['id'];

    this.olympics$.subscribe(data => {
      if (data != null) {
        let ol = data.filter(o => o.id == this.id);
        console.log(ol[0]);
      }
    });
  }
}
