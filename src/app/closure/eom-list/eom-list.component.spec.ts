import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EomListComponent } from './eom-list.component';

describe('EomListComponent', () => {
  let component: EomListComponent;
  let fixture: ComponentFixture<EomListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EomListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
