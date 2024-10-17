import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamembertChartComponent } from './camembert-chart.component';

describe('CamembertChartComponent', () => {
  let component: CamembertChartComponent;
  let fixture: ComponentFixture<CamembertChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamembertChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamembertChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
