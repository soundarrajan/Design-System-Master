import { Component, OnInit, Input } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';


@Component({
  selector: 'app-related-invoices',
  templateUrl: './related-invoices.component.html',
  styleUrls: ['./related-invoices.component.css']
})
export class RelatedInvoicesComponent implements OnInit {
  public gridOptions_data: GridOptions;
  public gridOptions_data1: GridOptions;
  //public rowData_aggrid: GridOptions;
  //totalrowData = [];
  formValues:any;
  dateFormat:any;
  constructor() { 
    this.setupGrid();
    //this.gridOptions_data.api.sizeColumnsToFit();
    //this.tabChange();
  }

  ngOnInit(): void {
    //tabChange(){
      //this.gridOptions_data.api.sizeColumnsToFit();
    //}
  }
  tabChange(){
  this.gridOptions_data.api.sizeColumnsToFit();
  this.gridOptions_data1.api.sizeColumnsToFit();
  }
  onCellClicked(e){}

  setupGrid(){
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
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onGridReady: (params) => {
        this.gridOptions_data.api = params.api;
        this.gridOptions_data.columnApi = params.columnApi;
        this.gridOptions_data.api.setPinnedBottomRowData(this.totalrowData);
        this.gridOptions_data.api.setRowData(this.rowData_aggrid);
        this.gridOptions_data.api.sizeColumnsToFit();  
        // params.api.sizeColumnsToFit();     

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
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onGridReady: (params) => {
        this.gridOptions_data1.api = params.api;
        this.gridOptions_data1.columnApi = params.columnApi;
        this.gridOptions_data1.api.setPinnedBottomRowData(this.totalrowData1);
        this.gridOptions_data1.api.setRowData(this.rowData_aggrid1);
        this.gridOptions_data1.api.sizeColumnsToFit();  
        // params.api.sizeColumnsToFit();     

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
    { headerName: 'Invoice ID', headerTooltip: 'Invoice ID', field: 'id',  cellClass: ['aggridlink aggridtextalign-center'], headerClass: ['aggrid-text-align-c'] },
    { headerName: 'Order number', headerTooltip: 'Order number', field: 'ordernumber', cellClass: ['aggridtextalign-left'] },
    {
      headerName: 'Invoice Type', headerTooltip: 'Invoice Type', field: 'type',width:120
    },
    {
      headerName: 'Invoice Date', headerTooltip: 'Invoice Date', field: 'date',  width:120
    },
    {
      headerName: 'Invoice Amt', headerTooltip: 'Invoice Amt', field: 'amount',  width:120
    },
    {
      headerName: 'Deductions', headerTooltip: 'Deductions', field: 'deductions',  width:120
    },
    {
      headerName: 'Paid Amount', headerTooltip: 'Paid Amount', cellClass:'paid',field: 'paid',  width:250
    },
    { headerName: 'Invoice status', headerClass: ['aggrid-text-align-c'],cellClass: ['status aggridtextalign-center'],headerTooltip: 'Invoice status', field: 'status',
    cellRendererFramework: AGGridCellRendererComponent,
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='Approved'?'custom-chip-v2 small medium-green':
                      params.value==='Reverted'?'custom-chip-v2 small medium-amber':
                      'custom-chip-v2 small dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} } 
      },
  ];

  public rowData_aggrid = [
    {
      id: '95164', ordernumber:'9827',type: 'Provisional', date: '12/09/2020', amount: '1280 USD', deductions: '30 USD',
      paid:'30 USD',status:'Approved'
    },
    {
      id: '95164', ordernumber:'9827',type: 'Provisional', date: '12/09/2020', amount: '1280 USD', deductions: '30 USD',
      paid:'30 USD',status:'Reverted'
    },
    {
      id: '95164', ordernumber:'9827',type: 'Provisional', date: '12/09/2020', amount: '1280 USD', deductions: '30 USD',
      paid:'30 USD',status:'New'
    },
  ]
  public totalrowData = [
    {
      id: '', ordernumber:'',type: '', date: '', amount: '', deductions: '',
      paid:'Net Payable: 63,896.78 USD',status:'Total: 63,896.78 USD'
    },

  ];
  private columnDef_aggrid1 = [
    { headerName: 'Invoice ID', headerTooltip: 'Invoice ID', field: 'id',  cellClass: ['aggridlink aggridtextalign-center'], headerClass: ['aggrid-text-align-c'] },
    { headerName: 'Order number', headerTooltip: 'Order number', field: 'ordernumber', cellClass: ['aggridtextalign-left'] },
    {
      headerName: 'Invoice Type', headerTooltip: 'Invoice Type', field: 'type',width:120
    },
    {
      headerName: 'Invoice Date', headerTooltip: 'Invoice Date', field: 'date',  width:120
    },
    {
      headerName: 'Invoice Amt', headerTooltip: 'Invoice Amt', field: 'amount',  width:120
    },
    {
      headerName: 'Deductions', headerTooltip: 'Deductions', field: 'deductions',  width:120
    },
    {
      headerName: 'Paid Amount', headerTooltip: 'Paid Amount', cellClass:'paid',field: 'paid',  width:250
    },
    { headerName: 'Invoice status', headerClass: ['aggrid-text-align-c'],cellClass: ['status aggridtextalign-center'],headerTooltip: 'Invoice status', field: 'status',
    cellRendererFramework: AGGridCellRendererComponent,
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='Approved'?'custom-chip-v2 small medium-green':
                      params.value==='Reverted'?'custom-chip-v2 small medium-amber':
                      'custom-chip-v2 small dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} } 
      },
  ];

  public rowData_aggrid1 = [
    {
      id: '95164', ordernumber:'9827',type: 'Provisional', date: '12/09/2020', amount: '1280 USD', deductions: '30 USD',
      paid:'30 USD',status:'Approved'
    },
    {
      id: '95164', ordernumber:'9827',type: 'Provisional', date: '12/09/2020', amount: '1280 USD', deductions: '30 USD',
      paid:'30 USD',status:'Reverted'
    },
    {
      id: '95164', ordernumber:'9827',type: 'Provisional', date: '12/09/2020', amount: '1280 USD', deductions: '30 USD',
      paid:'30 USD',status:'New'
    },
  ]
  public totalrowData1 = [
    {
      id: '', ordernumber:'',type: '', date: '', amount: '', deductions: '',
      paid:'Net Payable: 63,896.78 USD',status:'Total: 63,896.78 USD'
    },

  ];
}


