import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DatatableComponent} from '@swimlane/ngx-datatable';

import swal from 'sweetalert2';
import { CommonService } from '../../../Services/common.service';
import { RoleService } from '../../../Services/role.service';
import { AuthService } from '../../../Services/auth.service';
import { LeadstatusService } from '../../../Services/leadstatus.service';

@Component ({
    templateUrl: 'leadstatus-list.component.html'
})

export class LeadstatusListComponent implements OnInit {
    dtOptions: any = {};
    model: any={}; 
    modelq: any={}; 
    loading2 = false;
    showModal=true;

    currentUser:any;
    selectRole:any;
    selectLeadstatus:any;
    roles:any; 
    allnos:any;
    permissions:any;
    checkallflag=false;


    rows = [];
    tabrows = [];
    loading=false;
    expanded = {};
    timeout: any;
    rowsFilter = []; 
    tempFilter = [];
//    modelpermissions:any;
  //  modelrole:any;

  @ViewChild(DatatableComponent) table!: DatatableComponent;

    constructor(private route: ActivatedRoute, public leadStatusService:LeadstatusService,
        private router: Router,public commonService: CommonService, public roleService: RoleService,  public authService: AuthService){
        this.getList();
        this.currentUser=this.commonService.getCurrentUser();
        this.model.related_ids=[]; 
        //this.model.scope=this.currentUser.role.scope;
        
    }

 // getCustomers
     getList() {
        this.loading = true;
         this.leadStatusService.list('showall=1').subscribe(
             res => {
                this.settableconfig(res);
                this.roles=res;
                this.tabrows=res;
                console.log(this.roles);
                this.loading = false;
             }
     );

     

   }

    ngOnInit(): void { 
      
    }

   leadstatus_addedit($e: { preventDefault: () => void; }) {
        $e.preventDefault();
        console.log('add User');
        console.log(this.model);
         
         this.loading2 = true;
         
         this.leadStatusService.addEdit(this.model)
             .subscribe(
                 data => {
                    this.loading2 = false;
                    this.commonService.hideModal('leadstatusaddedit');
                    this.resetModel();
                   this.commonService.notify('info', 'Lead Status Added/Edited Successfully');
                    
                     
                      this.getList();
                 },
                 error => {
                     // this.alertService.error(error);
                     this.loading2 = false;
                     
                 });
 
     }


     leadstatusquestion_addedit($e: { preventDefault: () => void; }) {
      $e.preventDefault();
      console.log('add User');
      console.log(this.model);
       
       this.loading2 = true;
       this.modelq.lead_status_id=this.selectLeadstatus.id;
       this.leadStatusService.addEditLeadStatusQuestion(this.modelq)
           .subscribe(
               data => {
                  this.loading2 = false;
                  this.commonService.hideModal('addeditleadstatusquestion');
                  this.resetModelq();
                  this.selectLeadstatus.questions=data;
                 this.commonService.notify('info', 'Lead Status Question Added/Edited Successfully');
                  
                   
                    this.getList();
               },
               error => {
                   // this.alertService.error(error);
                   this.loading2 = false;
                   
               });

   }

     

     

      

      setModel(role: any){
        this.model=this.commonService.cloneWR(role); 
      }

      setModelq(role: any){
        this.modelq=this.commonService.cloneWR(role); 
      }

      resetModel(row: any = null): void {
        if (row) {
            this.model.lead_status_id = row.id;
            this.selectLeadstatus = row;
        } else {
            this.model = {
                id: 0,
            };
        }
    }
    
      resetModelq(){
        this.modelq={};
        this.modelq.id=0; 
      }
      

     

    settableconfig(data: string | any[]){
        let that=this;
        let pp=false;
        if(data.length > 10){
            pp=true;
        }  
        console.log(pp);
        let buttons: { text: string; key: string; action: (e: any, dt: any, node: any, config: any) => void; }[]=[];
        if(this.authService.checkPermission('51') || this.authService.checkPermission('52')){

            buttons=  [
                {
                text: 'Add LeadStatus',
                key: '1',
                action: function (e: any, dt: any, node: any, config: any) {
                 // alert('Button activated');
                 that.resetModel();
                 that.commonService.showModal('leadstatusaddedit');
      
                }
              }
            ];

        }
        this.dtOptions = {
            paging:pp,
            bInfo:false,
            order:[],
                // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      
      "columnDefs": [
        { "orderable": false, "targets": 2 }
      ]
      ,
      // Configure the buttons
      buttons: buttons
           
        };

        /*  pageLength: 2,
            serverSide: true,
            processing: true,
            ajax: (dataTablesParameters: any, callback) => {
              that.http
                .post<DataTablesResponse>(
                  'https://angular-datatables-demo-server.herokuapp.com/',
                  dataTablesParameters, {}
                ).subscribe(resp => {
                  that.persons = resp.data;
      
                  callback({
                    recordsTotal: resp.recordsTotal,
                    recordsFiltered: resp.recordsFiltered,
                    data: []
                  });
                });
            }, */
     }

     getQOptions(id: any){
      let pq= this.selectLeadstatus.questions.filter((word: { id: any; }) => word.id == id);
      //console.log(pq);
      if(pq){
      if(pq[0].input_options){
        return pq[0].input_options;
      }
    }
    }

}