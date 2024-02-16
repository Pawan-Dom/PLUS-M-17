import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadRoutingModule } from './lead-routing.module'
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shared/shared.module';
import { FormsModule } from '@angular/forms'; 
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
   imports: [
    CommonModule,
    NgSelectModule,
    SharedModule,
    LeadRoutingModule,
    NgModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add CUSTOM_ELEMENTS_SCHEMA here

})
export class LeadModule { }
