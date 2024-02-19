import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditnoteListComponent } from './creditnote-list.component';
import {CreditnoteListRoutingModule} from './creditnote-list-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../shared/shared.module';
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../../Services/common.service';
import { QuotationService } from '../../../Services/quotation.service';

@NgModule({
  imports: [
    CommonModule,
    CreditnoteListRoutingModule,
    NgxDatatableModule,
    NgSelectModule,
    SharedModule,
    FormsModule,ReactiveFormsModule
  ],
  declarations: [CreditnoteListComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [NotificationsService,CommonService,QuotationService] 

})
export class CreditnoteListModule { }
