import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PandlComponent } from './pandl.component';

describe('PandlComponent', () => {
  let component: PandlComponent;
  let fixture: ComponentFixture<PandlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PandlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PandlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
