import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCopyComponent } from './dialog-copy.component';

describe('DialogCopyComponent', () => {
  let component: DialogCopyComponent;
  let fixture: ComponentFixture<DialogCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
