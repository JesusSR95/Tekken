import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpersonajeComponent } from './cpersonaje.component';

describe('CpersonajeComponent', () => {
  let component: CpersonajeComponent;
  let fixture: ComponentFixture<CpersonajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpersonajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
