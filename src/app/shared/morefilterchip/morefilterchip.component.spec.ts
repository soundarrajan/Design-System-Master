import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorefilterchipComponent } from './morefilterchip.component';

describe('MorefilterchipComponent', () => {
  let component: MorefilterchipComponent;
  let fixture: ComponentFixture<MorefilterchipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorefilterchipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorefilterchipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
