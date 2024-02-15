import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal-animation',
  templateUrl: './modal-animation.component.html',
  styleUrls: ['./modal-animation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalAnimationComponent implements OnInit {

  @Input() modalClass: string = ''; // Initialize with an empty string
  @Input() contentClass: string = ''; // Initialize with an empty string
  @Input() modalID: string = ''; // Initialize with an empty string
  @Input() backDrop: boolean = false; // Initialize with a default value

  constructor() { }

  ngOnInit() {
  }

  close(event: string) {
    document.querySelector('#' + event)?.classList.remove('md-show'); // Ensure querySelector doesn't return null
  }
}
