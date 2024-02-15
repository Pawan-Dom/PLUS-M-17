// nav-bar.component.ts

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  // @Output() toggleSideMenuEvent = new EventEmitter<void>();
 // nav-bar.component.ts

@Output() onToggleSideMenu = new EventEmitter<void>();
drawer: any;

toggleSideMenu() {
  this.onToggleSideMenu.emit(); // Use onToggleSideMenu here
}

}
