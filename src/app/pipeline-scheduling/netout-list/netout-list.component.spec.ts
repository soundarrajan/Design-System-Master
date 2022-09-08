import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetoutListComponent } from './netout-list.component';

describe('NetoutListComponent', () => {
  let component: NetoutListComponent;
  let fixture: ComponentFixture<NetoutListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetoutListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
