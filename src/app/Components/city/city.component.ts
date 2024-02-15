import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  tabrows: any[] = [];
  page = { count: 0, offset: 0, limit: 10 };
  searchq: string = '';
  searchqf: string = '';
  model: any = {};
  loading: boolean = false;
  loadingIndicator: boolean = false;
  isOpen: boolean = false;
  states: any[] = []; // Define states array

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    let params = 'pageoffset=' + this.page.offset;
    params = params + '&limit=' + this.page.limit;

    if (this.searchq.length > 1) {
      params = params + '&searchq=' + this.searchq;
    }
    if (this.searchqf.length > 0) {
      params = params + '&searchqf=' + this.searchqf;
    }

    this.loadingIndicator = true;
    this.loading = true;

    this.authService.listcity(params).subscribe(
      (res: { count: number; rows: any[] }) => {
        this.loading = false;
        this.page.count = res.count;
        this.tabrows = res.rows;
        this.loadingIndicator = false;
      },
      (error: any) => {
        this.loading = false;
        this.loadingIndicator = false;
        console.error('Error fetching city list:', error);
        // Handle error here, maybe show a toast message or something
      }
    );
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  onSearch() {
    setTimeout(() => {
      this.getList();
    }, 300);
  }

  addEditCity(form: NgForm) {
    this.authService.addeditcity(this.model).subscribe(() => {
      this.getList();
      this.closeModal();
    }, (error: any) => {
      console.error('Error adding/editing city:', error);
      // Handle error here, maybe show a toast message or something
    });
  }

  editCity(row: any) {
    this.model = { ...row };
    this.openModal();
  }
}
