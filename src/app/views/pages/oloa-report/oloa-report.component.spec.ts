import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OloaReportComponent } from './oloa-report.component';

describe('OloaReportComponent', () => {
  let component: OloaReportComponent;
  let fixture: ComponentFixture<OloaReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OloaReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OloaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
