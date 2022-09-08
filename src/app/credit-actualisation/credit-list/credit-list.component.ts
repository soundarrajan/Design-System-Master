import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from "ag-grid-community";
import { AggridStatusChipComponent } from 'src/app/shared/ag-grid/ag-grid-status-chip.component';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { CreateInvoiceComponent } from '../../shared/dialog-popup/create-invoice/create-invoice.component';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss']
})
export class CreditListComponent implements OnInit {

  
  //menuOpen: boolean;
  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;
  public isRowSelected:boolean=false;

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
          this.gridOptions.api.sizeColumnsToFit(); 
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
      suppressMenu: true,
      resizable: true,
      width:30,
      pinned: 'left',
      headerClass:'header-checkbox-center',
      //checkboxSelection: true,
      checkboxSelection: function(params) {
        console.log(params);
        return params.data.status === 'Planned'
      },
      // headerClass:'left-10',
      
      cellClass: function(params) { 
        var classArray:string[] =[]; 
          classArray.push('aggridlink checkbox-center');
          let newClass=params.data.status==='Planned'?'aggrid-left-ribbon wisteria':
                        params.data.status==='Verified'?'aggrid-left-ribbon teal':
                       'aggrid-left-ribbon dark';
                        classArray.push(newClass);
          return classArray.length>0?classArray:null }
      // headerClass:['header-space'],
      // cellClass: ['space-border']
    }, 
    {headerName: 'Trade ID',headerTooltip:'Trade ID', field: 'tradeid', cellClass: ['aggridlink'], headerClass:[''], pinned: 'left',  width: 150 },
    {headerName: 'Delivery ID', headerTooltip:'Delivery ID', field: 'delivery_no', headerClass:['aggrid-text-align-l'], cellClass: ['aggridlink aggrid-text-align-l'],type: "numericColumn", width: 160},
    {headerName: 'Movement ID', headerTooltip:'Movement ID', field: 'movement_id', headerClass:['aggrid-text-align-l'], cellClass: ['aggridlink aggrid-text-align-l'],type: "numericColumn", width: 160},   
    {headerName: 'Product', headerTooltip:'Product', field: 'product', cellClass: ['aggridlink'], headerClass:[''], width: 120},
    {
      headerName: 'Actual Qty', 
        valueGetter: function(params) {
          return params.data.quantity+" BBL";
        },
        cellClass: ['aggrid-text-align-r'],  type: "numericColumn", headerTooltip : 'Actual Quantity', width: 120 },
    {
      headerName: 'Calculated Qty',
          valueGetter: function(params) {
            return params.data.calculated_qty+" BBL";
          },
        cellClass: ['aggrid-text-align-r product-cell'],  type: "numericColumn", headerTooltip : 'Calculated Quantity', 
        cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'hover-popup-toggle-table'}, width: 120 },
    {
      headerName: "Difference Qty", type: "numericColumn",
      valueGetter: function(params) {
        return (params.data.quantity - params.data.calculated_qty == 0? ' ' :params.data.quantity - params.data.calculated_qty  +" BBL" );
      },
      cellRendererFramework:AGGridCellDataComponent, 
      cellRendererParams: function(params) { 
        if(params.data.quantity - params.data.calculated_qty!=0)
            return {style: 'notification aggridtextalign-right'}
        else
            return {style:'aggridtextalign-right'}
      }
    },
    {headerName: 'Date', field: 'delivery_date', cellClass: ['aggridtextalign-center'],headerClass:['aggridtextalign-center aggrid-text-align-c'],  headerTooltip : 'Date', cellRendererFramework:AGGridCellRendererComponent, cellRendererParams: {cellClass: ['custom-chip dark']}, width: 170  },
    {headerName: 'Status', field: 'status', cellRendererFramework:AGGridCellRendererComponent, headerClass:['aggrid-text-align-c'], cellClass: ['aggridtextalign-center'],
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='Planned'?'custom-chip wisteria':
                      params.value==='Verified'?'custom-chip teal':
                     'custom-chip dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} }},
    { headerName: 'Revert Status', headerClass:["","aggrid-text-align-c"],cellClass:['aggrid-content-center'],pinned:'right', headerTooltip:'Unmatch', field: 'unmatch', cellRendererFramework:AGGridCellRendererComponent,
      filter: true,
      suppressMenu:true,
      resizable: false,
      suppressMovable: true,
      enableSorting:false,
      width:100,
      cellRendererParams: function(params) { 
        var classArray:string[] =[]; 
          classArray.push('aggridtextalign-center');
          let newClass= params.data.status === 'Planned'?'undo-red':
                        params.data.status === 'Verified'?'undo-amber':
                       'undo-amber';
                        classArray.push(newClass);
          return {cellClass: classArray.length>0?classArray:null} }
    }
  ];

private rowData = [
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1',movement_id:'MOV00000007', status: 'Planned', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:1000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Verified', product: 'CAR', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:5000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Planned', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:4000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Verified', product: 'CCA', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:5000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Planned', product: 'CAR', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:2000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Planned', product: 'RIN', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:3500,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Planned', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:4500,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Planned', product: 'LCFS credit', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:4800,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Planned', product: 'CAR', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:3800,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Verified', product: 'CAR', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:5000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Verified', product: 'CAR', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:5000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Verified', product: 'CAR', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:5000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Verified', product: 'CAR', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:5000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Verified', product: 'CAR', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:5000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Verified', product: 'RIN', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:5000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Verified', product: 'RIN', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:5000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Verified', product: 'RIN', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:5000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Verified', product: 'CAR', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:5000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Planned', product: 'CAR', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:6000,
    costtype: 'PHB012-1', addcost: '25000 USD', ispr: 'Yes', amount: '25000 USD', payment: '14 days', reference: '123000', reference2: 'REF2018', vessel: 'Ameya', imo_no: 'IMO12121'
  },
  {
    tradeid: 'PHS00000007', delivery_no: 'PHS00000007-1', movement_id:'MOV00000007', status: 'Verified', product: 'CAR', delivery: 'Pipeline', pipeline: 'Dropship', 	delivery_date:'27-Oct-2018', counterparty: 'Valero Marketing', strategy: 'Hedging', company:'Demo Composition',quantity:5000,calculated_qty:5000,
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

onSelectionChanged(evt) {
  this.isRowSelected = evt.api.getSelectedRows().length>0?true:false;
}

}
