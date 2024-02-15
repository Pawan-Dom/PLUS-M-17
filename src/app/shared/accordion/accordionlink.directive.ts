import { Directive, HostBinding, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { AccordionDirective } from './accordion.directive';

@Directive({
  selector: '[appAccordionLink]'
})
export class AccordionLinkDirective implements OnInit, OnDestroy {

  @Input() public group: any;

  @HostBinding('class.pcoded-trigger')
  @Input() open: boolean = false; // Initialize _open property

  protected nav: AccordionDirective;

  constructor(@Inject(AccordionDirective) nav: AccordionDirective) {
    this.nav = nav;
  }

  ngOnInit(): void {
    this.nav.addLink(this);
  }

  ngOnDestroy(): void {
    this.nav.removeGroup(this);
  }

  toggle(): void {
    /*for slimscroll on and off*/
    const navbar = document.querySelector('.pcoded-inner-navbar');
    if (navbar) {
      navbar.classList.add('scroll-sidebar');
    }

    this.open = !this.open;
    if (this.open) {
      this.nav.closeOtherLinks(this);
    }
  }
}
