import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApplicationRoutingModule} from './quotation-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../Services/common.service';
import { QuotationService } from '../../Services/quotation.service';
import { TransactionService } from '../../Services/transaction.service';

@NgModule({
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    SharedModule,
  ],
  declarations: [],
  providers: [NotificationsService,CommonService ,QuotationService,TransactionService] ,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class ApplicationModule { }
