import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DatatableComponent} from '@swimlane/ngx-datatable';

import swal from 'sweetalert2';
import { CommonService } from '../../../Services/common.service';
import { RoleService } from '../../../Services/role.service';
import { AuthService } from '../../../Services/auth.service';

@Component ({
    templateUrl: 'role-list.component.html'
})

export class RoleListComponent implements OnInit {
    dtOptions: any = {};
    model: any; 
    permissions: { [key: string]: any[] } = {}; // Define permissions as an object with string keys and any[] values
    loading2 = false;
    showModal=true;
    currentUser:any;
    selectRole:any;
    roles:any; 
    allnos:any;
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

    constructor(private route: ActivatedRoute,
        private router: Router,public commonService: CommonService, public roleService: RoleService,  public authService: AuthService){
        this.getList();
        this.currentUser=this.commonService.getCurrentUser();
        this.model.permissions=[];
        //this.model.scope=this.currentUser.role.scope;
        
    }

 // getCustomers
     getList() {
        this.loading = true;
         this.roleService.list().subscribe(
             res => {
                this.settableconfig(res);
                this.roles=res;
                this.tabrows=res;
                console.log(this.roles);
                this.loading = false;
             }
     );

     this.roleService.listPermissions().subscribe(
        res => {
            
           this.permissions=res.allps;
           console.log(this.permissions);
           this.allnos=res.allnos;

           this.loading = false;
        }
        );

   }

    ngOnInit(): void {
        this.model.permissions=[];
      
    }

   role_add($e: { preventDefault: () => void; }) {
        $e.preventDefault();
        console.log('add User');
        console.log(this.model);
         
         this.loading2 = true;
         
         this.roleService.addEdit(this.model)
             .subscribe(
                 data => {
                    this.loading2 = false;
                    this.commonService.hideModal('roleadd');
                    this.resetModel();
                   this.commonService.notify('info', 'Role Added/Edited Successfully');
                    
                     
                      this.getList();
                 },
                 error => {
                     // this.alertService.error(error);
                     this.loading2 = false;
                     
                 });
 
     }

     

     

     
     public changeModel(ev: any, list: any[], val: any) {
      list = list || [];

      const checked = ev.target.checked;

      if (checked) {
          list.push(val);
      } else {
          let i = list.indexOf(val);
          if (i !== -1) {
              list.splice(i, 1);
          }
      }
      console.log(list, this.model?.permissions);
  }

      setModel(role: { permissions: string; }){
        this.model=this.commonService.cloneWR(role);
        
        if(role.permissions){
        this.model.permissions=role.permissions.split(',');
        } else {
            this.model.permissions=[];
        }
      }

      resetModel(){
        this.model={};
        this.model.id=0;
        //this.model.scope=this.currentUser.role.scope;
        this.model.permissions=[];
        this.checkallflag=false;
      }

      check_includes(id: any){
        if(this.model.permissions){
        return this.model.permissions.includes(id);
      } 
      else {
          return false;
      }

    }

    checkall(){
        console.log(this.allnos,this.model.permissions);
       
        if(this.checkallflag){
            this.model.permissions=JSON.parse('[]');
        } else{
          this.model.permissions=this.allnos;
        }

        this.checkallflag=!this.checkallflag;
    }


    settableconfig(data: string | any[]){
        let that=this;
        let pp=false;
        if(data.length > 10){
            pp=true;
        }  
        console.log(pp);
        let buttons: { text: string; key: string; action: (e: any, dt: any, node: any, config: any) => void; }[]=[];
        if(this.authService.checkPermission('83') || this.authService.checkPermission('89')){

            buttons=  [
                {
                text: 'Add Role',
                key: '1',
                action: function (e, dt, node, config) {
                 // alert('Button activated');
                 that.resetModel();
                 that.commonService.showModal('roleadd');
      
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

}