import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseListComponent } from './license-list.component';
import {LicenseListRoutingModule} from './license-list-routing.module';
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
    LicenseListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,ReactiveFormsModule
  ],
  declarations: [LicenseListComponent],
  providers: [NotificationsService,CommonService ,QuotationService,TransactionService] 

})
export class LicenseListModule { }
