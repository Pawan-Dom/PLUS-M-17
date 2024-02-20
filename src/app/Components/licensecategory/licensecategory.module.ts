import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LicenseCategoryRoutingModule} from './licensecategory-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    LicenseCategoryRoutingModule,
    SharedModule
  ],
  declarations: []
})
export class LicenseCategoryModule { }
