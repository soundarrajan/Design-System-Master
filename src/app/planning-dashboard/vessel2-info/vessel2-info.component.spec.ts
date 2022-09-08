import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vessel2InfoComponent } from './vessel2-info.component';

describe('Vessel2InfoComponent', () => {
  let component: Vessel2InfoComponent;
  let fixture: ComponentFixture<Vessel2InfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vessel2InfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vessel2InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
