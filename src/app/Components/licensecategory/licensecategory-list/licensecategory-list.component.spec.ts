import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCategoryListComponent } from './licensecategory-list.component';

describe('UserListComponent', () => {
  let component: LicenseCategoryListComponent;
  let fixture: ComponentFixture<LicenseCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
