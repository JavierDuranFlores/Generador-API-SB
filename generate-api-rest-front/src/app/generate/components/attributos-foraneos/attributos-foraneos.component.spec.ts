import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributosForaneosComponent } from './attributos-foraneos.component';

describe('AttributosForaneosComponent', () => {
  let component: AttributosForaneosComponent;
  let fixture: ComponentFixture<AttributosForaneosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttributosForaneosComponent]
    });
    fixture = TestBed.createComponent(AttributosForaneosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
