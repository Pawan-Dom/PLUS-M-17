import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadstatusListComponent } from './leadstatus-list.component';
import {LeadstatusListRoutingModule} from './leadstatus-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { FormsModule  } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    LeadstatusListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule
  ],
  declarations: [LeadstatusListComponent]
})
export class LeadstatusListModule { }
