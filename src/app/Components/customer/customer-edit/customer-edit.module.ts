import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerEditComponent } from './customer-edit.component';
import {CustomerEditRoutingModule} from './customer-edit-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { NotificationsService } from 'angular2-notifications';


@NgModule({
  imports: [
    CommonModule,
    CustomerEditRoutingModule,
    SharedModule
  ],
  declarations: [CustomerEditComponent],
  providers: [NotificationsService] 

})
export class CustomerEditModule { }
