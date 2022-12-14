import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AGGridCellActionsComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { RowstatusOnchangeQuantityrobdiffPopupComponent } from 'src/app/shared/designsystem-v2/rowstatus-onchange-quantityrobdiff-popup/rowstatus-onchange-quantityrobdiff-popup.component';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { type } from 'os';

@Component({
  selector: 'app-quantity-difference',
  templateUrl: './quantity-difference.component.html',
  styleUrls: ['./quantity-difference.component.css']
})
export class QuantityDifferenceComponent implements OnInit {

public switchTheme: boolean = true;
public gridTitle="ROB Difference";
public gridOptions_data: GridOptions;
public gridOptions_data1: GridOptions;
public rowCount:Number;
today = new FormControl(new Date());
public rowSelection;
@Input() theme: boolean;
@Input() newScreen: boolean;

filterList = {
  filters: [
    {
      name: 'Default',
      count: '16',
      defaultFilter: true,
      selected: true,
      pinned: true,
      position: 0
    },
    {
      name: 'New',
      count: '6',
      defaultFilter: false,
      selected: false,
      pinned: true,
      position: 1
    },
    {
      name: 'Marked as Seen',
      count: '6',
      defaultFilter: false,
      selected: false,
      pinned: true,
      position: 2
    }
  ],
  enableMoreFilters: false,
  multiSelect: false
}

ngOnInit(): void {
}
tabChange(){
  this.gridOptions_data.api.sizeColumnsToFit();
}
  constructor(public dialog: MatDialog) { 
    this.rowSelection = 'single';
    this.gridOptions_data = <GridOptions>{

      enableColResize: true,
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_aggrid,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 30,
      rowHeight: 30,
      animateRows: false,
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onGridReady: (params) => {
        this.gridOptions_data.api = params.api;
        this.gridOptions_data.columnApi = params.columnApi;
       this.gridOptions_data.api.setRowData(this.rowData_aggrid);
        this.gridOptions_data.api.sizeColumnsToFit();  
        this.rowCount = this.gridOptions_data.api.getDisplayedRowCount();
        params.api.sizeColumnsToFit();     

      },
      
      getRowHeight(params) {
        if(params.data.data.length>0)
          return (params.data.data.length*30);
        else
          return (30);
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          //params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8) {
          params.api.sizeColumnsToFit();

        }
      }
    }
    this.gridOptions_data1 = <GridOptions>{
      enableColResize: true,
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_aggrid1,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 30,
      rowHeight: 35,
      animateRows: false,
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onGridReady: (params) => {
        this.gridOptions_data1.api = params.api;
        this.gridOptions_data1.columnApi = params.columnApi;
       this.gridOptions_data1.api.setRowData(this.rowData_aggrid1);
        this.gridOptions_data1.api.sizeColumnsToFit();  
        this.rowCount = this.gridOptions_data1.api.getDisplayedRowCount();
        params.api.sizeColumnsToFit();     

      },
      
      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          //params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8) {
          params.api.sizeColumnsToFit();

        }
      }
    }

  }

  private columnDef_aggrid = [
    {
      headerName: 'Port Call', headerTooltip: 'Port Call', field: 'portCall',width:120,cellClass: ['aggridlink']
     },
     {
      headerName: 'Port', headerTooltip: 'Port', field: 'port',width:120
     },
     {
      headerName: 'Vessel', headerTooltip: 'Vessel', field: 'vessel',tooltipField: 'vessel',width:120
     }, 
     {
      headerName: 'ETA', headerTooltip: 'ETA', field: 'eta',width:120
     },
     {
      headerName: 'Survey Date', headerTooltip: 'Survey Date', field: 'date',width:120
     },   
     {
      headerName: 'Email', headerTooltip: 'Email', field: 'email',width:120
     },
     {
      headerName: 'Vessel To Watch', headerTooltip: 'Vessel To Watch', field: 'vess',width:120,
      cellStyle: params => {
        if (params.value === 'Yes') {
            return {color: '#EB5757'};
        }
        return null;
    }
     },
     {
      headerName: 'Pro. Type', headerTooltip: 'Pro. Type',width:120, field: 'type',
      cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'protype', type:'text'},
          valueGetter : function(params) { 
          //return params.data.data[0].type;
          return params.data;
        }
     },
     /* {
      headerName: 'Log Book ROB (Surveyor Quantity before delivery)', headerTooltip: 'Log Book ROB (Surveyor Quantity before delivery)', field: 'logQty',width:120
     },
     {
      headerName: 'Measured ROB (Surveyor Quantity before delivery)', headerTooltip: 'Measured ROB (Surveyor Quantity before delivery)', field: 'mQty',width:120
     }, */
     {
      headerName: 'BDN Qty', headerTooltip: 'BDN Qty', field: 'bdn_qty',width:120,
      cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'protype', type:'text'},
          valueGetter : function(params) { 
          //return params.data.data[0].type;
          return params.data;
        }
     },
     {
      headerName: 'Measured ROB', headerTooltip: 'Measured ROB', field: 'meas_rob',width:120,
      cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'meas_rob', type:'text'},
          valueGetter : function(params) { 
          //return params.data.data[0].type;
          return params.data;
        }
     },
     {
      headerName: 'Diff. in Qty', headerTooltip: 'Diff. in Qty', field: 'diff',width:120,
      cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'diff', type:'text'},
          valueGetter : function(params) { 
          //return params.data.data[0].type;
          return params.data;
        }
     },
     {
      headerName: 'Qty UOM', headerTooltip: 'Qty UOM', field: 'uom',width:120,
      cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'uom', type:'text'},
          valueGetter : function(params) { 
          //return params.data.data[0].type;
          return params.data;
        }
     },
     /* { headerName: 'Qty Status', headerClass: ['aggrid-text-align-c'],cellClass: ['status aggridtextalign-center'],headerTooltip: 'Qty Status', field: 'qtystatus',width:150,
    cellRendererFramework: AGGridCellRendererComponent,
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='Matched'?'custom-chip-v2 medium dark-green':
                      params.value==='Unmatched'?'custom-chip-v2 medium dark-amber':
                      'custom-chip-v2 medium dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} } 
    }, */
    { headerName: 'Progress', headerClass: ['aggrid-text-align-c'],cellClass: ['status aggridtextalign-center'],headerTooltip: 'Status', field: 'status',width:150,
    cellRendererFramework: AGGridCellRendererComponent,
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='New'?'custom-chip-v2 small medium-blue':
                      params.value==='Marked As Seen'?'custom-chip-v2 small medium-yellow':
                      params.value==='Off Spec'?'custom-chip-v2 small medium-yellow':
                      params.value==='Resolved'?'custom-chip-v2 small light-green':
                      'custom-chip-v2 small dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} } 
    },
    {
      headerName: 'Actions', headerClass: ["aggrid-text-align-c"], cellClass: ['aggridtextalign-center'], headerTooltip: 'Actions',
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'actions' }, cellStyle: { 'align-items': 'center' },
      resizable: false, suppressMovable: true, width: 110
    }
  ];

  public rowData_aggrid = [
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.71',uom:'MT' },
      { protype:'LSFO',bdn_qty: '1000.000',meas_rob: '1010.000',diff:'-10.00',uom:'MT' },
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'Yes',
    data: [
      { protype:'VLSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' },
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.71',uom:'MT' },
      { protype:'LSFO',bdn_qty: '1000.000',meas_rob: '1010.000',diff:'-10.00',uom:'MT' },
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Marked As Seen',actions:''
    },
    { portCall:'000050001536482',vessel:'Nordmed',port:'Algeciras',email: 'Yes',vess: 'Yes',
    data: [
      { protype:'VLSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'Nordmed',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'VLSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Marked As Seen',actions:''
    },
    { portCall:'000050001536482',vessel:'Nordmed',port:'Algeciras',email: 'Yes',vess: 'Yes',
    data: [
      { protype:'VLSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'Nordmed',port:'Algeciras',email: 'Yes',vess: 'Yes',
    data: [
      { protype:'VLSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Marked As Seen',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Pointe Noire',email: 'Yes',vess: 'Yes',
    data: [
      { protype:'VLSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Marked As Seen',actions:''
    },
    { portCall:'000050001536482',vessel:'Nordmed',port:'Pointe Noire',email: 'Yes',vess: 'No',
    data: [
      { protype:'VLSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Pointe Noire',email: 'Yes',vess: 'Yes',
    data: [
      { protype:'VLSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Pointe Noire',email: 'Yes',vess: 'No',
    data: [
      { protype:'VLSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Marked As Seen',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',email: 'Yes',vess: 'No',
    data: [
      { protype:'HSFO',bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT' }
    ],
    eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },
    ]

  private columnDef_aggrid1 = [
    {
      headerName: 'Port Call', headerTooltip: 'Port Call', field: 'portCall',width:120,cellClass: ['aggridlink']
     },
     {
      headerName: 'Port', headerTooltip: 'Port', field: 'port',width:120
     },
     {
      headerName: 'Vessel', headerTooltip: 'Vessel', field: 'vessel',tooltipField: 'vessel',width:120
     },
     {
      headerName: 'ETA', headerTooltip: 'ETA', field: 'eta',width:120
     },
     {
      headerName: 'Survey Date', headerTooltip: 'Survey Date', field: 'date',width:120
     },
     {
      headerName: 'Email', headerTooltip: 'Email', field: 'email',width:120
     },
     {
      headerName: 'Vessel', headerTooltip: 'Vessel', field: 'vess',width:120
     },
     {
      headerName: 'Pro. Type', headerTooltip: 'Pro. Type', field: 'type',width:120
     },
     {
      headerName: 'BDN Qty', headerTooltip: 'BDN Qty', field: 'bdn_qty',width:120
     },
     {
      headerName: 'Meaured Delivered Quantity / Survey Report Value', headerTooltip: 'Measured Delivery QtyMeaured Delivered Quantity / Survey Report Value', field: 'meas_rob',width:120
     },
     {
      headerName: 'Diff. in Qty', headerTooltip: 'Diff. in Qty', field: 'diff',width:120
     },
     {
      headerName: 'Sum of Or', headerTooltip: 'Sum of Or', field: 'sum',width:120
     },
     {
      headerName: 'Qty UOM', headerTooltip: 'Qty UOM', field: 'uom',width:120
     },
     /* { headerName: 'Qty Status', headerClass: ['aggrid-text-align-c'],cellClass: ['status aggridtextalign-center'],headerTooltip: 'Qty Status', field: 'qtystatus',width:150,
    cellRendererFramework: AGGridCellRendererComponent,
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='Matched'?'custom-chip-v2 medium dark-green':
                      params.value==='Unmatched'?'custom-chip-v2 medium dark-amber':
                      'custom-chip-v2 medium dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} } 
    }, */
    { headerName: 'Progress', headerClass: ['aggrid-text-align-c'],cellClass: ['status aggridtextalign-center'],headerTooltip: 'Status', field: 'status',width:150,
    cellRendererFramework: AGGridCellRendererComponent,
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='New'?'custom-chip-v2 small medium-blue':
                      params.value==='Marked As Seen'?'custom-chip-v2 small medium-yellow':
                      params.value==='Off Spec'?'custom-chip-v2 small medium-yellow':
                      params.value==='Resolved'?'custom-chip-v2 small light-green':
                      'custom-chip-v2 small dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} } 
    },
    {
      headerName: 'Actions', headerClass: ["aggrid-text-align-c"], cellClass: ['aggridtextalign-center'], headerTooltip: 'Actions',
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'actions' }, cellStyle: { 'align-items': 'center' },
      resizable: false, suppressMovable: true, width: 110
    }
  ];

  public rowData_aggrid1 = [
      
    { portCall:'000050001536482',vessel:'CMA CGM A Lincoln',port:'Algeciras',type:'HSFO',email: 'Yes',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-54.717',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    },  
    { portCall:'000050001534344',vessel:'CMA CGM A Lincoln',port:'Aarhus',type:'VLSFO',email: 'Yes',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Marked As Seen',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Singapore',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'CMA CGM A Lincoln',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'CMA CGM A Lincoln',port:'Antwerp',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Marked As Seen',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Resolved',actions:''
    }, 
    { portCall:'000050001534344',vessel:'CMA CGM A Lincoln',port:'Asia North',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'CMA CGM A Aegan',port:'Fujeirah',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Resolved',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Antwerp',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Marked As Seen',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Marked As Seen',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Marked As Seen',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Resolved',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Resolved',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Resolved',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'Marked As Seen',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }, 
    { portCall:'000050001534344',vessel:'Nordmed',port:'Pointe Noire',type:'VLSFO',email: 'No',vess: 'No',
    bdn_qty: '1295.930',meas_rob: '1350.469',diff:'-8.55',uom:'MT',sum:'2000.00',eta: 'Fri 11/02/2021 05:30',date:'Fri 11/02/2021 05:30',status:'New',actions:''
    }
  
  ]

  selectedTabChange(e: MatTabChangeEvent){
    //console.log(e);
    if(e.index == 0)
    this.gridTitle="ROB Difference";

    if(e.index == 1)
    this.gridTitle="Supply Difference";

    this.gridOptions_data.api.sizeColumnsToFit();
    this.gridOptions_data1.api.sizeColumnsToFit();
  }
  public onrowClicked (ev){
    //console.log("hhhhhhhhh");
    var index = ev.rowIndex;
    //alert(index);
    const dialogRef = this.dialog.open(RowstatusOnchangeQuantityrobdiffPopupComponent, {
      width: '430px',
      height: 'auto',
      maxHeight:'558px',
      backdropClass: 'dark-popupBackdropClass',
      panelClass: this.theme ? 'dark-theme' : 'light-theme',
      data:{title:'Claims',id:'Claim Id'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      var selectedData = this.gridOptions_data.api.getSelectedRows();
      //var res = this.gridOptions_data.api.applyTransaction({ remove: selectedData });
      // this.gridOptions_data.api.applyTransaction({
      //   add: this.newItems,
      //   addIndex: 0,
      // });
      
      //alert(result.data);
      //this.gridOptions_data.api.setRowData([]);
      var itemsToUpdate = [];
    this.gridOptions_data.api.forEachNodeAfterFilterAndSort(function(rowNode, index) {
      // console.log("eeeeeeeee");
      // console.log(rowNode);
      if (!rowNode.isSelected() === true) {
        return;
      }
      var data = rowNode.data;
      data.status = result.data;
      itemsToUpdate.push(data);
    });
    var res = this.gridOptions_data.api.applyTransaction({ update: itemsToUpdate });
    this.gridOptions_data.api.deselectAll();//optional


    });
  }
 
  onResize(event) {
    this.gridOptions_data.api.sizeColumnsToFit();
    this.gridOptions_data1.api.sizeColumnsToFit();
  }

}

