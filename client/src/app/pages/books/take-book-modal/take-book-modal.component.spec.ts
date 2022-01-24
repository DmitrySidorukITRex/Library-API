import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeBookModalComponent } from './take-book-modal.component';

describe('TakeBookModalComponent', () => {
  let component: TakeBookModalComponent;
  let fixture: ComponentFixture<TakeBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeBookModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
