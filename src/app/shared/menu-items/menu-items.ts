import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'master',
    main: [
      {
        state: 'dashboard',
        pid:31,
        short_label: 'D',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home',
        add:'nop',
        edit:'nop',
        delete:'nop'
      },
      {
        state: 'user',
        pid:17,
        short_label: 'U',
        name: 'Users',
        type: 'link',
        icon: 'ti-user',
        add:'user_add',
        edit:'user_edit',
        delete:'user_delete'
      },
      {
        state: 'lead',
        pid:88,
        short_label: 'L',
        name: 'Leads',
        type: 'link',
        icon: 'ti-stats-up',
        add:'settings_add',
        edit:'settings_edit',
        delete:'settings_delete'
      },
      {
        state: 'customer',
        pid:13,
        short_label: 'C',
        name: 'Customers',
        type: 'link',
        icon: 'ti-layout-cta-right',
        add:'customer-add',
        edit:'customer-edit',
        delete:'customer-delete'
      }, {
        state: 'city',
        pid:62,
        short_label: 'C',
        name: 'Cities',
        type: 'link',
        icon: 'ti-layout-cta-right',
        add:'customer-add',
        edit:'customer-edit',
        delete:'customer-delete'
      },{
        state: 'metamaster',
        pid:70,
        short_label: 'M',
        name: 'Meta Master',
        type: 'link',
        icon: 'ti-layout-cta-right',
        add:'customer-add',
        edit:'customer-edit',
        delete:'customer-delete'
      },/*
      {
        state: 'licensecategory',
        short_label: 'L',
        name: 'License Tarrifs',
        type: 'link',
        icon: 'ti-id-badge',
        add:'license_add',
        edit:'license_edit',
        delete:'license_delete'
      },*/
      {
        state: 'branch',
        pid:32,
        short_label: 'B',
        name: 'Local Fac. Centers',
        type: 'link',
        icon: 'ti-exchange-vertical',
        add:'branch_add',
        edit:'branch_edit',
        delete:'branch_delete'
      },
      {
        state: 'role',
        pid:34,
        short_label: 'R',
        name: 'Roles',
        type: 'link',
        icon: 'ti-user',
        add:'role_add',
        edit:'role_edit',
        delete:'role_delete'
      },
      {
        state: 'setting',
        pid:81,
        short_label: 'S',
        name: 'Settings',
        type: 'link',
        icon: 'ti-settings',
        add:'setting_add',
        edit:'setting_edit',
        delete:'setting_delete'
      }
    ],
  },
  {
    label: 'Sales',
    main: [
      {
        state: 'quotation',
        pid:1,
        short_label: 'L',
        name: 'Proforma Invoices',
        type: 'link',
        icon: 'ti-shopping-cart-full',
        add:'invoice_add',
        edit:'invoice_edit',
        delete:'invoice_delete'
      },
      {
        state: 'license',
        pid:87,
        short_label: 'L',
        name: 'Licenses',
        type: 'link',
        icon: 'ti-receipt',
        add:'invoice_add',
        edit:'invoice_edit',
        delete:'invoice_delete'
      },
      {
        state: 'creditnote',
        pid:66,
        short_label: 'CN',
        name: 'Credit Notes',
        type: 'link',
        icon: 'ti-shopping-cart',
        add:'invoice_add',
        edit:'invoice_edit',
        delete:'invoice_delete'
      },
    /*  
      {
        state: 'invoice',
        short_label: 'I',
        name: 'Invoices',
        type: 'sub',
        icon: 'ti-layers-alt',
        add:'invoice_add',
        edit:'invoice_edit',
        delete:'invoice_delete',
        children: [  {
            state: 'summary',
            name: 'Invoice Summary'
          }, {
            state: 'list',
            name: 'Invoice List'
          }
        ]
      
      },*/
      {
        state: 'transaction',
        pid:5,
        short_label: 'T',
        name: 'Transactions/receipts',
        type: 'link',
        icon: 'ti-files',
        add:'invoice_add',
        edit:'invoice_edit',
        delete:'invoice_delete'
      },
      {
        state: 'transaction/bankstatement',
        short_label: 'bs',
        pid:20,
        name: 'Bank Statement',
        type: 'link',
        icon: 'ti-files',
        add:'invoice_add',
        edit:'invoice_edit',
        delete:'invoice_delete'
      },
      {
        state: 'transaction/returntransactions',
        short_label: 'rt',
        pid:9,
        name: 'Refund Transactions',
        type: 'link',
        icon: 'ti-files',
        add:'invoice_add',
        edit:'invoice_edit',
        delete:'invoice_delete'
      },
      {
        state: 'quotation/dr/dr',
        short_label: 'dr',
        pid:24,
        name: 'Discount Requests',
        type: 'link',
        icon: 'ti-id-badge',
        add:'invoice_add',
        edit:'invoice_edit',
        delete:'invoice_delete'
      }, 
      {
        state: 'quotation/dr/atir',
        pid:25,
        short_label: 'atir',
        name: 'Advance TI Requests',
        type: 'link',
        icon: 'ti-id-badge',
        add:'invoice_add',
        edit:'invoice_edit',
        delete:'invoice_delete'
      }, 
      {
        state: 'quotation/dr/pir',
        pid:25,
        short_label: 'pir',
        name: 'PI Requests',
        type: 'link',
        icon: 'ti-id-badge',
        add:'invoice_add',
        edit:'invoice_edit',
        delete:'invoice_delete'
      }, 
      {
        state: 'quotation/dr/noc',
        pid:78,
        short_label: 'noc',
        name: 'NOC Requests',
        type: 'link',
        icon: 'ti-id-badge',
        add:'invoice_add',
        edit:'invoice_edit',
        delete:'invoice_delete'
      },
      {
        state: 'quotation/dr/cpn',
        short_label: 'dr',
        pid:86,
        name: 'Customer PAN Requests',
        type: 'link',
        icon: 'ti-id-badge',
        add:'invoice_add',
        edit:'invoice_edit',
        delete:'invoice_delete'
      }, 
      {
        state: 'einvoicect',
        pid:84,
        short_label: 'E',
        name: 'Einvoice CT Log',
        type: 'link',
        icon: 'ti-receipt',
        add:'invoice_add',
        edit:'invoice_edit',
        delete:'invoice_delete'
      },
      {
        state: 'report',
        pid:26,
        short_label: 'report',
        name: 'Reports',
        type: 'link',
        icon: 'ti-archive',
        add:'invoice_add',
        edit:'invoice_edit',
        delete:'invoice_delete'
      },
      {
        state: 'dtoc',
        pid:27,
        short_label: 'dtoc',
        name: 'D2C',
        type: 'link',
        icon: 'ti-archive',
        add:'dtoc_add',
        edit:'dtoc_edit',
        delete:'dtoc_delete'
      }

    ]
  },
  {
    label: 'DART',
    main: [  {
      state: 'tracking',
      pid:74,
      short_label: 'T',
      name: 'Tracking',
      type: 'link',
      icon: 'ti-map-alt',
      add:'settings_add',
      edit:'settings_edit',
      delete:'settings_delete'
    //   target: true
    },
      {
        state: 'document',
        pid:46,
        short_label: 'D',
        name: 'Documents',
        type: 'link',
        icon: 'ti-folder',
        add:'settings_add',
        edit:'settings_edit',
        delete:'settings_delete'
      //   target: true
      },
      {
        state: 'leadstatus',
        short_label: 'L',
        pid:50,
        name: 'Lead Statuses',
        type: 'link',
        icon: 'ti-anchor',
        add:'settings_add',
        edit:'settings_edit',
        delete:'settings_delete'
        // target: true
      },
      {
        state: 'target',
        short_label: 'T',
        pid:54,
        name: 'Sales Targets',
        type: 'link',
        icon: 'ti-stats-up',
        add:'settings_add',
        edit:'settings_edit',
        delete:'settings_delete'
      }, 
      {
        state: 'incentive',
        short_label: 'I',
        pid:58,
        name: 'Incentives',
        type: 'link',
        icon: 'ti-split-v-alt',
        add:'settings_add',
        edit:'settings_edit',
        delete:'settings_delete'
      }

    ]
  },

 /* 
  {
    label: 'Settings',
    main: [
      {
        state: 'system-config',
        short_label: 'S',
        name: 'System config',
        type: 'link',
        icon: 'ti-settings',
        add:'settings_add',
        edit:'settings_edit',
        delete:'settings_delete'
      //   target: true
      },
      {
        state: 'maintainance',
        short_label: 'M',
        name: 'Maintainance',
        type: 'link',
        icon: 'ti-na',
        add:'settings_add',
        edit:'settings_edit',
        delete:'settings_delete'
        // target: true
      }
    ]
  },*/
  /*{
    label: 'Support',
    main: [
      {
        state: 'tickets',
        short_label: 'S',
        name: 'Tickets',
        type: 'link',
        icon: 'ti-layout-list-post',
        add:'settings_add',
        edit:'settings_edit',
        delete:'settings_delete'
        // target: true
      }
    ]
  }*/
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}