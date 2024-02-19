import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list.component';
import { CustomerListRoutingModule } from './customer-list-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../../Services/common.service';

@NgModule({
  imports: [
    CommonModule,
    CustomerListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [CustomerListComponent],
  providers: [NotificationsService,CommonService] // Add NotificationsService to the providers array
})
export class CustomerListModule { }
