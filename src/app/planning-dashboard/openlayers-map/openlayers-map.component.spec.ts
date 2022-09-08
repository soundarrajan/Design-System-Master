import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenlayersMapComponent } from './openlayers-map.component';

describe('OpenlayersMapComponent', () => {
  let component: OpenlayersMapComponent;
  let fixture: ComponentFixture<OpenlayersMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenlayersMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenlayersMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
