import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPersonajesPage } from './mis-personajes.page';

describe('MisPersonajesPage', () => {
  let component: MisPersonajesPage;
  let fixture: ComponentFixture<MisPersonajesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisPersonajesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPersonajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
