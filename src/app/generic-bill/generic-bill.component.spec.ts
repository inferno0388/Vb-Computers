import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericBillComponent } from './generic-bill.component';

describe('GenericBillComponent', () => {
  let component: GenericBillComponent;
  let fixture: ComponentFixture<GenericBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericBillComponent]
    });
    fixture = TestBed.createComponent(GenericBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
