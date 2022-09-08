import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PandltreeComponent } from './pandltree.component';

describe('PandltreeComponent', () => {
  let component: PandltreeComponent;
  let fixture: ComponentFixture<PandltreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PandltreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PandltreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
