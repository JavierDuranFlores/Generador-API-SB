import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributosNormalesComponent } from './attributos-normales.component';

describe('AttributosNormalesComponent', () => {
  let component: AttributosNormalesComponent;
  let fixture: ComponentFixture<AttributosNormalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttributosNormalesComponent]
    });
    fixture = TestBed.createComponent(AttributosNormalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
