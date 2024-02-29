import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperErrorsExampleComponent } from './stepper-errors-example.component';

describe('StepperErrorsExampleComponent', () => {
  let component: StepperErrorsExampleComponent;
  let fixture: ComponentFixture<StepperErrorsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepperErrorsExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepperErrorsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
