import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuturesListComponent } from './futures-list.component';

describe('FuturesListComponent', () => {
  let component: FuturesListComponent;
  let fixture: ComponentFixture<FuturesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuturesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
