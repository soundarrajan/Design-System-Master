import { Component, OnInit, Input } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { CustomHeaderGroupNotify } from 'src/app/shared/ag-grid/custom-header-group-notification.component';
import { AGGridCellActionsComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { AGGridCellRendererV2Component } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-rendererv2.component';

@Component({
  selector: 'app-matched-list',
  templateUrl: './matched-list.component.html',
  styleUrls: ['./matched-list.component.css']
})
export class MatchedListComponent implements OnInit {

  @Input('headerCollapse') headerCollapse;
  public gridOptions: GridOptions;
  private components;
  public rowCount: Number;
  public disableBtn: boolean = true;
  public rowselect: boolean = false;
  public previewProceed: boolean = true;
  public isdisplaydensityhigh: boolean = false;
  public menuopen: boolean = false;
  public selectedBtn: boolean = false;
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
  constructor(public dialog: MatDialog) {
    this.gridOptions = <GridOptions>{
      columnDefs: this.columnDefs,
      rowHeight: 100,
      headerHeight: 31,
      groupHeaderHeight: 38,
      rowSelection: 'multiple',
      animateRows: true,
      defaultColDef: {
        filter: true,
        sorting: true,
        resizable: true
      },
      onCellValueChanged: ($event) => {
      },
      getRowHeight: (params) => {
        return this.isdisplaydensityhigh ? 100 : 51
      },
      onGridReady: (params) => {
        this.gridOptions.api = params.api;
        this.gridOptions.columnApi = params.columnApi;
        this.gridOptions.api.sizeColumnsToFit();
        this.gridOptions.api.setRowData(this.rowData);
        this.rowCount = this.gridOptions.api.getDisplayedRowCount();
      },
      onColumnResized: function (params) {
        // if (params.columnApi.getAllDisplayedColumns().length <= 11 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
        //   params.api.sizeColumnsToFit();
        // }
      },
      getRowClass: (params) => {
        if (params.node.rowIndex % 2 === 0) {
          return '';
        }
        if (params.node.rowIndex === 2) {
          return 'aggrid-notification';
        }
      },
      frameworkComponents: {
        customHeaderGroupNotifyComponent: CustomHeaderGroupNotify
      }
    };
  }

  ngOnInit() {
  }

  private columnDefs = [
    {
      headerName: "",
      field: "",
      suppressMenu: true,
      resizable: false,
      suppressMovable: true,
      headerCheckboxSelection: false,
      suppressSizeToFit: true,
      width: 60,
      cellRendererFramework: AGGridCellRendererV2Component,
      headerClass: ['aggrid-checkbox-m-left', ''],
      cellRendererParams: { label: 'traction_type', type: 'roundchip', cellClass: 'aggrid-innershadow', letter: 0 }
    },
    {
      headerName: 'Trade Information', headerTooltip: 'Trade Information', hide: false, headerClass: ['aggrid-columgroup-splitter'],
      children: [
        {
          headerName: 'Trade ID', headerTooltip: 'Trade ID', cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { label: 'trade', type: 'multirow', classes: 'aggridlink' }, width: 130,
          valueGetter: function (params) {
            return params.data.data[0].trade;
          }
        },
        {
          headerName: 'Lots', headerTooltip: 'Lots', cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { label: 'lots', type: 'multirow' }, width: 110, type: "numericColumn",
          valueGetter: function (params) {
            return params.data.data[0].lots;
          }
        },
        {
          headerName: 'Price', headerTooltip: 'Price', cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { label: 'price', type: 'multirow' }, width: 110, type: "numericColumn",
          valueGetter: function (params) {
            return params.data.data[0].price;
          }
        },
        {
          headerName: 'Amount', headerTooltip: 'Amount', cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { label: 'amount', type: 'multirow' }, headerClass: ['aggrid-columgroup-splitter'], cellClass: ['aggrid-columgroup-splitter'], width: 130,
          type: "numericColumn",
          valueGetter: function (params) {
            return params.data.data[0].amount;
          }
        }
      ]
    },
    {
      headerName: 'Offset Information', headerTooltip: 'Offset Information', headerClass: ['aggrid-columgroup-splitter'],
      children: [
        { headerName: 'Total Amount', headerTooltip: 'Total Amount', field: 'totalAmnt', type: "numericColumn", width: 140, cellClass: ['aggrid-dual-vertical-center'] },
        { headerName: 'Offset ID', headerTooltip: 'Offset ID', field: 'offsetId', width: 150, cellClass: ['aggrid-dual-vertical-center'] },
        { headerName: 'Contract', cellClass: ["aggrid-columgroup-splitter aggrid-dual-vertical-center"], headerTooltip: 'Contract', field: 'contract', headerClass: ['aggrid-columgroup-splitter'] },
        {
          headerName: 'Contract Date', cellClass: ["aggrid-columgroup-splitter aggridtextalign-center"], headerTooltip: 'Contract Date', field: 'contractDate', headerClass: ['aggrid-columgroup-splitter aggrid-text-align-c'],
          cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { cellClass: ["custom-chip dark"], type: 'singlerow' }, cellStyle: { 'align-items': 'center' }
        },
        { headerName: 'Created By', cellClass: ["aggrid-columgroup-splitter aggrid-dual-vertical-center"], headerTooltip: 'Created By', field: 'createdBy', headerClass: ['aggrid-columgroup-splitter'] },
      ]
    },
    {
      headerName: 'Revert', headerClass: ["aggrid-text-align-c"], cellClass: ['aggridtextalign-center'], headerTooltip: 'Revert',
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'revert' }, cellStyle: { 'align-items': 'center' },
      suppressMenu: true, resizable: false, suppressMovable: true, width: 95
    }
  ];

  private rowData = [
    {
      matchID: '001', data: [
        { traction_type: 'buy', trade: 'PHB0121', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS0122', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '50,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '002', data: [
        { traction_type: 'buy', trade: 'PHB0123', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS0124', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '50,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '003', data: [
        { traction_type: 'buy', trade: 'PHB0125', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS0126', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '50,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '004', data: [
        { traction_type: 'buy', trade: 'PHB0127', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS0128', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '50,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '005', data: [
        { traction_type: 'buy', trade: 'PHB0129', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS01210', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '50,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '006', data: [
        { traction_type: 'buy', trade: 'PHB01211', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS01212', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '75,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '007', data: [
        { traction_type: 'buy', trade: 'PHB01213', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS01214', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '25,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '008', data: [
        { traction_type: 'buy', trade: 'PHB01215', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS01216', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '50,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '009', data: [
        { traction_type: 'buy', trade: 'PHB01217', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS01218', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '50,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '001', data: [
        { traction_type: 'buy', trade: 'PHB0121', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS0122', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '50,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '002', data: [
        { traction_type: 'buy', trade: 'PHB0123', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS0124', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '50,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '003', data: [
        { traction_type: 'buy', trade: 'PHB0125', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS0126', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '50,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '004', data: [
        { traction_type: 'buy', trade: 'PHB0127', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS0128', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '50,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '005', data: [
        { traction_type: 'buy', trade: 'PHB0129', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS01210', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '50,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '006', data: [
        { traction_type: 'buy', trade: 'PHB01211', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS01212', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '75,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '007', data: [
        { traction_type: 'buy', trade: 'PHB01213', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS01214', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '25,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '008', data: [
        { traction_type: 'buy', trade: 'PHB01215', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS01216', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '50,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    },
    {
      matchID: '009', data: [
        { traction_type: 'buy', trade: 'PHB01217', lots: '5', price: '1.2', amount: '50,400' },
        { traction_type: 'sell', trade: 'PHS01218', lots: '5', price: '1.1', amount: '46,200' }
      ],
      product: 'Diesel', quantity: '50,000 GAL', totalAmnt: '4,200', releaseno: '121', offsetId: '123', contract: 'ICE-Brent Jan21', contractDate: "29-Jan-2020", createdBy: 'Alexander James'
    }
  ];

  public change_rowdensity() {
    this.isdisplaydensityhigh = !this.isdisplaydensityhigh;
    if (this.isdisplaydensityhigh) {
      this.gridOptions.rowHeight = 100;
      this.gridOptions.headerHeight = 60;
      this.gridOptions.groupHeaderHeight = 60;
    }
    else {
      this.gridOptions.rowHeight = 51;
      this.gridOptions.headerHeight = 31;
      this.gridOptions.groupHeaderHeight = 38;

    }
    this.gridOptions.api.resetRowHeights();
    this.gridOptions.api.refreshHeader();
  }


}
