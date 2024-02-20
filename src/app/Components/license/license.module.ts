import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LicenseRoutingModule} from './license-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { QuotationService } from '../../Services/quotation.service';
import { TransactionService } from '../../Services/transaction.service';
import { CommonService } from '../../Services/common.service';

@NgModule({
  imports: [
    CommonModule,
    LicenseRoutingModule,
    SharedModule,
    
  ],
  declarations: [],

})
export class LicenseModule { }
