import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EinvoicectRoutingModule} from './einvoicect-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../Services/common.service';
import { QuotationService } from '../../Services/quotation.service';
import { TransactionService } from '../../Services/transaction.service';
import { EinvoicectService } from '../../Services/einvoicect.service';

@NgModule({
  imports: [
    CommonModule,
    EinvoicectRoutingModule,
    SharedModule,
  ],
  declarations: [],
  providers: [NotificationsService,CommonService ,QuotationService,TransactionService,EinvoicectService] 

})
export class EinvoicectModule { }
