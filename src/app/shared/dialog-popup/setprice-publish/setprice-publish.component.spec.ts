import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetpricePublishComponent } from './setprice-publish.component';

describe('SetpricePublishComponent', () => {
  let component: SetpricePublishComponent;
  let fixture: ComponentFixture<SetpricePublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetpricePublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetpricePublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
