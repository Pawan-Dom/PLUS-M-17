import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreditnoteRoutingModule} from './creditnote-routing.module';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { CommonService } from '../../Services/common.service';
import { NotificationsService } from 'angular2-notifications';
import { QuotationService } from '../../Services/quotation.service';

@NgModule({
  imports: [
    CommonModule,
    CreditnoteRoutingModule,
    SharedModule
  ],
  declarations: [],
  providers: [NotificationsService,CommonService,QuotationService] 

})
export class CreditnoteModule { }
