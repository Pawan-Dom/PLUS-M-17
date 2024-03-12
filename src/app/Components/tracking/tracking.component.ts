// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'; // 1. Import NgForm
import { HttpClient, HttpParams } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { TrackingService } from '../../Services/tracking.service';
import { CommonService } from '../../Services/common.service';
import { LicenseCategoryService } from '../../Services/licensecategory.service';
import { BranchService } from '../../Services/branches.service';
import { QuotationService } from '../../Services/quotation.service';
import { UserService } from '../../Services/user.service';
import { Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

import { MapInfoWindow } from '@angular/google-maps';
 
interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  };
}
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
})
export class TrackingComponent {
  model:any={};
    loading=false;
    reports:any;
    users:any;
    branches:any;
    lcats:any;
    tempusers:any;
    usergpsdata:any;
 
    lat: number = 21.125681;
    lng: number = 82.79499799999996;

    mapOptions: google.maps.MapOptions = {
      center: { lat: 21.125681, lng: 82.79499799999996 },
      zoom: 5,
    };
    markers: MarkerProperties[] = [
      
    ];
    @ViewChild(MapInfoWindow, { static: true }) infoWindow!: MapInfoWindow;

    constructor(public trackingService:TrackingService,public commonService:CommonService,public licenseCategoryService:LicenseCategoryService,public branchService:BranchService,public quotationService:QuotationService,private userService:UserService) {
        this.model.report_type="allquotations";
        this.model.region='All';
       // this.model.start_date=new Date().toJSON().slice(0, 10)+'T00:00';
    //this.model.end_date=this.getTomorrow()+'T00:00';
   //  this.getReportList();
         this.getUsers();
     /*   this.getBranchList();
        this.getLcats();
*/
  this.getList();
    }

      getTomorrow() {
        let  today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate()+1);
        return tomorrow.toJSON().slice(0, 10);
    }

    getToday() {
        const tomorrow = new Date();
        //tomorrow.setDate(tomorrow.getDate() + 1); // even 32 is acceptable
        return `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`;
    }

    getList() {
      this.loading = true;
      let params = '';
      if (this.model.user_id) {
        params = params + '&user_id=' + encodeURIComponent(this.model.user_id);
      }
    
      if (this.model.start_date && this.model.end_date) {
        params = params + '&start_date=' + encodeURIComponent(this.model.start_date);
        params = params + '&end_date=' + encodeURIComponent(this.model.end_date);
      }
    
      this.trackingService.list(this.model).subscribe(
        (res: any[]) => {
          this.usergpsdata = res;
          // Clear existing markers
          this.markers = [];
          // Populate markers array with latitude and longitude from response
          this.usergpsdata.forEach((userData: any) => {
            if (userData.gpsdata && userData.gpsdata.lat && userData.gpsdata.lon) {
              const marker: MarkerProperties = {
                position: {
                  lat: parseFloat(userData.gpsdata.lat),
                  lng: parseFloat(userData.gpsdata.lon)
                }
              };
              this.markers.push(marker);
            }
          });
          console.log(this.usergpsdata);
          this.loading = false;
        }
      );
    }
    

    getUsers() {
      const storedUsers = sessionStorage.getItem('users');
    
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
        this.tempusers = this.users;
        console.log("hi sunil");
        console.log(this.users)
      } else {
        this.userService.list().subscribe(
          res => {
            this.users = res; 
            this.tempusers = this.users;
            console.log("hhhhhhhhhhhhhhhh") 
            console.log(this.tempusers)
          }
        );
      }
    }
    


      getBranchList(){
        this.branchService.list().subscribe(
          res => {
        this.branches=res;   
              }
      );
    }

    getLcats(){
        this.licenseCategoryService.list().subscribe(
            res => {
             // this.loading=false;
        this.lcats=res; 
        
            }
          );
    }

filterusers(){
    console.log(this.model.region);
    if(!this.model.region || this.model.region=='' || this.model.region=='All' || this.model.region=='all'){
        this.tempusers=this.users;
    } else {
       this.tempusers= this.users.filter((lc: any) => lc.region.toLowerCase() === this.model.region.toLowerCase());
    }

}

genReport(){
  if(this.model.report_type){} else {
      this.model.report_type='tallyinvoice'; 
  }
  if(this.loading){
      return 0;
  }
  this.loading=true;
  this.quotationService.genReport(this.model).subscribe(
      res => {
          this.loading=false;
          window.open(res['file_url'], '_blank');
      },
      error => {
          this.loading=false;
      }
  );
  // Add return statement here
  return; // Return void
}


    onMouseOver(infoWindow: any, gm: any) {
      if (gm.lastOpen != null) {
        gm.lastOpen.close();
      }
      gm.lastOpen = infoWindow;
      infoWindow.open();
    }
    onMarkerClick(marker: MarkerProperties) {
      // Set the position of the info window and open it
      this.infoWindow.position = marker.position;
      this.infoWindow.open();
    }
  
    // @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
    
}
