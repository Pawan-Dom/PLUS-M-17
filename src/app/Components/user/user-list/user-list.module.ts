import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { UserListRoutingModule } from './user-list-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalAnimationComponent } from '../../../shared/modal-animation/modal-animation.component';
import { SharedModule } from '../../../shared/shared.module';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from '../../../Services/auth.service';
import { AlertService } from '../../../Services/alert.service';
import { UserService } from '../../../Services/user.service';
import { CustomerService } from '../../../Services/customer.service';
import { RoleService } from '../../../Services/role.service';
import { CommonService } from '../../../Services/common.service';
import { MasterService } from '../../../Services/master.service';
import { BranchService } from '../../../Services/branches.service';
@NgModule({
  imports: [
    CommonModule,
    UserListRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [UserListComponent],
  providers: [NotificationsService , CommonService], // Add NotificationsService to the providers
  exports: [ModalAnimationComponent]
})
export class UserListModule {}
