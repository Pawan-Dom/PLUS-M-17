import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationListComponent } from './application-list.component';
import {ApplicationListRoutingModule} from './application-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../../Services/common.service';
import { QuotationService } from '../../../Services/quotation.service';
import { TransactionService } from '../../../Services/transaction.service';

@NgModule({
  imports: [
    CommonModule,
    ApplicationListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,ReactiveFormsModule
  ],
  declarations: [ApplicationListComponent],
  providers: [NotificationsService,CommonService ,QuotationService,TransactionService] 

})
export class ApplicationListModule { }
