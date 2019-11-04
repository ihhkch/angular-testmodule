import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadConditionReportComponent } from './road-condition-report.component';

describe('RoadConditionReportComponent', () => {
  let component: RoadConditionReportComponent;
  let fixture: ComponentFixture<RoadConditionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadConditionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadConditionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
