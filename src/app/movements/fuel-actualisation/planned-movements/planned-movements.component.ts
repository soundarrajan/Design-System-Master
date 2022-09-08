import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { ToastrService } from 'ngx-toastr';
import { SaveMovementComponent } from '../../../shared/dialog-popup/save-movement/save-movement.component';
import { SaveMovementActionsButtonsComponent } from '../../../shared/dialog-popup/save-movement-actions-buttons/save-movement-actions-buttons.component';
import { SaveMovementClubbedComponent } from '../../../shared/dialog-popup/save-movement-clubbed/save-movement-clubbed.component';
import { SaveMovementClubbedActionsButtonsComponent } from '../../../shared/dialog-popup/save-movement-clubbed-actions-buttons/save-movement-clubbed-actions-buttons.component';


@Component({
  selector: 'app-planned-movements',
  templateUrl: './planned-movements.component.html',
  styleUrls: ['./planned-movements.component.scss']
})
export class PlannedMovementsComponent implements OnInit {

  @Input('headerCollapse') headerCollapse: boolean = false;
  @Output() saveMovement = new EventEmitter();
  @Output() verifyMovement = new EventEmitter();
  public isdisplaydensityhigh: boolean = false;
  public disableBtn11: boolean = true;
  public saveBtn: boolean = true;
  //selected - Filter chip which is currently selected/applied on grid
  //pinned - Filter chips which are pinned for displaying on screen
  //defaultFilter - Filters which user cannot modify/delete,always displayed on screen
  filterList = {
    filters: [
      {
        name: 'Default View',
        defaultFilter: true,
        selected: true,
        pinned: true,
        position: 0
      },
      {
        name: 'My watchlist',
        defaultFilter: false,
        selected: false,
        pinned: true,
        position: 1
      },
      {
        name: 'Europe region',
        defaultFilter: false,
        selected: false,
        pinned: true,
        position: 2
      },
      {
        name: 'Saved product',
        defaultFilter: false,
        selected: false,
        pinned: true,
        position: 3
      },
      {
        name: 'For Review',
        defaultFilter: false,
        selected: false,
        pinned: true,
        position: 4
      },
      {
        name: 'B2B Out',
        defaultFilter: false,
        selected: false,
        pinned: false,
        position: 5
      },
      {
        name: 'Diesel Fuel',
        defaultFilter: false,
        selected: false,
        pinned: false,
        position: 6
      }
    ],
    enableMoreFilters: true,
    multiSelect: false
  }
  ngOnInit() {
  }

