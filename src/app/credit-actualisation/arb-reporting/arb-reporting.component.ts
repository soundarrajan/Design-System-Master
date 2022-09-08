import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from "ag-grid-community";
import { AggridStatusChipComponent } from 'src/app/shared/ag-grid/ag-grid-status-chip.component';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { BulkImportTransactionComponent } from '../../shared/dialog-popup/bulk-import-transaction/bulk-import-transaction.component';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';

@Component({
  selector: 'app-arb-reporting',
  templateUrl: './arb-reporting.component.html',
  styleUrls: ['./arb-reporting.component.scss']
})
export class ArbReportingComponent implements OnInit {

  

  
  //menuOpen: boolean;
  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;
  ngOnInit() {
    //alert(this.menuOpen);
  }

  bulkImport() {
    const dialogRef = this.dialog.open(BulkImportTransactionComponent, {
      width: '392px',
      height: '171px',
      panelClass: 'bulk-import-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }

  // AG GRID
  public gridOptions: GridOptions;
  private paginationPageSize:number;
  public rowCount:Number;
  constructor(public dialog: MatDialog) { 
    this.gridOptions = <GridOptions>{      
      columnDefs: this.columnDefs,
      enableColResize: true,
      enableSorting: true,
      filter: true,
      // pagination: false,
      // paginationPageSize: this.paginationPageSize,
      animateRows:true,
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 48:25
      },
      headerHeight:this.isdisplaydensityhigh? 60:35,
      groupHeaderHeight:this.isdisplaydensityhigh? 60:35,
      rowSelection: 'multiple',
      rowMultiSelectWithClick:true,
      defaultColDef: {
        filter: true,
        enableSorting: true,
    },
      onGridReady: (params) => {
          this.gridOptions.api = params.api;
          this.gridOptions.columnApi = params.columnApi;
          // this.gridOptions.api.sizeColumnsToFit(); 
          this.gridOptions.enableColResize = true;
          this.gridOptions.api.setRowData(this.rowData);        
          this.rowCount = this.gridOptions.api.getDisplayedRowCount();  
      },
      getRowClass:(params)=> {
        // if(params.node.rowIndex === 1){
        //   return 'aggrid-celldisable';
        // }
        if (params.node.rowIndex % 2 === 0) {
            return ['aggrid-evenrow-bg','aggrid-evenrow-border-dark'];
        }  
        else{
            return ['aggrid-oddrow-bg','aggrid-evenrow-border-dark'];
        }    
      },
          onColumnResized: function(params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function(params) {
        if(params.columnApi.getAllDisplayedColumns().length <= 10)
          params.api.sizeColumnsToFit();
      }
    }; 
  }

  private columnDefs = [
    
    // {
    //   headerName: "",
    //   field: "",
    //   filter: true,
    //   enableSorting :true,
    //   headerCheckboxSelection: true,
    //   resizable: true,
    //   width:60,
    //   pinned: 'left',
    //   checkboxSelection: true,
    //   // headerClass:'left-10',
    //   cellClass:'p-1 aggrid-textoverflow', 
    //   // headerClass:['header-space'],
    //   // cellClass: ['space-border']
    // }, 
    {headerName: 'Trade ID',headerTooltip:'Trade ID', field: 'tradeid',  cellClass: ['aggridlink aggrid-text-align-r aggrid-left-ribbon dark'],type: "numericColumn", pinned: 'left',  width: 150 },
    {headerName: 'Delivery ID', headerTooltip:'Delivery ID', field: 'delivery_no', headerClass:['aggrid-text-align-l'], cellClass: ['aggridlink aggrid-text-align-l'],type: "numericColumn", width: 160},
    {headerName: 'Movement ID', headerTooltip:'Movement ID', field: 'movement_id', headerClass:['aggrid-text-align-l'], cellClass: ['aggridlink aggrid-text-align-l'],type: "numericColumn", width: 160},
    // {headerName: 'FEIN', headerTooltip:'FEIN', field: 'product', cellClass: [''], headerClass:[''], width: 140},
    {headerName: 'Location', field: 'location', cellClass: [''], headerClass:[' text-ellipsis'], headerTooltip : 'Location', width: 150 },
    {headerName: 'Terminal', field: 'terminal', cellClass: [''], headerClass:[' text-ellipsis'], headerTooltip : 'Terminal', width: 150 },
    {headerName: 'Delivery mode', field: 'delivery_mode', cellClass: [''],headerClass:['aggridtextalign-center'],  headerTooltip : 'Delivery mode', width: 170  },
    {headerName: 'Product', field: 'product', cellClass: [' text-ellipsis'], headerClass:[' text-ellipsis'], headerTooltip : 'Product', width: 130 },
    {headerName: 'FEIN', field: 'fein',cellClass: [''],  headerClass:[''], headerTooltip : 'FEIN', width: 150},
    {headerName: 'Year', field: 'year', headerTooltip : 'Year', type: "numericColumn", width: 120 },
    {headerName: 'Quarter', field: 'quarter',cellClass: [''],  headerClass:[''], headerTooltip : 'Quarter', width: 120 },
    {headerName: 'Fuel Pathway Code', field: 'reference',cellClass: [''], headerTooltip : 'Fuel Pathway Code', width: 110 },
    {headerName: 'Application', field: 'reference2',cellClass: [''],headerClass:[''],  headerTooltip : 'Application', width: 130 },
    {headerName: 'Transaction Type', field: 'reference', cellClass: ['aggridtextalign-center'], suppressSizeToFit: true,width:120},
    {headerName: 'Transaction Number', field: 'amount',cellClass: [''], headerClass:[''],  headerTooltip : 'Transaction Number', width: 120 },
    {headerName: 'Transaction Date', field: 'delivery_date', cellClass: ['aggridtextalign-center'],headerClass:['aggridtextalign-center aggrid-text-align-c'],  headerTooltip : 'Date', cellRendererFramework:AGGridCellRendererComponent, cellRendererParams: {cellClass: ['custom-chip dark']}, width: 170  },
    {headerName: 'Amount', field: 'reference',cellClass: [''], headerClass:[' text-ellipsis'],  headerTooltip : 'Amount', width: 120 },
    {headerName: 'Business Partner ID', field: 'reference2',cellClass: [''],headerClass:[' text-ellipsis'],  headerTooltip : 'Business Partner ID', width: 110 },
    {headerName: 'EPA Company ID', field: 'vessel',cellClass: [''],  headerClass:[''], headerTooltip : 'EPA Company ID', width: 110 },
    {headerName: 'EPA Facility ID', field: 'imo_no',cellClass: [''], headerClass:[''],  headerTooltip : 'EPA Facility ID', width: 120 },
    {headerName: 'Physical Pathway Code', field: 'imo_no',cellClass: [''], headerClass:[''],  headerTooltip : 'Physical Pathway Code', width: 120 },
    {headerName: 'Aggregation Indicator', field: 'imo_no',cellClass: [''], headerClass:[''],  headerTooltip : 'Aggregation Indicator', width: 120 },
    {headerName: 'Description', field: 'imo_no',cellClass: [''], headerClass:[''],  headerTooltip : 'Description', width: 120 }
  ];

private rowData = [
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Sell',location:'California', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    terminal: 'PDTC', delivery_mode: 'Cargo', fein: '1276323272',year: '2019',quarter: 'Q3', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  }
  
  
];

invoiceCurrency(){
  event.stopPropagation();
  const invoicelogo = document.querySelector('.logo');
  invoicelogo.classList.add('select');
  const invoicelabel = document.querySelector('.logo-label');
  invoicelabel.classList.add('select');
}

public change_rowdensity(){
  this.isdisplaydensityhigh = !this.isdisplaydensityhigh;
  if(this.isdisplaydensityhigh){
    this.gridOptions.rowHeight = 48;
    this.gridOptions.headerHeight = 60;
    this.gridOptions.groupHeaderHeight =60;
  }
  else{
    this.gridOptions.rowHeight = 26;
    this.gridOptions.headerHeight = 35;
    this.gridOptions.groupHeaderHeight = 35;
  }
  this.gridOptions.api.resetRowHeights();
  this.gridOptions.api.refreshHeader();
}
public headerToggle(){
  // var element = document.getElementsByClassName("mat-tab-header");
  // var mainHeader = document.getElementsByClassName("header-navbar");
  // console.log(element);
  // console.log(mainHeader);
  
  if(document.querySelector('.mat-tab-header').classList.contains('collapsed')) {
    //alert("sss");
    this.isCollapsed = false;
    document.querySelector('.pcoded-main-container').classList.remove('collapsed');
    document.querySelector('.header-slide').classList.remove('collapsed');
    document.querySelector('.mat-tab-header').classList.remove('collapsed');
    document.querySelector('.mat-tab-header').classList.add('expand');
    document.querySelector('.header-navbar').classList.remove('collapsed');
    document.querySelector('.header-navbar').classList.add('expand');
    //(<HTMLElement>document.querySelector(".light-blue-button")).style.display = "block";
    
    
    
  }else{
    this.isCollapsed = true;
    document.querySelector('.pcoded-main-container').classList.add('collapsed');
    document.querySelector('.header-slide').classList.add('collapsed');
    
    document.querySelector('.mat-tab-header').classList.add('collapsed');
    document.querySelector('.header-navbar').classList.add('collapsed');
    document.querySelector('.header-navbar').classList.remove('expand');
    document.querySelector('.mat-tab-header').classList.remove('expand');
  // const invoicelogo = document.querySelector('.mat-tab-header');
  // invoicelogo.classList.add('collapsed');
  // const mainHeader = document.querySelector('.header-navbar');
  // mainHeader.classList.add('collapsed');
  //(<HTMLElement>document.querySelector(".light-blue-button")).style.display = "none";
 
  
  }
}
}
