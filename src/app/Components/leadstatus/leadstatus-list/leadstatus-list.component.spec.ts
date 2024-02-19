import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadstatusListComponent } from './leadstatus-list.component';

describe('LeadstatusListComponent', () => {
  let component: LeadstatusListComponent;
  let fixture: ComponentFixture<LeadstatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadstatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadstatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
