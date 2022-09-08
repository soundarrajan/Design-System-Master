import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurableScreenHomeComponent } from './configurable-screen-home.component';

describe('ConfigurableScreenHomeComponent', () => {
  let component: ConfigurableScreenHomeComponent;
  let fixture: ComponentFixture<ConfigurableScreenHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurableScreenHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurableScreenHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
