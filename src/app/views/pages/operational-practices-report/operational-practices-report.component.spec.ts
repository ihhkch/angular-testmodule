import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalPracticesReportComponent } from './operational-practices-report.component';

describe('OperationalPracticesReportComponent', () => {
  let component: OperationalPracticesReportComponent;
  let fixture: ComponentFixture<OperationalPracticesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationalPracticesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationalPracticesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
