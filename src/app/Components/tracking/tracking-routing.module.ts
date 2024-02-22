import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
 

import {TrackingComponent} from './tracking.component';


const routes: Routes = [
    {
      path: '',
      component: TrackingComponent,
      data: {
        title: 'Tracking ',
        icon: 'ti-widgetized',
        caption: 'All PPL Tracking',
        status: true
      }
    }
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule { }
