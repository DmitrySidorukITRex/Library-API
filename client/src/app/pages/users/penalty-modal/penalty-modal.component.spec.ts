import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyModalComponent } from './penalty-modal.component';

describe('PenaltyModalComponent', () => {
  let component: PenaltyModalComponent;
  let fixture: ComponentFixture<PenaltyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenaltyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
