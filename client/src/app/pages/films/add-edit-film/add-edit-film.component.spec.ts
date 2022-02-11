import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFilmComponent } from './add-edit-film.component';

describe('AddEditFilmComponent', () => {
  let component: AddEditFilmComponent;
  let fixture: ComponentFixture<AddEditFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFilmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
