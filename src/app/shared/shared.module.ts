import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToggleFullScreenDirective } from './fullscreen/toggle-fullscreen.directive';
import { AccordionAnchorDirective } from './accordion/accordionanchor.directive';
import { AccordionLinkDirective } from './accordion/accordionlink.directive';
import { AccordionDirective } from './accordion/accordion.directive';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { CardToggleDirective } from './card/card-toggle.directive';
import { DataFilterPipe } from './elements/data-filter.pipe';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { ModalAnimationComponent } from './modal-animation/modal-animation.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { ProgressBarComponent } from './progressbar/progressbar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';



@NgModule({
  declarations: [
    ProgressBarComponent,
    ToggleFullScreenDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    CardComponent,
    ModalBasicComponent,
    ModalAnimationComponent,
    SpinnerComponent,
    DataFilterPipe
  ],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    ClickOutsideModule,
    
    NgSelectModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    ProgressBarComponent,
    ToggleFullScreenDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    HttpClientModule,
    CardComponent,
    NgSelectModule,
    ModalBasicComponent,
    ModalAnimationComponent,
    SpinnerComponent,
    ClickOutsideModule,
    DataFilterPipe,
    
  ],

})
export class SharedModule { }
