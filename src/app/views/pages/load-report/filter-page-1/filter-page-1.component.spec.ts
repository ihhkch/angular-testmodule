import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPage1Component } from './filtros.component';

describe('FiltrosComponent', () => {
  let component: FilterPage1Component;
  let fixture: ComponentFixture<FilterPage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
