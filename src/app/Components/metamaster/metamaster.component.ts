import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../Services/auth.service';
interface MetamasterItem {
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
  selector: 'app-metamaster',
  templateUrl: './metamaster.component.html',
  styleUrls: ['./metamaster.component.scss']
})
export class MetamasterComponent implements OnInit {
  isModalOpen: boolean = false;
  loadingIndicator = true;
  saveatiinprogress: boolean = false;
  searchText: string = '';
  metaeventvenuetag: any[] = []; // or whatever type is appropriate
  page = {
    limit: 7,
    count: 0,
    offset: 0,
    orderBy: 'id',
    orderDir: 'desc'
  };
  rows: MetamasterItem[] = [];
  tabrows: MetamasterItem[] = [];
  model: any = {};
  metatypes: any;

  constructor(public authService: AuthService) {
    this.getMetatypes();
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    let params = `pageoffset=${this.page.offset}&limit=${this.page.limit}`;

    this.loadingIndicator = true;
    this.authService.list2096(params).subscribe(
      (res) => {
        this.loadingIndicator = false;
        this.page.count = res.count;
        this.tabrows = res.rows as MetamasterItem[];
      }
    );
  }

  onSearch() {
    setTimeout(() => {
      this.getList();
    }, 300);
  }

  openModal() {
    this.isModalOpen = true;
  }

  getMetatypes() {
    this.authService.listmetatypes().subscribe(
      res => {
        this.metatypes = res;
      }
    );
  }

  hideModal() {
    this.isModalOpen = false;
  }

  addEditMetamaster($event: any): void {
    if (this.saveatiinprogress) {
      return;
    }

    this.saveatiinprogress = true;
    this.authService.addeditmetamaster(this.model).subscribe(res => {
      this.saveatiinprogress = false;
      this.getList();
    });
  }
}
