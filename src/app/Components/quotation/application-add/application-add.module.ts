import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationAddComponent } from './application-add.component';
import {ApplicationAddRoutingModule} from './application-add-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ArchwizardModule} from 'ng2-archwizard/dist';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    ApplicationAddRoutingModule,
    SharedModule,
    NgxDatatableModule,
    SharedModule,
    FormsModule, ReactiveFormsModule, 
  NgSelectModule
  ],
  declarations: [] 
}) 
export class ApplicationAddModule { }
