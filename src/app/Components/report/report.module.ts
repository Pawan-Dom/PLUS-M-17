import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportRoutingModule} from './report-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import { HttpClient, HttpParams } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import {ReportComponent} from './report.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../Services/common.service';
import { QuotationService } from '../../Services/quotation.service';
import { TransactionService } from '../../Services/transaction.service';
import { LicenseCategoryService } from '../../Services/licensecategory.service';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    NgSelectModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [ReportComponent],
  providers: [NotificationsService,CommonService ,QuotationService,TransactionService,LicenseCategoryService] 

})
export class ReportModule { }