  onRowSelected(event) {
    if (event.node.selected) {
      this.disableBtn11 = false;
      this.saveBtn = false;

    } else {
      this.disableBtn11 = true;
      this.saveBtn = true;
    }
    this.saveMovement.emit(this.saveBtn);
    this.verifyMovement.emit(this.disableBtn11);
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
  constructor(public dialog: MatDialog, private toastr: ToastrService,) {
    this.gridOptions = <GridOptions>{
      columnDefs: this.columnDefs,
      getRowHeight: (params) => {
        return this.isdisplaydensityhigh ? 48 : 25
      },
      headerHeight: this.isdisplaydensityhigh ? 60 : 35,
      groupHeaderHeight: this.isdisplaydensityhigh ? 60 : 35,
      rowSelection: 'multiple',
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
        let newClass = params.data.severity === 'High' ? 'aggrid-left-ribbon darkred' :
          params.data.severity === 'Low' ? 'aggrid-left-ribbon amber' :
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
      onColumnselected: function (params) {
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
      headerName: "",
      filter: true,
      headerCheckboxSelection: true,
      resizable: true,
      width: 32,
      suppressMenu: true,
      checkboxSelection: true,
      headerClass: 'header-checkbox-center',
      selected: 'left',
      cellClass: function (params) {
        var classArray: string[] = [];
        classArray.push('p-1 aggrid-textoverflow checkbox-center pd-l-5');
        let newClass = params.data.severity === 'High' ? 'red-bg' :
          params.data.severity === 'Low' ? 'yellow-bg' : '';
        classArray.push(newClass);
        return classArray.length > 0 ? classArray : null
      }
    },
    {
      headerName: 'Movement ID', selected: 'left', field: 'delivery',
      headerClass: 'p-l-0',
      cellRendererFramework: AGGridCellDataComponent,
      cellClass: [' text-ellipsis product-cell'],
      width: 120,
      cellRendererParams: { type: 'cell-hover-click-menu' }
    },

    { headerName: 'Delivery Product', headerTooltip: 'Delivery Product', field: 'bol_no', cellClass: [], headerClass: 'p-l-0', },
    {
      headerName: 'Movement Date', field: 'counterparty', headerTooltip: 'Movement Date', cellClass: [' aggrid-editable aggrid-editable-onselect aggridtextalign-center'], headerClass: ['aggrid-text-align-c'],
    },
    {
      headerName: 'Mov Type', headerTooltip: 'Mov Type', field: 'product', headerClass: 'p-l-0',
      cellClass: function (params) {
        var classArray: string[] = [];
        classArray.push('aggrid-editable-onselect aggrid-editable aggridtextalign-left');
        let newClass = params.value === 'In' ? 'darkred' : '';
        classArray.push(newClass);
        return classArray.length > 0 ? classArray : null
      }

    },
    {
      headerName: 'Delivery ID', headerTooltip: 'Delivery ID', headerClass: 'p-l-0',
      field: 'deliveryid',

      cellClass: [' text-ellipsis product-cell aggridlink '],
    },

    {
      headerName: 'Tank', field: 'pipeline', headerClass: ['p-l-0', ' text-ellipsis'], headerTooltip: 'Tank', cellClass: ['aggrid-editable aggrid-editable-onselect aggridtextalign-left'],
      cellClassRules: {
        "na-data": function (params) {
          return params.value === "N/A";
        }
      }
    },
    { headerName: 'Product', field: 'quantity', headerTooltip: 'Product', headerClass: 'p-l-0', },
    { headerName: 'Mass Qty', field: 'delivery_date', headerTooltip: 'Product', type: "numericColumn", cellClass: ['ag-numeric-cell aggrid-editable aggrid-editable-onselect aggridtextalign-right'] },
    { headerName: 'Mass UOM', field: 'vessel', headerClass: 'p-l-0', headerTooltip: 'Mass UOM', cellClass: ['aggrid-editable aggrid-editable-onselect aggridtextalign-left'] },
    {
      headerName: 'Volume Qty', field: 'delivery_date', type: "numericColumn", headerTooltip: 'Volume Qty',
      cellClass: function (params) {
        var classArray: string[] = [];
        classArray.push('product-cell aggrid-editable aggrid-editable-onselect aggridtextalign-right');
        let newClass = params.value === '1001' ? 'yellow' : '';
        classArray.push(newClass);
        return classArray.length > 0 ? classArray : null
      }
    },
    { headerName: 'Volume UOM', field: 'vessel', headerClass: 'p-l-0', headerTooltip: 'Volume Unit', cellClass: ['aggrid-editable aggrid-editable-onselect aggridtextalign-left'] },
    { headerName: 'Gross Qty', field: 'delivery_date', headerTooltip: 'Gross Qty', cellClass: ['product-cell aggrid-editable aggrid-editable-onselect  aggridtextalign-right ag-numeric-cell'], type: "numericColumn" },
    { headerName: 'Gross Qty UOM', field: 'vessel', headerClass: 'p-l-0', headerTooltip: 'Volume Unit', cellClass: ['aggrid-editable aggrid-editable-onselect aggridtextalign-left'] },
    { headerName: 'Source Doc', field: 'reference1', headerClass: 'p-l-0', headerTooltip: 'Source Doc', cellClass: ['aggrid-editable aggrid-editable-onselect aggridtextalign-left'] },
    { headerName: 'Reference No.', headerClass: 'p-l-0', field: 'reference2', headerTooltip: 'Reference No.', cellClass: ['aggrid-editable aggrid-editable-onselect aggridtextalign-left'] },
    { headerName: 'CI', field: 'reference', headerTooltip: 'CI', type: "numericColumn", cellClass: ['aggrid-editable aggrid-editable-onselect aggridtextalign-right ag-numeric-cell'], width: 100 },
    { headerName: 'Blend Ref No.', field: 'reference1', headerClass: 'p-l-0', headerTooltip: 'Blend Ref No.', cellClass: ['aggrid-editable aggrid-editable-onselect aggridtextalign-left'] },
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
      headerName: 'B2B Trade ID', field: 'tr_no', headerClass: 'p-l-0', headerTooltip: 'B2B Trade ID', cellClass: ['aggridlink'],
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
    }
  ];

  private rowData = [
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'In', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1001', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'High', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Low', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', delivery: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', delivery: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', delivery: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', delivery: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', delivery: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', delivery: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', delivery: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'Out', delivery: 'MOV7264826', pipeline: 'Tank1', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'No', severity: 'Normal', mov_id: 'N/A', tr_no: 'N/A', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference1: 'BL683910', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'No'
    },
    {
      deliveryid: 'PS001-1', revert: 'yes', bol_no: 'Diesel Fuel', status: 'Sell', product: 'B2B In', delivery: 'MOV7264826', pipeline: 'N/A', delivery_date: '1000', counterparty: '29 - Jan - 2020 17:32', strategy: 'Hedging', company: 'Demo Composition', quantity: 'Diesel Fuel',
      invoice: 'Yes', severity: 'Normal', mov_id: 'MOV17264827', tr_no: 'PS001', tradeno: 'PS001', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '1.00', reference2: 'REF1123820876', vessel: 'BBLS', imo_no: 'Yes'
    },


  ];

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

  public verify() {


    this.toastr.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">Movement verified successfully!</div>',
      '', {
      enableHtml: true,
      toastClass: "toast-alert toast-green", // toast-green, toast-amber, toast-red, toast-grey
      timeOut: 2000
    });
  }

  public save() {
    const dialogRef = this.dialog.open(SaveMovementComponent, {
      width: '700px',
      height: '400px',
      panelClass: ['SaveMovement-popup']
    });

    dialogRef.afterClosed().subscribe(result => {
      const dialogRef2 = this.dialog.open(SaveMovementActionsButtonsComponent, {
        width: '700px',
        height: '315px',
        panelClass: ['SaveMovement-ActionsButtons-popup']
      });

      dialogRef2.afterClosed().subscribe(result => {
        const dialogRef3 = this.dialog.open(SaveMovementClubbedComponent, {
          width: '700px',
          height: '290px',
          panelClass: ['SaveMovement-Clubbed-popup']
        });
        dialogRef3.afterClosed().subscribe(result => {
          const dialogRef4 = this.dialog.open(SaveMovementClubbedActionsButtonsComponent, {
            width: '700px',
            height: '340px',
            panelClass: ['SaveMovement-Clubbed-popup']
          });
        });

      });

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