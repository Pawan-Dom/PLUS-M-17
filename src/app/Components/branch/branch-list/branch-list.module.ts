import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchListComponent } from './branch-list.component';
import {BranchListRoutingModule} from './branch-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { FormsModule  } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationsService } from 'angular2-notifications';
import { CommonService } from '../../../Services/common.service';
import { QuotationService } from '../../../Services/quotation.service';

@NgModule({
  imports: [
    CommonModule,
    BranchListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [BranchListComponent],
  providers: [CommonService ] 

})
export class BranchListModule { }
