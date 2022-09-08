import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vessel2TabsComponent } from './vessel2-tabs.component';

describe('Vessel2TabsComponent', () => {
  let component: Vessel2TabsComponent;
  let fixture: ComponentFixture<Vessel2TabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vessel2TabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vessel2TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
