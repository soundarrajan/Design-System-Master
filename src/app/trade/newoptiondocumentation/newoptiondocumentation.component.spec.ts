import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewoptiondocumentationComponent } from './newoptiondocumentation.component';

describe('NewoptiondocumentationComponent', () => {
  let component: NewoptiondocumentationComponent;
  let fixture: ComponentFixture<NewoptiondocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewoptiondocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewoptiondocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
