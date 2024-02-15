import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetamasterComponent } from './metamaster.component';

describe('MetamasterComponent', () => {
  let component: MetamasterComponent;
  let fixture: ComponentFixture<MetamasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetamasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetamasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
