import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './role-list.component';
import {RoleListRoutingModule} from './role-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { FormsModule  } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../../Services/common.service';
import { QuotationService } from '../../../Services/quotation.service';
import { TransactionService } from '../../../Services/transaction.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    RoleListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    NgbModule,
  ],
  declarations: [RoleListComponent],
  providers: [NotificationsService,CommonService ,QuotationService,TransactionService] ,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class RoleListModule { }
