import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EinvoiceCtListComponent } from './einvoice-ct-list.component';
import {EinvoiceCtListRoutingModule} from './einvoice-ct-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../../Services/common.service';
import { QuotationService } from '../../../Services/quotation.service';
import { TransactionService } from '../../../Services/transaction.service';
import { EinvoicectService } from '../../../Services/einvoicect.service';

@NgModule({
  imports: [
    CommonModule,
    EinvoiceCtListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,ReactiveFormsModule
  ],
  declarations: [EinvoiceCtListComponent],
  providers: [CommonService ,QuotationService,TransactionService,EinvoicectService] ,

})
export class EinvoiceCtListModule { }
