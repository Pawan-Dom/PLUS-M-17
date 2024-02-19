import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankstatementListComponent } from './bankstatement-list.component';
import {BankstatementListRoutingModule} from './bankstatement-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../../Services/common.service';
import { QuotationService } from '../../../Services/quotation.service';
import { TransactionModule } from '../transaction.module';

@NgModule({
  imports: [
    CommonModule,
    BankstatementListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [BankstatementListComponent],
  providers: [NotificationsService,CommonService ,QuotationService,TransactionModule] 

})
export class BankstatementListModule { }
