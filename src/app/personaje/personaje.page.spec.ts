import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonajePage } from './personaje.page';

describe('PersonajePage', () => {
  let component: PersonajePage;
  let fixture: ComponentFixture<PersonajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonajePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
