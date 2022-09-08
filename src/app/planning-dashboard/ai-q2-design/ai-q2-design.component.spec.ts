import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiQ2DesignComponent } from './ai-q2-design.component';

describe('AiQ2DesignComponent', () => {
  let component: AiQ2DesignComponent;
  let fixture: ComponentFixture<AiQ2DesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiQ2DesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiQ2DesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
