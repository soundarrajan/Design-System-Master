import { Component, OnInit } from '@angular/core';
import { CreateInvoiceComponent } from 'src/app/shared/dialog-popup/create-invoice/create-invoice.component';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { InvoiceSummaryPopupComponent } from 'src/app/shared/dialog-popup/invoice-summary-popup/invoice-summary-popup.component';
import { InvoiceSummaryNestedComponent } from 'src/app/shared/dialog-popup/invoice-summary-nested/invoice-summary-nested.component';
import { reconciliationPopupComponent } from 'src/app/shared/dialog-popup/reconciliation-pop/reconciliation-popup.component';
import { BulkActualisePopupComponent } from 'src/app/shared/dialog-popup/bulk-actualise-popup/bulk-actualise-popup.component';
import { TechAvailableFiltersComponent } from 'src/app/shared/dialog-popup/tech-available-filters/tech-available-filters.component';

@Component({
  selector: 'app-cost-reconciliation',
  templateUrl: './cost-reconciliation.component.html',
  styleUrls: ['./cost-reconciliation.component.scss']
})
export class CostReconciliationComponent implements OnInit {

  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;
ngOnInit() {
  //alert(this.menuOpen);
}

createInvoice() {
  const dialogRef = this.dialog.open(reconciliationPopupComponent, {
    width: '450px',
    height: '300px',
    panelClass: 'tank-details-popup'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    const dialogRef1 = this.dialog.open(InvoiceSummaryPopupComponent, {
      width: '1397px',
      height: '511px',
      panelClass: 'dialog-popup-tbl'
    });
    
    dialogRef1.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      const dialogRef1 = this.dialog.open(InvoiceSummaryNestedComponent, {
        width: '1365px',
        height: '665px',
        panelClass: 'dialog-popup-tbl'
      });
    });
  });
}

