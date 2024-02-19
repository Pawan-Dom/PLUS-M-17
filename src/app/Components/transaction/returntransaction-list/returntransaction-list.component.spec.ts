import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnTransactionListComponent } from './returntransaction-list.component';

describe('TransactionListComponent', () => {
  let component: ReturnTransactionListComponent;
  let fixture: ComponentFixture<ReturnTransactionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnTransactionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
