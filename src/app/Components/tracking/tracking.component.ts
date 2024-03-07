import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { GoogleMap } from '@angular/google-maps';
import { MapInfoWindow } from '@angular/google-maps'; 

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
})
export class TrackingComponent {
  @ViewChild('gm') googleMap!: GoogleMap; // 7. Correct reference to google-map
  model: any = {};
  reports: any;
  usergpsdata: any[] = []; 
  loading: boolean = false;
  users: any;
  branches: any;
  lcats: any;
  tempusers: any;
 
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(
    public trackingService: TrackingService,
    public commonService: CommonService,
    public licenseCategoryService: LicenseCategoryService,
    public branchService: BranchService,
    public quotationService: QuotationService,
    private userService: UserService,
  ) {
    this.model.report_type = "allquotations";
    this.model.region = 'All';
    this.getUsers();
    this.getList(null); // Pass null initially
  }

  getList(form: NgForm | null) { // 3. Modify getList() to accept NgForm parameter
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
      (res: any) => {
        this.usergpsdata = res;
        this.loading = false;
      }
    );

    if (form) {
      form.resetForm(); // Reset the form if NgForm is provided
    }
  }

  getUsers() {
    let storedUsers = sessionStorage.getItem('users');
      
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      this.tempusers = this.users;
    } else {
      this.userService.list().subscribe(
        (res: any) => {
          this.users = res; 
          this.tempusers = this.users; 
        }
      );
    }
  }

  getBranchList() {
    this.branchService.list().subscribe(
      (res: any) => {
        this.branches = res;   
      }
    );
  }

  openInfoWindow(infoWindow: any) {
    infoWindow.open();
  }

  getLcats() {
    this.licenseCategoryService.list().subscribe(
      (res: any) => {
        this.lcats = res; 
      }
    );
  }

  filterusers() {
    console.log(this.model.region);
    if (!this.model.region || this.model.region === '' || this.model.region === 'All' || this.model.region === 'all') {
      this.tempusers = this.users;
    } else {
      this.tempusers = this.users.filter((lc: any) => lc.region.toLowerCase() === this.model.region.toLowerCase());
    }
  }

  genReport() {
    if (!this.model.report_type) {
      this.model.report_type = 'tallyinvoice';
    }
    
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.quotationService.genReport(this.model).subscribe(
      (res: { [x: string]: string | URL | undefined; }) => {
        this.loading = false;
        this.commonService.notify('info', 'Report Generated');
        window.open(res['file_url'], '_blank');
      },
      (error: any) => {
        this.loading = false;
      }
    );
  }

  onMouseOver(gm: any) {
    const infoWindow = gm.infoWindow; // 6. Use gm directly to get infoWindow

    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }

    gm.lastOpen = infoWindow;

    infoWindow.open();
  }

  
}
