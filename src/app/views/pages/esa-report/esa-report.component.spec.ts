import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsaReportComponent } from './esa-report.component';

describe('EsaReportComponent', () => {
  let component: EsaReportComponent;
  let fixture: ComponentFixture<EsaReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsaReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
