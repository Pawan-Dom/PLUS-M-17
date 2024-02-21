import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadRoutingModule } from './lead-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
   imports: [
    CommonModule,
    LeadRoutingModule,
    SharedModule
  ]
})
export class LeadModule { }
