import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list.component';
import {TransactionListRoutingModule} from './transaction-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonService } from '../../../Services/common.service';
import { QuotationService } from '../../../Services/quotation.service';
import { NotificationsService } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,NgSelectModule,
    TransactionListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [TransactionListComponent],
  providers: [NotificationsService,CommonService ,QuotationService] 

})
export class TransactionListModule { }
