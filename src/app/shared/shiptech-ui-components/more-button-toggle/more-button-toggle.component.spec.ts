import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreButtonToggleComponent } from './more-button-toggle.component';

describe('MoreButtonToggleComponent', () => {
  let component: MoreButtonToggleComponent;
  let fixture: ComponentFixture<MoreButtonToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreButtonToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreButtonToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
