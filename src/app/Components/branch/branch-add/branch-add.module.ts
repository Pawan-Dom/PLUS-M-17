import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchAddComponent } from './branch-add.component';
import {BranchAddRoutingModule} from './branch-add-routing.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BranchAddRoutingModule,
    SharedModule
  ],
  declarations: [BranchAddComponent]
})
export class BranchAddModule { }
