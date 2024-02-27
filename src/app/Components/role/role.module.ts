import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoleRoutingModule} from './role-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RoleRoutingModule,
    SharedModule,
    NgbModule
  ],
  declarations: []
})
export class RoleModule { }
