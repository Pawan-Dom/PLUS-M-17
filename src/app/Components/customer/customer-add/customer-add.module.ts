import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAddComponent } from './customer-add.component';
import {CustomerAddRoutingModule} from './customer-add-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { NotificationsService } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    CustomerAddRoutingModule,
    SharedModule
  ],
  declarations: [CustomerAddComponent],
  providers: [NotificationsService] 

})
export class CustomerAddModule { }
