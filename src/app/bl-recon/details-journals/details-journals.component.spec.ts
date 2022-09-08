import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsJournalsComponent } from './details-journals.component';

describe('DetailsJournalsComponent', () => {
  let component: DetailsJournalsComponent;
  let fixture: ComponentFixture<DetailsJournalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsJournalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsJournalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
