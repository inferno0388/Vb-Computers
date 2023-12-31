import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBillComponent } from './generate-bill.component';

describe('GenerateBillComponent', () => {
  let component: GenerateBillComponent;
  let fixture: ComponentFixture<GenerateBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateBillComponent]
    });
    fixture = TestBed.createComponent(GenerateBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
