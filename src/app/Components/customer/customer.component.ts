import { Component, OnInit } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../Services/auth.service';
import { NgModel} from '@angular/forms';
interface CustomerItem {
  id: string;
  lead_ids: string; // Assuming lead_ids is a string
  name: string;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  city: string;
  state: string;
  pincode: string;
  pan?: string;
  gst?: string;
  approved: number;
  src: string;
  count_quotation?: number;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customers: CustomerItem[] = [];
  loadingIndicator = true;
  searchText: string = '';
  page: { limit: number; count: number; offset: number; orderBy: string; orderDir: string } = {
    limit: 10,
    count: 0,
    offset: 0,
    orderBy: 'id',
    orderDir: 'desc',
  };

  rowsBasic = [];
  roflag=false;
  roflag1=false;
  panVerified: boolean = false;
  fullScreenRow = [];
  reorderable = true;
  showVerifyButton: boolean = false;
  saveinprogress=false;
  
  

  cityLoading=false;
  isPanVerified: boolean = false;
  // At the top of your component class, declare the variable
isGSTVerified: boolean = false;


cities:any=[];
customergroups:any;
isOpen: boolean = false; // Variable to control modal visibility
loading=false;
flag : boolean=false;
gflag : boolean=false;
  rows = [];
  tabrows = [];
  tabrowscg = [];
  expanded = {};
  timeout: any;
  rowsFilter = [];
  tempFilter :any ;
  tempFilterCG = [];

  scustomers:any=[];
  scloading=false;

  searchq='';
  searchqf='-3';
   
  isModalOpen: boolean = false;
  model: any = {};
  selectedCustomer : any =[];
  selectedBranch : any = {};
  selectedRegion : any={};
  region : any=[];
  modelcg:any={};
  row : any= []; 
  states:any=[];
  currentUser:any; 
  response: any;
  isPanValid: any;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.getList();
  }
  openModal() {
    this.isOpen = true;
  }

  // Function to close the modal
  closeModal() {
    this.isOpen = false;
  }
  
  getList() {
    let params = `pageoffset=${this.page.offset}&limit=${this.page.limit}`;

    if (this.searchText.trim().length > 0) {
      params += `&searchq=${this.searchText.trim()}`;
    }

    this.loadingIndicator = true;
    this.authService.list2096(params).subscribe(
      (res) => {
        this.loadingIndicator = false;
        this.page.count = res.count;
        this.customers = res.rows as CustomerItem[];
      }
    );
  }
  
  addEditCustomer(): void {
   
    this.saveinprogress = true;
  
    this.authService.addeditcustomer(this.model).subscribe(
      (res: any) => {
        this.getList(); // Refresh the list after adding/editing a customer
        this.saveinprogress = false;
        // Handle success scenario
      },
      (error: any) => {
        this.saveinprogress = false;
        console.error('Error occurred:', error);
        // Handle error scenario
      }
    );
  }
  
  search(){
    this.pageCallback({ offset: 0 });
  }
  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.getList();
  }

  onSearch() {
    // Delay the search to avoid too frequent API calls
    setTimeout(() => {
      this.getList();
    }, 300);
  }
  private showModal(modalId: string): void {
    // Implement the logic to show the modal using a third-party library or your custom modal service
    // Example: showModalLogic(modalId);
  }
}
