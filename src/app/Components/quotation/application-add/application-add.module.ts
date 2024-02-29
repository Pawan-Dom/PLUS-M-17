import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationAddComponent } from './application-add.component';
import {ApplicationAddRoutingModule} from './application-add-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { ArchwizardModule, WizardStepComponent } from 'ng2-archwizard/dist';
import { TransactionService } from '../../../Services/transaction.service';
import { QuotationService } from '../../../Services/quotation.service';
import { CommonService } from '../../../Services/common.service';
import { NotificationsService } from 'angular2-notifications';
import { LicenseCategoryService } from '../../../Services/licensecategory.service';
import { LeadService } from '../../../Services/lead.service';
import { DocumentService } from '../../../Services/document.service';
<<<<<<< Updated upstream
import { WizardComponent as ArchWizardComponent } from 'ng2-archwizard/dist';
=======
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
>>>>>>> Stashed changes
@NgModule({
  imports: [
    CommonModule,
    ApplicationAddRoutingModule,
    SharedModule,
    NgxDatatableModule,
    SharedModule,
    FormsModule, ReactiveFormsModule, 
  NgSelectModule,
  MatStepperModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  




  ],
  declarations: [ApplicationAddComponent ] ,
<<<<<<< Updated upstream
  providers: [NotificationsService,CommonService ,QuotationService,TransactionService,LicenseCategoryService,DocumentService,LeadService], 
  schemas:[NO_ERRORS_SCHEMA]
=======
  providers: [NotificationsService,CommonService ,QuotationService,TransactionService,LicenseCategoryService,DocumentService,LeadService, {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { showError: true },
  },], 
  schemas:[CUSTOM_ELEMENTS_SCHEMA],

>>>>>>> Stashed changes
}) 
export class ApplicationAddModule { }
