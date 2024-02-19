import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TransactionRoutingModule} from './transaction-routing.module';

import {SharedModule} from '../../shared/shared.module';
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../Services/common.service';
import { QuotationService } from '../../Services/quotation.service';
import { TransactionService } from '../../Services/transaction.service';

@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule
  ],
  declarations: [],
  providers: [NotificationsService,CommonService ,QuotationService,TransactionService] 

})
export class TransactionModule { }
