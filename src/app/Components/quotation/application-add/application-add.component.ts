/// <reference types="@types/googlemaps" />
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core';
import { distinctUntilChanged, debounceTime, switchMap, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import swal, { SweetAlertResult } from 'sweetalert2';
// import {IOption} from 'ng-select';
import { Subject } from 'rxjs';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
//import {} from '@types/googlemaps';
import { Location } from '@angular/common';
import { WizardComponent } from 'ng2-archwizard/dist/components/';


import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { isStepOffset } from 'ng2-archwizard/dist';
import Swal from 'sweetalert2';
import { MasterService } from '../../../Services/master.service';
import { AuthService } from '../../../Services/auth.service';
import { QuotationService } from '../../../Services/quotation.service';
import { LeadService } from '../../../Services/lead.service';
import { DocumentService } from '../../../Services/document.service';
import { TransactionService } from '../../../Services/transaction.service';
import { LicenseCategoryService } from '../../../Services/licensecategory.service';
import { UserService } from '../../../Services/user.service';
import { CustomerService } from '../../../Services/customer.service';
import { CommonService } from '../../../Services/common.service';

@Component({
  selector: 'app-application-add',
  templateUrl: './application-add.component.html',
  styleUrls: ['./application-add.component.scss']
})
export class ApplicationAddComponent implements OnInit, OnDestroy {

  @ViewChild('search')
  public searchElement!: ElementRef;

  @ViewChild('wizard')
  public wizard!: WizardComponent;

  selectedOption = '3';
  pmode: any;
  nol = 0;//no fo licenses
  nol_bg = 0;
  nol_event = 0;

  saveinprogress = false;
  savetrinprogress = false;
  savedrinprogress = false;
  saveatiinprogress = false;
  savecninprogress = false;
  remainingPayment: any = -1;
  remainingPaymentS: any = -1;
  custompremium_cinemas = 0;
  defaultStepIndex = 0;
  customers: any = [];
  leads: any = [];
  venues: any = [];
  event_tag: any ;
  eventtypes: any = [];
  eventtag: any = [];
  cities: any = [];
  params: any = [];
  states: any = [];
  pickuplocations: any = [];
  tanmms: any = {};
  tagpi: any = [];


  lookupstate: any = '';

  raw: any;
  changeatds = false;
  quotation: any = {};
  tempitag:any={};
  showC = 1;
  activefilter = 'all';
  ltype = 'New';
  thankyou = false;
  intervaltimer: any;
  users: any;
  licenseCategories: any;
  templicenseCategories: any;
  selectedCustomer: any = {};
  selectedUser: any = {};
  selectedTransaction: any = {};
  selectedrTransaction: any = {};
  gststatecodes: any;
  eventtypesLoading=false;
  eventtagLoading=false;
  tempmodel: any = {};

  minamountfordiscount = 1;
  currentUser: any;
  is_addc = true;

  lead_lead_status_data :any;
  leadstatusdata:any;
  lead_status_id=0;
  activity_id=0;
  qvalues:any={};
  evidencefiles:any=[];
  queFlag = 0;
  contactinfoflag =0;
  regionflag =0;
  
  restrictcityclass='';
  currentcustomer :any;
  allevidence : any  = [];
  tempallevidence : any =[];
  cartevidence : any =[];
  imgprogress= 0;
  progressbarwidth: Number = 0;
  isloading = false;
  eviSelectedLc = [];
//  catGroupByFn = (item) => item.child.state;
catGroupByFn = (item: { version: string; }) => 'Version '+item.version+' :';
  filedata: any;
  cart_id: any;
  evidence_id: any;
  evidenceuploadfloag =0;
  saveEvidanceBtn =false;
  interest!: number;
  totalInterestf!: number;
  currentdate: any;
  public show: boolean;
  panstr :any;
  panApprvedFlag = 0;
  rejectedArray =[];
  pcgst: any;
  psgst: any;
  pigst: any;
  ptax: any;
  selectedLead :any = {};

  constructor(private location: Location, public masterService: MasterService, public authService: AuthService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private route: ActivatedRoute,
    private cd: ChangeDetectorRef, public router: Router, public userService: UserService, public commonService: CommonService, public quotationService: QuotationService,
    public customerService: CustomerService, public licenseCategoryService: LicenseCategoryService, public transactionService: TransactionService, public leadService : LeadService, public documentService:DocumentService,) {
    this.quotation.status = '';
    this.quotation.lead_id = 0;
    this.quotation.isPirChanged = 0;
    
    this.createLcId();
    this.currentUser = this.commonService.getCurrentUser();
    this.getData();
    //this.selectedTransaction.payment_method='ONLINE_PG1';


    //disabled current User
    // this.selectedUser=this.commonService.getCurrentUser();

    //get current customer 
    this.currentcustomer = this.commonService.getCurrentCustomer();
    if(this.currentcustomer){
      this.selectedCustomer = this.currentcustomer;
      this.customers[0]=this.currentcustomer;
      this.commonService.removeCurrentCustomer();
    }

    this.route.queryParams.subscribe(qp=>{
      console.log(qp,'query parameter');
      if(qp['lead_id']){
        this.quotation.lead_id=qp['lead_id'];
        this.getleaddata(qp['lead_id']);
        this.quotation.src='app';
      }
      if(qp['customer_id']){
        
        console.log(qp['customer_id']);
        this.getcustomerdata(qp['customer_id']);
       
      }
    })


    this.route.params.subscribe(
      params => {
        this.params = params;
       console.log("lead ques : " , params);
        //GetQuotationIfThere
        if (this.params.id) {
          this.is_addc = false;
          this.getQuotation(this.params.id,this.params.uuid);
          
        }

        // create NOC or PI
        if(params['type'] == 'noc'){
          this.quotation.noc = 1;
          this.quotation.extended_pi = false;
        }else{
          this.quotation.noc = 0;
        }

        // lead ques
        if(this.params.id){
          // this.quotation.id=params['id'];
          //this.getLeadstatusquestions(this.quotation.id,this.quotation.lead_id);
          this.getLeadstatusquestions(0);
        }  else{
          console.log("hello lead");
          // this.quotation.lead_id = 0;
          this.getLeadstatusquestions(0);
          
        }
      }
    );

    this.saveEvidanceBtn =false;
    this.show = false;
  }


  selectedLicenseCategory: any;
  custLoading = false;
  leadLoading = false;
  venueLoading = false;
  eventvenuetagLoading = false;
  eventtypeLoading = false;
  cityLoading = false;

  pickuplocationLoading = false;

  loading = false;
  loading1 = false;
  custTypeahead = new Subject<string>();
  leadTypeahead = new Subject<string>();
  
  custTypeaheadVenue = new Subject<string>();
  custTypeaheadEventvenuetag = new Subject<string>();


  custTypeaheadEventtypes = new Subject<string>();
  custTypeaheadEventtag = new Subject<string>();
  custTypeaheadCity = new Subject<string>();
  custTypeaheadeCityevent=new Subject<string>();
  custTypeaheadPickuplocation = new Subject<string>();


  premium_en: any = false;
  google: any;

  allSelectedLc: any = [];
  cnSlc: any = [];


  issuedLc: any = {};
  tax: any = 18;
  tds: any = 0;
  gst: any = 18;
  igst: any = 18;
  cgst: any = 9;
  sgst: any = 9;
  discount: any = 0;
  previewdiscount: any = 0;
  maxdiscount = 0;

  qstatus: any = 'draft';
  selectedLcidkey: any;
  selectCatTotal = 0;
  selectQuantity = 1;
  selectedSlc: any = {};

  ncustomer: any = {};

  createLcId() {
    this.selectedLcidkey = new Date().getTime();
    console.log(this.selectedLcidkey);
  }

  goBack() {
    // window.history.back();
    this.location.back();

    console.log('goBack()...');
  }

  getData() {

    //get eventtypes
    this.masterService.metasearch('', 'EVENTTYPE').subscribe(
      (      res: any) => {
        this.eventtypes = res;

      }
    );

    //get eventtag

    this.masterService.metasearch('', 'EVENTTAG').subscribe(
      (      res: any) => {
        this.eventtag = res;

      }
    );

    //get pickuplocations
    this.masterService.metasearch('', 'PICKUPLOCATION').subscribe(
      (      res: any) => {
        this.pickuplocations = res;

      }
    );

     //get pickuplocations
     this.masterService.metasearch('', 'PITAG').subscribe(
       (      res: any) => {
        this.tagpi = res;

      }
    );

    // this.loading=true;

    if (sessionStorage.getItem('users')) {

      this.users = JSON.parse(sessionStorage.getItem('users'));
     //if(this.currentUser.role.level >2) {
        this.users=this.users
      .filter((lc: any) => lc.active == 1);
    //}

    }
    else {
      //this.loading=true; 
      this.userService.list().subscribe(
        (        res: any) => {
          //    this.loading=false;       
          this.users = res; 
        //  if(this.currentUser.role.level >2) {
            this.users=this.users
          .filter((lc: any) => lc.active == 1);
       // }

        }
      );
    }

    this.quotationService.genGststatecodes().subscribe(
      (      res: any[]) => {
        //      this.loading=false;       
        this.gststatecodes = res;
        this.states = res.filter(
          book => book.hidden == 0);

      }
    );

    /*this.customerService.list().subscribe(
      res => {       
  this.customers=res; 
      }
    );*/

    //get License Categories
    console.log(this.currentUser);
    if (sessionStorage.getItem('lcs')) {
      let lcc= JSON.parse(sessionStorage.getItem('lcs'));
      
      if(this.currentUser.role.level >2) {
        lcc=lcc
    .filter((lc: any) => lc.active == 1);
  }

       this.licenseCategories = lcc;
          this.templicenseCategories = lcc;
      // this.loading=false;
    }
    else {
      this.licenseCategoryService.list().subscribe(
        (        res: any[]) => {
          let lcc=res;
             if(this.currentUser.role.level >2) {
              lcc=res
          .filter((lc: any) => lc.active == 1);
        } 

          // this.loading=false;
          this.licenseCategories = lcc;
          this.templicenseCategories = lcc;

        }
      );
    }

  }
  
  getcustomerdata(id: any){

    this.customerService.search(id).subscribe(
      (      res: any[]) => {
          
        if(res){
          this.selectedCustomer=res[0];
        }  
        

      }
    );

  }

  getleaddata(id: string){

    this.leadService.leadsearch('searchq='+id).subscribe((res: { rows: string | any[]; })=>{
      console.log(res, 'selectedlead')
      if(res.rows.length>0){
        
        this.selectedLead = res.rows[0];
        this.setLeadInfo();
      }
    })

  }

  checktanmms() {
    if (this.selectedCustomer.tan) {
      this.masterService.metasearch(this.selectedCustomer.tan, 'LDC').subscribe(
        (        res: any[]) => {
          if (res) {
            if (res[0]) {
              //  this.commonService.notify('info','TAN LDC Found in Master');
              this.tanmms = res[0];
            }
            else {
              //  this.commonService.notify('info','TAN LDC Not Found in Master');
              this.tanmms = {};
            }
          } else {
            this.tanmms = {};

            //this.commonService.notify('info','TAN LDC Not Found in Master');
          }

        }
      );
    }
  }

  getCatTotalFF(cslc: { cattotal: number; no_of_usages: number; quantity: number; usage_multiplier: number; cn_amount: number; }) {
    // console.log('g');
    let ff = cslc.cattotal * cslc.no_of_usages * cslc.quantity * cslc.usage_multiplier;

    let re = ff - Math.round(ff * this.discount / 100);
    //    console.log(re);
    cslc.cn_amount = re;
    // return re;
  }

  getQuotation(id: string,uuid: string) {
    this.changeatds = false;
    this.loading = true;
    this.saveEvidanceBtn =false;
    this.quotationService.getSingle(id,uuid).subscribe(
      res => {
        this.loading = false;
        // console.log(res);
        let tempPiFlag = this.quotation.isPirChanged;
        this.quotation = res;
        // console.log("All quotation information data: ", this.quotation);
        this.quotation.isPirChanged = tempPiFlag;
        let dj = JSON.parse(res.debugjson);
        console.log(dj);
        if(dj.selectedLead){
          this.selectedLead=dj.selectedLead;
        }else{
          this.leadService.leadsearch('searchq='+dj.lead_id).subscribe(res=>{
            console.log(res, 'selectedlead')
            if(res.rows.length>0){
              this.selectedLead = res.rows[0];
            }
          })
        }
        this.allSelectedLc = dj.allSelectedLc;
        this.cnSlc = dj.allSelectedLc;
        // this.discount=parseInt(dj.discount);
        this.pcgst=res.cgst;
        this.psgst=res.sgst;
        this.pigst=res.igst;
        this.ptax=res.tax;
       
        
        this.discount = dj.discount;
        this.tds = dj.tds;
        let ff = 0;
        for (let p in this.allSelectedLc) {
          //this.allSelectedLc[p].cattotal=this.getCatTotal(this.allSelectedLc[p]);
          ff = this.allSelectedLc[p].cattotal * this.allSelectedLc[p].no_of_usages * this.allSelectedLc[p].quantity * this.allSelectedLc[p].usage_multiplier;
          this.allSelectedLc[p].cattotalfinalwithoutdiscount = ff;
          this.allSelectedLc[p].cattotalfinalwithall = ff - Math.round(ff * this.discount / 100);
        }

        this.refreshCustomPremium();
        //     if({
        //    this.showC=1;
        //  this.wizard.model.navigationMode.goToStep(0);
        //}
        if (res.status === 'pending' || (res.status === 'paid' && this.currentUser.role.level < 4)) {
          this.showC = 1;
          this.wizard.model.navigationMode.goToStep(2);
        } else {
          this.wizard.model.navigationMode.goToStep(1);
        }
        if (res.status === 'paid' || res.atir_status === 'approve') {
          // this.wizard.model.navigationMode.goToStep(2);
          if (res.issuedlcjson.toString().length > 4) {

            this.issuedLc = JSON.parse(res.issuedlcjson);
            console.log(this.issuedLc);
          } else {
            this.issuedLc.slcs = dj.allSelectedLc;
            this.issuedLc.quotation_id = this.quotation.id;

            let lfields: any = {};
            for (let i in this.issuedLc.slcs) {
              this.issuedLc.slcs[i].issuedLc = [];
              for (let j = 0; j < this.issuedLc.slcs[i].quantity; j++) {

                //Fixing for predefined MultiInvoice
                let clstatus = false;
                /*if(this.issuedLc.slcs[i].cancel_license){
                  if(this.issuedLc.slcs[i].cancel_license===true){
                  clstatus=this.issuedLc.slcs[i].cancel_license;
                  }
                }*/
                this.issuedLc.slcs[i].l_address ? this.issuedLc.slcs[i].l_address = this.issuedLc.slcs[i].l_address : this.issuedLc.slcs[i].l_address = '';
                //            let addr=dj.selectedCustomer.address_line_1+", "+dj.selectedCustomer.address_line_2+", "+dj.selectedCustomer.address_line_3+", "+dj.selectedCustomer.city+', '+dj.selectedCustomer.state+', '+dj.selectedCustomer.pincode;
                //console.log(this.issuedLc.slcs[i]);
                //           this.issuedLc.slcs[i].issuedLc.push();
                lfields = { cancel_license: clstatus, notes: this.issuedLc.slcs[i].notes,cat_description: this.issuedLc.slcs[i].cat_description, name: this.issuedLc.slcs[i].l_name, l_name: this.issuedLc.slcs[i].l_name, pincode: this.issuedLc.slcs[i].l_pincode, address: this.issuedLc.slcs[i].l_address, l_address_line_1: this.issuedLc.slcs[i].l_address_line_1, l_address_line_2: this.issuedLc.slcs[i].l_address_line_2, l_address_line_3: this.issuedLc.slcs[i].l_address_line_3, l_state: this.issuedLc.slcs[i].l_state, l_city: this.issuedLc.slcs[i].l_city, l_pincode: this.issuedLc.slcs[i].l_pincode, l_franchise: this.issuedLc.slcs[i].l_franchise };
                if (this.issuedLc.slcs[i].cat_type === 'event') {
                  // this.issuedLc.slcs[i].issuedLc.push(lfields,{event_name:this.issuedLc.slcs[i].event_name ,event_type:this.issuedLc.slcs[i].event_type ,event_start_datetime:this.issuedLc.slcs[i].event_start_datetime,event_end_datetime:this.issuedLc.slcs[i].event_end_datetime,event_extra:this.issuedLc.slcs[i].event_extra,event_venue:this.issuedLc.slcs[i].event_venue,event_location:this.issuedLc.slcs[i].event_location,event_city:this.issuedLc.slcs[i].event_city,event_state:this.issuedLc.slcs[i].event_state});
                  lfields = { ...lfields, event_name: this.issuedLc.slcs[i].event_name, event_type: this.issuedLc.slcs[i].event_type,event_tag:this.issuedLc.slcs[i].event_tag, event_start_datetime: this.issuedLc.slcs[i].event_start_datetime, event_end_datetime: this.issuedLc.slcs[i].event_end_datetime, event_extra: this.issuedLc.slcs[i].event_extra, event_venue: this.issuedLc.slcs[i].event_venue, event_location: this.issuedLc.slcs[i].event_location, event_city: this.issuedLc.slcs[i].event_city, event_state: this.issuedLc.slcs[i].event_state };
                }

                this.issuedLc.slcs[i].issuedLc.push(lfields);
                //else{
                // this.issuedLc.slcs[i].issuedLc.push({name:dj.selectedCustomer.name ,address:addr,notes:''});

                //}

              }

              console.log(this.issuedLc.slcs[i].issuedLc);
            }
          }
        }

        this.selectedUser = dj.selectedUser;
        // console.log(dj.subregion, "");


        // evidence upload remove
        

        // get all evidence data
        if(res.evidence){
          this.evidence_id =res.evidence.id;
          console.log('all cart',this.allSelectedLc);
          let edj = JSON.parse(res.evidence.evdebugjson);
          this.eviSelectedLc = edj.eviSelectedLc;
          console.log('evd all cart',this.eviSelectedLc);
          this.allevidence = edj.allevidence;
          for (let i = 0; i < this.allSelectedLc.length; i++) {
              for (let j = 0; j < this.eviSelectedLc.length; j++) {
                if((this.allSelectedLc[i] == this.allSelectedLc[j]) && this.eviSelectedLc[j].cartevidence){
                  let cartevidence = this.eviSelectedLc[j].cartevidence
                  // this.allSelectedLc[i].push(cartevidence); 
                  this.allSelectedLc[i].cartevidence = cartevidence;
                }
              }
          }
          console.log('final evd all cart',this.allSelectedLc);
        }
        // else{
        //   this.eviSelectedLc = this.allSelectedLc; 
        // }

        if(this.allevidence){
          for (let i = 0; i < this.allevidence.length; i++) {
            this.allevidence[i].checked = false;
          }
          console.log('allevidence checked', this.allevidence);
  
        }
        

        // this.eviSelectedLc = dj.allSelectedLc;


        //this.raw.approver_name=this.selectedUser.approver_user.name;
        // console.log(this.selectedUser);
        if (this.quotation.transaction) {
          //this.selectedTransaction=this.quotation.transaction;
        }


        // console.log(this.selectedUser);
        // console.log('max',max);
        this.maxdiscount = parseInt(this.quotation.user.discount);
        //this.previewdiscount=this.maxdiscount;
        //check if Approved More QUotation
        if (this.quotation.dr_status === 'approve') {
          this.maxdiscount = this.quotation.dr_discount;
        }
        //  console.log(this.discount);
        if (this.discount < 1) {
          this.previewdiscount = this.maxdiscount;
        } else {
          this.previewdiscount = this.discount;
        }
        this.selectedCustomer = dj.selectedCustomer;
        // console.log('cust', this.selectedCustomer);
        if(dj.selectedCustomer.pan){
          this.panstr = dj.selectedCustomer.pan.substring(0,5);
          console.log('cust panstr',this.panstr);
        }

        // Region changes
        if(dj.subregion){
          this.quotation.subregion=dj.subregion;
        }
        this.regionflag =1;

        // if qvalue exit 
        if(dj.qvalues){
          this.qvalues = dj.qvalues;
          this.contactinfoflag = 1; 
          console.log("qvalues:",this.qvalues);
        }

        // Extended PI Flag set covid impact
        if(this.quotation.extended_pi && this.quotation.extended_pi ==1 ){
          this.quotation.extended_pi =true;
        }else{
          this.quotation.extended_pi =false;
        }

        //check for tan certificate info
        this.checktanmms();
        //     this.tds=this.sele
        this.quotation.debugjson = null;
        if(this.quotation.tax==12 && this.quotation.status!='paid' && this.quotation.atir_status!='approve' ){
          this.commonService.openModal('modalapirstrict');
        }

        //auto apply for noc
        if(this.quotation.status !='paid' && this.quotation.pir_status == 'approve' && this.quotation.dr_status == 'approve' && this.quotation.dr_discount >99)
        {
          this.commonService.notify('info','Prepairing NOC');
          this.previewdiscount=100;
          this.applyDiscount();
        }

        

        if(this.quotation.log_pitag.length > 1){
          let adate =new Date(this.quotation.log_pitag[0].created_on).toISOString().slice(0, 10);
          let bdate=new Date(this.quotation.log_pitag[1].created_on).toISOString().slice(0, 10);
          if((adate == bdate) && this.quotation.log_pitag[0].tag_name=='WILL PAY' && adate > '2023-12-01'){
              this.quotation.log_pitag.splice(0, 1);
          }
        }

     

        // Interst calculation start
        // if(res.is_renewal_pi ==1){
        //   this.interest = (18 / 365);
        //   this.totalInterestf =0;
        //   for (let p in this.allSelectedLc) {
        //     if(res.status === 'paid'){
        //       console.log('paid');
        //       this.allSelectedLc[p].latedays = this.daysDiff(this.allSelectedLc[p].start_date, res.invoice_date);
        //     }else{
        //       console.log('pending');
        //       let currentDate = new Date();
        //       this.allSelectedLc[p].latedays = this.daysDiff(this.allSelectedLc[p].start_date, currentDate);  
        //     }
  
        //     if(this.allSelectedLc[p].latedays >0){
        //       console.log("total days", this.allSelectedLc[p].latedays);
        //       var latedaysinterest = (this.allSelectedLc[p].latedays * this.interest);
        //       this.allSelectedLc[p].interesttotal = ((this.allSelectedLc[p].cattotalfinalwithoutdiscount * latedaysinterest )/ 100);
              
        //     }else{
        //       this.allSelectedLc[p].latedays = 0;
        //       this.allSelectedLc[p].interesttotal =0;
        //     }
        //     this.totalInterestf = this.totalInterestf + this.allSelectedLc[p].interesttotal;
        //   }
        // }
        
        // this.quotation.totalInterestfwithGst = this.getInterestTotal();
        // this.quotation.totalamountwithinterest = this.getQuoteFinalTotalWithInterest();
        // console.log(this.quotation, 'with GST');
        // interest calculation end  

        this.calculateRemaining();

       
      }
      
    );
  }

  ngOnDestroy() {
    if (this.intervaltimer) {
      clearInterval(this.intervaltimer);
    }
  }

  calculateRemaining() {
    let t = 0, ts = 0;
    for (let i in this.quotation.transactions) {
      t = t + parseInt(this.quotation.transactions[i].amount);

      if (this.quotation.transactions[i].status === 'success') {
        ts = ts + parseInt(this.quotation.transactions[i].amount);
      }

    }
    //Inerest calculation 
    // if(this.quotation.is_renewal_pi==1){
    //   this.remainingPayment = Math.round(this.quotation.totalamountwithinterest - t);
    //   this.remainingPaymentS = Math.round(this.quotation.totalamountwithinterest - ts);
    // }else{
    //   this.remainingPayment = Math.round(this.quotation.totalamount - t);
    //   this.remainingPaymentS = Math.round(this.quotation.totalamount - ts);
    // }
    this.remainingPayment = Math.round(this.quotation.totalamount - t);
    this.remainingPaymentS = Math.round(this.quotation.totalamount - ts);
  }

  ngOnInit() {
    //clear timer if any
    if (this.intervaltimer) {
      clearInterval(this.intervaltimer);
    }


    this.loadPeople3();

    let options = {
      /*types: ['establishment'],*/
      componentRestrictions: { country: "in" }
    };
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, options);

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          console.log(place);

          if (place.formatted_address) {
            this.selectedCustomer.address = place.formatted_address;
            let al = place.formatted_address.split(',');
            this.selectedCustomer.address_line_1 = al[0];
            this.selectedCustomer.address_line_2 = al[1];
          }

          if (place.formatted_phone_number) { this.selectedCustomer.phone = place.formatted_phone_number; }

          if (place.name) { this.selectedCustomer.name = place.name; }
          for (let i = 0; i < place.address_components.length; i++) {
            for (let j = 0; j < place.address_components[i].types.length; j++) {
              if (place.address_components[i].types[j] == "postal_code") {
                //document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
                console.log(place.address_components[i].long_name);
                this.selectedCustomer.pincode = place.address_components[i].long_name;
              }
              if (place.address_components[i].types[j] == "country") {
                //document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;

                this.selectedCustomer.country = place.address_components[i].long_name;
              }

              if (place.address_components[i].types[j] == "administrative_area_level_1") {
                //document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;

                this.selectedCustomer.state = place.address_components[i].long_name;
              }

              if (place.address_components[i].types[j] == "administrative_area_level_2") {
                //document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;

                this.selectedCustomer.city = place.address_components[i].long_name;
              }

              if (place.address_components[i].types[j] == "sublocality_level_1") {
                //document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;

                this.selectedCustomer.address_line_3 = place.address_components[i].long_name;
              }

            }
          }

        });
      });

    });
  }

  is_inmh() {

    if (this.selectedCustomer.state === 'mh' || this.selectedCustomer.state === 'maharashtra' || this.selectedCustomer.state === 'Maharashtra' || this.selectedCustomer.state === 'MAHARASHTRA') {
      return true;
    }
    else {
      return false;
    }
  }


  private loadPeople3() {
    //console.log('loadin callaed');
    this.custTypeahead.pipe(
      tap(() => this.custLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.customerService.search(term)),
    ).subscribe(x => {
      this.customers = x;
      this.custLoading = false;
      this.cd.markForCheck();
    }, () => {
      this.customers = [];
    });


    this.custTypeaheadEventtypes.pipe(
      tap(() => this.eventtypeLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.masterService.metasearch(term, 'EVENTTYPE')),
    ).subscribe(x => {
      this.eventtypes = x;
      this.eventtypeLoading = false;
      this.cd.markForCheck();
    }, () => {
      this.eventtypes = [];
    });

    this.custTypeaheadEventtag.pipe(
      tap(() => this.eventtagLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.masterService.metasearch(term, 'EVENTTAG')),
    ).subscribe(x => {
      this.eventtag = x;
      this.eventtagLoading = false;
      this.cd.markForCheck();
    }, () => {
      this.eventtag = [];
    });

    this.custTypeaheadVenue.pipe(
      tap(() => this.venueLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.masterService.metasearch(term, 'EVENTVENUE')),
    ).subscribe(x => {
      this.venues = x;
      console.log(this.venues);
      console.log(this.selectedSlc)
      this.venueLoading = false;
      this.cd.markForCheck();
    }, () => {
      this.venues = [];
    });
    
    // this.custTypeaheadEventvenuetag.pipe(
    //   tap(() => this.eventvenuetagLoading = true),
    //   distinctUntilChanged(),
    //   debounceTime(200),
    //   switchMap(term => this.masterService.metasearch(term, 'EVENTVENUETAG')),
    // ).subscribe(x => {
    //   this.event_venue_tag = x;
    //   this.eventvenuetagLoading = false;
    //   console.log(this.event_venue_tag)
    //   this.cd.markForCheck();
    // }, () => {
    //   this.event_venue_tag = [];
    // });


    this.custTypeaheadPickuplocation.pipe(
      tap(() => this.pickuplocationLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.masterService.metasearch(term, 'PICKUPLOCATION')),
    ).subscribe(x => {
      this.pickuplocations = x;
      this.pickuplocationLoading = false;
      this.cd.markForCheck();
    }, () => {
      this.pickuplocations = [];
    });


    this.custTypeaheadCity.pipe(
      tap(() => this.cityLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.masterService.citysearch(term + '&state=' + this.lookupstate+ '&class=' + this.restrictcityclass)),
    ).subscribe(x => {
      this.cities = x;
      this.cityLoading = false;
      this.cd.markForCheck();
    }, () => {
      this.cities = [];
    });

    this.custTypeaheadeCityevent.pipe(
      tap(() => this.cityLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.masterService.citysearch(term + '&state=' + this.lookupstate+ '&class=')),
    ).subscribe(x => {
      this.cities = x;
      this.cityLoading = false;
      this.cd.markForCheck();
    }, () => {
      this.cities = [];
    });

    this.leadTypeahead.pipe(
      tap(() => this.leadLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.leadService.leadsearch('searchq='+term)),
    ).subscribe(x => {
      this.leads = x.rows;
      console.log(this.leads);
      this.leadLoading = false;
      this.cd.markForCheck();
    }, () => {
      this.leads = [];
    });

  }





  cart_add() {
    if (!this.checkcaneditcartitems()) {
      return 0;
    }
    if (!this.validate_start_end_date(this.selectedSlc)) {
      console.log('its false');
      return false;
    }

    console.log("event sub types", this.selectedSlc);
        
    //it checking required field
    if(this.selectedSlc.custom_fields){

      let temp = this.selectedSlc.custom_fields;
      console.log( typeof this.selectedSlc.custom_fields);

    // if(typeof this.selectedSlc.custom_fields == 'object'){
    //   temp = Object.values(this.selectedSlc.custom_fields);
    //   //temp = [this.selectedSlc.custom_fields];
    // }
    console.log(temp);
     
      let rfs=temp.filter((el: { is_required: string; setcartvalue: any; }) =>  el.is_required == "1" && !el.setcartvalue && this._can_show_condition_field(this.selectedSlc,el));
      console.log(rfs);
      if(rfs.length > 0){
        this.commonService.notify('error', 'Please Provide all Information');
        console.log('A');
        return false;
      }
      console.log('rfs');

      // let rfss=temp.filter(el => el.is_required ==1 && el.setcartvalue && parseInt(el.conditional_category_field_value_id) > 0 );
      // console.log(rfss);
      // if(rfss.length == 0){
      //   this.commonService.notify('error', 'Please Provide all Information');
      //   console.log('B');
      //   return false;
      // }
    }

    if(this.selectedSlc.id==148 || this.selectedSlc.id==149){


      if(this.selectedSlc.custom_fields[0].setcartvalue > 60 &&  this.selectedSlc.custom_fields[1].setcartvalue.name=='Yes' ){
        //console.log(this.selectedSlc.custom_fields[1].setcartvalue);
        //this.selectedSlc.custom_fields[1].setcartvalue=null;
        this.commonService.notify('error', 'If Restaurant is serving Alcohol and seats mentioned are more than 60 kindly refer categroy 48');
        return false;
      }

      
    }
    
    //check mandatory items for Events
    if (this.selectedSlc.cat_type == 'event') {

      if(this.selectedSlc.id != '46' && this.selectedSlc.event_name && this.selectedSlc.event_type && this.selectedSlc.event_tag && this.selectedSlc.event_state && this.selectedSlc.event_city && this.selectedSlc.l_state && this.selectedSlc.l_city && this.selectedSlc.event_venue && this.selectedSlc.event_start_datetime && this.selectedSlc.l_name && this.selectedSlc.l_pincode  ){
        
      }else if(this.selectedSlc.id == '46' && this.selectedSlc.event_name && this.selectedSlc.event_type  && this.selectedSlc.eventsubtypes && this.selectedSlc.event_state && this.selectedSlc.event_city && this.selectedSlc.l_state && this.selectedSlc.l_city && this.selectedSlc.event_venue && this.selectedSlc.event_start_datetime && this.selectedSlc.l_name && this.selectedSlc.l_pincode ){
       
      }else {
      console.log('its event1');

          this.commonService.notify('error', 'Please Provide all Information About Event');
          return 0;
      }

      if(this.selectedSlc.id == '112' && !this.selectedSlc.cat_description ){
          this.commonService.notify('error', 'Please Provide category description Information About Event');
          return 0;
         } 

    } else {

      if (this.selectedSlc.start_date && this.selectedSlc.end_date && this.selectedSlc.l_name && this.selectedSlc.l_address_line_1 && this.selectedSlc.l_pincode && this.selectedSlc.l_state && this.selectedSlc.l_city) {
      } else {
        this.commonService.notify('error', 'Please Provide all Information About Background License');
        return 0;
      }
      if((this.selectedSlc.id == '134' || this.selectedSlc.id == '153' ) && !this.selectedSlc.cat_description){
          this.commonService.notify('error', 'Please Provide category description Information About Background License');
          return 0;
        } 

        if(this.selectedSlc.id == '153' && !this.selectedSlc.penalty_pino){
          this.commonService.notify('error', 'Please Provide PI No ');
          return 0;
        } 

    }

    this.quotation.isPirChanged = 1;
    this.selectedSlc.cancel_license = 0;
    this.selectedSlc.cattotal = this.getCatTotal(this.selectedSlc);
    this.selectedSlc.cattotalff = this.selectedSlc.cattotal;
    // if(this.cartevidence){
    //   this.selectedSlc.cartevidence = this.cartevidence;
    // }
   console.log(this.selectedSlc.cattotal ,"test");
    //this.selectedSlc.total_event_min=this.getCatTotal(this.selectedSlc,'total_event_min');
    console.log(this.selectedSlc);
    if (this.selectedSlc && this.selectedSlc.cattotal > 0) {
      /*  let copiedItem :any;
        copiedItem = Object.assign({}, copiedItem , this.selectedSlc );
    
        let copiedItem2 :any;
        copiedItem2 = Object.assign({}, copiedItem2 , this.selectedSlc );
    
        let copiedItem3 :any;
        copiedItem3 = Object.assign([], copiedItem3 , this.selectedSlc.custom_fields );
       
        copiedItem.custom_fields=copiedItem3;
    */
      let ss = JSON.parse(JSON.stringify(this.selectedSlc));
      this.allSelectedLc.push(ss);

      //this.selectedSlc=this.selectedLicenseCategory; 
      this.premium_en = false;
      //console.log(this.selectedSlc); 
      this.commonService.notify("info", "Item Added");
      this.activefilter = 'all';
      this.selectedSlc = {};

      // // for evidence upload array remove
      // for (let i = 0; i < this.allevidence.length; i++) {
      //   this.allevidence[i].checked = false;
      // }
      // console.log('cart files',  this.allevidence);

      this.refreshCustomPremium();
    }
    else {
      this.commonService.sa(
        "Oops!", "No Category Specs Selected", "info"
      );
    }
    console.log(this.allSelectedLc);
    this.restrictcityclass='';

  }

  checkcaneditcartitems() {
    console.log(this.quotation.status, this.authService.checkPermission(45));
    if (this.quotation.status != 'paid' && this.quotation.status != 'cancelled') {
      return true;
    }
    if (this.authService.checkPermission(45)) { return true; } else {
      this.commonService.notify('error', 'You Dont Have access to Edit Cart Items');
      return false;
    }
    return false;
  }

  cart_alldelete() {

    if (!this.checkcaneditcartitems()) {
      return 0;
    }

    let that = this;
    swal({
      title: 'Are you sure to Empty Cart?',
      text: "All Custom Fields Will also be removed",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function (result) {
      console.log(result);

      //True Confirmation    
      if (result.value) {
        that.commonService.notify("info", "All Items Removed");
        that.allSelectedLc.splice(0, 10000);
        this.rejectedArray = [];
        this.commonService.hideModal('modalrejectcart');
        if(that.quotation.id >0){
          that.evidenceuploadfloag = 1;
        }
        that.refreshCustomPremium();
      }

    });



  }
  cart_delete(index: any): 0 | undefined {
    if (!this.checkcaneditcartitems()) {
        return 0;
    }
    let that = this;
    Swal.fire({
        title: 'Are you sure?',
        text: "All Custom Fields Will also be removed",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, cancel!',
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    }).then((result: SweetAlertResult<any>) => {
        console.log(result);

        // True Confirmation    
        if (result.value) {
            that.quotation.isPirChanged = 1;
            that.commonService.notify("info", "Item Removed");
            that.allSelectedLc.splice(index, 1);
            if (that.quotation.id > 0) {
                that.evidenceuploadfloag = 1;
            }
            that.refreshCustomPremium();
        }

        return undefined; // Return undefined at the end
    });

    return undefined; // Return undefined outside the then block as well
}

  stopInterval() {
    if (this.intervaltimer) {
      clearInterval(this.intervaltimer);
    }
  }

  select_event_venue_tag(){
    let venueType;
    
    this.venues.map((ele: { event_venue_tag: any; }) => {
      this.selectedSlc.event_tag=ele.event_venue_tag;
      console.log(ele.event_venue_tag,'jiii');
    })
    console.log(venueType)
  }

  setSelectedSlc(slcc: unknown) {
    console.log(slcc);
    if(!slcc){
      return 0;
    }
    //clear timer if any
    if (this.intervaltimer) {
      clearInterval(this.intervaltimer);
    }

  //  console.log(slcc,);
     this.selectedSlc=this.commonService.cloneWR(slcc);
    this.selectedLicenseCategory = slcc;

    //set fixed event name
    if (this.selectedSlc.event_fixedname) {
      this.selectedSlc.event_name = this.selectedSlc.event_fixedname;
    }
    //set fixed event type
    if (this.selectedSlc.event_fixedtype) {
      this.selectedSlc.event_type = this.selectedSlc.event_fixedtype;
      // console.log( this.selectedSlc.event_type,'hiiii');
    }
    // if (this.selectedSlc.event_venue_tag) {
    //   this.selectedSlc.event_type = this.selectedSlc.event_fixedtype;
    // }

    this.selectedSlc.quantity = 1;
    this.selectedSlc.no_of_usages = 1;
    this.selectedSlc.cattotal = 0;
    if (this.selectedSlc.ltype) { } else { this.selectedSlc.ltype = this.ltype; }
    //this.selectedSlc.ltype=this.ltype;

    if (this.selectedSlc.start_date) { } else {
      this.selectedSlc.start_date = new Date().toISOString().slice(0, 10);
      this.selectedSlc.end_date = this.nextYearDate(this.selectedSlc.start_date);
    }



    let addr = this.selectedCustomer.address_line_1 + ", " + this.selectedCustomer.address_line_2 + ", " + this.selectedCustomer.address_line_3 + ", " + this.selectedCustomer.city + ', ' + this.selectedCustomer.state + ', ' + this.selectedCustomer.pincode;

    //this.selectedSlc.l_name=this.selectedCustomer.name;
    if (this.selectedSlc.l_name) { } else { this.selectedSlc.l_name = this.selectedCustomer.name; }

    if (this.selectedSlc.l_address_line_1) { } else { this.selectedSlc.l_address_line_1 = this.selectedCustomer.address_line_1; }
    if (this.selectedSlc.l_address_line_2) { } else { this.selectedSlc.l_address_line_2 = this.selectedCustomer.address_line_2; }
    if (this.selectedSlc.l_address_line_3) { } else { this.selectedSlc.l_address_line_3 = this.selectedCustomer.address_line_3; }

    if (this.selectedSlc.l_pincode) { } else { this.selectedSlc.l_pincode = this.selectedCustomer.pincode; }
    if (this.selectedSlc.l_city) { } else { this.selectedSlc.l_city = this.selectedCustomer.city; }
    if (this.selectedSlc.l_state) { } else { this.selectedSlc.l_state = this.selectedCustomer.state;  }
    if (this.selectedSlc.l_franchise) { } else { this.selectedSlc.l_franchise = this.selectedCustomer.franchise; }
    // if (this.selectedSlc.event_extra) { } else { this.selectedSlc.event_extra = this.selectedCustomer.event_extra; }
    // if (this.selectedSlc.notes) { } else { this.selectedSlc.notes = this.selectedCustomer.notes; }
    //  this.selectedSlc.l_address=addr;

  }
  updateSelectCatTotalCf($e: any, slc: any, cf: any, i: any, j = 0) {
    //  this.selectCatTotal += cf.amount * $e.target.value;
    //console.log("c",$e);
    //slc=;
    /*
    let itemIndex = this.selectedSlc.custom_fields.findIndex(item => item.id === cf.id);  
    console.log(i,itemIndex);
    console.log(cf);
    switch(cf.f_type){
      case 'single_field':
      this.selectedSlc.custom_fields[itemIndex].setcartvalue=$e.target.value;
      break;
    
      default:
      this.selectedSlc.custom_fields[itemIndex].setcartvalue=$e.id;
      break;
    }
    
    */
    //this.allSelectedLc[this.selectedLcidkey]=slc;

    //console.log(this.allSelectedLc);

    //this.getCatTotal();
    /*
    this.selectCatTotal=0;
    for(let i in this.allSelectedLc[this.selectedLcidkey].custom_fields){
        this.selectCatTotal=this.selectCatTotal+(this.allSelectedLc[this.selectedLcidkey].custom_fields[i].setcartvalue * this.allSelectedLc[this.selectedLcidkey].custom_fields[i].amount);
    }*/

  }

  getCatTotal(slc: { base_pricepa: string; custom_fields: { [x: string]: any; }; id: string; matrix_values: { [x: string]: {
    lccf_ids: any; amount: string; 
}; }; bothaddfieldvalue: string; setcartpremium_enable: any; matrix_values2: { [x: string]: {
  lccf_ids: any; amount: string; 
}; }; start_date: string | number | Date; end_date: string | number | Date; cat_type: string; hasOwnProperty: (arg0: string) => any; is_prorata: number; force_premium: any; force_premium_percentage: number; force_premium_amount: string | number; }, ee = 'na') {
    let mf: any = [];
    let mpf: any = [];
    //console.log(slc);
    let ii = 0, jj = 0;
    let total_event_min = 0;
    //console.log(this.premium_en);
    //let slc : any=[];
    let temptotal=0;
    if(slc.base_pricepa){
     temptotal = parseInt(slc.base_pricepa);
    }    //let slc= this.allSelectedLc[this.selectedLcidkey];
    /*if(index==-1){
      slc = this.selectedSlc;
    } else{
        slc = this.allSelectedLc[index];
    } */

    let totalsinglefieldsq = 0;

    for (let i in slc.custom_fields) {
      let cf = slc.custom_fields[i];


      switch (cf.f_type) {
        case 'single_field':



          if (parseFloat(cf.setcartvalue) > 0) {
            totalsinglefieldsq = totalsinglefieldsq + parseInt(cf.setcartvalue);

            temptotal = temptotal + (parseFloat(cf.setcartvalue) * parseFloat(cf.amount));

            //special case for aircraft category - additional channel add 10% of each
            if (slc.id == '62') {
              temptotal = temptotal + (temptotal * 10 * cf.setcartvalue / 100);
            }

          }

          if (cf.event_addminperblock > 0) {
            total_event_min = total_event_min + parseInt(cf.event_min);
            total_event_min = total_event_min + (cf.setcartvalue * parseInt(cf.event_addminperblock)) - 1;
          }



          break;

        case 'category_field':
          //let itemIndex = cf.category_options.findIndex(item => item.id === cf.setcartvalue);  
          if (cf.setcartvalue) {

            temptotal = temptotal + parseFloat(cf.setcartvalue.value_record.amount);
            //if additional Fields
            if (cf.setaddcartvalue) {
              temptotal = temptotal + (cf.setaddcartvalue * parseFloat(cf.setcartvalue.value_record.addfield_amount));
            }



          }

          break;

        case 'range_field':

          //special condition for Aircraft

          //end of aircraft

          //find the ranges
          //console.log(cf.category_options);

          if (cf.setcartvalue) {



            for (let kk in cf.category_options) {
              //check its range
              if (parseFloat(cf.setcartvalue) <= parseInt(cf.category_options[kk].range_max, 10) && parseFloat(cf.setcartvalue) >= parseInt(cf.category_options[kk].range_min, 10)) {
                temptotal = temptotal + parseFloat(cf.category_options[kk].value_record.amount);

                //now defining and coorecting range factors
                //calculate additional 
                let ads = parseFloat(cf.setcartvalue) - parseInt(cf.category_options[kk].range_min, 10) + 1;
                //console.log(ads);
                temptotal = temptotal + (ads * parseFloat(cf.category_options[kk].value_record.addfield_amount));

              }

            }


            if (cf.event_addminperblock > 0) {
              total_event_min = total_event_min + parseInt(cf.event_min);
              total_event_min = total_event_min + (cf.setcartvalue * parseInt(cf.event_addminperblock)) - 1; //fix for 23:59 not 0000
            }
          }

          break;


        case 'matrix_field':

          if (cf.setcartvalue && cf.is_premium == 1) {
            mpf[jj] = cf;
            jj++;
          } else if (cf.setcartvalue) {
            mf[ii] = cf;
            ii++;
            // console.log('mf',cf);
            if (cf.event_addminperblock > 0) {
              total_event_min = parseInt(cf.setcartvalue.event_min);
              total_event_min = total_event_min + (cf.setaddcartvalue * parseInt(cf.event_addminperblock));
            }
          }


          break;

      }

    }




    //Non premium Calculation
    if (mf.length > 1) {
      //console.log('Matx10',mf,mf[1].setcartvalue,mf[0].setcartvalue);

      // console.log('Matx10',mf,mf[1].setcartvalue.id+','+mf[0].setcartvalue.id);
      let lccf_ids1 = mf[1].setcartvalue.id + ',' + mf[0].setcartvalue.id;
      let lccf_ids2 = mf[0].setcartvalue.id + ',' + mf[1].setcartvalue.id;

      for (let j in slc.matrix_values) {
        //console.log( slc.matrix_values[j]);
        if (slc.matrix_values[j].lccf_ids.trim() === lccf_ids1 || slc.matrix_values[j].lccf_ids.trim() === lccf_ids2) {
          //   console.log("found ",slc.matrix_values[j]);
          temptotal = temptotal + parseFloat(slc.matrix_values[j].amount);
        }
      }

      //additional Count Addition
      if (mf[1].setaddcartvalue) {
        // console.log("111",mf);
        temptotal = temptotal + (mf[1].setaddcartvalue * parseFloat(mf[0].setcartvalue.matrix_addfield_amount));
      }

      if (mf[0].setaddcartvalue) {
        //console.log("000",mf);
        temptotal = temptotal + (mf[0].setaddcartvalue * parseFloat(mf[1].setcartvalue.matrix_addfield_amount));
      }

      //special condition - if both addmatraddfieldadded there is amount need to be added bothaddfieldvalue
      if (parseInt(mf[1].setaddcartvalue) > 0 && parseInt(mf[0].setaddcartvalue) > 0) {
        //console.log(slc.bothaddfieldvalue);
        temptotal = temptotal + (parseInt(slc.bothaddfieldvalue) * (mf[0].setaddcartvalue * mf[1].setaddcartvalue));
      }

      //console.log(slc.matrix_values[itemIndex]); 
      //this.selectCatTotal=this.selectCatTotal+parseFloat(slc.matrix_values[itemIndex].amount);
    }


    //Premium Matrix Calculation

    if (mpf.length > 1 && slc.setcartpremium_enable) {
      // console.log('PMatx10',mpf);
      //console.log(mpf[1].setcartvalue,mpf[0].setcartvalue);

      //console.log('PMatx10',mpf,mpf[1].setcartvalue.id+','+mpf[0].setcartvalue.id);
      let plccf_ids1 = mpf[1].setcartvalue.id + ',' + mpf[0].setcartvalue.id;
      let plccf_ids2 = mpf[0].setcartvalue.id + ',' + mpf[1].setcartvalue.id;

      for (let j in slc.matrix_values2) {

        if (slc.matrix_values2[j].lccf_ids.trim() === plccf_ids1 || slc.matrix_values2[j].lccf_ids.trim() === plccf_ids2) {
          //   console.log(slc.matrix_values2[j]);  
          // console.log("found PPremium",temptotal * parseFloat(slc.matrix_values2[j].amount)/100);
          temptotal = temptotal + (temptotal * parseFloat(slc.matrix_values2[j].amount) / 100);
        }
      }
    }



    /*    if(index==-1){
         this.selectedSlc.cattotal=temptotal;
        } else{
           this.allSelectedLc[index].cattotal=temptotal;
        }*/


    //   slc.cattotal=temptotal;


    //prorate Calculation
    let ddf: any;
    if (slc.start_date && slc.end_date && slc.cat_type === 'bg') {
      if(!slc.hasOwnProperty('is_prorata') || (slc.hasOwnProperty('is_prorata') && slc.is_prorata==1) ){
      //get no of days in between days
      //console.log(slc.is_annual,'slc.is_annual');
      let diff = Math.abs(new Date(slc.end_date).getTime() - new Date(slc.start_date).getTime());
      let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      diffDays = diffDays + 1;

      //let dy = Math.floor((diff) / (1000 * 60 * 60 * 24 * 365));
      //console.log('diffDays',diffDays);
      ddf = this.dateDiff(slc.start_date, slc.end_date);
      //console.log("Diff",diffDays,ddf);
      if (ddf.years < 0 || ddf.months < 0 || ddf.days < 0) {
        //slc.end_date=slc.start_date;
      }

      //console.log('years',ddf.years);
      //get per day price
      if (ddf.years > 0 && ddf.months === 0 && ddf.days === 0 && ddf.years < 4) {
        //console.log('years',ddf.years);
        temptotal = temptotal * ddf.years;
        // console.log('FCheck1',diffDays,ddf);
      } else if (ddf.years > -1 && ddf.years < 3) {
        let pdp = temptotal / 365;
        //console.log('FCheck2',diffDays,ddf,pdp);
        //fpr 1 day befor case fix
        if (diffDays < 5 && ddf.days === 0 && ddf.years > 3) {
          //console.log('Fking2',diffDays);
          temptotal = 0;
        } else {
          temptotal = diffDays * pdp;
        }

      } else {
        temptotal = 0;
      }

    }

    }

    //console.log('totoalmin',total_event_min);
    this.selectedSlc.total_event_min = total_event_min;
    if (this.selectedSlc.event_start_datetime) {
      this.update_event_end_datetime();
    }


    //forcePremium
    if (slc.setcartpremium_enable && slc.force_premium) {
      //only after enable
      console.log('forcing premium');
      let fp = temptotal * slc.force_premium_percentage / 100;
      temptotal = temptotal + fp;
      if(slc.force_premium_amount > 0){
        temptotal =temptotal + parseInt(slc.force_premium_amount);
      }
    }


    //preDiscount 
    if (ddf) {
      switch (ddf.years) {
        case 2:
          console.log('10% discount');
          temptotal = temptotal - (temptotal * 10 / 100);
          break;

        case 3:
          console.log('20% discount');
          temptotal = temptotal - (temptotal * 20 / 100);
          break;

      }
    }


    /* Force Premiumof cat 25 */
    if (slc.id == '33') {

      let pm = 0;
      if (totalsinglefieldsq > 3) {
        pm = 40;
      } else if (totalsinglefieldsq > 2) {
        pm = 30;
      } else if (totalsinglefieldsq > 1) {
        pm = 25;
      } else { pm = 20; };
      console.log(totalsinglefieldsq, pm, temptotal);
      temptotal = temptotal + (temptotal * pm / 100);

    }
    /* End of force premium of cat 25 */




    return Math.round(temptotal);

  }


  dateDiff(sdate, edate) {
    var date = sdate.split('-');
    var today = new Date(edate);
    today.setDate(today.getDate() + 1);
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var yy = parseInt(date[0]);
    var mm = parseInt(date[1]);
    var dd = parseInt(date[2]);
    var years, months, days;
    // months
    months = month - mm;
    if (day < dd) {
      months = months - 1;
    }
    // years
    years = year - yy;
    if (month * 100 + day < mm * 100 + dd) {
      years = years - 1;
      months = months + 12;
    }
    // days
    days = Math.floor((today.getTime() - (new Date(yy + years, mm + months - 1, dd)).getTime()) / (24 * 60 * 60 * 1000));
    //
    return { years: years, months: months, days: days };
  }

  getQuoteFinalTotal() {
    let tt = this.getQuoteTotal();
    let disc = Math.round(tt * this.discount / 100);
    let ttwd = tt - disc;

  if((this.quotation.status=='paid') || (this.quotation.status=='pending' && this.quotation.atir_status=='approve' && this.quotation.tax==12)){
  
  this.cgst=(this.pcgst)?this.pcgst:this.cgst;
  this.sgst=(this.pigst)?this.psgst:this.sgst;
  this.igst=(this.pigst)?this.pigst:this.igst;
  this.tax=(this.ptax)?this.ptax:this.tax;
  }
    

    let ttgst = 0;
    if (this.selectedCustomer.sez == 'LUT') {

    }
    else if (this.is_inmh() && this.selectedCustomer.sez == 'NO') {
      //GST +IGST :: Doubled
      // ttgst=ttgst*2;
     let ttcgst = Math.round(ttwd * (this.cgst) / 100);
     let ttsgst = Math.round(ttwd * (this.sgst) / 100);
      ttgst =ttcgst + ttsgst;
    } else {
      ttgst = Math.round(ttwd * this.igst / 100);
    }

    let tttds = Math.round(ttwd * this.tds / 100);

    return (ttwd + ttgst - tttds);

  }

  getQuoteTotal() {
    let tt = 0;
    this.nol = 0;
    this.nol_bg = 0;
    this.nol_event = 0;
    for (let i in this.allSelectedLc) {
      tt = tt + (this.allSelectedLc[i].no_of_usages * this.allSelectedLc[i].quantity * this.allSelectedLc[i].cattotal * this.allSelectedLc[i].usage_multiplier);

      if (this.allSelectedLc[i].cat_type == 'bg') {
        this.nol_bg = this.nol_bg + this.allSelectedLc[i].quantity;
      } else if (this.allSelectedLc[i].cat_type == 'event') {
        this.nol_event = this.nol_event + this.allSelectedLc[i].quantity;
      }

      this.nol = this.nol + this.allSelectedLc[i].quantity;
    }
    return Math.round(tt);
  }

  getCfValue(cff: { setcartvalue: { id: any; }; category_options: { [x: string]: { name: any; }; }; }) {

    //    console.log("CFCFCF",cf);

    if (cff.setcartvalue) {
      for (let i in cff.category_options) {
        if (cff.category_options[i].id === cff.setcartvalue.id) {
          //   console.log(cf.category_options[i]);
          return cff.category_options[i].name;
        }
      }
    }

  }

  validateMax($e: any, max: any) {



    if (this.previewdiscount <= this.maxdiscount) {
      //$e.target.value=max;
      //this.discount=this.previewdiscount;
    } else {

      this.previewdiscount = this.maxdiscount;

    }

  }

  validate_add_max($e: { target: { value: number; }; }, max: string, model: string | number) {
    console.log(max);
    console.log($e.target.value);
    if ($e.target.value > parseInt(max)) {
      // model=parseInt(max);
      this.selectedSlc.custom_fields[model].setaddcartvalue = max;
      $e.target.value = parseInt(max);

    }
  }

  refreshCustomPremium() {
    /*Custom Premium cat cinemas */
    //DEPRECIATED
    /*
   
    let tq=0;
    for(let aai in this.allSelectedLc){
      /*Custom premum logic */
    /*end of Custom premium logic */
    /*if(this.allSelectedLc[aai].id==='33'){
     tq=tq+this.allSelectedLc[aai].quantity;
    }
  }
  
    let pm=0;
    if(tq >3){
      pm=40;
    } else if(tq >2){
      pm=30;
    } else if(tq >1){
      pm=25;
    } else { pm=20; };
    console.log(tq,pm);
    this.custompremium_cinemas=pm;
    for(let aai in this.allSelectedLc){
      /*Custom premum logic */
    /*end of Custom premium logic */
    // if(this.allSelectedLc[aai].id==='33'){
    //      this.allSelectedLc[aai].cattotalff=this.allSelectedLc[aai].cattotal;
    //   this.allSelectedLc[aai].cattotal=parseInt(this.allSelectedLc[aai].cattotalff)+ (parseInt(this.allSelectedLc[aai].cattotalff) * pm/100);
    //  }
    //} 
    // if(pm >0){
    //   this.commonService.notify('info',pm+'% Premium Applied for \'Cinemas\'');
    // }
    //  temptotal=temptotal+ (temptotal * pm/100);
    /*end of custom premium cinemas */
  }


  saveQuotationIssuedLc(action: string) {

 
    if (action == 'save') {
      this.issuedLc.action = 'save';
      this.quotationService.addSaveIssuedLc(this.issuedLc)
        .subscribe(
          (data: any) => {
            this.commonService.notify('info', 'Licenses Saved Successfully');
            this.quotation = data;
          },
          (error: any) => {
          });
    }
    else if (action == 'issue') {
      let that = this;
      swal({
        title: 'Are you sure?',
        text: "Once Issued , You can not Edit the License",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Do it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      }).then(function (result) {
        console.log(result);

        //True Confirmation    
        if (result.value) {
          that.issuedLc.action = 'issue';

          that.quotationService.addSaveIssuedLc(that.issuedLc)
            .subscribe(
              (data: any) => {
                that.commonService.notify('info', 'Licenses Issued Successfully');
                //            this.quotation=data; 

              },
              (error: any) => {
              });
        }

      });

    } else if (action == 'cancel') {
      let that = this;
      swal({
        title: 'Are you sure?',
        text: "Once Cancelled , You can not Revert this Action",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Do it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      }).then(function (result) {
        console.log(result);

        //True Confirmation    
        if (result.value) {
          that.issuedLc.action = 'cancel';

          that.quotationService.addSaveIssuedLc(that.issuedLc)
            .subscribe(
              data => {
                that.commonService.notify('info', 'Licenses Cancelled Successfully');
                //            this.quotation=data; 

              },
              error => {
              });
        }

      });

    }


  }

  applyDiscount() {
    let max = this.selectedUser.role.discount;
    console.log('max', max);
    max = parseInt(max);
    //check if Approved More QUotation
    if (this.quotation.dr_status === 'approve') {
        max = this.quotation.dr_discount;
    }
    if (this.previewdiscount < 0) {
        //this.commonService.notify('error','Error','Applying Zero Disocunt ?');
        return 0;
    }

    if (this.previewdiscount <= max) {
        this.discount = this.previewdiscount;
        this.saveQuotation(true);
    } else {
        this.previewdiscount = max;
        this.commonService.notify('error', 'Error', 'Applied Discount is More than Allowed');
    }
    
    return undefined; // Added return statement here
}


  saveQuotation(statuschange = false) {

    console.log("user_ids details",this.quotation );
    this.quotation.qvalues = this.qvalues;
    // console.log(" qvalue :",this.quotation.qvalues);

    if (this.saveinprogress) {

      this.commonService.notify('Error', 'Please Wait', 'We are already processing on your last click');
      return 0;
    }

    this.saveinprogress = true;

    if (this.selectedCustomer.name) {

    }
    else {
      this.commonService.notify('Error', 'Please Enter Customer Details');
    }
    //clear timer if any
    if (this.intervaltimer) {
      clearInterval(this.intervaltimer);
    }

    let newq: any = {};
    if (this.quotation) {
      //quotation Exists / Update existing quote / only if no payment made
      this.quotation.debugjson = null;
      newq = this.quotation;

    }
    else {

    }
    // console.log(newq);

    if (this.quotation.lead_id) {

    } else {
      this.quotation.lead_id = 0;
    }


    if (statuschange) {
      newq.status = 'pending';
    } else {
      newq.status = 'draft';
    }
    // newq.is_miscellaneous=0;
    // newq.is_penalty=0;
    
    let ff = 0; let x=0;
    for (let p in this.allSelectedLc) {
      this.allSelectedLc[p].cattotal = this.getCatTotal(this.allSelectedLc[p]);
      ff = this.getCatTotal(this.allSelectedLc[p]) * this.allSelectedLc[p].no_of_usages * this.allSelectedLc[p].quantity * this.allSelectedLc[p].usage_multiplier;
      this.allSelectedLc[p].cattotalfinalwithoutdiscount = ff;
      this.allSelectedLc[p].cattotalfinalwithall = ff - Math.round(ff * this.discount / 100);
      if(this.allSelectedLc[p].cat_idcode=='49' ||this.allSelectedLc[p].cat_idcode=='49 - V2022' || this.allSelectedLc[p].cat_idcode=='PD (1)' || this.allSelectedLc[p].cat_idcode=='33(L)'){
        if(!this.allSelectedLc[p].is_misflag){
            this.allSelectedLc[p].is_misflag='1';
            newq.pir_status='pending';
          }
        if(this.allSelectedLc[p].cat_idcode=='PD (1)'){
          newq.is_penalty=1;
        }  
        newq.is_miscellaneous=1;
        x=1;
      }      
    }
    if(x==0){
      newq.is_miscellaneous=0;
    }
    console.log(this.allSelectedLc);
    this.refreshCustomPremium();
    newq.allSelectedLc = this.allSelectedLc;
    newq.customer_id = this.selectedCustomer.id;

    if (this.selectedUser) {
      newq.user_id = this.selectedUser.id;
    } else {
      this.commonService.notify('error', 'Please Specify Leadowner');
      return 0;
    }


    if (!this.selectedCustomer.country) {
      this.selectedCustomer.country = 'India';
    }
    if (!this.selectedCustomer.sez) {
      this.selectedCustomer.sez = 'NO';
    }

    newq.selectedCustomer = this.selectedCustomer;
    // remove evidenc code
    // newq.allevidence = this.allevidence;

    newq.selectedLead= this.selectedLead;
    newq.selectedUser = this.selectedUser;



    newq.selectedTransaction = this.selectedTransaction;

    newq.tax = this.tax;
    newq.cgst = this.cgst;
    newq.sgst = this.sgst;
    newq.tds = this.tds;
    newq.igst = this.igst;
    newq.is_inmh = this.is_inmh();

    newq.cartamount = this.getQuoteTotal();

    //apply patch for discount of only and above 100000
    if (newq.cartamount < this.minamountfordiscount) {
      this.discount = 0;
    }

    newq.discount = this.discount;
    newq.cartamountwithdiscount = this.getQuoteTotal() - Math.round(this.getQuoteTotal() * this.discount / 100);
    newq.totalamount = this.getQuoteFinalTotal();

    newq.nol = this.nol;
    newq.nol_bg = this.nol_bg;
    newq.nol_event = this.nol_event;

    // Extended PI Flag set covid impact
    if(newq.extended_pi && newq.extended_pi ==true ){
      newq.extended_pi =1;
    }else{
      newq.extended_pi =0;
    }

    this.commonService.notify('info', 'Please Wait', 'We are saving your Application');
//console.log(newq);

    //new Quotation
    this.quotationService.addSave(newq)
      .subscribe(
        (        data: { id: string; uuid: string; }) => {
          this.saveinprogress = false;
          this.commonService.notify('info', 'Application Added/Updated Successfully');
          console.log('evidenceuploadfloag', this.evidenceuploadfloag);
          if(this.evidenceuploadfloag == 1){
            this.saveEvidence();
          }
          //this.quotation=data;
          this.getQuotation(data.id,data.uuid);
          if (this.is_addc) { this.router.navigate(['/quotation/view/' + data.id+'/'+data.uuid]); }
        },
        (        error: any) => {
          this.saveinprogress = false;
          // this.alertService.error(error);

        });


  }


  nextYearDate(date1: string | number | Date) {
    let date2 = new Date(date1);
    let date3 = date2.setDate(date2.getDate() - 1);
    let date = new Date(date3);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear() + 1;
    let newdate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    return newdate;
  }

  //discount Request
  dr_request() {
    if (this.quotation.dr_comment.toString().length < 2 || this.quotation.dr_discount.toString().length < 1) {
      this.commonService.notify('error', 'Please Specify Reason for Discount');
    } else {
      if (this.quotation.dr_discount > 101) {
        this.commonService.notify('error', 'Too Big Discount Request !');
      } else {
        if (this.savedrinprogress) {
          this.commonService.notify('info', 'Please Wait', 'Existing Request in Progress');
          return 0;
        }
  
        this.savedrinprogress = true;
  
        this.quotationService.addSaveDiscountRequest(this.quotation)
          .subscribe(
            (data: { id: any; uuid: any; }) => {
              this.savedrinprogress = false;
              this.commonService.notify('info', 'Discount Request Sent For Approval');
              this.commonService.hideModal('modaldrrequest');
              this.getQuotation(data.id,data.uuid);
            },
            (error: any) => {
              this.savedrinprogress = false;
            });
      }
    }
  
    // Return undefined if no other return statement is executed
    return undefined;
  }
  

  //discount Request
  atir_request() {
    if (this.quotation.atir_comment) {
      if (this.saveatiinprogress) {
        this.commonService.notify('info', 'Please Wait', 'Existing Request in Progress');
        return 0;
      }
  
      this.saveatiinprogress = true;
      this.quotationService.addSaveAtiRequest(this.quotation)
        .subscribe(
          (data: any) => {
            this.saveatiinprogress = false;
            this.commonService.notify('info', 'Advance Tax Request Sent For Approval');
  
            this.commonService.hideModal('modalatirrequest');
            this.getQuotation(this.quotation.id, this.quotation.uuid);
          },
          (error: any) => {
            this.saveatiinprogress = false;
          });
    } else {
      this.commonService.notify('error', 'Please Specify Reason for Same');
    }
  
    // Ensure that a value is returned in all code paths
    return undefined;
  }
  
  showPi(){
  this.tempitag.tag_name=this.quotation.tag_name;
  this.tempitag.tag_expected_date=this.quotation.tag_expected_date;
  this.tempitag.tag_remark=this.quotation.tag_remark;
  this.commonService.openModal('modalpitag');
  }
 
  pitag_request() {
    if (this.tempitag.tag_remark) {
      if (this.saveatiinprogress) {
        this.commonService.notify('info', 'Please Wait', 'Existing Request in Progress');
        return 0;
      }
      if (!this.tempitag.tag_name) {
        this.commonService.notify('info', 'Required', 'Select at least One PI Tag ');
        return 0;
      }
  
      if (this.tempitag.tag_name === "WILL PAY") { 
        if (!this.tempitag.tag_expected_date) {
          this.commonService.notify('info', 'Required', 'Add Expected Date Of Payment');
          return 0;
        }
  
        let currentDate = new Date();
        if (new Date(this.tempitag.tag_expected_date) < currentDate ) {
          this.commonService.notify('info', 'Required', 'Expected Date Of Payment should be greater than today');
          return 0;
        }
      }
  
      if (this.tempitag.tag_name !== "WILL PAY" && this.tempitag.tag_expected_date) {
        this.tempitag.tag_expected_date = null;
      }
  
      this.saveatiinprogress = true;
      this.quotation.tag_name = this.tempitag.tag_name;
      this.quotation.tag_expected_date = this.tempitag.tag_expected_date;
      this.quotation.tag_remark = this.tempitag.tag_remark;
  
      this.quotationService.addSavePitagRequest(this.quotation)
        .subscribe(
          (data: any) => {
            this.saveatiinprogress = false;
            this.commonService.notify('info', 'PI Tag added Successfully');
            this.commonService.hideModal('modalpitag');
            this.tempitag.tag_name = null;
            this.tempitag.tag_expected_date = null;
            this.tempitag.tag_remark = null;
            this.getQuotation(this.quotation.id, this.quotation.uuid);
          },
          (error: any) => {
            this.saveatiinprogress = false;
          });
  
    } else {
      this.commonService.notify('error', 'Please Specify Remark');
      return 0; // Return 0 if remark is not specified
    }
  
    // Return undefined if none of the other conditions are met
    return undefined;
  }
  


  filterlc(cat_type: any) {
    this.licenseCategories = this.templicenseCategories;
    switch (cat_type) {
      case 'bg':
        this.licenseCategories = this.licenseCategories
          .filter((lc: any) => lc.cat_type === cat_type);
        break;

      case 'event':
        //lc.cat_type === cat_type
        this.licenseCategories = this.licenseCategories
          .filter((lc: any) => (lc.displayname.indexOf('33') > -1 || lc.displayname.indexOf('35') > -1));
        break;
        case 'penalty':
          //lc.cat_type === cat_type
          this.licenseCategories = this.licenseCategories
            .filter((lc: any) => (lc.cat_type===cat_type));
          break;
      case 'all':
        this.licenseCategories = this.templicenseCategories;
        break;
    }

  }


  checkIfTan($event: any) {
    console.log(this.tds, this.selectedCustomer.tan);
    if (this.tds) {
      if (this.selectedCustomer.tan) {
        if (this.tds >= 99) {
          this.tds = 0;
          this.commonService.notify('error', 'Invalid TDS');
          this.tds = 0;
        }
      }
      else {
        this.commonService.notify('error', 'Please Enter TAN Number for TDS Deduction');
        this.tds = 0;
      }
    }
  }

  update_event_end_datetime() {
    let sdate = new Date(this.selectedSlc.event_start_datetime);
    //console.log(sdate.getMinutes(),sdate,this.selectedSlc.event_start_datetime);
    let edate = sdate;

    edate.setMinutes(sdate.getMinutes() + parseInt(this.selectedSlc.total_event_min));
    //     console.log(edate);

    this.selectedSlc.event_end_datetime = this.getMysqlFDate(edate);
  }

  getMysqlFDate(d: Date) {
    return d.getFullYear() + "-" + this.twoDigits(1 + d.getMonth()) + "-" + this.twoDigits(d.getDate()) + "T" + this.twoDigits(d.getHours()) + ":" + this.twoDigits(d.getMinutes()) + ":" + this.twoDigits(d.getSeconds());
  }
  twoDigits(d: number) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
  }


  field_validate($event: any, cf: any, $object?: any): 0 | undefined {    let regexp: any;{}

    let val: any = $event.target.value;
    if (val.length < 1) { return 0; }

    switch (cf) {
        case 'contact_email':
            regexp = /\S+@\S+\.\S+/;
            console.log(regexp.test(val));
            if (!regexp.test(val)) {
                $event.target.value = '';
                $object = '';
                this.selectedCustomer.contact_email = '';
                this.commonService.notify('error', 'Invalid Email Address');
                return 0;
            }
            break;

        case 'mobile':
            regexp = /^([0-9]){10}?$/;
            console.log(regexp.test(val));
            if (!regexp.test(val)) {
                $event.target.value = '';
                $object = '';
                this.selectedCustomer.contact_no = '';
                this.commonService.notify('error', 'Invalid Mobile Number');
                return 0;
            }
            break;

        case 'pan':
            regexp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
            console.log(regexp.test(val));
            if (!regexp.test(val)) {
                $event.target.value = '';
                $object = '';
                this.selectedCustomer.pan = '';
                console.log('pan billing page');
                this.commonService.notify('error', 'Invalid PAN Number');
                return 0;
            }
            break;

        case 'gst':
            regexp = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
            if (!regexp.test(val)) {
                $event.target.value = '';
                $object = '';
                this.selectedCustomer.gst = '';
                this.commonService.notify('error', 'Invalid GST Number');
                return 0;
            }
            // Further logic for GST validation...
            break;

        case 'tan':
            regexp = /^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$/;
            if (!regexp.test(val)) {
                $event.target.value = '';
                $object = '';
                this.selectedCustomer.tan = '';
                this.commonService.notify('error', 'Invalid TAN Number');
                return 0;
            }
            // Further logic for TAN validation...
            break;
    }

    // Return undefined if none of the cases match
    return undefined;
}

  validate_start_end_date(slc: { end_date: string | number | Date; start_date: string | number | Date; }) {
    let diff = Math.abs(new Date(slc.end_date).getTime() - new Date(slc.start_date).getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    //diffDays=diffDays+1;

    //let dy = Math.floor((diff) / (1000 * 60 * 60 * 24 * 365));
    //console.log(dy);
    let ddf = this.dateDiff(slc.start_date, slc.end_date);
    //console.log('df',ddf,diffDays);
    if (ddf.years < 0 || ddf.months < 0 || ddf.days < 0) {
      this.commonService.notify('Error', 'End Date can not be Previous Than Start Date');
      return false;
    }

    return true;

  }

  validate_no_of_usages($event: any) {
    if (this.selectedSlc.no_of_usages) {
      if (parseInt(this.selectedSlc.no_of_usages) > parseInt(this.selectedSlc.max_no_of_usages)) {
        this.commonService.notify('info', 'Max Allowed value is ' + this.selectedSlc.max_no_of_usages);
        this.selectedSlc.no_of_usages = 1;
      }
    }
  }

  //check for payment Every 5 Seconds
  checkIfPaid() {

    //clear timer if any
    if (this.intervaltimer) {
      clearInterval(this.intervaltimer);
    }


    this.intervaltimer = setInterval(() => {
      this.commonService.notify('info', 'Waiting For Payment...');
      this.getQuotation(this.quotation.id,this.quotation.uuid);
      if (this.quotation.status === 'paid') {
        this.thankyou = true;
        this.commonService.notify('info', 'Thanks for Payment');
        clearInterval(this.intervaltimer);
      }
    }, 5000);

  }

  addEditReturnTransaction() {

    if (this.selectedrTransaction.ref_no.length < 2) {
      this.commonService.notify('info', 'Please Check', 'Ref No is Required');

      return 0;
    }

    if (this.selectedrTransaction.payment_method === 'REFUND' || this.selectedrTransaction.payment_method === 'EXCESSREFUND') { }
    else {
      if (this.selectedrTransaction.amount > this.remainingPayment) {
        // this.commonService.notify('info', 'Transaction Amount Should be less than Balance Amount');
        // return 0;
      }
    }
    console.log(this.selectedrTransaction);

    this.selectedrTransaction.quotation_id = this.quotation.id;
    if (this.savetrinprogress) {
      this.commonService.notify('info', 'Please Wait', 'Existing Transaction in Progress');
      return 0;
    }

    this.savetrinprogress = true;
    this.transactionService.addeditreturn(this.selectedrTransaction)
      .subscribe(
        (data: any) => {
          this.savetrinprogress = false;
          this.commonService.notify('info', 'Return Transaction Added/Updated Successfully');
          //         this.quotation=data;
          this.getQuotation(this.quotation.id,this.quotation.uuid);

          this.commonService.hideModal('modaladdreturntransaction');


          this.selectedrTransaction.payment_method = '';
          this.selectedrTransaction.ref_no = '';



        },
        (error: any) => {
          this.savetrinprogress = false;
        });

    // Return undefined if none of the conditions are met
    return undefined;
}


addEditTransaction() {

  if (this.selectedTransaction.payment_method === 'REFUND' || this.selectedTransaction.payment_method === 'EXCESSREFUND') { }
  else {
    if (this.selectedTransaction.amount > this.remainingPayment) {
      // this.commonService.notify('info', 'Transaction Amount Should be less than Balance Amount');
      // return 0;
    }
  }
  console.log(this.selectedTransaction);

  this.selectedTransaction.quotation_id = this.quotation.id;
  if (this.savetrinprogress) {
    this.commonService.notify('info', 'Please Wait', 'Existing Transaction in Progress');
    return 0;
  }

  if (this.quotation.region_id == 25 && this.quotation.status != 'paid' && this.quotation.atir_status != 'approve') {
    this.commonService.notify('error', 'Change to New Territory', 'Existing Territory belong to PUNEROM ');
    return 0;
  }

  this.savetrinprogress = true;
  this.transactionService.addedit(this.selectedTransaction)
    .subscribe(
      (data: any) => {
        this.savetrinprogress = false;
        this.commonService.notify('info', 'Transaction Added/Updated Successfully');
        //         this.quotation=data;
        this.getQuotation(this.quotation.id,this.quotation.uuid);

        if (this.selectedTransaction.payment_method === 'REFUND' || this.selectedTransaction.payment_method === 'EXCESSREFUND') {
          this.commonService.hideModal('modaladdtransaction');
        }

        this.selectedTransaction.payment_method = '';
        this.selectedTransaction.ref_no = '';

      },
      (error: any) => {
        this.savetrinprogress = false;
      });

  // Return undefined if none of the conditions are met
  return undefined;
}


  deleteTransaction(trid: any) {
    //    let params="id="+trid+"&quotation_id="+this.quotation.id;
    let params = { id: trid, quotation_id: this.quotation.id };



    let that = this;
    swal({
      title: 'Are you sure?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function (result: { value: any; }) {
      console.log(result);

      //True Confirmation    
      if (result.value) {
        that.transactionService.delete(params)
          .subscribe(
            ( data: any) => {
              that.commonService.notify('info', 'Transaction deleted Successfully');
              //         this.quotation=data;
              that.selectedTransaction = {};
              that.getQuotation(that.quotation.id,that.quotation.uuid);
            },
            ( error: any) => {
            });
      }

    });




  }

  /* Bulk Upload */
  onBUFileChange(event: any) {
    this.commonService.notify('info', ' Please Wait , Analyzig File...');
    //  console.log(fi);
    let reader = new FileReader();

    // console.log(file);
    let fi = event.target.files[0];
    reader.readAsDataURL(fi);
    reader.onload = () => {
      //   console.log(reader.result.split(',')[1]);
      this.quotationService.uploadfileandrunbu(fi)
        .subscribe(
          (bdata: { [x: string]: any; }) => {

            this.rejectedArray=[];
            let modiArray1=bdata['json1'];
            let temparr1: unknown[] = [];
            Object.values(modiArray1).forEach(a=>{
              temparr1.push(a);
            })
            this.rejectedArray = temparr1;
            console.log(this.rejectedArray);
            let temparr=[]
            let c = 0;
            let modiArray = bdata['json'];
            
            if(modiArray){
            Object.values(modiArray).forEach(a=>{
              temparr.push(a);
               this.bulkAddItem(a);
              c++;
            })
          }

            console.log('modiArray1 rejected', this.rejectedArray);
            // this.search();
            this.commonService.notify('info', c + ' Cart Items Added');
          },
          (error: any) => {
            // this.alertService.error(error);
            //   this.loading = false;
          });

    };
    //reset file input
    event.target.value = '';
  }
  /* end of bulk Upload*/
  getcustomfields(cutmFields: string | { [s: string]: unknown; } | ArrayLike<unknown> | null | undefined){
    let tempCustmFields: unknown[]=[];
    if(cutmFields==null || cutmFields=='' || cutmFields==undefined){
      tempCustmFields=[];
    }else{
    Object.values(cutmFields).forEach(ele=>{
      tempCustmFields.push(ele);
    });
  }
    return tempCustmFields;
  }
  bulkAddItem(blc: unknown) {
    //console.log('bAdd',blc); 
    this.selectedSlc = blc;
     if(this.selectedSlc.custom_fields && typeof this.selectedSlc.custom_fields == 'object'){
      this.selectedSlc.custom_fields = Object.values(this.selectedSlc.custom_fields);
    }
    this.selectedSlc.start_date = blc.start_date;
    this.selectedSlc.end_date = blc.end_date;
      this.setSelectedSlc(blc)
      this.cart_add();
  }

  getPincodeinfo() {
    this.commonService.notify('info', 'Please Wait', 'Fetching Pincode Information');
    if (this.selectedCustomer.pincode) { } else {
      this.commonService.notify('info', 'Error', 'Pincode is Mandatory');
      this.selectedCustomer.state = '';
      this.selectedCustomer.city = '';
      this.selectedCustomer.address_line_3 = '';
      return 0;
    }
    console.log(this.selectedCustomer.pincode.toString().length);
    if (this.selectedCustomer.pincode.toString().length > 5) {
      this.quotationService.getPincodeinfo(this.selectedCustomer.pincode)
        .subscribe(
          (data: any) => {
            if (data) {
              //depreciated
              //  this.selectedCustomer.state=data.state;
              //this.selectedCustomer.city=data.district;
              //this.selectedCustomer.address_line_3=data.locality;
              this.selectedCustomer.country = 'India';
            }
            //this.getList();
            // this.search();

          },
          (          error: any) => {
            // this.selectedCustomer.state='';
            // this.selectedCustomer.city='';
            // this.selectedCustomer.address_line_3='';
            // this.alertService.error(error);
            //   this.loading = false;
          });
    } else {
      this.commonService.notify('error', 'Oops!', 'Pincode too Short');
      //this.selectedCustomer.state='';
      // this.selectedCustomer.city='';
      // this.selectedCustomer.address_line_3='';
    }
  }

  setst(r: any) {
    this.selectedTransaction = JSON.parse(JSON.stringify(r));
    console.log(this.selectedTransaction);
    let myarr = this.selectedTransaction.date.split(' ');
    this.selectedTransaction.date = myarr[0];
  }

  resetst() {
    // this.panstr = this.selectedCustomer.pan.substring(0,5);
    // if((this.panstr == "NOPAN" && this.quotation.cpn_status!='approve')){
    //   this.commonService.notify('error', 'Oops!', 'Update original PAN No, Click Customer PAN Approval Button');
    //   this.panApprvedFlag =0;
    // }else if(this.quotation.cpn_pan_no && this.selectedCustomer.pan != this.quotation.cpn_pan_no){
    //   this.commonService.notify('error', 'Oops!', 'Click on Apply PAN no Button then payment');
    //   this.panApprvedFlag =0;
    // }else if(this.panstr != "NOPAN"){
    //   this.panApprvedFlag =1;
    // }
    // else{
    //   this.selectedTransaction.id = 0;
    //   this.selectedTransaction.ref_no = '';
    //   this.selectedTransaction.bank = '';
    //   this.selectedTransaction.branch = '';
    //   this.selectedTransaction.amount = '';
    //   this.panApprvedFlag =1;
    // }

    this.selectedTransaction.id = 0;
    this.selectedTransaction.ref_no = '';
    this.selectedTransaction.bank = '';
    this.selectedTransaction.branch = '';
    this.selectedTransaction.amount = '';
     
    
  }


  confirmOpenCN() {

    let that = this;
    swal({
      title: 'Are you sure to Create Credit Note?',
      text: "Once Created , Credit Notes Can not be Deleted , This Action is NOT Reversible.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Proceed to Create',
      cancelButtonText: 'No, Cancel',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function (result: { value: any; }) {


      //True Confirmation    
      if (result.value) {
        that.commonService.openModal('modalcreditnote');
      }

    });


  }
  createCreditNote() {
    let m: any = {};
    m.issuedLc = this.issuedLc;
    m.selectedGst = this.tempmodel.selectedGst;
    m.quotation_id = this.quotation.id;
    m.description = this.tempmodel.description;
  
    if (this.savecninprogress) {
      this.commonService.notify('info', 'Please Wait', 'Existing Request in Progress');
      return 0;
    }
  
    this.savecninprogress = true;
  
    this.transactionService.addEditCreditNote(m)
      .subscribe(
        (data: any) => {
          this.savecninprogress = false;
          this.commonService.notify('info', 'Credit Note Created Successfully');
          this.getQuotation(this.quotation.id, this.quotation.uuid);
          this.commonService.hideModal('modalcreditnote');
        },
        (error: any) => {
          this.savecninprogress = false;
          this.commonService.hideModal('modalcreditnote');
        });
  
    // Ensure that a value is returned in all code paths
    return undefined;
  }
  
  
  // send alert for email (PI, TI, Lic)
  sendAlert(action: any) {
    let params: any = {};
    params.quotation_id = this.quotation.id;
    params.action = action;

    console.log(params);
    this.quotationService.quotationsendalert(params).subscribe(
      (res: string) => {
        console.log("Quotation sent alert" + res);
        this.commonService.notify('info', 'Email will be sent within few minutes ');
      });

  }

  //PI Request
  pir_request() {
    if (this.saveatiinprogress) {
      this.commonService.notify('info', 'Please Wait', 'Existing Request in Progress');
      return 0;
    }
    if (!this.quotation.pir_comment || this.quotation.pir_comment === '') {
      this.commonService.notify('error', 'Please Specify Reason for PI Request');
      return 0;
    }
  
    this.saveatiinprogress = true;
  
    this.quotationService.AddSavePIRequest(this.quotation)
      .subscribe(
        (data: any) => {
          this.saveatiinprogress = false;
          this.commonService.notify('info', 'PI Request Sent For Approval');
          this.commonService.hideModal('modalpirequest');
          this.getQuotation(this.quotation.id, this.quotation.uuid);
        },
        (error: any) => {
          this.saveatiinprogress = false;
        });
  
    // Ensure that a value is returned in all code paths
    return undefined;
  }
  

  // BuyNow PI
  buyNow(){
   
    this.cart_add();

    console.log(this.allSelectedLc);
    if(this.allSelectedLc.length > 0){
      this.saveQuotation(true);
      this.wizard.model.navigationMode.goToStep(2);
    }else{
      // this.commonService.notify('error', 'Cart is Empty');
    }
    
  }
  // lead ques
  getLeadstatusquestions(leadstatus_id: string | number,lead_id=null, forpi=null){
    let params="leadstatus_id="+leadstatus_id;

    if(lead_id){
      params+='&lead_id='+lead_id;
    }
    if(forpi){
      params+='&forpi='+forpi;
    }
    if(this.activity_id){
      params+='&activity_id='+this.activity_id;
    }
    // console.log(params);
    this.leadService.leadstatusdata(params).subscribe(
      (res: { leadstatusdata: any; qvalues: string; }) => {
        this.lead_lead_status_data=res;
        this.leadstatusdata=res.leadstatusdata;
        this.leadstatusdata.questions.sort(function(x, y) {
          // Ascending: first age less than the previous
          return x.seq - y.seq;
        });
        
        if(res.qvalues){
          const temp=JSON.parse(res.qvalues);
          if(temp){
            this.qvalues=temp;
          }
          console.log(JSON.parse(res.qvalues));
        }

      }); 
  }
  getChildQuestions(parentrow:any){
    //filtersout child questions to be used
    if(this.qvalues['_'+parentrow.id] && parentrow.input_options_array){
   return this.leadstatusdata.questions.filter(
     (qs: { parent_id: any; parent_seq: { toString: () => string; }; }) => (qs.parent_id === parentrow.id && 
        this.qvalues['_'+parentrow.id].toString().toLowerCase()==qs.parent_seq.toString().toLowerCase()
        ));
      }
      //console.log("child row : ", this.leadstatusdata.questions);
  }
  
// check 
  // checkQvalues1(){
  //   //console.log("this.qvalues",this.qvalues);
  //   if(this.qvalues._118){
  //     if(this.qvalues._118 == "Radio" && this.qvalues._142 && this.qvalues._142.length > 0 ){
  //       this.qvalues._143 =''; this.qvalues._144=[]; this.qvalues._145 ='';
  //       return this.queFlag = 1;
  //     } 
  //     if(this.qvalues._118 == "Others" && (this.qvalues._143 == "Others" && (this.qvalues._145 && this.qvalues._145!='') && (this.qvalues._144 && this.qvalues._144.length > 0)))
  //     {
  //       this.qvalues._142 =[];
  //       return this.queFlag = 1;
  //     }
  //     if(this.qvalues._118 == "Others" && (this.qvalues._143 && this.qvalues._143 != "Others" && this.qvalues._143 != '' && (this.qvalues._144 && this.qvalues._144.length > 0))){
  //       this.qvalues._142 =[]; this.qvalues._145 ='';
  //       return this.queFlag = 1;
  //     }
  //     // close
  //     return this.queFlag = 0;
  //   }else{
  //     return this.queFlag = 0;
  //   }
  // }

  // validation function
  contactpersonvalidation(){
    // if(this.qvalues._166 == "Multiple Outlets" || this.qvalues._166 == "Stand-alone store"){
    //   this.filterlc('bg');
    //   this.activefilter='bg'; 
    // } 
    // if(this.qvalues._166 == "Event"){
    //   this.filterlc('event');
    //   this.activefilter='event';
    //   this.ltype='New';
     
    // } 
    if(this.selectedCustomer.contact_no && this.selectedCustomer.contact_person && this.selectedCustomer.contact_email  && this.selectedCustomer.contact_designation){
      this.contactinfoflag = 1;  
    }else{
      this.contactinfoflag = 0;
      this.commonService.notify('error', 'Please Enter All Contact Person Information');
    }
  }

  checkQvalues(){
    if(this.qvalues._166){
      if(this.qvalues._166 == "Multiple Outlets"){
        return this.queFlag = 1;
      } 
      if(this.qvalues._166 == "Stand-alone store"){
        if(this.qvalues._166 == "Stand-alone store" && this.qvalues._154 == "Own fixed playlist (please attach)" && (this.qvalues._155 && this.qvalues._155!='') && (this.qvalues._156 && ((this.qvalues._156!='' && this.qvalues._156 != "Others please specify") || (this.qvalues._156 == "Others please specify" && (this.qvalues._157 && this.qvalues._157 !=''))))){
          return this.queFlag = 1;
        }
        if(this.qvalues._166 == "Stand-alone store" && this.qvalues._154 == "Background music provider" && (this.qvalues._158 && ((this.qvalues._158!='' && this.qvalues._158 != "Other(please specify service providers name)") || (this.qvalues._158 == "Other(please specify service providers name)" && (this.qvalues._159 && this.qvalues._159!=''))))){
          return this.queFlag = 1;
        }
        if(this.qvalues._166 == "Stand-alone store" && this.qvalues._154 == "Radio (Please specify the radio station)" && (this.qvalues._160 && ((this.qvalues._160!='' && this.qvalues._160 != "Other(please specify)") || (this.qvalues._160 == "Other(please specify)" && (this.qvalues._161 && this.qvalues._161 !=''))))){
          return this.queFlag = 1;
        }
        if(this.qvalues._166 == "Stand-alone store" && this.qvalues._154 == "Personal streaming services" && (this.qvalues._162 && ((this.qvalues._162!='' && this.qvalues._162 != "Other(please specify)") || (this.qvalues._162 == "Other(please specify)" && (this.qvalues._163 && this.qvalues._163 !=''))))){
          return this.queFlag = 1;
        }
        if(this.qvalues._166 == "Stand-alone store" && this.qvalues._154 == "Television (please specify channel)" && (this.qvalues._164 && this.qvalues._164!='')){
          return this.queFlag = 1;
        }
        if(this.qvalues._166 == "Stand-alone store" && this.qvalues._154 == "Online radio stations. (please specify name)" && (this.qvalues._165 && this.qvalues._165!='')){
          return this.queFlag = 1;
        }
        if(this.qvalues._166 == "Stand-alone store" && this.qvalues._154 == "Physical Device (CD/Pen drive/External storage device or another format)"){
          return this.queFlag = 1;
        }
        return this.queFlag = 0;
      } 
      if(this.qvalues._166 == "Event"){
        if(this.qvalues._166 == "Event" && this.qvalues._167 == "Own fixed playlist (please attach)" && (this.qvalues._168 && this.qvalues._168!='')){
          return this.queFlag = 1;
        }
        if(this.qvalues._166 == "Event" && this.qvalues._167 == "Physical Device (CD/Pendrive)"){
          return this.queFlag = 1;
        }
        if(this.qvalues._166 == "Event" && this.qvalues._167 == "DJ"){
          return this.queFlag = 1;
        }
        return this.queFlag = 0;
      } 
      return this.queFlag = 0;
    }else{
      return this.queFlag = 0;
      
    }
  }

  ValidateSelectedSlcStartEndDate(){
    if(this.selectedSlc.start_date && this.selectedSlc.end_date){
      if(this.selectedSlc.start_date > this.selectedSlc.end_date){
      console.log('invalid Date');
      this.selectedSlc.end_date=this.selectedSlc.start_date;
      } 
    }
  }


  checkForCityClass(cf: { canflagcityclass: number; setcartvalue: { name: string; }; }){
//selectedSlc.custom_fields[i]
//do not change just use for validation flag
//console.log('Pre Flag City Class',cf);
if(cf.canflagcityclass){
  if(cf.canflagcityclass==1){
   // console.log('Flag City Class',cf);
    if(cf.setcartvalue){
    this.restrictcityclass=cf.setcartvalue.name;
    this.selectedSlc.l_city=null;
    this.selectedSlc.l_state=null;
    this.selectedSlc.event_city=null;
    this.cities = [];
    }
    }
  
}

  }

  tdspatch(tdsa: any){
    //Dont touch TDS if PI is Paid
    console.log('TDS Reset only on Not Paid');
    if(this.selectedCustomer.tds && this.quotation.status!='paid'){
    
    this.tds=this.selectedCustomer.tds;
    }
 
  }

  // recreate Licenses 
  confirmrecreateLicenses() {

    let that = this;
    swal({
      title: 'Do you Want to Reset the Licenses ?',
      text: "Licenses will be cleared and synced with Cart Items , You need to Issue licences again.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Do it!',
      cancelButtonText: 'No, Cancel',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false

    }).then(function (result: { value: any; }) {
      if (result.value) {
        // console.log("that.quotation.id data", that.quotation.id);
        that.quotationService.recreateLicenses(that.quotation.id)
        .subscribe(
          (data: any) => {
            that.commonService.notify('info', 'Reset License Successfully');
            // refresh page 
            that.getQuotation(that.quotation.id,that.quotation.uuid);
            that.router.navigate(['/quotation/view/' +that.quotation.id+'/'+that.quotation.uuid]);
            //this.quotation=data;
          },
          ( error: any) => {  
            console.log(error);
          });
      }

    });
  }

  // question upload file
    onFileChange(event:any,question_id:any){
    // alert("event");
      this.commonService.notify('info',' Please Wait , File Upload in Progress...');
      if(this.loading){
        return 0;
      }
     
      let reader = new FileReader();
      let fi=event.target.files[0];
       reader.readAsDataURL(fi);
       reader.onload = () => {

     this.loading=true;
         this.transactionService.questionuploadfile(fi)
         .subscribe(
           (data: { file_url: any; }) => {
            let question_file_url = data.file_url;

            this.loading=false;
              this.commonService.notify('info','File Uploaded Successfully');
              if(question_id == 155){
                this.qvalues._155 = question_file_url;
              }else{
                this.qvalues._168 = question_file_url;
              }
           },
           (error: any) => {
               // this.alertService.error(error);
            //   this.loading = false;
           });
       };
  
      }

      // upload Evidence

      // onFileChangeUploadEvidence1(event:any){
      //   let fi=event.target.files[0];
      //   if ((!fi.type.match('image')) ) {
      //     this.commonService.notify('error', 'Please select only Images...');
      //   }
      //   if ((!fi.type.match('audio')) ) {
      //     this.commonService.notify('error', 'Please select only Audio...');
      //   }
      //   if ((!fi.type.match('video')) ) {
      //     this.commonService.notify('error', 'Please select only Video...');
      //   }
       
      //   this.commonService.notify('info',' Please Wait , File Upload in Progress');
      //   if(this.loading){
      //     return 0;
      //   }
      //   //  console.log(fi);
      //   let reader = new FileReader();
      //    reader.readAsDataURL(fi);
      //    reader.onload = () => {
      //     console.log('evidence upload file : ', fi);
      //     this.loading=true;
      //     this.documentService.uploadEvidencefile(fi)
      //    .subscribe(
      //      data => {
      //      console.log('file upload',data.file_url) ;

      //      console.log('file upload',data.file_url) ;
      //      this.allevidence.push(data);
      //         this.loading=false;
      //         this.commonService.notify('info','File Uploaded Successfully');
      //      },
      //      error => {
      //         this.loading = false;
      //      });
         
      //    };
    
      //   }

      onFileChangeUploadEvidence(event: any) {
        let fileFlag = 0;
        if (event.target.files.length === 0) {
            return;
        }
    
        for (let i = 0; i < event.target.files.length; i++) {
            let fi = event.target.files[i];
    
            this.ngZone.run(() => {
                let ext = fi.name.substring(fi.name.lastIndexOf('.') + 1);
                console.log("file ext", ext);
                if (ext == 'png' || ext == 'jpg' || ext == 'jpeg' || ext == 'mp3' || ext == 'mp4' || ext == 'webm' || ext == 'wmv') {
                    let reader = new FileReader();
                    reader.readAsDataURL(fi);
                    fileFlag = 1;
                    this.evidencefiles.push(fi);
                    console.log('evidencefile files ', this.evidencefiles)
                } else {
                    fileFlag = 0;
                    this.commonService.notify('error', 'File type supporting only png, jpg, jpeg, mp3, mp4, webm, wmv');
                    this.evidencefiles = [];
                    event.target.value = '';
                }
            });
        }
    
        if (this.evidencefiles.length > 0 && fileFlag == 1) {
            this.commonService.notify('info', 'Please Wait, File Uploading in Progress...');
            if (this.loading1) {
                return;
            }
    
            this.loading1 = true;
            this.documentService.uploadEvidencefile(this.evidencefiles)
                .subscribe(
                    (data: { [x: string]: any; }) => {
                        this.filedata = data;
                        this.isloading = true;
                        console.log('evidence uploaded files', data);
    
                        if (this.filedata.type == 1) {
                            this.imgprogress = (this.filedata.loaded / this.filedata.total) * 100;
                            this.progressbarwidth = (this.filedata.loaded / this.filedata.total) * 100;
                            console.log(this.progressbarwidth);
                        }
                        if (this.filedata.type == 4) {
                            let fdata = data['body']
                            console.log('f data uploaded files', fdata);
                            this.isloading = false;
                            this.imgprogress = 0;
                            if (this.allevidence) {
                                for (let i = 0; i < fdata.length; i++) {
                                    let evdfile = this.allevidence.filter((obj: { filename: any; }) => obj.filename == fdata[i].filename);
                                    if (evdfile.length < 1) {
                                        this.allevidence.push(fdata[i]);
                                    }
                                }
                            } else {
                                this.allevidence = fdata;
                            }
                            console.log('evidence file Arr', this.allevidence);
                            this.commonService.notify('info', 'File Uploaded Successfully');
    
                        }
                        this.loading1 = false;
                        event.target.value = '';
                        this.evidencefiles = [];
    
                    },
                    (error: any) => {
                        this.loading1 = false;
                        this.isloading = false;
                    });
        }
    
        return undefined;
    }
    
        // Addevidencetocart(){
        //   let finallist = this.tempallevidence.filter(f => f.checked == true);
        //   this.cartevidence =finallist;
        //   this.selectedSlc.cartevidence = this.cartevidence;
        // }

        Addevidencetocart(){
          let finallist = this.tempallevidence.filter((f: { checked: boolean; }) => f.checked == true);
          this.cartevidence =finallist;
          if(this.cartevidence.length >0){
            if(this.allSelectedLc[this.cart_id].cartevidence){
              for (let j = 0; j < this.cartevidence.length; j++) {
                this.allSelectedLc[this.cart_id].cartevidence.push(this.cartevidence[j]);
                this.saveEvidanceBtn = true;
                
              }
            }else{
              this.allSelectedLc[this.cart_id].cartevidence = this.cartevidence;
              this.saveEvidanceBtn = true;
            }
          }else{
            this.commonService.notify('error', 'Please select at least one evidence file.');
          }
        }

        cancelmodel(){
          // for evidence upload array
          for (let i = 0; i < this.tempallevidence.length; i++) {
            this.tempallevidence[i].checked = false;
          }
        }

        deleteevidence(row: { evidenceUrl: any; }, index: any) {
          // console.log('delete file', row , index);
          // console.log('show all cart', this.allSelectedLc);
      
          let allcartevidence = [];
          for (let i = 0; i < this.allSelectedLc.length; i++) {
            if (this.allSelectedLc[i].cartevidence && this.allSelectedLc[i].cartevidence.length > 0) {
              for (let j = 0; j < this.allSelectedLc[i].cartevidence.length; j++) {
                allcartevidence.push(this.allSelectedLc[i].cartevidence[j]);
              }
            }
          }
      
          let evdfile = allcartevidence.filter(obj => obj.evidenceUrl == row.evidenceUrl);
          //   console.log('find file', evdfile);
          // console.log('find all cart file', allcartevidence);
          if (evdfile.length < 1) {
            // console.log('delete file finally', );
            this.commonService.notify("info", "File Removed", "Evidence Removed from Proforma Invoice");
            this.allevidence.splice(index, 1);
          } else {
            this.commonService.notify("error", "File Not Removed", "This evidence file is already used in cart item");
          }
      
        }
        deleteEvidencefilePopup(row: { evidenceUrl: any; }, index: any) {
          let that = this;
          Swal.fire({
              title: 'Are you sure to delete?',
              text: "Evidence file delete from Proforma Invoice",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, Proceed to Delete',
              cancelButtonText: 'No, Cancel',
              customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
          }).then((result: SweetAlertResult<any>) => {
              if (result.value) {
                  that.deleteevidence(row, index);
              }
          });
      }
      
      
        openmodalselectfile(index: string | number){
          this.cart_id = index;
          console.log('cartt index', index);
          console.log('cartt details index',this.allSelectedLc[index]);
          let allcartevidencefiles = [];
          for (let i = 0; i < this.allSelectedLc.length; i++) {
            if (this.allSelectedLc[i].cartevidence && this.allSelectedLc[i].cartevidence.length > 0) {
              for (let j = 0; j < this.allSelectedLc[i].cartevidence.length; j++) {
                allcartevidencefiles.push(this.allSelectedLc[i].cartevidence[j]);
                
              }
            }
          }
          var resArr: any[] = [];
          allcartevidencefiles.forEach(function(item){
            var i = resArr.findIndex(x => x.evidenceUrl == item.evidenceUrl);
            if(i <= -1){
              resArr.push(item);
            }
          });
          console.log('resArr',resArr);

          const results = this.allevidence.filter(({ evidenceUrl: id1 }) => !resArr.some(({ evidenceUrl: id2 }) => id2 === id1));
          console.log('final resArr',results);

          this.tempallevidence = results;
          console.log('tempallevidence',this.tempallevidence);
          
        }

        saveEvidence(){
          console.log("save evi",this.allSelectedLc);
          // this.allSelectedLc.cartevidence
          // console.log("save evi",this.allevidence);
          let eviq: any = {};
          eviq.eviSelectedLc = this.allSelectedLc;
          eviq.allevidence = this.allevidence;
          eviq.quotation_id = this.quotation.id; 
          eviq.user_id = this.quotation.user_id;
          if(this.evidence_id >0){
            eviq.id = this.evidence_id;
          }

          console.log("final save evi",eviq);

          //new Quotation
      this.quotationService.addSaveEvidence(eviq)
      .subscribe(
        (data: { evdebugjson: string; quotation_id: string; }) => {
          this.saveinprogress = false;
          let edj = JSON.parse(data.evdebugjson);
          this.allSelectedLc = edj.eviSelectedLc;
          this.allevidence = edj.allevidence;
          console.log('evi upload', edj);
          this.commonService.notify('info', 'Evidence Added/Updated Successfully');
          this.getQuotation(data.quotation_id,this.quotation.uuid);
          if (this.is_addc) { this.router.navigate(['/quotation/view/' + data.quotation_id+'/'+this.quotation.uuid]); }
          this.saveEvidanceBtn =false;
        },
        (        error: any) => {
          this.saveinprogress = false;
          // this.alertService.error(error);

      });
    }

    // // Inerest functionality days and amount calculation start
    // // day diff
    // daysDiff(sdate, edate) {
    //   // To calculate the time difference of two dates 
    //   sdate = new Date(sdate);
    //   edate = new Date(edate);
    //   console.log("s date", sdate);
    //   console.log("e date", edate);

    //   var Difference_In_Days= Math.floor((Date.UTC(edate.getFullYear(), edate.getMonth(), edate.getDate()) - Date.UTC(sdate.getFullYear(), sdate.getMonth(), sdate.getDate()) ) /(1000 * 60 * 60 * 24));
    //   console.log("Difference_In_Days", Difference_In_Days);
    //   return Difference_In_Days;
    // }

    // // Interest fee calculation
    // getInterestTotal() {
    //   let ttgst = 0;
    //   if (this.selectedCustomer.sez == 'LUT') {
  
    //   }
    //   else if (this.is_inmh() && this.selectedCustomer.sez == 'NO') {
    //     //GST +IGST :: Doubled
    //     // ttgst=ttgst*2;
    //     ttgst = Math.round(this.totalInterestf * 6 / 100) * 2;
    //   } else {
    //     ttgst = Math.round(this.totalInterestf * 12 / 100);
    //   }
    //   return (Math.round(this.totalInterestf+ ttgst));
  
    // }


    // getQuoteFinalTotalWithInterest() {
    //   var ttwI= this.getInterestTotal();
    //   var ttf =this.getQuoteFinalTotal()

    //   return (ttwI + ttf);
    // }

    // // Inerest functionality days and amount calculation end


     // region validation function
    // regionvalidation(){ 
    //   if((this.selectedUser.region_ids_info && this.quotation.subregion) || (this.selectedUser.region_ids ==null) ){
    //     if (this.selectedUser.region_ids ==null){
    //       this.quotation.subregion =null;
    //     }
    //     this.regionflag = 1;  
    //   }else{
    //     this.regionflag = 0;
    //     this.commonService.notify('error', 'Please Select Region ');
    //   }
    // }

    regionvalidation() {

      console.log('this.quotation.subregion', this.selectedUser.region_ids_info , this.quotation.subregion);

      if(this.selectedUser.region_ids_info && !this.quotation.subregion){
        this.quotation.subregion = this.selectedUser.region_ids_info[0];
      }
    
      if ((this.selectedUser.region_ids_info && this.quotation.subregion) || (this.selectedUser.region_ids == null)) {
        if (this.selectedUser.region_ids == null) {
          this.quotation.subregion = null;
        }
      
        this.regionflag = 1;
      } else {
        this.regionflag = 0;
        this.commonService.notify('error', 'Please Select Region ');
      }
    }
    // Cancel Invoice popup
    prepareCancelnvoice(){
      let that = this;
      swal({
        title: 'Are you sure?',
        text: "You want to cancel this Invoice.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Proceed to Cancel',
        cancelButtonText: 'No, Cancel',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      }).then(function (result) {
        if (result.value) {
          that.cancelInvoice();
        }
  
      });
    }

  // cancel Invoice api
  cancelInvoice(){
    console.log('quotation id ', this.quotation.id);
    this.quotationService.cancelInvoice(this.quotation.id).subscribe(
      (res: any) => {
        console.log("cancel invoice res", res);
        this.commonService.notify('info', 'Invoice canceled Successfully');
        this.getQuotation(this.quotation.id,this.quotation.uuid);
      });
  }

  // show Pan Div
  shownopandiv(){
  //   if(show)
    this.show = !this.show;
    if (this.show) {} 
    else {}
  }

  // customer pan no changes request 
  cpn_request() {
    console.log(this.quotation);
    if (this.quotation.cpn_pan_no) {
        let regexp: any;
        let val: any = this.quotation.cpn_pan_no;
        if (val.length < 1) { return 0; }

        regexp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        console.log(regexp.test(val));
        if (!regexp.test(val)) {
            this.quotation.cpn_pan_no = '';
            console.log('pan1 billing page');
            this.commonService.notify('error', 'Invalid PAN Number');
            return 0;
        }
    }

    if (this.quotation.cpn_comment) {
        if (this.saveatiinprogress) {
            this.commonService.notify('info', 'Please Wait', 'Existing Request in Progress');
        }

        this.saveatiinprogress = true;
        this.quotationService.addSaveCpnRequest(this.quotation)
            .subscribe(
                (data: any) => {
                    this.saveatiinprogress = false;
                    this.commonService.notify('info', 'Changes Customer PAN No Request Sent For Approval');
                    this.commonService.hideModal('modalpanrequest');
                    this.getQuotation(this.quotation.id, this.quotation.uuid);
                },
                (error: any) => {
                    this.saveatiinprogress = false;
                });
    } else {
        this.commonService.notify('error', 'Please Enter All Details');
    }

    // Return 0 if none of the conditions are met
    return 0;
}


  // Apply customer pan change
  applyCPN() {
    if(this.quotation.cpn_pan_no){
      this.selectedCustomer.pan = this.quotation.cpn_pan_no;
      this.saveQuotation(true);
      // this.panApprvedFlag = 1;
    }else{
      // this.panApprvedFlag = 1;
    }
  }
  cpn_validate($event: { target: { value: string; }; }) {
    console.log('all qot', this.quotation);
    let regexp: any;

    let val: any = $event.target.value;
    if (val.length < 1) { return 0; }

    regexp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    console.log(regexp.test(val));
    if (regexp.test(val)) {
        // PAN number validation passed
        return; // No need to return anything explicitly
    } else {
        $event.target.value = '';
        this.quotation.cpn_pan_no = '';
        console.log('pan billing page');
        this.commonService.notify('error', 'Invalid PAN Number');
        return 0; // Return 0 if PAN number validation fails
    }
}


  cpnmodel(){
    if (this.quotation.cpn_pan_no && this.quotation.cpn_status){
      console.log("yes");
    }else{
      console.log("no");
      this.shownopandiv();
    }
  }

  checkRejectedCart(){
    console.log("cart size", this.allSelectedLc.length);
    if(this.allSelectedLc && this.allSelectedLc.length==0){
      this.rejectedArray = [];
      this.commonService.hideModal('modalrejectcart');
    }else{
      
    }
  }

  _can_show_condition_field(sc:any={},cf:any={}){
    let flag=true;
    //let sc=this.selectedSlc;
    try{
    if(cf.conditional_category_field_value_id==0){
      return true;
    }
    let category_fields=sc.custom_fields.filter((el: { f_type: string; }) => (el.f_type=='category_field' ));
   // console.log(category_fields);
    flag=false;
    category_fields.forEach((element: { setcartvalue: { id: any; }; conditional_category_field_value_id: number; }) => {
      if(element.setcartvalue){
      //console.log(flag,element,element.setcartvalue.id,cf.conditional_category_field_value_id);
      if(element.setcartvalue.id == cf.conditional_category_field_value_id){
        flag=true;   
        if(element.conditional_category_field_value_id != 0){
       //   console.log('heirrrss',element.conditional_category_field_value_id);
          let cpcf=category_fields.filter((el: { setcartvalue: { id: number; }; }) => el.setcartvalue.id == element.conditional_category_field_value_id);
          cpcf.length>0 ? flag=true : flag=false;
          //return this._can_show_condition_field(sc,element);
        }
       // console.log(flag,element,element.setcartvalue.id,cf.conditional_category_field_value_id);
return true;
      } 
    }     
    });
    //let cf_value_fields=category_fields.filter(el => el.setcartvalue.id==cf.conditional_category_field_value_id);
    //console.log(cf_value_fields,'cf_value_fields');
    // if(category_fields.length == 0){
    //   flag=false;
    // }
  }catch (e) {
   // console.log('error',e);
  }
    return flag;

  }

  conditionFieldNoCheck(cf: any = {}) {
    console.log(cf.id, cf.conditional_category_field_value_id, cf.setcartvalue.id);
  
    cf.category_options.forEach((element: { id: string; }) => {
      if (element.id != cf.setcartvalue.id) {
        let f2d = this.selectedSlc.custom_fields.filter((el: { conditional_category_field_value_id: string | number; }) => {
          // Check if conditional_category_field_value_id is a number before comparison
          if (typeof cf.conditional_category_field_value_id === 'number') {
            return el.conditional_category_field_value_id > 0 && el.conditional_category_field_value_id == element.id;
          }
          return false;
        });
        console.log('delete for ' + element.id, f2d);
        f2d.forEach((elementf2d: { id: any; }) => {
          let fid = this.selectedSlc.custom_fields.findIndex((el: { id: any; }) => el.id == elementf2d.id);
          console.log('fid', fid, this.selectedSlc.custom_fields[fid]);
          this._deleteFieldvalue(fid);
  
          //Second Level Clearing
          if (this.selectedSlc.custom_fields[fid].f_type == 'category_field') {
            this.selectedSlc.custom_fields[fid].category_options.forEach((element2: { id: any; }) => {
              let f2d2 = this.selectedSlc.custom_fields.filter((el: { conditional_category_field_value_id: number; }) => {
                // Check if conditional_category_field_value_id is a number before comparison
                if (typeof cf.conditional_category_field_value_id === 'number') {
                  return el.conditional_category_field_value_id > 0 && el.conditional_category_field_value_id == element2.id;
                }
                return false;
              });
              f2d2.forEach((elementf2d2: { id: any; }) => {
                let fid2 = this.selectedSlc.custom_fields.findIndex((el: { id: any; }) => el.id == elementf2d2.id);
                console.log('fid2', fid2);
  
                this._deleteFieldvalue(fid2);
              });
            });
          }
  
          this._deleteFieldvalue(fid);
        });
      }
    });
  }
  
  
  

  _deleteFieldvalue(i: string | number){
    delete this.selectedSlc.custom_fields[i].setvalue;
    delete this.selectedSlc.custom_fields[i].setcartvalue;
    delete this.selectedSlc.custom_fields[i].setValue; 
  }

  conditionFieldvalidateCheck(selectSlc: { id: number; custom_fields: { setcartvalue: { name: string; }; }[]; }){

    console.log(selectSlc);

      if(selectSlc.id==148 || selectSlc.id==149){

        if(!selectSlc.custom_fields[0].setcartvalue){
          
          this.selectedSlc.custom_fields[1].setcartvalue=null;
          
          
          this.commonService.notify('error', 'No. Of Seats dosenot empty');
          
        }
        if(selectSlc.custom_fields[0].setcartvalue > 60 &&  selectSlc.custom_fields[1].setcartvalue.name=='Yes' ){
          //console.log(this.selectedSlc.custom_fields[1].setcartvalue);
          this.selectedSlc.custom_fields[1].setcartvalue=null;
          this.commonService.notify('error', 'If Restaurant is serving Alcohol and seats mentioned are more than 60 kindly refer categroy 48');
          
        }

        
      }else{
        return true;
      }
  }

  setLeadInfo() {
    if(this.selectedLead){
      //this.getLeadstatusquestions(this.selectedLead.lead_status_id, this.selectedLead.id,1);
      this.getLeadstatusquestions(0);
      // this.customers[0] = this.selectedCustomer;
      // this.selectedCustomer = this.selectedLead.customer;
      this.selectedUser = this.selectedLead.user;
      this.quotation.lead_id = this.selectedLead.id;
      this.quotation.subregion = this.selectedLead.user.region_ids_info[0];
      this.regionvalidation();
    }
  }

}