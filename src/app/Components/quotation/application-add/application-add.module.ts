import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationAddComponent } from './application-add.component';
import { ApplicationAddRoutingModule } from './application-add-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { ArchwizardModule } from 'ng2-archwizard/dist';
import { TransactionService } from '../../../Services/transaction.service';
import { QuotationService } from '../../../Services/quotation.service';
import { CommonService } from '../../../Services/common.service';
import { NotificationsService } from 'angular2-notifications';
import { AgmCoreModule } from '@agm/core'; // Import AgmCoreModule

@NgModule({
  imports: [
    CommonModule,
    ApplicationAddRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    
  ],
  declarations: [ApplicationAddComponent],
  providers: [
    NotificationsService,
    CommonService,
    QuotationService,
    TransactionService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApplicationAddModule { }
