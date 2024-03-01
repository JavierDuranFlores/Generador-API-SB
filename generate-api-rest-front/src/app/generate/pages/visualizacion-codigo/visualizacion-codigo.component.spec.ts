import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacionCodigoComponent } from './visualizacion-codigo.component';

describe('VisualizacionCodigoComponent', () => {
  let component: VisualizacionCodigoComponent;
  let fixture: ComponentFixture<VisualizacionCodigoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizacionCodigoComponent]
    });
    fixture = TestBed.createComponent(VisualizacionCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
