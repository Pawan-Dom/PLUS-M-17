import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankstatementListComponent } from './bankstatement-list.component';

describe('BankstatementListComponent', () => {
  let component: BankstatementListComponent;
  let fixture: ComponentFixture<BankstatementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankstatementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankstatementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
