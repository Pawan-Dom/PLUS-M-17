import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './user-edit.component';
import { SharedModule } from '../../../shared/shared.module';
import { UserEditRoutingModule } from './user-edit-routing.module';

@NgModule({
  declarations: [UserEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserEditRoutingModule
    
  ]
})
export class UserEditModule { }

