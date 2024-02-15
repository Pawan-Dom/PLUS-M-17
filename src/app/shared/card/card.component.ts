import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {cardToggle, cardClose, cardIconToggle} from './card-animation';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [cardToggle, cardClose, cardIconToggle],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {
  @Input() headerContent: string='';
  @Input() title: string='';
  @Input() blockClass: string='';
  @Input() cardClass: string='';
  @Input() classHeader = false;
  @Input() cardOptionBlock = false;
  cardToggle = 'expanded';
  loadCard: boolean = false;
  cardLoad: string = '';
  cardClose = 'open';
  fullCard: string='';
  fullCardIcon: string;
  isCardToggled = false;
  cardIconToggle: string;

  constructor() {
    this.fullCardIcon = 'fa-expand';
    this.cardIconToggle = 'an-off';
  }

  ngOnInit() {
    if (this.cardOptionBlock) {
      this.cardToggle = 'false';
    }
  }

  toggleCard(event: any) {
    this.cardToggle = this.cardToggle === 'collapsed' ? 'expanded' : 'collapsed';
  }

  toggleCardOption() {
    this.isCardToggled = !this.isCardToggled;
    this.cardIconToggle = this.cardIconToggle === 'an-off' ? 'an-animate' : 'an-off';
  }

  closeCard(event: any) {
    this.cardClose = this.cardClose === 'closed' ? 'open' : 'closed';
  }

  fullScreen(event: any) {
    this.fullCard = this.fullCard === 'full-card' ? '' : 'full-card';
    this.fullCardIcon = this.fullCardIcon === 'fa-expand' ? 'fa-compress' : 'fa-expand';
  }

  cardRefresh() {
    this.loadCard = true;
    this.cardLoad = 'card-load';
  
    setTimeout(() => {
      this.cardLoad = ''; 
      this.loadCard = false; 
    }, 3000);
  }
  
  
}
