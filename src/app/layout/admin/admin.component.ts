import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
 
})
export class AdminComponent implements OnInit {

  constructor() {
   
    console.log('init app');
   
        
  }

  ngOnInit() {
  
    //this.setBackgroundPattern('pattern1');
}
}