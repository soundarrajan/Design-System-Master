import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetpriceRepublishComponent } from './setprice-republish.component';

describe('SetpriceRepublishComponent', () => {
  let component: SetpriceRepublishComponent;
  let fixture: ComponentFixture<SetpriceRepublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetpriceRepublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetpriceRepublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
