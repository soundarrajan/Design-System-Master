import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderchipComponent } from './headerchip.component';

describe('HeaderchipComponent', () => {
  let component: HeaderchipComponent;
  let fixture: ComponentFixture<HeaderchipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderchipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderchipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
