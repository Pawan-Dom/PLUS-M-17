import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingRoutingModule } from './tracking-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TrackingComponent } from './tracking.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { GoogleMapsModule } from '@angular/google-maps';
import { QuotationService } from '../../Services/quotation.service';
import { TransactionService } from '../../Services/transaction.service';
import { CommonService } from '../../Services/common.service';
import { NotificationsService } from 'angular2-notifications';
import { TrackingService } from '../../Services/tracking.service';
import { LicenseCategoryService } from '../../Services/licensecategory.service';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  imports: [
    CommonModule,
    TrackingRoutingModule,
    SharedModule,
    NgSelectModule,
    GoogleMapsModule,
    FormsModule
  ],
  declarations: [TrackingComponent],
  providers: [
    NotificationsService,
    CommonService,
    QuotationService,
    TransactionService,
    TrackingService,
    LicenseCategoryService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
})
export class TrackingModule {}
