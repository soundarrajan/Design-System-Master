import { Component, OnInit, Input } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { TechAvailableFiltersComponent } from 'src/app/shared/dialog-popup/tech-available-filters/tech-available-filters.component';

@Component({
  selector: 'app-verified-movements',
  templateUrl: './verified-movements.component.html',
  styleUrls: ['./verified-movements.component.scss']
})
export class VerifiedMovementsComponent implements OnInit {
  @Input('headerCollapse') headerCollapse: boolean = false;
  public isdisplaydensityhigh: boolean = false;
  public disableBtn: boolean = true;

  ngOnInit() {
  }

  public onScroll: boolean = true;

  get isScrolling() {
    return onScroll
  }

  get isPinnedRight() {
    return isColPinned_right
  }

  get isPinnedLeft() {
    return isColPinned_left
  }

  // AG GRID
  public gridOptions: GridOptions;
  private paginationPageSize: number;
  public rowCount: Number;
  constructor(public dialog: MatDialog) {
    this.gridOptions = <GridOptions>{
      columnDefs: this.columnDefs,
      getRowHeight: (params) => {
        return this.isdisplaydensityhigh ? 48 : 25
      },
      headerHeight: this.isdisplaydensityhigh ? 60 : 35,
      groupHeaderHeight: this.isdisplaydensityhigh ? 60 : 35,
      rowMultiSelectWithClick: true,
      animateRows: true,
      defaultColDef: {
        filter: true,
        sortable: true,
        resizable: true
      },
      onGridReady: (params) => {
        this.gridOptions.api = params.api;
        this.gridOptions.columnApi = params.columnApi;
        this.gridOptions.api.setRowData(this.rowData);
        this.rowCount = this.gridOptions.api.getDisplayedRowCount();
      },
      getRowClass: (params) => {

        var classArray: string[] = [];
        classArray.push('aggrid-evenrow-border-dark');
        let newClass = params.data.invoice === 'Yes' ? 'aggrid-left-ribbon dark2' :
          params.data.invoice === 'No' ? 'aggrid-left-ribbon dark2' :
            'aggrid-left-ribbon dark2';
        classArray.push(newClass);
        if (params.node.rowIndex % 2 === 0)
          classArray.push('aggrid-evenrow-bg');
        else
          classArray.push('aggrid-oddrow-bg');

        if (params.node.rowIndex % 2 === 0) {
          classArray.push('aggrid-evenrow-bg');
          classArray.push('aggrid-evenrow-border-dark');
        }
        else {
          classArray.push('aggrid-oddrow-bg');
          classArray.push('aggrid-evenrow-border-dark');
        }
        return classArray.length > 0 ? classArray : null;
      },
      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getDisplayedLeftColumns().length > 0) {
          isColPinned_left = true;
          isColPinned_right = false;
        }
        else if (params.columnApi.getDisplayedLeftColumns().length == 0 && params.columnApi.getDisplayedCenterColumns().length == 0 && params.columnApi.getDisplayedRightColumns().length > 0) {
          isColPinned_right = false;
          isColPinned_left = false;
        }
        else if (params.columnApi.getDisplayedLeftColumns().length == 0 && params.columnApi.getDisplayedCenterColumns().length > 0) {
          isColPinned_right = true;
          isColPinned_left = false;
        }
        else {
          isColPinned_right = false;
          isColPinned_left = false;
        }

        if (params.columnApi.getAllDisplayedColumns().length <= 11)
          params.api.sizeColumnsToFit();
      },
      onColumnPinned: function (params) {
        if (params.columnApi.getDisplayedLeftColumns().length > 0) {
          isColPinned_left = true;
          isColPinned_right = false;
        }
        else if (params.columnApi.getDisplayedLeftColumns().length == 0 && params.columnApi.getDisplayedCenterColumns().length == 0 && params.columnApi.getDisplayedRightColumns().length > 0) {
          isColPinned_right = false;
          isColPinned_left = false;
        }
        else if (params.columnApi.getDisplayedLeftColumns().length == 0 && params.columnApi.getDisplayedCenterColumns().length > 0) {
          isColPinned_right = true;
          isColPinned_left = false;
        }
        else {
          isColPinned_right = false;
          isColPinned_left = false;
        }
      },
      onBodyScroll: ($event) => {
        if ($event.direction == "horizontal")
          onScrollTrue();
      },
    };
  }

  private columnDefs = [

    {
      headerName: 'Movement ID', headerTooltip: 'Movement ID',
      field: 'movementid',
      headerClass: 'p-l-0',
      cellRendererFramework: AGGridCellDataComponent,
      cellClass: [' text-ellipsis product-cell'],
      pinned: 'left',
      width: 120,
      cellRendererParams: { type: 'cell-hover-click-menu-dova' }
    },


    { headerName: 'Delivery Product', headerClass: 'p-l-0', headerTooltip: 'Delivery Product', field: 'bol_no', cellClass: [] },
    {
      headerName: 'Movement Date', field: 'counterparty', headerTooltip: 'Movement Date', cellClass: ['aggridtextalign-center chip-fully-fill'], headerClass: ['aggrid-text-align-c'],
      cellRendererFramework: AGGridCellRendererComponent, cellRendererParams: { cellClass: [''] },
    },
    { headerName: 'Mov Type', headerClass: 'p-l-0', headerTooltip: 'Mov Type', field: 'product', cellClass: [''] },
    { headerName: 'Delivery ID', field: 'deliveryid', headerClass: ['p-l-0 text-ellipsis'], headerTooltip: 'Delivery ID', cellClass: ['aggridlink'] },
    {
      headerName: 'Tank', field: 'pipeline', headerClass: ['p-l-0 text-ellipsis'], headerTooltip: 'Tank', cellClass: [''],
      cellClassRules: {
        "na-data": function (params) {
          return params.value === "N/A";
        }
      }
    },
    { headerName: 'Product', field: 'quantity', headerTooltip: 'Product', headerClass: 'p-l-0', },
    { headerName: 'Mass Qty', field: 'delivery_date', headerTooltip: 'Product', type: "numericColumn", cellClass: ['ag-numeric-cell aggridtextalign-right'] },
    { headerName: 'Mass UOM', field: 'vessel', headerClass: 'p-l-0', headerTooltip: 'Mass UOM', cellClass: [''] },
    { headerName: 'Volume Qty', field: 'delivery_date', headerClass: 'p-l-0', cellClass: ['product-cell  ag-numeric-cell'], type: "numericColumn", headerTooltip: 'Volume Qty', },
    { headerName: 'Volume UOM', field: 'vessel', headerClass: 'p-l-0', headerTooltip: 'Volume Unit', cellClass: [''] },
    { headerName: 'Gross Qty', field: 'delivery_date', headerClass: 'p-l-0', cellClass: ['product-cell  ag-numeric-cell'], type: "numericColumn", headerTooltip: 'Volume Qty', },
    { headerName: 'Gross UOM', field: 'vessel', headerClass: 'p-l-0', headerTooltip: 'Volume Unit', cellClass: [''] },
    { headerName: 'Source Doc', field: 'reference2', headerClass: 'p-l-0', headerTooltip: 'Source Doc', cellClass: [''] },
    { headerName: 'Reference No.', field: 'reference2', headerClass: 'p-l-0', headerTooltip: 'Reference No.', cellClass: [''] },
    { headerName: 'CI', field: 'reference', headerTooltip: 'CI', type: "numericColumn", cellClass: ['ag-numeric-cell aggridtextalign-right'] },
    { headerName: 'Blend Ref No.', field: 'reference1', headerClass: 'p-l-0', headerTooltip: 'Blend Ref No.', cellClass: [''] },
    { headerName: 'Trade No.', field: 'tradeno', headerClass: 'p-l-0', headerTooltip: 'Trade No.', cellClass: ['aggridlink'] },
    {
      headerName: 'B2B Movement ID', field: 'mov_id', headerClass: 'p-l-0', headerTooltip: 'B2B Movement ID', cellClass: ['aggridlink'],
      cellClassRules: {
        "na-data": function (params) {
          return params.value === "N/A";
        }
      }
    },
    {
      headerName: 'B2B Delivery ID', field: 'tr_no', headerClass: 'p-l-0', headerTooltip: 'B2B Delivery ID', cellClass: ['aggridlink'],
      cellClassRules: {
        "na-data": function (params) {
          return params.value === "N/A";
        }
      }
    },
    {
      headerName: 'B2B Trade ID', field: 'tr_no', headerClass: 'p-l-0', headerTooltip: 'B2B Trade ID.', cellClass: ['aggridlink'],
      cellClassRules: {
        "na-data": function (params) {
          return params.value === "N/A";
        }
      }
    },
    {
      headerName: 'Delete', headerTooltip: 'Delete', field: '',
      headerClass: ["p-l-0", "aggrid-text-align-c"],
      cellClass: ["aggrid-content-center"], cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'delete-icon-red' },
      filter: true,
      suppressMenu: true,
      suppressMovable: true,
      width: 90
    },

    {
      headerName: 'Revert', headerTooltip: 'Revert', field: 'revert',
      headerClass: ["p-l-0", "aggrid-text-align-c"],
      cellClass: ["aggrid-content-center"], cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'new-revert' },
      filter: true,
      suppressMenu: true,
      suppressMovable: true,
      width: 90
    }
  ];

  private rowData = [
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'In', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'no', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'no', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', movementid: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'In', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', movementid: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'In', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', movementid: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'In', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', movementid: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'In', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', movementid: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'In', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', movementid: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'In', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', movementid: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'In', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', movementid: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', movementid: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },


  ];

  invoiceCurrency() {
    event.stopPropagation();
    const invoicelogo = document.querySelector('.logo');
    invoicelogo.classList.add('select');
    const invoicelabel = document.querySelector('.logo-label');
    invoicelabel.classList.add('select');
  }

  public change_rowdensity() {
    this.isdisplaydensityhigh = !this.isdisplaydensityhigh;
    if (this.isdisplaydensityhigh) {
      this.gridOptions.rowHeight = 48;
      this.gridOptions.headerHeight = 60;
      this.gridOptions.groupHeaderHeight = 60;
    }
    else {
      this.gridOptions.rowHeight = 26;
      this.gridOptions.headerHeight = 35;
      this.gridOptions.groupHeaderHeight = 35;
    }
    this.gridOptions.api.resetRowHeights();
    this.gridOptions.api.refreshHeader();
  }

  openAvailableFilter() {
    const dialogRef = this.dialog.open(TechAvailableFiltersComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

var onScroll = false;
var onscrolltimmer;
var isColPinned_right = true;
var isColPinned_left = true;
function onScrollTrue() {
  onScroll = true;
  clearInterval(onscrolltimmer);
  onscrolltimmer = setTimeout(function () {
    onScroll = false;
  }, 200);
}
