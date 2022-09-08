import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Port2InfoComponent } from './port2-info.component';

describe('Port2InfoComponent', () => {
  let component: Port2InfoComponent;
  let fixture: ComponentFixture<Port2InfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Port2InfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Port2InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
