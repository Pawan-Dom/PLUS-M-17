import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import { HttpClient, HttpParams } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { TrackingService } from '../../Services/tracking.service';
import { CommonService } from '../../Services/common.service';
import { LicenseCategoryService } from '../../Services/licensecategory.service';
import { BranchService } from '../../Services/branches.service';
import { QuotationService } from '../../Services/quotation.service';
import { UserService } from '../../Services/user.service';
import { AgmInfoWindow } from '@agm/core';


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
 
    lat: number = 51.678418;
    lng: number = 7.809007;

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

    getList(){
      this.loading=true;
      let params='';
      if(this.model.user_id){
        params=params+'&user_id='+encodeURIComponent(this.model.user_id);
    }

    if(this.model.start_date && this.model.end_date){
      params=params+'&start_date='+encodeURIComponent(this.model.start_date);
      params=params+'&end_date='+encodeURIComponent(this.model.end_date);
  }

        this.trackingService.list(this.model).subscribe(
			res => {
                
                 this.usergpsdata=res;
                 this.loading=false;
            }
            );
    }
    getUsers() {
      let storedUsers = sessionStorage.getItem('users');
    
      if (storedUsers !== null) {
          this.users = JSON.parse(storedUsers);
          this.tempusers = this.users; 
      } else {
          this.userService.list().subscribe(
              res => {
                  // this.loading = false;       
                  this.users = res; 
                  this.tempusers = this.users; 
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

genReport() {
  if (this.model.report_type) {
      // Continue with the function execution
  } else {
      this.model.report_type = 'tallyinvoice';
  }

  if (this.loading) {
      return 0;
  }

  this.loading = true;

  this.quotationService.genReport(this.model).subscribe(
      res => {
          this.loading = false;
          this.commonService.notify('info', 'Report Generated');
          window.open(res['file_url'], '_blank');
      },
      error => {
          this.loading = false;
      }
  );

  // Ensure a value is returned in all code paths
  return undefined;
}


onMouseOver(infoWindow: AgmInfoWindow, gm: { lastOpen: { close: () => void; } | null; }) {
  if (gm.lastOpen != null) {
      gm.lastOpen.close();
  }

  gm.lastOpen = infoWindow;

  infoWindow.open();
}

}