import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { SharedModule } from '../../shared/shared.module';
interface LeadItem {
  email: any;
  name: any;
  id: string;
  user: {
    name: string;
    role: {
      name: string;
    };
    region_ids_info: Array<{
      region_name: string;
    }>;
  };
  created_on: Date;
  updated_on: Date;
  customer: {
    id: string;
    name: string;
    address_line_1: string;
    address_line_2: string;
    address_line_3: string;
    city: string;
    state: string;
    pincode: string;
    approved: number;
    src: string;
  };
  remark?: string;
  type?: string;
}

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss'],
})
export class LeadComponent implements OnInit {
  leads: LeadItem[] = [];
  loadingIndicator = true;

  // Initialize the page object
  page: { limit: number; count: number; offset: number; orderBy: string; orderDir: string } = {
    limit: 7,
    count: 0,
    offset: 0,
    orderBy: 'id',
    orderDir: 'desc',
  };
  

  searchText: string = ''; // Initialize searchText as string

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    let params = `pageoffset=${this.page.offset}&limit=${this.page.limit}`;

    if (this.searchText.trim().length > 0) {
      params += `&searchq=${this.searchText.trim()}`;
    }

    this.loadingIndicator = true;
    this.authService.list1(params).subscribe(
      (res) => {
        this.loadingIndicator = false;
        this.page.count = res.count;
        this.leads = res.rows as LeadItem[];
      }
    );
  }

  onSearch() {
    setTimeout(() => {
      this.getList();
    }, 300);
  }
}
