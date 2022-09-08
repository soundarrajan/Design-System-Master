import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { GridOptions } from "ag-grid-community";

@Component({
  selector: 'app-new-options-trade',
  templateUrl: './new-options-trade.component.html',
  styleUrls: ['./new-options-trade.component.scss']
})
export class NewOptionsTradeComponent implements OnInit {
  public gridOptions_addcost: GridOptions;
  public typeSelected = 'otc';
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'data-picker-gray',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/customicons/calendar-dark.svg'));

    this.gridOptions_addcost = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_addcosts,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,
      onCellValueChanged: ($event) => {
        console.log($event);
      },

      onGridReady: (params) => {
        this.gridOptions_addcost.api = params.api;
        this.gridOptions_addcost.columnApi = params.columnApi;
        this.gridOptions_addcost.api.sizeColumnsToFit();
        this.gridOptions_addcost.api.setRowData(this.rowData_addcosts);


      },
      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 9 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 9) {
          params.api.sizeColumnsToFit();

        }
      }
    }
  }
  show_save: boolean = true;
  active_confirm: boolean = false;
  active_settle: boolean = false;
  show_unconfirm: boolean = false;
  settled: boolean = false;
  confirmed: boolean = false;
  isCollapsed: boolean = false;
  public selected = 0;
  filteredCompanyOptions: Observable<string[]>;
  filteredStrategyOptions: Observable<string[]>;
  filteredTraderOptions: Observable<string[]>;
  filteredBookOptions: Observable<string[]>;
  filteredProductOptions: Observable<string[]>;
  filteredLocationOptions: Observable<string[]>;
  filteredBuyerSellerOptions: Observable<string[]>;
  filteredExecutingBrokerOptions: Observable<string[]>;
  filteredExchangeOptions: Observable<string[]>;
  filteredUnderlyingIndexOptions: Observable<string[]>;
  filteredPeriodOptions: Observable<string[]>;
  filteredBrokerOptions: Observable<string[]>;
  tab_label = "NEW OPTIONS TRADE";
  templates = [
    { value: 'asian', viewValue: 'Asian Options Template' },
    { value: 'american', viewValue: 'American Template' },
    { value: 'european', viewValue: 'European Template' },
    { value: 'options', viewValue: 'Options Template' },
    { value: 'otc', viewValue: 'OTC Template' }
  ]
  company = ['AA oil inc', 'B oil inc'];
  strategy = ['Pmg strategy', 'Pmg strategy2'];
  trader = ['Santiago Labos'];
  book = ['Pmg Book 1', 'Pmg Book 2'];
  product = ['Ethanol', 'Methanol'];
  location = ['Long beach,CA'];
  buyerSeller = ['ABC oil co', 'Buyer1'];
  executingBroker = ["James Van Peit"];
  period = ['August', 'July', 'June'];
  exchange = ['ABC'];
  underlyingIndex = ['ICE Brent Crude'];
  clearingBroker = ["Broker1"];
  obtainedFrom = [
    { value: 'otc', viewValue: 'OTC' },
    { value: 'exchange', viewValue: 'Exchange' },
  ]
  optionstyle = [
    { value: 'european', viewValue: 'European' },
  ]
  optionmode = [
    { value: 'call', viewValue: 'Call' },
  ]
  pricetype = [
    { value: 'mean', viewValue: 'Mean' },
  ]
  tradeDate = new FormControl("");
  expiryDate = new FormControl(new Date());
  item = new FormGroup({
    company: new FormControl(''),
    strategy: new FormControl(''),
    trader: new FormControl(''),
    book: new FormControl(''),
    product: new FormControl(''),
    location: new FormControl(''),
    buyer_seller: new FormControl(''),
    executingbroker: new FormControl(''),
    period: new FormControl(''),
    exchange: new FormControl(''),
    underlyingIndex: new FormControl(''),
    broker: new FormControl('')
  });

  settlement_info = {
    days: "",
    type: "",
    calendar: "",
    date: "",
    settlement_currency: "",
    base_currency1: "",
    base_currency2: "",
    unit: ""
  }
  deal_price = {
    quantity: "",
    uom: "",
    calc_price: "",
    amount: "",
    position: "",
    exposure: ""
  }
  mtm_price = {
    quantity: "",
    uom: "",
    calc_price: "",
    amount: "",
    position: "",
    exposure: ""
  }
  premium = {
    quantity: "",
    uom: "",
    calc_price: "",
    amount: "",
    position: "",
    exposure: ""
  }
  net_cost = {
    quantity: "",
    uom: "",
    calc_price: "",
    amount: "",
    position: "",
    exposure: ""
  }
  pnl = {
    quantity: "",
    uom: "",
    calc_price: "",
    amount: "",
    position: "",
    exposure: ""
  }
  public defaultToggle = 'buy';
  public conversionFactor = [
    { value: 'rounding', viewValue: 'Rounding' },
  ]
  public precisionOptions = [
    { value: 'rounding', viewValue: 'Calculate and Round' },
  ]
  ngOnInit() {
    this.filteredCompanyOptions = this.item.get('company').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'company'))
      );
    this.filteredStrategyOptions = this.item.get('strategy').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'strategy'))
      );
    this.filteredTraderOptions = this.item.get('trader').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'trader'))
      );
    this.filteredBookOptions = this.item.get('book').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'book'))
      );
    this.filteredProductOptions = this.item.get('product').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'product'))
      );
    this.filteredLocationOptions = this.item.get('location').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'location'))
      );
    this.filteredBuyerSellerOptions = this.item.get('buyer_seller').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'buyerSeller'))
      );
    this.filteredExecutingBrokerOptions = this.item.get('executingbroker').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'executingbroker'))
      );
    this.filteredExchangeOptions = this.item.get('exchange').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'exchange'))
      );
    this.filteredPeriodOptions = this.item.get('period').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'period'))
      );

    this.filteredUnderlyingIndexOptions = this.item.get('underlyingIndex').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'underlyingIndex'))
      );
    this.filteredBrokerOptions = this.item.get('broker').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'broker'))
      );
  }
  private _filter(value: string, field: string): string[] {
    const filterValue = value.toLowerCase();
    switch (field) {
      case 'company': {
        return this.company.filter(option => option.toLowerCase().includes(filterValue));
      }
      case 'strategy': {
        return this.strategy.filter(option => option.toLowerCase().includes(filterValue));
      }
      case 'trader': {
        return this.trader.filter(option => option.toLowerCase().includes(filterValue));
      }
      case 'book': {
        return this.book.filter(option => option.toLowerCase().includes(filterValue));
      }
      case 'product': {
        return this.product.filter(option => option.toLowerCase().includes(filterValue));
      }
      case 'location': {
        return this.location.filter(option => option.toLowerCase().includes(filterValue));
      }
      case 'buyerSeller': {
        return this.buyerSeller.filter(option => option.toLowerCase().includes(filterValue));
      }
      case 'executingbroker': {
        return this.executingBroker.filter(option => option.toLowerCase().includes(filterValue));
      }
      case 'broker': {
        return this.clearingBroker.filter(option => option.toLowerCase().includes(filterValue));
      }
      case 'period': {
        return this.period.filter(option => option.toLowerCase().includes(filterValue));
      }
      case 'exchange': {
        return this.exchange.filter(option => option.toLowerCase().includes(filterValue));
      }
      case 'underlyingIndex': {
        return this.underlyingIndex.filter(option => option.toLowerCase().includes(filterValue));
      }
    }
  }
  onTemplateSelect(value) {
    // this.item.setValue({
    //   company: "AA oil inc",
    //   strategy: "Pmg strategy",
    //   trader: "Santiago Labos",
    //   book: "Pmg book 1",
    //   product: "Ethanol",
    //   location: "Long beach, CA",
    // })
    this.item.controls['company'].setValue("AA oil inc");
    this.item.controls['strategy'].setValue("Pmg strategy");
    this.item.controls['trader'].setValue("Santiago Labos");
    this.item.controls['book'].setValue("Pmg book 1");
    this.item.controls['product'].setValue("Ethanol");
    this.item.controls['location'].setValue("Long beach, CA");

    this.tradeDate = new FormControl(new Date());
  }
  onSelect() {
    this.item.controls['buyer_seller'].setValue("ABC oil co");
    this.item.controls['executingbroker'].setValue("James Van Peit");
  }
  onSettleChange(days) {
    this.settlement_info = {
      days: days,
      type: "business",
      calendar: "OPIS",
      date: "21-12-2020",
      settlement_currency: "100,000",
      base_currency1: "100,000",
      base_currency2: "100,000",
      unit: "USD"
    }
  }
  save() {
    this.active_confirm = true;
    this.tab_label = "OPTIONS TRADE-OT11289";
    this.deal_price = {
      quantity: "1",
      uom: "GAL",
      calc_price: "1.4200",
      amount: "59,640.00",
      position: "",
      exposure: ""
    }
    this.mtm_price = {
      quantity: "1",
      uom: "GAL",
      calc_price: "1.6100",
      amount: "67,620.00",
      position: "",
      exposure: ""
    }
    this.premium = {
      quantity: "1",
      uom: "GAL",
      calc_price: "0.1937",
      amount: "(8,135.40)",
      position: "",
      exposure: ""
    }
    this.net_cost = {
      quantity: "1",
      uom: "GAL",
      calc_price: "0.500",
      amount: "21,000.00",
      position: "",
      exposure: ""
    }
    this.pnl = {
      quantity: "1",
      uom: "",
      calc_price: "",
      amount: "(21,155.4)",
      position: "",
      exposure: ""
    }
  }
  confirm() {
    this.show_save = false;
    this.show_unconfirm = true;
    this.active_settle = true
    this.confirmed = true;
  }
  unconfirm() {
    this.show_save = true;
    this.show_unconfirm = false;
    this.active_confirm = false;
  }
  settle() {
    this.active_settle = false;
    this.settled = true;
    this.deal_price = {
      quantity: "1Lot",
      uom: "MT",
      calc_price: "0.7887",
      amount: "7980",
      position: "-700",
      exposure: "-2000"
    }
    this.mtm_price = {
      quantity: "1Lot",
      uom: "MT",
      calc_price: "0.7887",
      amount: "7980",
      position: "-700",
      exposure: "-2000"
    }
    this.premium = {
      quantity: "1Lot",
      uom: "MT",
      calc_price: "0.7887",
      amount: "7980",
      position: "-700",
      exposure: "-2000"
    }
    this.net_cost = {
      quantity: "1Lot",
      uom: "MT",
      calc_price: "0.7887",
      amount: "7980",
      position: "-700",
      exposure: "-2000"
    }
    this.pnl = {
      quantity: "1Lot",
      uom: "MT",
      calc_price: "0.7887",
      amount: "7980",
      position: "-700",
      exposure: "-2000"
    }
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed)
  }
  private columnDef_addcosts = [
    {
      field: "add",
      resizable: false,
      width: 45,
      headerClass: ['aggridtextalign-left'],
      headerComponentParams: { template: '<div class="add-btn"></div>' },
      cellClass: ['aggridtextalign-left align-c'],
      cellRenderer: function (params) {
        let deleteicon =
          `<div class="remove-icon"></div>`;
        return deleteicon;
      }
    },
    { headerName: 'Pay/Receive', editable: true, headerTooltip: 'Pay/Receive', field: 'cost', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left editable-cell'], },
    { headerName: 'Cost Name', editable: true, headerTooltip: 'Cost Name', field: 'name', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left editable-cell'] },
    { headerName: 'Service Provider', editable: true, headerTooltip: 'Service Provider', field: 'provider', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left editable-cell'] },
    { headerName: 'Cost Type', editable: true, headerTooltip: 'Cost Type', field: 'type', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left editable-cell'], },
    { headerName: 'Rate', editable: true, headerTooltip: 'Rate', field: 'rate', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left editable-cell'], },
    { headerName: 'Currency', headerTooltip: 'Currency', field: 'currency', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left'], },
    { headerName: 'UOM',  headerTooltip: 'UOM', field: 'uom', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left'], },
    { headerName: 'Invoice ID', headerTooltip: 'Invoice ID', field: 'id', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left'], },
  ];

  private rowData_addcosts = [

    {
      type: 'Flat', provider: 'Kinder Morgan', currency: 'USD', rate: '100', cost: 'Pay', name: 'Barging', id: "", uom: "GAL"
    }
  ]
}
