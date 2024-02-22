import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingRoutingModule } from './tracking-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ArchwizardModule } from 'ng2-archwizard/dist';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { TrackingComponent } from './tracking.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmCoreModule } from '@agm/core';
import { TrackingService } from '../../Services/tracking.service';
import { TransactionService } from '../../Services/transaction.service';
import { QuotationService } from '../../Services/quotation.service';
import { CommonService } from '../../Services/common.service';
import { NotificationsService } from 'angular2-notifications';
import { LicenseCategoryService } from '../../Services/licensecategory.service';

@NgModule({
  imports: [
    CommonModule,
    TrackingRoutingModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
   
  ],
  declarations: [TrackingComponent],
  providers: [NotificationsService,CommonService ,QuotationService,TransactionService,TrackingService,LicenseCategoryService], 

})
export class TrackingModule { }
