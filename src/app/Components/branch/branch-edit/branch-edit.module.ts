import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchEditComponent } from './branch-edit.component';
import {BranchEditRoutingModule} from './branch-edit-routing.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BranchEditRoutingModule,
    SharedModule
  ],
  declarations: [BranchEditComponent]
})
export class BranchEditModule { }
