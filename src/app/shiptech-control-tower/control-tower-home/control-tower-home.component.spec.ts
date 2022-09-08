import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTowerHomeComponent } from './control-tower-home.component';

describe('ControlTowerHomeComponent', () => {
  let component: ControlTowerHomeComponent;
  let fixture: ComponentFixture<ControlTowerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlTowerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTowerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
