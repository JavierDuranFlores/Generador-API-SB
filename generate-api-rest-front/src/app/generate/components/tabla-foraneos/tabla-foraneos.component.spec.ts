import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaForaneosComponent } from './tabla-foraneos.component';

describe('TablaForaneosComponent', () => {
  let component: TablaForaneosComponent;
  let fixture: ComponentFixture<TablaForaneosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaForaneosComponent]
    });
    fixture = TestBed.createComponent(TablaForaneosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
