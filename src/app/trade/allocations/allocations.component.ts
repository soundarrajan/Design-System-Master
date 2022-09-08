import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';

@Component({
  selector: 'app-allocations',
  templateUrl: './allocations.component.html',
  styleUrls: ['./allocations.component.scss']
})
export class AllocationsComponent implements OnInit {
  public gridOptions_strategy: GridOptions;
  public gridOptions_delivery: GridOptions;
  public defaultToggle = 'noallocations';
  constructor() {
    this.gridOptions_strategy = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: true,
        sortable: true
      },
      columnDefs: this.columnDef_strategy,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 38,
      animateRows: false,
      onCellValueChanged: ($event) => {
        console.log($event);
      },

      onGridReady: (params) => {
        this.gridOptions_strategy.api = params.api;
        this.gridOptions_strategy.columnApi = params.columnApi;
        params.api.sizeColumnsToFit();
        this.gridOptions_strategy.api.setRowData(this.rowData_strategy);


      },
      getRowClass: (params) => {
        let classes: string[] = [];

        if (classes.length > 0)
          return classes;
      },
      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8) {
          params.api.sizeColumnsToFit();

        }
      }
    }
    this.gridOptions_delivery = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: true,
        sortable: true
      },
      columnDefs: this.columnDef_delivery,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 38,
      animateRows: false,
      onCellValueChanged: ($event) => {
        console.log($event);
      },

      onGridReady: (params) => {
        this.gridOptions_strategy.api = params.api;
        this.gridOptions_strategy.columnApi = params.columnApi;
        params.api.sizeColumnsToFit();
        this.gridOptions_strategy.api.setRowData(this.rowData_delivery);


      },
      getRowClass: (params) => {
        let classes: string[] = [];

        if (classes.length > 0)
          return classes;
      },
      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8) {
          params.api.sizeColumnsToFit();

        }
      }
    }
  }

  ngOnInit() {
  }
  private columnDef_strategy = [
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
    {
      headerName: 'Strategy', headerTooltip: 'Strategy', field: 'strategy', headerClass: ['aggrid-text-align-l'], cellClass: ['aggrid-text-align-l align-c'],
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-search' }
    },
    {
      headerName: 'Allocated Qty', headerTooltip: 'Allocated Qty', field: 'qty', headerClass: ['aggrid-text-align-r'], cellClass: ['aggridtextalign-right align-c'],
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit', classes: 'align-right' }
    },
    { headerName: 'UOM', headerTooltip: 'UOM', field: 'uom', headerClass: ['aggrid-text-align-l'], cellClass: ['aggrid-text-align-l align-c'] },
    { headerName: 'Allocated P&L', headerTooltip: 'Allocated P&L', field: 'allocatedPL', headerClass: ['aggrid-text-align-r'], cellClass: ['aggridtextalign-right align-c'], },
    { headerName: 'Currency', headerTooltip: 'Currency', field: 'currency', headerClass: ['aggrid-text-align-l'], cellClass: ['aggrid-text-align-l align-c'], },
    { headerName: 'Allocated P&L (Base currency)', headerTooltip: 'Allocated P&L (Base currency)', field: 'basecurrency', headerClass: ['aggrid-text-align-l'], cellClass: ['aggridtextalign-right align-c'], },
    { headerName: 'Allocated exposure', headerTooltip: 'Allocated exposure', field: 'exposure', headerClass: ['aggrid-text-align-r'], cellClass: ['aggridtextalign-right align-c'], },
  ];

  private rowData_strategy = [

    {
      allocatedPL: '90,000,000', uom: 'BBL', basecurrency: '90,000,0000', currency: 'USD', strategy: 'AMS texas August', qty: '1,0000', exposure: '90,000,000'
    },
    {
      allocatedPL: '90,000,000', uom: 'BBL', basecurrency: '90,000,0000', currency: 'USD', strategy: 'Colonial Test', qty: '1,0000', exposure: '90,000,000'
    }

  ]

  private columnDef_delivery = [
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
    {
      headerName: 'Trade ID', headerTooltip: 'Trade ID', field: 'id', headerClass: ['aggrid-text-align-l'], cellClass: ['aggrid-text-align-l align-c'],
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-search' }
    },
    {
      headerName: 'Delivery', headerTooltip: 'Delivery', field: 'delivery', headerClass: ['aggrid-text-align-l'], cellClass: ['aggrid-text-align-l align-c'],
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-dropdown', items: ['PS832232-1', 'PS832232-2'] }
    },
    { headerName: 'Trade Ref No.', headerTooltip: 'Trade Ref No.', field: 'refno', headerClass: ['aggrid-text-align-l'], cellClass: ['aggrid-text-align-l align-c'], },
    {
      headerName: 'Strategy', headerTooltip: 'Strategy', field: 'strategy', headerClass: ['aggrid-text-align-l'], cellClass: ['aggrid-text-align-l align-c'],
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    {
      headerName: 'Allocated Qty', headerTooltip: 'Allocated Qty', field: 'qty', headerClass: ['aggrid-text-align-l'], cellClass: ['aggrid-text-align-l align-c'],
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit', classes: 'align-right' }
    },
    { headerName: 'UOM', headerTooltip: 'UOM', field: 'uom', headerClass: ['aggrid-text-align-l'], cellClass: ['aggrid-text-align-l align-c'] },
    {
      headerName: 'Allocated P&L', headerTooltip: 'Allocated P&L', field: 'allocatedPL', headerClass: ['aggrid-text-align-l'], cellClass: ['aggrid-text-align-l align-c'],
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit', classes: 'align-right' }
    },
    { headerName: 'Currency', headerTooltip: 'Currency', field: 'currency', headerClass: ['aggrid-text-align-l'], cellClass: ['aggrid-text-align-l align-c'], },
    {
      headerName: 'Allocated P&L (Base currency)', headerTooltip: 'Allocated P&L (Base currency)', width: 200, field: 'basecurrency', headerClass: ['aggrid-text-align-l'], cellClass: ['aggridtextalign-right align-c']
    },
    { headerName: 'Allocated position', headerTooltip: 'Allocated position', field: 'position', headerClass: ['aggrid-text-align-l'], cellClass: ['aggridtextalign-right align-c'], },
  ];

  private rowData_delivery = [

    {
      id: 'PS832232', delivery: 'PS832232-1', refno: 'REF9348343', allocatedPL: '90,000,000', uom: 'BBL', basecurrency: '90,000,0000', currency: 'USD', strategy: 'AMS texas August', qty: '1,0000', exposure: '90,000,000', position: '90,000,000'
    },
    {
      id: 'PS832238', delivery: 'PS832232-2', refno: 'REF9348343', allocatedPL: '90,000,000', uom: 'BBL', basecurrency: '90,000,0000', currency: 'USD', strategy: 'Colonial Test', qty: '1,0000', exposure: '90,000,000', position: '90,000,000'
    }

  ]
}
