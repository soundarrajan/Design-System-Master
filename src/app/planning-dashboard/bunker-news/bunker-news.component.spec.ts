import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BunkerNewsComponent } from './bunker-news.component';

describe('BunkerNewsComponent', () => {
  let component: BunkerNewsComponent;
  let fixture: ComponentFixture<BunkerNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BunkerNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BunkerNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
