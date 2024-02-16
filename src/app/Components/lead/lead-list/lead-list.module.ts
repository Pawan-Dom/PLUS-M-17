import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadListRoutingModule } from './lead-list-routing.module';
import { LeadListComponent } from './lead-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [LeadListComponent], // Add LeadListComponent here
  imports: [
    CommonModule,
    LeadListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LeadListModule { }
