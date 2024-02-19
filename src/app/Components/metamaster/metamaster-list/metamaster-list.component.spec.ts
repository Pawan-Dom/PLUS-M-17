import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetamasterListComponent } from './metamaster-list.component';

describe('MetamasterListComponent', () => {
  let component: MetamasterListComponent;
  let fixture: ComponentFixture<MetamasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetamasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetamasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
