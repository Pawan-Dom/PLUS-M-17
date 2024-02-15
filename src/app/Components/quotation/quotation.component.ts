import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../Services/auth.service';
interface Quotation {
  lead_id: number;
  lead: {
    lead_status_name: string;
  };
  id: number;
  uuid: string;
  customer: {
    name: string;
    franchise?: string;
  };
  user: {
    name: string;
    role: {
      name: string;
    };
    region?: string;
  };
  region_name?: string;
  updated_on: Date;
  createdby_user: {
    id: number;
    name: string;
    role: {
      name: string;
    };
    region: string;
  };
  created_on: Date;
}

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {
  data: Quotation[] = [];
  
  loadingIndicator = false;
  searchText: string = '';
  page: { limit: number; count: number; offset: number; orderBy: string; orderDir: string } = {
    limit: 10,
    count: 0,
    offset: 0,
    orderBy: 'id',
    orderDir: 'desc',
  };
  roflag: boolean = false;
  showdr: string = '';
  searchq: string = '';
  searchqextnd: string = '';
  searchquserf: string = '';
  searchqregionf: string = '';
  customers: any[] = []; // Change the type according to your customer data structure
  custLoading: boolean = false;
  custTypeahead: any; // Change the type according to your customer typeahead configuration
  searchqcustomerf: string = '';
  ngOptionHighlight: any; // Change the type according to your ngOptionHighlight configuration
  region_ids: any[] = []; // Change the type according to your region data structure
  searchqsubregionf: string = '';
  searchqf: string = '';
  searchqevidence: string = '';
  user:any;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    let params = `pageoffset=${this.page.offset}&limit=${this.page.limit}&searchText=${this.searchText}`;

    this.loadingIndicator = true;

    this.authService.list123(params).subscribe(
      (res: { count: number, rows: Quotation[] }) => {
        this.loadingIndicator = false;
        this.page.count = res.count;
        this.data = res.rows;
      },
      (error) => {
        console.error('API Error:', error);
        this.loadingIndicator = false;
        // Handle error if necessary
      }
    );
  }

  onSearch() {
    setTimeout(() => {
      this.getList();
    }, 300);
  }

  search() {
    // Implement your search logic if needed
  }
}
