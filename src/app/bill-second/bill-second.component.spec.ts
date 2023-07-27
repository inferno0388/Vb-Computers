import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSecondComponent } from './bill-second.component';

describe('BillSecondComponent', () => {
  let component: BillSecondComponent;
  let fixture: ComponentFixture<BillSecondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillSecondComponent]
    });
    fixture = TestBed.createComponent(BillSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
