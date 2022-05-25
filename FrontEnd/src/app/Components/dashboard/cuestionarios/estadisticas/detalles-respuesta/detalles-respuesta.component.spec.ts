import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesRespuestaComponent } from './detalles-respuesta.component';

describe('DetallesRespuestaComponent', () => {
  let component: DetallesRespuestaComponent;
  let fixture: ComponentFixture<DetallesRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesRespuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
