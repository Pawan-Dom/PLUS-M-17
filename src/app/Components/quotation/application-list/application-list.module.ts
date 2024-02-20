import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationListComponent } from './application-list.component';
import {ApplicationListRoutingModule} from './application-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    ApplicationListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,ReactiveFormsModule
  ],
  declarations: []
})
export class ApplicationListModule { }
