import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators'; 

@Component({
  selector: 'app-title',
  template: '<span></span>'
})
export class TitleComponent {
  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title) {
    this.router.events
      .pipe(filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        let currentRoute: ActivatedRoute | null = this.route.root;
        let title = '';
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null; 
          childrenRoutes.forEach(routes => {
            if (routes.outlet === 'primary') {
              title = routes.snapshot.data['title']; 
              currentRoute = routes;
            }
          });
        } while (currentRoute);
        if (title !== undefined) {
          this.titleService.setTitle(title + ' | PPL Licensing Management System');
        }
      });
  }
}
