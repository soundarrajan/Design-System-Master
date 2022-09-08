import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedJournalsComponent } from './related-journals.component';

describe('RelatedJournalsComponent', () => {
  let component: RelatedJournalsComponent;
  let fixture: ComponentFixture<RelatedJournalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedJournalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedJournalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
