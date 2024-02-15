// user-add/user-add.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
  import { UserAddComponent } from './user-add.component';
import { UserAddRoutingModule } from './user-add-routing.module';

@NgModule({
  declarations: [
    UserAddComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserAddRoutingModule,
  ]
})
export class UserAddModule { }
