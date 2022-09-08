import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurableListingComponent } from './configurable-listing.component';

describe('ConfigurableListingComponent', () => {
  let component: ConfigurableListingComponent;
  let fixture: ComponentFixture<ConfigurableListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurableListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurableListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
