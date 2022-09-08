import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMasterHomeComponent } from './site-master-home.component';

describe('SiteMasterHomeComponent', () => {
  let component: SiteMasterHomeComponent;
  let fixture: ComponentFixture<SiteMasterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteMasterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteMasterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
