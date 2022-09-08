import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlDetailsComponent } from './pl-details.component';

describe('PlDetailsComponent', () => {
  let component: PlDetailsComponent;
  let fixture: ComponentFixture<PlDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
