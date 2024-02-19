import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrackingRoutingModule} from './tracking-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import { HttpClient, HttpParams } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import {TrackingComponent} from './tracking.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TrackingService } from '../../Services/tracking.service';
import { CommonService } from '../../Services/common.service';
import { LicenseCategoryService } from '../../Services/licensecategory.service';
import { QuotationService } from '../../Services/quotation.service';

@NgModule({
  imports: [
    CommonModule,
    TrackingRoutingModule,
    SharedModule,
    NgSelectModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [TrackingComponent],
  providers: [ TrackingService,CommonService,LicenseCategoryService,QuotationService] 

})
export class TrackingModule { }
