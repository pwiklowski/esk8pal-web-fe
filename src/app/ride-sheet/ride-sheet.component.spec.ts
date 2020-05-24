import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideSheetComponent } from './ride-sheet.component';

describe('RideSheetComponent', () => {
  let component: RideSheetComponent;
  let fixture: ComponentFixture<RideSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
