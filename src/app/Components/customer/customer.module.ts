import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../Services/common.service';
import { QuotationService } from '../../Services/quotation.service';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ],
  providers: [
    NotificationsService  ,
    CommonService,
    QuotationService
  ]
})
export class CustomerModule { }
