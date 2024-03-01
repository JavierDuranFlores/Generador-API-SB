import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaNormalComponent } from './tabla-normal.component';

describe('TablaNormalComponent', () => {
  let component: TablaNormalComponent;
  let fixture: ComponentFixture<TablaNormalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaNormalComponent]
    });
    fixture = TestBed.createComponent(TablaNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
