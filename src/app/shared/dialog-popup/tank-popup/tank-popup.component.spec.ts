import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TankPopupComponent } from './tank-popup.component';

describe('TankPopupComponent', () => {
  let component: TankPopupComponent;
  let fixture: ComponentFixture<TankPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TankPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TankPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
