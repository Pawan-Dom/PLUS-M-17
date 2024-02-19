import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetamasterListComponent } from './metamaster-list.component';
import {MetamasterListRoutingModule} from './metamaster-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { FormsModule  } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonService } from '../../../Services/common.service';
import { NotificationsService } from 'angular2-notifications';
import { QuotationService } from '../../../Services/quotation.service';

@NgModule({
  imports: [
    CommonModule,
    MetamasterListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [MetamasterListComponent],
  providers: [NotificationsService,CommonService ,QuotationService] 

})
export class MetamasterListModule { }
