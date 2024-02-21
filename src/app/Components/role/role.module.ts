import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoleRoutingModule} from './role-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RoleRoutingModule,
    SharedModule
  ],
  declarations: []
})
export class RoleModule { }
