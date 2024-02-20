import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import { LicenseCategoryService } from '../../../Services/licensecategory.service';
@Component({
  selector: 'app-licensecategory-list',
  templateUrl: './licensecategory-list.component.html',
  styleUrls: [
    './licensecategory-list.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class LicenseCategoryListComponent implements OnInit {
  rowsBasic = [];
  fullScreenRow = [];
  loadingIndicator = true;
  reorderable = true;
 

  rows = [];
  tabrows: { id: any; name: any; cat_idcode: any; }[] = [];
  tempFilter: { id: any; name: any; cat_idcode: any; }[] = [];
  expanded = {};
  timeout: any;
  rowsFilter = [];
  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(public licenseCategoryService: LicenseCategoryService) {
    /*this.fetchBasicData((data) => {
      this.rowsBasic = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });

    this.fetch((data) => {
      this.rows = data;
    });

    this.fetchFullScreenData((data) => {
      this.fullScreenRow = data;
    });

    this.fetchFilterData((data) => {
      // cache our list
      this.tempFilter = [...data];

      // push our inital complete list
      this.rowsFilter = data;
    });*/

    this.getList();
  }

  // getCustomers
  getList() {
    let tr: { id: any; name: any; cat_idcode: any; }[] = []; // Specify the type of 'tr'
    this.licenseCategoryService.list().subscribe(
        res => {
            for (let i in res) {
                tr.push({ id: res[i].id, name: res[i].name, cat_idcode: res[i].cat_idcode });
            }
            console.log(tr);
            this.tabrows = tr;
            this.tempFilter = tr;
        }
    );
}


  view(row: any) {
console.log(row);
  }
  edit(row: any) {

  }
  delete(row: any) {
  }
  add() {

  }

  ngOnInit() {

  }

  fetchBasicData(cb: (arg0: any) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/basic.json');

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  fetchFullScreenData(cb: (arg0: any) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/fullscreen.json');

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  fetchFilterData(cb: (arg0: any) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }


updateFilter(event: KeyboardEvent) {
    const val = (event.target as HTMLInputElement).value.toLowerCase();
   
    const temp = this.tempFilter.filter(function(d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.tabrows = temp;
    this.table.offset = 0;
}


  onPage(event: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb: (arg0: any) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      const rows = JSON.parse(req.response);

      for (const row of rows) {
        row.height = Math.floor(Math.random() * 80) + 50;
      }

      cb(rows);
    };
    req.send();
  }

  getRowHeight(row: { height: any; }) {
    return row.height;
  }

}
