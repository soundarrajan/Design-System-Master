import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EomClosureComponent } from './eom-closure.component';

describe('EomClosureComponent', () => {
  let component: EomClosureComponent;
  let fixture: ComponentFixture<EomClosureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EomClosureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EomClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