open_bulkactualise(){
  const dialogRef1 = this.dialog.open(BulkActualisePopupComponent, {
    width: '480px',
    height: '210px'
  });
  
  dialogRef1.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

// Available Filters Popup
openAvailableFilter() {
  const dialogRef = this.dialog.open(TechAvailableFiltersComponent, {      
    width: '500px',      
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}


public onScroll:boolean =true;
  
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
    getRowHeight:(params) => {
      return this.isdisplaydensityhigh? 48:25
    },
    headerHeight:this.isdisplaydensityhigh? 60:35,
    groupHeaderHeight:this.isdisplaydensityhigh? 60:35,
    rowSelection: 'multiple',
    rowMultiSelectWithClick:true,
    animateRows:true,
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
      
      var classArray:string[] =[];
        classArray.push('aggrid-evenrow-border-dark');
        let newClass= params.data.invoice==='Yes'?'aggrid-left-ribbon darkgreen':
                        params.data.invoice==='No'?'aggrid-left-ribbon amber':
                        'aggrid-left-ribbon dark';
                        classArray.push(newClass);
        if (params.node.rowIndex % 2 === 0)
          classArray.push('aggrid-evenrow-bg');
        else
          classArray.push('aggrid-oddrow-bg');

          if (params.node.rowIndex % 2 === 0) {
            classArray.push('aggrid-evenrow-bg');
            classArray.push('aggrid-evenrow-border-dark');
        }  
        else{
          classArray.push('aggrid-oddrow-bg');
          classArray.push('aggrid-evenrow-border-dark');
        } 
        return classArray.length>0?classArray:null;
    },
    onColumnResized: function(params) {
      if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
          params.api.sizeColumnsToFit();
      }
    },
    onColumnVisible: function(params) {
      if(params.columnApi.getDisplayedLeftColumns().length>0){
          isColPinned_left=true;
          isColPinned_right = false;
      }     
      else if(params.columnApi.getDisplayedLeftColumns().length==0  && params.columnApi.getDisplayedCenterColumns().length==0 && params.columnApi.getDisplayedRightColumns().length>0){
          isColPinned_right = false;
          isColPinned_left = false;
      }       
      else if(params.columnApi.getDisplayedLeftColumns().length==0 &&  params.columnApi.getDisplayedCenterColumns().length>0){
          isColPinned_right = true;
          isColPinned_left = false;
      }
      else{
          isColPinned_right = false;
          isColPinned_left = false;
      }

      if(params.columnApi.getAllDisplayedColumns().length <= 11)
          params.api.sizeColumnsToFit();
    },
    onColumnPinned: function(params){
      if(params.columnApi.getDisplayedLeftColumns().length>0){
          isColPinned_left=true;
          isColPinned_right = false;
      }     
      else if(params.columnApi.getDisplayedLeftColumns().length==0  && params.columnApi.getDisplayedCenterColumns().length==0 && params.columnApi.getDisplayedRightColumns().length>0){
          isColPinned_right = false;
          isColPinned_left = false;
      }       
      else if(params.columnApi.getDisplayedLeftColumns().length==0 &&  params.columnApi.getDisplayedCenterColumns().length>0){
          isColPinned_right = true;
          isColPinned_left = false;
      }
      else{
          isColPinned_right = false;
          isColPinned_left = false;
      }
    },
    onBodyScroll:($event)=>{
      if($event.direction=="horizontal")
        onScrollTrue();         
    },
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
    checkboxSelection: true,
    headerClass:'header-checkbox-center',
    cellClass:'p-1 aggrid-textoverflow checkbox-center',
    pinned:'left'
  }, 
    {headerName: 'Delivery ID',headerTooltip:'Delivery ID', field: 'deliveryid', cellClass: ['aggridlink'], pinned:'left', width: 120},
    {headerName: 'BoL number', headerTooltip:'BoL number', field: 'bol_no', cellClass: ['aggridlink']},  
    {headerName: 'Counterparty', field: 'counterparty', headerTooltip : 'Counterparty'}, 
    {headerName: 'Product', headerTooltip:'Product', field: 'product', cellClass: ['aggridlink']},
    {headerName: 'Business Line', field: 'delivery', headerClass:[' text-ellipsis'], headerTooltip : 'Business Line',},
    {headerName: 'Type', field: 'pipeline', headerClass:[' text-ellipsis'], headerTooltip : 'Type'},
    {headerName: 'Quantity', field: 'quantity', headerTooltip : 'Quantity', type: "numericColumn"},
    {headerName: 'Date', field: 'delivery_date', cellClass: ['aggridtextalign-center'],headerClass:['aggrid-text-align-c'], 
      headerTooltip : 'Date', cellRendererFramework:AGGridCellRendererComponent, cellRendererParams: {cellClass: ['custom-chip dark']},},
    {headerName: 'CI', field: 'vessel', headerTooltip : 'CI', type: "numericColumn"},
    {headerName: 'Credit Actualised', field: 'imo_no', cellClass: ['product-cell'], headerTooltip : 'Credit Actualized', cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'cell-hover-popup'}},
    {headerName: 'RIN Qty', field: 'reference2', headerTooltip : 'RIN Qty', type: "numericColumn"},
    {headerName: 'RIN Price', field: 'reference2', headerTooltip : 'RIN Price', type: "numericColumn"},
    {headerName: 'LCFS quantity', field: 'reference2', headerTooltip : 'LCFS quantity', type: "numericColumn"},
    {headerName: 'LCFS Price', field: 'reference2', headerTooltip : 'LCFS Price', type: "numericColumn"},
    {headerName: 'CAR quantity', field: 'reference2', headerTooltip : 'CAR quantity', type: "numericColumn"},
    {headerName: 'External Order Number', field: 'reference2', headerTooltip : 'External Order Number', type: "numericColumn"},
    
    {headerName: 'CAR Price', field: 'reference2', headerTooltip : 'CAR Price', type: "numericColumn"},

    {headerName: 'Final Price', field: 'reference2', headerTooltip : 'Final Price', type: "numericColumn"},
    {headerName: 'Provisional Invoice Raised', field: 'invoice', headerTooltip : 'Provisional Invoice raised', type: "numericColumn"},
    {headerName: 'Provisional Price', field: 'amount', headerTooltip : 'Provisional Price', type: "numericColumn"},
    {headerName: 'Transaction Amount', field: 'amount', headerTooltip : 'Transaction Amount', type: "numericColumn"},
    {headerName: 'Invoiced Amount', field: 'addcost', headerTooltip : 'Invoiced Amount', type: "numericColumn"},
    {headerName: 'Uninvoiced Amount', field: 'uninvoiced', headerTooltip : 'Uninvoiced Amount', type: "numericColumn",
        // valueGetter: function aPlusBValueGetter(params) {
        //   typeof(params.data.amount);
        //   return params.data.amount - params.data.addcost;
        // }
    },
    {headerName: 'RIN Actual Date', field: 'delivery_date', headerTooltip : 'RIN Actual date', cellClass: ['aggridtextalign-center'],headerClass:['aggrid-text-align-c'],
        cellRendererFramework:AGGridCellRendererComponent, cellRendererParams: {cellClass: ['custom-chip dark']}},
    {headerName: 'CAR Actual Date', field: 'delivery_date', headerTooltip : 'CAR Actual date', cellClass: ['aggridtextalign-center'],headerClass:['aggrid-text-align-c'],
        cellRendererFramework:AGGridCellRendererComponent, cellRendererParams: {cellClass: ['custom-chip dark']}},
    {headerName: 'LCFS Actual Date', field: 'delivery_date', headerTooltip : 'LCFS Actual date', cellClass: ['aggridtextalign-center'],headerClass:['aggrid-text-align-c'],
        cellRendererFramework:AGGridCellRendererComponent, cellRendererParams: {cellClass: ['custom-chip dark']}},   
  //   { headerName: 'Revert', headerTooltip:'Revert', field: '', 
  //     headerClass:["","aggrid-text-align-c"], 
  //     cellClass:["aggrid-content-center"], cellRendererFramework:AGGridCellDataComponent, cellRendererParams:{type:'unmatch'},
  //     filter: true,
  //     pinned:'right',
  //     enableSorting: true,
  //     suppressMenu:true,
  //     suppressMovable: true,
  //     width:115
  // }
];

private rowData = [
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'No', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'No'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'No', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'No', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'No', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'No'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'No', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'No'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'No', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'No'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'No', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'No', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'No'
},
{
  deliveryid: 'BL036782-1', bol_no: 'BL12356252', status: 'Sell', product: 'Red Carb Diesel', delivery: 'Rack', pipeline: 'Spot', 	delivery_date:'27-Oct-2018', counterparty: 'Shell America', strategy: 'Hedging', company:'Demo Composition',quantity:'8000 BBL',
  invoice: 'Yes', addcost: '100 USD',uninvoiced: '12500 USD', ispr: 'Yes', amount: '12600 USD', payment: '14 days', reference: '123000', reference2: '125 RIN', vessel: '124.5', imo_no: 'Yes'
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

var onScroll=false;
var onscrolltimmer;
var isColPinned_right=true;
var isColPinned_left =true;
function onScrollTrue(){  
  onScroll=true;
  clearInterval(onscrolltimmer);
  onscrolltimmer = setTimeout(function() {
    onScroll=false;
  }, 200);
}
