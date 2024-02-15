import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationsService } from 'angular2-notifications';
import { CardComponent } from '@swimlane/ngx-charts';
import { SharedModule } from '../../shared/shared.module';
import { ModalAnimationComponent } from '../../shared/modal-animation/modal-animation.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [
  ],
  exports: [], // Add TitleComponent to exports array
})
export class UserModule { }
