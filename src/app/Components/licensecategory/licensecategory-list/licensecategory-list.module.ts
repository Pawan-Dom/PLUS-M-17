import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseCategoryListComponent } from './licensecategory-list.component';
import {LicenseCategoryListRoutingModule} from './licensecategory-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    LicenseCategoryListRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [LicenseCategoryListComponent]
})
export class LicenseCategoryListModule { }
