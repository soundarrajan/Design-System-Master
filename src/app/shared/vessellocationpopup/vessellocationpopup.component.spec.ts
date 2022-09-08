import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VessellocationpopupComponent } from './vessellocationpopup.component';

describe('VessellocationpopupComponent', () => {
  let component: VessellocationpopupComponent;
  let fixture: ComponentFixture<VessellocationpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VessellocationpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VessellocationpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
