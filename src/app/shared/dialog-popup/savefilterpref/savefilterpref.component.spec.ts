import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavefilterprefComponent } from './savefilterpref.component';

describe('SavefilterprefComponent', () => {
  let component: SavefilterprefComponent;
  let fixture: ComponentFixture<SavefilterprefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavefilterprefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavefilterprefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
