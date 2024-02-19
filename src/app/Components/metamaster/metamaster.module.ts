import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MetamasterRoutingModule} from './metamaster-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MetamasterRoutingModule,
    SharedModule
  ],
  declarations: []
})
export class MetamasterModule { }
