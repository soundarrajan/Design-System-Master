import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropshipListComponent } from './dropship-list.component';

describe('DropshipListComponent', () => {
  let component: DropshipListComponent;
  let fixture: ComponentFixture<DropshipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropshipListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropshipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
