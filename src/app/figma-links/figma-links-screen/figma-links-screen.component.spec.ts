import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigmaLinksScreenComponent } from './figma-links-screen.component';

describe('FigmaLinksScreenComponent', () => {
  let component: FigmaLinksScreenComponent;
  let fixture: ComponentFixture<FigmaLinksScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigmaLinksScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigmaLinksScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
