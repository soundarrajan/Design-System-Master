import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteWithSearchComponent } from './autocomplete-with-search.component';

describe('AutocompleteWithSearchComponent', () => {
  let component: AutocompleteWithSearchComponent;
  let fixture: ComponentFixture<AutocompleteWithSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteWithSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteWithSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
