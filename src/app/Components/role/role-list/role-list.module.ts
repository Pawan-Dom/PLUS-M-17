import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './role-list.component';
import {RoleListRoutingModule} from './role-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { FormsModule  } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    RoleListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule
  ],
  declarations: [RoleListComponent]
})
export class RoleListModule { }
