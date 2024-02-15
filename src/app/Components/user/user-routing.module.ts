import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users',
      status: false
    },
    children: [
      {
        path: 'list',
        loadChildren: () => import('./user-list/user-list.module').then(m => m.UserListModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./user-add/user-add.module').then(m => m.UserAddModule)
      },
      {
        path: 'edit', // Assuming the edit route requires an ID parameter
        loadChildren: () => import('./user-edit/user-edit.module').then(m => m.UserEditModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
