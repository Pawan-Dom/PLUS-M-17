import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityListComponent } from './city-list.component';
import {CityListRoutingModule} from './city-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { FormsModule  } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonService } from '../../../Services/common.service';
import { QuotationService } from '../../../Services/quotation.service';
import { NotificationsService } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    CityListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [CityListComponent],
  providers: [NotificationsService,CommonService,QuotationService] 


})
export class CityListModule { }
