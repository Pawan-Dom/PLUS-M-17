import { Component, Input } from '@angular/core';

@Component({
  selector: 'progressbar',
  templateUrl: 'progressbar.html',
  styleUrls: ['progressbar.scss'],
})
export class ProgressBarComponent {

  @Input() progress!: number;

  constructor() {
  }
}
