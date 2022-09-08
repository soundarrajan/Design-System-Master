import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { GridOptions } from "ag-grid-community";
import { Location } from '@angular/common';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';

@Component({
  selector: 'app-add-movement',
  templateUrl: './add-movement.component.html',
  styleUrls: ['./add-movement.component.scss']
})
export class AddMovementComponent implements OnInit {
  selected = 0;
  isCollapsed: boolean = false;
  active_cancel: boolean = true;
  active_save: boolean = false;
  tab_label = "EDIT-MOV276486";
  public defaultToggle = 'transfer';
  public sourceDocument = [
    { value: 'test', viewValue: 'Doc1' }, { value: 'test1', viewValue: 'Doc2' }
  ];
  public tanks = [
    { value: 'pmg', viewValue: 'PMG tank 1' }
  ];
  public products = [
    { value: 'ethanol', viewValue: 'Ethanol' }
  ];
  public modes = [
    { value: 'pipe', viewValue: 'Pipeline' }
  ];
  public carriers = [
    { value: 'kinder', viewValue: 'Kinder Morgan' }
  ];
  public types = [
    { value: 'transfer', viewValue: 'Using transsfer price' }, { value: 'cost', viewValue: 'Cost plus' }
  ];
  public list = [
    { value: 'discount', viewValue: 'Discount' }, { value: 'premium', viewValue: 'Premium' }
  ];
  public typeSelected = 'cost';
  public gridOptions_addcost: GridOptions;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private _location: Location) {
    iconRegistry.addSvgIcon(
      'data-picker-gray',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/customicons/calendar-dark.svg'));

    this.gridOptions_addcost = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: true,
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

  ngOnInit() {
  }
  goBack() {
    this._location.back();
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
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
    {
      headerName: 'Cost Type', headerTooltip: 'Cost Type', field: 'cost', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' },cellStyle: {padding: '0 0 0 5px'}
    },
    {
      headerName: 'Cost Name', headerTooltip: 'Cost Name', field: 'name', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    {
      headerName: 'Service Provider', headerTooltip: 'Service Provider', field: 'provider', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    {
      headerName: 'Rate Type', headerTooltip: 'Rate Type', field: 'type', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    {
      headerName: 'Currency', headerTooltip: 'Currency', field: 'currency', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    {
      headerName: 'Rate', headerTooltip: 'Rate', field: 'rate', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    {
      headerName: 'UOM', headerTooltip: 'UOM', field: 'uom', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    { headerName: 'Invoice ID', headerTooltip: 'Invoice ID', field: 'id', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left'], },
  ];

  private rowData_addcosts = [

    {
      type: 'Flat', provider: 'Kinder Morgan', currency: 'USD', rate: '100', cost: 'Pay', name: 'Barging', id: "", uom: "GAL"
    }
  ]
}
