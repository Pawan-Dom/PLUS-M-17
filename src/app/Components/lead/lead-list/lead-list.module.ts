import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadListRoutingModule } from './lead-list-routing.module';
import { LeadListComponent } from './lead-list.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { FormsModule  } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../../Services/common.service';
import { QuotationService } from '../../../Services/quotation.service';
import { TransactionService } from '../../../Services/transaction.service';
import { LeadService } from '../../../Services/lead.service';

@NgModule({
  declarations: [LeadListComponent],
  imports: [
    CommonModule,
    LeadListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule
    
  ],
  providers: [NotificationsService,LeadService,CommonService ,QuotationService,TransactionService] 

})
export class LeadListModule { }
