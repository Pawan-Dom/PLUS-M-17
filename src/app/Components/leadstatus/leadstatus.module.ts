import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LeadstatusRoutingModule} from './leadstatus-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../Services/common.service';
import { QuotationService } from '../../Services/quotation.service';
import { TransactionService } from '../../Services/transaction.service';
import { LicenseCategoryService } from '../../Services/licensecategory.service';
import { LeadstatusService } from '../../Services/leadstatus.service';

@NgModule({
  imports: [
    CommonModule,
    LeadstatusRoutingModule,
    SharedModule
  ],
  declarations: [],
  providers: [NotificationsService,CommonService ,QuotationService,TransactionService,LicenseCategoryService,LeadstatusService] 

})
export class LeadstatusModule { }
