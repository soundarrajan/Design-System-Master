import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { AGGridCellMenuPopupComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-menu.component';
import { CustomHeaderGroup } from 'src/app/shared/ag-grid/custom-header-group.component';
import { CustomHeaderGroupNotify } from 'src/app/shared/ag-grid/custom-header-group-notification.component';
import { LocalService } from 'src/app/services/local-service.service';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';

@Component({
  selector: 'app-futures-list',
  templateUrl: './futures-list.component.html',
  styleUrls: ['./futures-list.component.css']
})
export class FuturesListComponent implements OnInit {
  @Input('headerCollapse') headerCollapse;
  @Input('rolloverAction') rolloverAction;
  @Output() resetButtons = new EventEmitter();
  @Output() updateRolloverBtn = new EventEmitter();
  @Output() updateOffsetBtn = new EventEmitter();

  selectedTab = 0;
  selectedInnerTab = 0;
  public isdisplaydensityhigh: boolean = false;
  public gridOptions_buy: GridOptions;
  public gridOptions_sell: GridOptions;
  public columnSelection: any;
  public rowCount_buy;
  public rowCount_sell;
  public getMainMenuItems;
  public smartFilterParams = [];
  public smartFilterStatus;
  public filteredItems = [];
  public manualFilterChange: boolean = false;
  public totBuyQty = 0;
  public totSellQty = 0;
  public totDiffQty = 0;
  public totDiffQtyValue = 0;
  public hoverRowDetails =
    [
      { label: "Trade Date", value: "12/10/2020" },
      { label: "Contract Name", value: "Oct-Contract" },
      { label: "Expiry Date", value: "12/12/2018" },
      { label: "Lots", value: "5" },
      { label: "MTM Price", value: "12,600 USD" },
      { label: "P&L(before cost)", value: "12,800,000 USD" },
      { label: "Book", value: "Test Book" },
      { label: "Strategy", value: "Test Strategy" },
      { label: "Trade ID", value: "PHB1029922" },
      { label: "Parent Trade ID", value: "PHB28332222" },
      { label: "EFP", value: "EFP18212" },
      { label: "Exchange", value: "NYSE" },
      { label: "Clearing Broker", value: "Veinberger Lukas" },
      { label: "Total Fee", value: "12,000 USD" },
      { label: "Status", value: "Confirmed" }
    ];
  //pinned - Filter chip which is currently active/applied on grid
  //showFilter - Filter chips which are selected for displaying on screen
  //defaultFilter - Filters which user cannot modify/delete
  filterList = {
    filters: [
      {
        name: 'Default View',
        defaultFilter: true,
        pinned: true,
        showFilter: true
      },
      {
        name: 'My watchlist',
        defaultFilter: false,
        pinned: false,
        showFilter: true
      },
      {
        name: 'Europe region',
        defaultFilter: false,
        pinned: false,
        showFilter: true
      },
      {
        name: 'Saved product',
        defaultFilter: false,
        pinned: false,
        showFilter: true
      },
      {
        name: 'For Review',
        defaultFilter: false,
        pinned: false,
        showFilter: true
      },
      {
        name: 'B2B Out',
        defaultFilter: false,
        pinned: false,
        showFilter: false
      },
      {
        name: 'Diesel Fuel',
        defaultFilter: false,
        pinned: false,
        showFilter: false
      }
    ],
    enableMoreFilters: true
  }
  constructor(private service: LocalService) {
    this.gridOptions_buy = <GridOptions>{
      columnDefs: this.columnDefs_buy,
      suppressRowClickSelection: true,
      paginationPageSize: 6,
      getRowHeight: (params) => {
        return this.isdisplaydensityhigh ? 48 : 25
      },
      headerHeight: this.isdisplaydensityhigh ? 60 : 31,
      groupHeaderHeight: this.isdisplaydensityhigh ? 60 : 31,
      rowSelection: 'multiple',
      animateRows: true,
      autoGroupColumnDef: {
        headerName: "Athlete",
        field: "athlete",
        width: 200,
        cellRenderer: "agGroupCellRenderer",
        cellRendererParams: { checkbox: true }
      },
      // suppressHorizontalScroll: true,
      // scrollbarWidth: 0,
      defaultColDef: {
        filter: true,
        sortable: true,
        resizable: true
      },
      onCellValueChanged: ($event) => {
      },
      onGridReady: (params) => {
        this.gridOptions_buy.api = params.api;
        this.gridOptions_buy.columnApi = params.columnApi;
        this.gridOptions_buy.api.setRowData(this.rowData_buy);
        this.rowCount_buy = this.gridOptions_buy.api.getDisplayedRowCount();
        var count = this.gridOptions_buy.api.getDisplayedRowCount();
      },
      getRowClass: (params) => {
        return 'aggrid-evenrow-bg';
      },
      onColumnResized: function (params) {

      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 11)
          params.api.sizeColumnsToFit();
      },
      onFilterChanged: (params) => {
        this.rowCount_buy = this.gridOptions_buy.api.getDisplayedRowCount();
        this.rowCount_sell = this.gridOptions_sell.api.getDisplayedRowCount();
      },
      onFilterModified: (params) => {
        // When smart filter is active and if user tries to manually filter the smart filtererd columns, the smart filter icon gets disabled.
        let smartFilterParamsChecked = this.smartFilterParams.filter((element => element.checked == true));
        let filteredColumnId = params.filterInstance["providedFilterParams"].column.colId;
        let count = smartFilterParamsChecked.filter((record) => record.field == filteredColumnId);
        if (this.smartFilterStatus && count.length > 0) {
          this.manualFilterChange = true;
          this.service.setSmartFilterStatus(false);
        }
        else
          this.manualFilterChange = false;
        this.rowCount_buy = this.gridOptions_buy.api.getDisplayedRowCount();
      },
      frameworkComponents: {
        customHeaderGroupComponent: CustomHeaderGroup,
        customHeaderGroupNotifyComponent: CustomHeaderGroupNotify
      }
    };

    this.gridOptions_sell = <GridOptions>{
      columnDefs: this.columnDefs_sell,
      suppressRowClickSelection: true,
      paginationPageSize: 6,
      getRowHeight: (params) => {
        return this.isdisplaydensityhigh ? 48 : 25
      },
      headerHeight: this.isdisplaydensityhigh ? 60 : 31,
      groupHeaderHeight: this.isdisplaydensityhigh ? 60 : 31,
      rowSelection: 'multiple',
      animateRows: true,
      defaultColDef: {
        filter: true,
        sortable: true,
        resizable: true
      },
      // suppressHorizontalScroll: true,
      // scrollbarWidth: 0,
      onCellValueChanged: ($event) => {
      },
      onGridReady: (params) => {
        this.gridOptions_sell.api = params.api;
        this.gridOptions_sell.columnApi = params.columnApi;
        this.gridOptions_sell.api.setRowData(this.rowData_sell);
        this.rowCount_sell = this.gridOptions_sell.api.getDisplayedRowCount();
      },
      getRowClass: (params) => {
        return 'aggrid-evenrow-bg';
      },
      onColumnResized: function (params) {
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 12)
          params.api.sizeColumnsToFit();
      },
      onFilterChanged: (params) => {
        this.rowCount_buy = this.gridOptions_buy.api.getDisplayedRowCount();
        this.rowCount_sell = this.gridOptions_sell.api.getDisplayedRowCount();
      },
      onFilterModified: (params) => {
        // When smart filter is active and if user tries to manually filter the smart filtererd columns, the smart filter icon gets disabled.
        let smartFilterParamsChecked = this.smartFilterParams.filter((element => element.checked == true));
        let filteredColumnId = params.filterInstance["providedFilterParams"].column.colId;
        let count = smartFilterParamsChecked.filter((record) => record.field == filteredColumnId);
        if (this.smartFilterStatus && count.length > 0) {
          this.manualFilterChange = true;
          this.service.setSmartFilterStatus(false);
        }
        else
          this.manualFilterChange = false;
      },
      frameworkComponents: {
        customHeaderGroupComponent: CustomHeaderGroup,
        customHeaderGroupNotifyComponent: CustomHeaderGroupNotify
      }
    };
  }

  ngOnInit(): void {
    //Get initia status and smart filter list
    this.smartFilterStatus = this.service.initial_smart_filter_status;
    this.smartFilterParams = this.service.initial_smart_filter_list;


    this.service.getSmartFilterStatus().subscribe((status) => {
      this.smartFilterStatus = status;
      let buySelectionCount = this.gridOptions_buy.api ? this.gridOptions_buy.api.getSelectedRows().length : 0;
      let sellSelectionCount = this.gridOptions_sell.api ? this.gridOptions_sell.api.getSelectedRows().length : 0;
      if (!this.manualFilterChange) {
        if (!this.smartFilterStatus)
          this.resetSmartFilter();
        else if (this.smartFilterParams.length > 0 && (buySelectionCount > 0 || sellSelectionCount > 0)) {
          this.updateSmartFiltering();
        }
      }
      //Reset the manual filter change flag
      this.manualFilterChange = false;
    });

    this.service.getSmartFilterData().subscribe((filter) => {
      this.smartFilterParams = filter;
      let buySelectionCount = this.gridOptions_buy.api ? this.gridOptions_buy.api.getSelectedRows().length : 0;
      let sellSelectionCount = this.gridOptions_sell.api ? this.gridOptions_sell.api.getSelectedRows().length : 0;
      if (this.smartFilterParams.length > 0 && (buySelectionCount > 0 || sellSelectionCount > 0)) {
        this.updateSmartFiltering();
      }
    });

  }
  ngOnChanges() {
    if (this.rolloverAction) {
      this.selectedInnerTab = 1;
    }
  }
  refreshGrids() {
    this.gridOptions_buy.api.deselectAll();
    this.gridOptions_sell.api.deselectAll();
    this.gridOptions_sell.api.setFilterModel(null);
    this.gridOptions_buy.api.setFilterModel(null);
  }
  returnToListScreen(event) {
    this.rolloverAction = false;
    this.selectedInnerTab = 0;
    this.resetButtons.emit(true);
    this.updateRolloverBtn.emit(event);
  }
  private columnDefs_buy = [
    {
      headerName: '',
      field: '',
      filter: true,
      suppressMenu: true,
      width: 35,
      checkboxSelection: true,
      resizable: false,
      suppressMovable: true,
      headerClass: 'header-checkbox-center',
      cellClass: 'p-1 checkbox-center ag-checkbox-v2',
      pinned: 'left'
    },
    {
      headerName: "Trade Date",
      field: "tradedate",
      headerTooltip: "Trade Date",
      cellClass: ["aggridtextalign-center hoverdisable hover-cell-menu-icon"],
      headerClass: ["aggrid-text-align-c"],
      minWidth: 20,
      width: 180,
      pinned: 'left', cellStyle: { 'align-items': 'center' },
      cellRendererFramework: AGGridCellMenuPopupComponent,
      cellRendererParams: { type: 'hover-click-drag-menu-dualGrid-left', cellClass: ["custom-chip dark"], rowDetails: this.hoverRowDetails, headerLabel: "PHB109922" }
    },
    { headerName: 'Contract Name', headerTooltip: 'Contract Name', field: 'contractName', width: 120 },
    {
      headerName: 'Expiry Date', headerTooltip: 'Expiry Date', field: 'expdate',
      headerClass: ["aggrid-text-align-c"], cellClass: ["aggridtextalign-center"],
      cellRendererFramework: AGGridCellRendererComponent, cellRendererParams: { cellClass: ["custom-chip dark"] },
      minWidth: 20,
      width: 150
    },
    { headerName: 'Lots', headerTooltip: 'Lots', field: 'lots', type: "numericColumn", minWidth: 20, width: 90 },
    { headerName: 'Price', headerTooltip: 'Price', field: 'price', type: "numericColumn", minWidth: 20, width: 90 },
    { headerName: 'MTM Price', headerTooltip: 'MTM Price', type: "numericColumn", field: 'mtmPrice', minWidth: 20, width: 100 },
    { headerName: 'P&L(beforecost)', headerTooltip: 'P&L', field: 'pnl', type: "numericColumn", minWidth: 20, width: 100 },
    { headerName: 'Trade Id', headerTooltip: 'Trade Id', field: 'id', minWidth: 20 },
    { headerName: 'Exchange', headerTooltip: 'Exchange', field: 'exchange', minWidth: 20 },
    { headerName: 'Book', headerTooltip: 'Book', field: 'book', minWidth: 20 },
    { headerName: 'Clearing Broker', headerTooltip: 'Clearing Broker', field: 'broker', minWidth: 20 },
    { headerName: 'Status', headerTooltip: 'Status', field: 'status', minWidth: 20 },
    { headerName: 'Total Fee', headerTooltip: 'Total Fee', field: 'fee', minWidth: 20 },
    { headerName: 'EFP ID', headerTooltip: 'EFP ID', field: 'epf', minWidth: 20 },
    { headerName: 'Parent Trade  ID', headerTooltip: 'Parent Trade  ID', field: 'parentId', minWidth: 20 }
  ];


  private columnDefs_sell = [
    {
      headerName: '',
      field: '',
      filter: true,
      suppressMenu: true,
      width: 35,
      checkboxSelection: true,
      resizable: false,
      suppressMovable: true,
      headerClass: 'header-checkbox-center',
      cellClass: 'p-1 checkbox-center ag-checkbox-v2',
      pinned: 'left'
    },
    {
      headerName: "Trade Date",
      field: "tradedate",
      headerTooltip: "Trade Date",
      cellClass: ["aggridtextalign-center hoverdisable1 hover-cell-menu-icon"],
      headerClass: ["aggrid-text-align-c"],
      minWidth: 20,
      width: 180,
      pinned: 'left', cellStyle: { 'align-items': 'center' },
      cellRendererFramework: AGGridCellMenuPopupComponent,
      cellRendererParams: { type: 'hover-click-drag-menu-dualGrid-right', cellClass: ["custom-chip dark"], rowDetails: this.hoverRowDetails, headerLabel: "PHB109922" }
    },
    { headerName: 'Contract Name', headerTooltip: 'Contract Name', field: 'contractName', width: 120 },
    {
      headerName: 'Expiry Date', headerTooltip: 'Expiry Date', field: 'expdate', cellClass: ["aggridtextalign-center"],
      cellRendererFramework: AGGridCellRendererComponent, cellRendererParams: { cellClass: ["custom-chip dark"] },
      headerClass: ["aggrid-text-align-c"],
      minWidth: 20,
      width: 150
    },
    { headerName: 'Lots', headerTooltip: 'Lots', field: 'lots', type: "numericColumn", minWidth: 20, width: 90 },
    { headerName: 'Price', headerTooltip: 'Price', field: 'price', type: "numericColumn", minWidth: 20, width: 90 },
    { headerName: 'MTM Price', headerTooltip: 'MTM Price', type: "numericColumn", field: 'mtmPrice', minWidth: 20, width: 100 },
    { headerName: 'P&L(beforecost)', headerTooltip: 'P&L', field: 'pnl', type: "numericColumn", minWidth: 20, width: 100 },
    { headerName: 'Trade Id', headerTooltip: 'Trade Id', field: 'id', minWidth: 20 },
    { headerName: 'Exchange', headerTooltip: 'Exchange', field: 'exchange', minWidth: 20 },
    { headerName: 'Book', headerTooltip: 'Book', field: 'book', minWidth: 20 },
    { headerName: 'Clearing Broker', headerTooltip: 'Clearing Broker', field: 'broker', minWidth: 20 },
    { headerName: 'Status', headerTooltip: 'Status', field: 'status', minWidth: 20 },
    { headerName: 'Total Fee', headerTooltip: 'Total Fee', field: 'fee', minWidth: 20 },
    { headerName: 'EFP ID', headerTooltip: 'EFP ID', field: 'epf', minWidth: 20 },
    { headerName: 'Parent Trade  ID', headerTooltip: 'Parent Trade  ID', field: 'parentId', minWidth: 20 }
  ];

  private rowData_buy = [

    {
      type: 'buy', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:45', contractName: 'Nov contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T2-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:45', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 2, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T3-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:45', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:45', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 2, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:45', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:450', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:450', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:451', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 2, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:452', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:452', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    }

  ];

  private rowData_sell = [

    {
      type: 'buy', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:45', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 1, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T3-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T2-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:450', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T2-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:451', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:450', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:451', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:452', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 2, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'buy', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:45', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:45', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 2, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T3-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T3-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:45', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:450', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sale', tradedate: '04-Nov-2019 11:451', contractName: 'Sept contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    },
    {
      type: 'sell', tradedate: '04-Nov-2019 11:452', contractName: 'Oct contracts', expdate: '04-Nov-2019', lots: 3, mtmPrice: '1.73', price: '1.73', pnl: '1.73',
      id: 'PHB1029922', exchange: 'NYSE', broker: 'Veinberger Lukas', status: 'Confirmed', fee: '12,000 USD', epf: 'EFP18212', parentId: 'PHB28332222', book: 'T-Book'
    }

  ];

  public change_rowdensity() {
    this.isdisplaydensityhigh = !this.isdisplaydensityhigh;
    if (this.isdisplaydensityhigh) {
      this.gridOptions_buy.rowHeight = 48;
      this.gridOptions_buy.headerHeight = 60;
      this.gridOptions_buy.groupHeaderHeight = 60;
      this.gridOptions_sell.rowHeight = 48;
      this.gridOptions_sell.headerHeight = 60;
      this.gridOptions_sell.groupHeaderHeight = 60;
    }
    else {
      this.gridOptions_buy.rowHeight = 26;
      this.gridOptions_buy.headerHeight = 35;
      this.gridOptions_buy.groupHeaderHeight = 35;
      this.gridOptions_sell.rowHeight = 26;
      this.gridOptions_sell.headerHeight = 35;
      this.gridOptions_sell.groupHeaderHeight = 35;
    }
    this.gridOptions_buy.api.resetRowHeights();
    this.gridOptions_buy.api.refreshHeader();
    this.gridOptions_sell.api.resetRowHeights();
    this.gridOptions_sell.api.refreshHeader();
  }

  toggleCollapse() {
    this.headerCollapse = !this.headerCollapse;
  }

  // Smart Filtering
  updateSmartFiltering() {
    this.smartFilterParams.forEach((param) => {
      this.gridOptions_buy.api.getFilterInstance(param.field) ? this.gridOptions_buy.api.getFilterInstance(param.field).setModel(null) : null;
      this.gridOptions_sell.api.getFilterInstance(param.field) ? this.gridOptions_sell.api.getFilterInstance(param.field).setModel(null) : null;
    })
    // Always do smart filtering based on buy grid if rows are selected from both the grids
    if (this.gridOptions_buy.api.getSelectedRows().length > 0)
      this.setSmartFitlers(this.gridOptions_buy.api.getSelectedRows());
    else if (this.gridOptions_sell.api.getSelectedRows().length > 0)
      this.setSmartFitlers(this.gridOptions_sell.api.getSelectedRows());
  }
  resetSmartFilter() {
    this.smartFilterParams.forEach((param) => {
      this.gridOptions_buy.api.getFilterInstance(param.field) ? this.gridOptions_buy.api.getFilterInstance(param.field).setModel(null) : null;
      this.gridOptions_sell.api.getFilterInstance(param.field) ? this.gridOptions_sell.api.getFilterInstance(param.field).setModel(null) : null;
    })
    this.gridOptions_buy.api.onFilterChanged();
    this.gridOptions_sell.api.onFilterChanged();
  }
  public onRowSelection(event, isBuyGrid) {
    let buySelectionCount = this.gridOptions_buy.api.getSelectedRows().length;
    let sellSelectionCount = this.gridOptions_sell.api.getSelectedRows().length;
    if (buySelectionCount > 0 || sellSelectionCount > 0)
      this.updateRolloverBtn.emit(false);
    else
      this.updateRolloverBtn.emit(true);
    this.totBuyQty = this.gridOptions_buy.api.getSelectedRows().reduce((a, b) => a + (b['lots'] || 0), 0);
    this.totSellQty = this.gridOptions_sell.api.getSelectedRows().reduce((a, b) => a + (b['lots'] || 0), 0);
    this.totDiffQty = this.totBuyQty - this.totSellQty;
    this.totDiffQtyValue = Math.abs(this.totDiffQty);
    if (this.totBuyQty > 0 && this.totSellQty > 0 && this.totBuyQty >= this.totSellQty)
      this.updateOffsetBtn.emit(true);
    else
      this.updateOffsetBtn.emit(false);
    if (this.smartFilterStatus) {
      if (buySelectionCount != 0 || sellSelectionCount != 0) {
        // this.setSmartFitlers(event.node.data);
        if (isBuyGrid)
          this.setSmartFitlers(this.gridOptions_buy.api.getSelectedRows());
        else
          this.setSmartFitlers(this.gridOptions_sell.api.getSelectedRows());
      }
      else {
        // Reset the smart filter previous filtering upon unchecking all rows
        this.resetSmartFilter();
      }
    }
  }

  public setSmartFitlers(rowData) {
    this.filteredItems = [];
    let filterValues = [];
    //Filter the list based on checked parameter
    let smartFilterParamsChecked = this.smartFilterParams.filter((element => element.checked == true));
    if (smartFilterParamsChecked.length > 0)
      smartFilterParamsChecked.forEach((param) => {
        filterValues = [];
        rowData.forEach(row => {
          if (row[param.field]) {
            filterValues.push(row[param.field])
          }
        });
        this.setcommonfilter(filterValues, param.field);
        this.filteredItems.push(param.name);
      })
    this.gridOptions_buy.api.onFilterChanged();
    this.gridOptions_sell.api.onFilterChanged();
    // this.schedulingService.updateFilterData([...this.filteredItems]);
    // this.schedulingService.setPurchaseSmartFilterModel(this.purchaseGridViewModel.gridOptions.api.getFilterModel());
    // this.schedulingService.setSalesSmartFilterModel(this.saleGridViewModel.gridOptions.api.getFilterModel());
  }

  public setcommonfilter(data, column) {
    //let values = { values: ["Nov contracts", "Sept contracts"] }
    let values = { values: data }

    this.gridOptions_buy.api.getFilterInstance(column) ? this.gridOptions_buy.api.getFilterInstance(column).setModel(values) : null;
    this.gridOptions_sell.api.getFilterInstance(column) ? this.gridOptions_sell.api.getFilterInstance(column).setModel(values) : null;
  }
}
