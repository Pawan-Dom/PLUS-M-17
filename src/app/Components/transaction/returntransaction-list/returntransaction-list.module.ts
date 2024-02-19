import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnTransactionListComponent } from './returntransaction-list.component';
import {ReturnTransactionListRoutingModule} from './returntransaction-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,NgSelectModule,
    ReturnTransactionListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [ReturnTransactionListComponent]
})
export class ReturnTransactionListModule { }
