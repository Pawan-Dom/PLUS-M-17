import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import { HttpClient, HttpParams } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../Services/common.service';
import { BranchService } from '../../Services/branches.service';
import { QuotationService } from '../../Services/quotation.service';
import { UserService } from '../../Services/user.service';
import { AuthService } from '../../Services/auth.service';
import { LicenseCategoryService } from '../../Services/licensecategory.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
   
})
export class ReportComponent {
    model:any={};
    loading=false;
    reports:any;
    users:any;
    branches:any;
    lcats:any;
    tempusers:any;
    region_ids: any;
    currentUser:any; 
    constructor(public commonService:CommonService,public licenseCategoryService:LicenseCategoryService,public branchService:BranchService,public quotationService:QuotationService,private userService:UserService, public authService:AuthService) {
        this.model.report_type="allquotations";
        this.model.region='All';
        this.model.start_date=new Date().toJSON().slice(0, 10);
    this.model.end_date=this.getTomorrow();
    this.currentUser=this.commonService.getCurrentUser();
       this.getReportList();
        this.getUsers();
        this.getBranchList();
        this.getLcats();
        this.motherRegion();

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

    getReportList(){
        this.quotationService.getreportlist().subscribe(
			res => {
                this.loading=false;
                 this.reports=res;
            }
            );
    }

    getUsers() {
      const usersData = sessionStorage.getItem('users');
      if (usersData !== null) {
          this.users = JSON.parse(usersData);
          this.tempusers = this.users;
      } else {
          this.userService.list().subscribe(
              res => {
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

genReport(): void {
  if (this.model.report_type) {
      // Add your logic here if needed
  } else {
      this.model.report_type = 'tallyinvoice';
  }
  
  if (this.loading) {
      return;
  }
  
  this.loading = true;
  //let params = "report_type=" + this.model.report_type + "&start_date=" + this.model.start_date + "&end_date=" + this.model.end_date;
  
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
}


  logevent(){
    this.model.action = 'Report_' +  this.model.report_type;
    console.log('action', this.model);
    this.authService.logevent(this.model).subscribe(
      (    res: any) => {
      console.log("logevent",res);
              // this.loading=false;
              // this.commonService.notify('info','Report Generated','Please Allow Popups in case of NoShow');
            
    },(error: any)=>{
              // this.loading=false;
          }
  );

  }

  // mother child regions
 motherRegion(){
  this.userService.motherchildregion().subscribe(
    res => {
      if(res.length>0){
        
       if(this.currentUser.role_id <= 71 || this.currentUser.role_id==81 ||this.currentUser.role_id==78){
        let abc = res.filter((r: { id: any; }) => this.currentUser.region_ids.includes(r.id));
        
        abc.filter((a: { parent_id: any; }) => {
          res.filter((r: { id: any; })=>{
             if(r.id == a.parent_id){
               if(!abc.includes(r)){
                abc.push(r);
               }               
             }
            })
        })

        var cr= abc.sort(function(a: { id: number; }, b: { id: number; }){return a.id - b.id});
        this.region_ids= cr;

      }else{
        this.region_ids= res;

      }
        console.log(this.currentUser,"current user");
        console.log(this.region_ids,'region');

        console.log(cr,'region');

      }  
    }
);
}
}