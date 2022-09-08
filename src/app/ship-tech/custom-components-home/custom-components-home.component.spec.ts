import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomComponentsHomeComponent } from './custom-components-home.component';

describe('CustomComponentsHomeComponent', () => {
  let component: CustomComponentsHomeComponent;
  let fixture: ComponentFixture<CustomComponentsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomComponentsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomComponentsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
