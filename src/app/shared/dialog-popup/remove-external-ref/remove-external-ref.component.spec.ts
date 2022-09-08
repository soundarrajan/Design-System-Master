import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveExternalRefComponent } from './remove-external-ref.component';

describe('RemoveExternalRefComponent', () => {
  let component: RemoveExternalRefComponent;
  let fixture: ComponentFixture<RemoveExternalRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveExternalRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveExternalRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
