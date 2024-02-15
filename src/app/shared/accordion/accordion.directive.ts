import { filter } from 'rxjs/operators';
import { Directive, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AccordionLinkDirective } from './accordionlink.directive';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appAccordion]',
})
export class AccordionDirective implements OnInit, OnDestroy {
  protected navlinks: Array<AccordionLinkDirective> = [];
  private countState = 1;
  private _router!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this._router = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.countState = 0;
        this.navlinks.forEach((link: AccordionLinkDirective) => {
          if (link.group) {
            const routeUrl = this.getUrl();
            const currentUrl = routeUrl.split('/');
            if (currentUrl.indexOf(link.group) > 0) {
              link.open = true;
              this.closeOtherLinks(link);
            }
          }
        });
      });
  }

  ngOnDestroy(): void {
    this._router.unsubscribe();
  }

  closeOtherLinks(openLink: AccordionLinkDirective): void {
    this.countState++;
    if ((openLink.group !== 'sub-toggled' || openLink.group !== 'main-toggled') && this.countState === 1) {
      if (window.innerWidth < 768 || (window.innerWidth >= 768 && window.innerWidth <= 1024)) {
        const toggled_element = <HTMLElement>document.querySelector('#mobile-collapse');
        toggled_element.click();
      }
    }
    this.navlinks.forEach((link: AccordionLinkDirective) => {
      if (link !== openLink && (link.group === 'sub-toggled' || openLink.group !== 'sub-toggled')) {
        link.open = false;
      }
    });
  }

  addLink(link: AccordionLinkDirective): void {
    this.navlinks.push(link);
  }

  removeGroup(link: AccordionLinkDirective): void {
    const index = this.navlinks.indexOf(link);
    if (index !== -1) {
      this.navlinks.splice(index, 1);
    }
  }

  getUrl(): string {
    return this.router.url;
  }
}
