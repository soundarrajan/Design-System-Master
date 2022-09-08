import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsManualMatchComponent } from './movements-manual-match.component';

describe('MovementsManualMatchComponent', () => {
  let component: MovementsManualMatchComponent;
  let fixture: ComponentFixture<MovementsManualMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsManualMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsManualMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
