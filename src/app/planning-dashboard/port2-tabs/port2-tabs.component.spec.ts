import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Port2TabsComponent } from './port2-tabs.component';

describe('Port2TabsComponent', () => {
  let component: Port2TabsComponent;
  let fixture: ComponentFixture<Port2TabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Port2TabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Port2TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
