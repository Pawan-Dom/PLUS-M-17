import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EinvoiceCtListComponent } from './einvoice-ct-list.component';

describe('EinvoiceCtListComponent', () => {
  let component: EinvoiceCtListComponent;
  let fixture: ComponentFixture<EinvoiceCtListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EinvoiceCtListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EinvoiceCtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
