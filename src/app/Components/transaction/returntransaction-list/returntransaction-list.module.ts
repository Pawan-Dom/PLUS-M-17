import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnTransactionListComponent } from './returntransaction-list.component';
import {ReturnTransactionListRoutingModule} from './returntransaction-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../../Services/common.service';
import { QuotationService } from '../../../Services/quotation.service';
import { TransactionModule } from '../transaction.module';
import { TransactionService } from '../../../Services/transaction.service';

@NgModule({
  imports: [
    CommonModule,NgSelectModule,
    ReturnTransactionListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [ReturnTransactionListComponent],
  providers: [NotificationsService,CommonService ,QuotationService,TransactionService] 

})
export class ReturnTransactionListModule { }
