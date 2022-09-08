import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from "ag-grid-community";
import { AggridStatusChipComponent } from 'src/app/shared/ag-grid/ag-grid-status-chip.component';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { CreateInvoiceComponent } from '../../shared/dialog-popup/create-invoice/create-invoice.component';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';


@Component({
  selector: 'app-transaction-list-screen',
  templateUrl: './transaction-list-screen.component.html',
  styleUrls: ['./transaction-list-screen.component.scss']
})
export class TransactionListScreenComponent implements OnInit {
  //menuOpen: boolean;
  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;

  ngOnInit() {
    //alert(this.menuOpen);
  }

  createInvoice() {
    const dialogRef = this.dialog.open(CreateInvoiceComponent, {
      width: '340px',
      height: '292px',
      panelClass: 'create-invoice-container'
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
    
    {
      headerName: "",
      field: "",
      filter: true,
      enableSorting :true,
      headerCheckboxSelection: true,
      resizable: true,
      width:40,
      pinned: 'left',
      checkboxSelection: true,
      headerClass:'header-checkbox-center',
      // headerClass:'left-10',
      cellClass:'p-1 aggrid-textoverflow checkbox-center', 
      // headerClass:['header-space'],
      // cellClass: ['space-border']
    }, 
    {headerName: 'Trade ID',headerTooltip:'Trade ID', field: 'tradeid', cellClass: ['aggridlink'], headerClass:[''], pinned: 'left',  width: 150 },
    {headerName: 'Delivery No', headerTooltip:'Delivery No', field: 'delivery_no', cellClass: ['aggridlink'], headerClass:[''], width: 160},   
    {headerName: 'Buy/Sell', field: 'status', cellClass: [''], headerClass:[''], headerTooltip : 'Buy/Sell', width: 130 },
    {headerName: 'Product', headerTooltip:'Product', field: 'product', cellClass: [''], headerClass:[''], width: 140},
    {headerName: 'Delivery Mode', field: 'delivery', cellClass: [''], headerClass:[' text-ellipsis'], headerTooltip : 'Delivery Mode', width: 150 },
    {headerName: 'Pipeline Type', field: 'pipeline', cellClass: [''], headerClass:[' text-ellipsis'], headerTooltip : 'Pipeline Type', width: 150 },
    {headerName: 'Delivery Date', field: 'delivery_date', cellClass: ['aggridtextalign-center'],headerClass:['aggridtextalign-center'],  headerTooltip : 'Delivery Date', cellRendererFramework:AGGridCellRendererComponent, cellRendererParams: {cellClass: ['custom-chip dark']}, width: 170  },
    {headerName: 'Counterparty', field: 'counterparty', cellClass: [' text-ellipsis'], headerClass:[' text-ellipsis'], headerTooltip : 'Counterparty', width: 130 },
    {headerName: 'Strategy', field: 'strategy',cellClass: [''],  headerClass:[''], headerTooltip : 'Strategy', width: 150},
    {headerName: 'Company', field: 'company',  headerClass:[''], headerTooltip : 'Company', width: 130 },
    {headerName: 'Quantity', field: 'quantity',cellClass: [''],  headerClass:[''], headerTooltip : 'Quantity', width: 150 },
    {headerName: 'Cost Type', field: 'costtype',cellClass: ['','bg-green'], headerTooltip : 'Cost Type', width: 120 },
    {headerName: 'Add Cost', field: 'addcost',cellClass: [''],headerClass:[''],  headerTooltip : 'Add Cost', width: 130 },
    {headerName: 'Is Pricing Complete', field: 'ispr', cellClass: ['aggridtextalign-center'], suppressSizeToFit: true, cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: ['creator-bg bg-light-blue']},width:95},
    {headerName: 'Amount', field: 'amount',cellClass: [''], headerClass:[''],  headerTooltip : 'Amount', width: 120 },
    {headerName: 'Payment Term', field: 'payment',cellClass: [''], headerClass:[' text-ellipsis'],  headerTooltip : 'Payment Term', width: 110 },
    {headerName: 'Reference No', field: 'reference',cellClass: [''], headerClass:[' text-ellipsis'],  headerTooltip : 'Reference No', width: 120 },
    {headerName: 'Reference Id', field: 'reference2',cellClass: [''],headerClass:[' text-ellipsis'],  headerTooltip : 'Reference Id', width: 110 },
    {headerName: 'Vessel', field: 'vessel',cellClass: [''],  headerClass:[''], headerTooltip : 'Vessel', width: 110 },
    {headerName: 'IMO No', field: 'imo_no',cellClass: [''], headerClass:[''],  headerTooltip : 'IMO No', width: 120 }
  ];

private rowData = [
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', status: 'Sell', product: 'Ethanol', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:'250000 GAL',
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
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
