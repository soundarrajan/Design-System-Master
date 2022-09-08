import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateInvoiceComponent } from 'src/app/shared/dialog-popup/create-invoice/create-invoice.component';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-exchange-swaps',
  templateUrl: './exchange-swaps.component.html',
  styleUrls: ['./exchange-swaps.component.css']
})
export class ExchangeSwapsComponent implements OnInit {

  public isdisplaydensityhigh:boolean = false;
  public disableBtn11:boolean = true;
  public isCollapsed:boolean = false;
  public isChecked:boolean = false;
  popupOpen: boolean;
  @Output() enableExchangeSettle = new EventEmitter();
  @Input() collapseTab: boolean;

ngOnInit() {
  //alert(this.menuOpen);
  //this.disableBtn = true;
}

  onRowSelected(event) {
    if (this.gridOptions.api.getSelectedRows().length > 0) {
      this.isChecked = true;
    }
    else {
      this.isChecked = false;
    }
    this.enableExchangeSettle.emit(this.isChecked);
    // if(event.node.selected){
    //   this.isChecked = true;
    //   this.enableExchangeSettle.emit(this.isChecked);
    // }else{
    //   this.isChecked = false;
    //   this.enableExchangeSettle.emit(this.isChecked);
    // }
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
constructor(public dialog: MatDialog,private toastr: ToastrService,) { 
  this.gridOptions = <GridOptions>{      
    columnDefs: this.columnDefs,
    enableColResize: true,
    enableSorting: true,
    filter: true,
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
        this.gridOptions.enableColResize = true;
        this.gridOptions.api.setRowData(this.rowData);        
        this.rowCount = this.gridOptions.api.getDisplayedRowCount();  
    },
    getRowClass:(params)=> {     
      
      var classArray:string[] =[];
        classArray.push('aggrid-evenrow-border-dark');
        let newClass= params.data.severity==='High'?'aggrid-left-ribbon darkred':
                        params.data.severity==='Low'?'aggrid-left-ribbon amber':
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
public refreshGrid(){
  this.gridOptions.api.deselectAll();
}
private columnDefs = [
  {
    headerName: "",
    filter: true,
    enableSorting :true,
    headerCheckboxSelection: true,
    resizable: true,
    width:32,
    suppressMenu:true,
    checkboxSelection: true,
    cellClass:'p-1 aggrid-textoverflow checkbox-center',
    headerClass:'header-checkbox-center',
    pinned:'left'
  }, 
    {headerName: 'Trade ID',pinned:'left', field: 'trade_id',   
      cellClass: ['aggridlink'], 
      headerClass: ['p-l-0'],
      width: 120},      
    {headerName: 'Trade Date', headerTooltip:'Trade Date', field: 'trade_date', width: '185', cellClass: ['aggridtextalign-center'], headerClass: ['p-l-0'], cellRendererFramework:AGGridCellRendererComponent,
    cellRendererParams: function(params) { 
      return { cellClass: 'custom-chip dark'}
    }},  
    {headerName: 'Exchange', field: 'exchange', headerTooltip : 'Exchange', width: 120, cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']}, 
    {headerName: 'Clearing Broker', headerTooltip:'Clearing Broker', field: 'broker', width: 130, cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    {headerName: 'Product',headerTooltip:'Product', width: 100, field: 'product',cellClass: ['aggridtextalign-left'], headerClass:['p-l-0'] },
    {headerName: 'Quantity', field: 'quantity', headerTooltip : 'Quantity', width: 100, cellClass: ['aggridtextalign-right'], headerClass:['p-l-0']},
    {headerName: 'Quant', field: 'quant', headerTooltip : 'Quant', width: 70, cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    {headerName: 'Pricing Date From', field: 'from_date', width: 185, headerTooltip: 'Pricing Date From',cellClass: ['aggridtextalign-center'], cellRendererFramework:AGGridCellRendererComponent,
    cellRendererParams: function(params) { 
      return { cellClass: 'custom-chip dark'}
    }},
    {headerName: 'Pricing Date To', field: 'to_date', width: 185, headerTooltip: 'Pricing Date To',cellClass: ['aggridtextalign-center'], cellRendererFramework:AGGridCellRendererComponent,
    cellRendererParams: function(params) { 
      return { cellClass: 'custom-chip dark'}
    }},
    {headerName: 'Book', field: 'book', headerTooltip: 'CI', cellClass: ['aggridtextalign-left'], width:100, headerClass:['p-l-0']},
    {headerName: 'Stratergy', field: 'stratergy', width: 120, headerTooltip: 'Blend Ref No.',cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    {headerName: 'Buy Leg Price/', field: 'buy_leg_price', width: 100, headerTooltip: 'Volume Qty', cellClass: ['aggridtextalign-right'], headerClass:['p-l-0']  },
    {headerName: 'Buy Leg', field: 'buy_leg', width: 70, headerTooltip: 'Volume Unit', cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    {headerName: 'Sell Leg Price', field: 'sell_leg_price', width: 100, headerTooltip: 'Gross Qty',cellClass: ['product-cell aggridtextalign-right'], headerClass:['p-l-0']},
    {headerName: 'Sell leg', field: 'sell_leg', width: 70, headerTooltip: 'Volume Unit', cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    {headerName: 'P&L 1', field: 'pl_1', width: 100, headerTooltip: 'Source Doc', cellClass: ['aggridtextalign-right'], headerClass:['p-l-0']},
    {headerName: 'P&L 2', field: 'pl_2', width: 70, headerTooltip: 'Reference No.', cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    {headerName: 'Total Fee1', field: 'total_fee1', width: 100, headerTooltip: 'Total fee1',cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    {headerName: 'Total Fee2', field: 'total_fee2', width: 70, headerTooltip: 'Total fee2',cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    ];

private rowData = [
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'NYSE', broker: 'NYSE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Book1', stratergy: 'Stratergy-1', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'ICE', broker: 'ICE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Testbook', stratergy: 'Test Stratergy', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'London Stock', broker: 'London Stock', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Book1', stratergy: 'Stratergy-1', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'NYSE', broker: 'NYSE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Testbook', stratergy: 'Test Stratergy', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'NYSE', broker: 'NYSE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Book1', stratergy: 'Stratergy-1', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'ICE', broker: 'ICE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Testbook', stratergy: 'Test Stratergy', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'London Stock', broker: 'London Stock', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Book1', stratergy: 'Stratergy-1', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'NYSE', broker: 'NYSE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Testbook', stratergy: 'Test Stratergy', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'NYSE', broker: 'NYSE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Book1', stratergy: 'Stratergy-1', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'ICE', broker: 'ICE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Testbook', stratergy: 'Test Stratergy', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'London Stock', broker: 'London Stock', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Book1', stratergy: 'Stratergy-1', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'NYSE', broker: 'NYSE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Testbook', stratergy: 'Test Stratergy', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'NYSE', broker: 'NYSE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Book1', stratergy: 'Stratergy-1', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'ICE', broker: 'ICE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Testbook', stratergy: 'Test Stratergy', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'London Stock', broker: 'London Stock', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Book1', stratergy: 'Stratergy-1', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'NYSE', broker: 'NYSE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Testbook', stratergy: 'Test Stratergy', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'NYSE', broker: 'NYSE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Book1', stratergy: 'Stratergy-1', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'ICE', broker: 'ICE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Testbook', stratergy: 'Test Stratergy', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'London Stock', broker: 'London Stock', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Book1', stratergy: 'Stratergy-1', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', exchange: 'NYSE', broker: 'NYSE', product: 'Gasoline', quantity: '2500.00', quant: 'MT', from_date: '29-Jan-2020', to_date: '29-Jan-2020',
      book: 'Testbook', stratergy: 'Test Stratergy', buy_leg_price: '2500.00', buy_leg: 'USD', sell_leg_price: '2500.00', sell_leg: 'USD', pl_1: '2500.00', pl_2: 'USD', total_fee1: '2500.00', total_fee2: 'USD'
    },
];

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