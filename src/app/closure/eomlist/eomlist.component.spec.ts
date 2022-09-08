import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EomlistComponent } from './eomlist.component';

describe('EomlistComponent', () => {
  let component: EomlistComponent;
  let fixture: ComponentFixture<EomlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EomlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EomlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
