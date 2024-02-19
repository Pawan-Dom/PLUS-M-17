import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BranchRoutingModule} from './branch-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BranchRoutingModule,
    SharedModule
  ],
  declarations: []
})
export class BranchModule { }
