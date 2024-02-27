import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BranchRoutingModule} from './branch-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { CommonService } from '../../Services/common.service';

@NgModule({
  imports: [
    CommonModule,
    BranchRoutingModule,
    SharedModule
  ],
  declarations: [],
  providers:[CommonService]
})
export class BranchModule { }
