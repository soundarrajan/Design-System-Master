import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateInvoiceComponent } from 'src/app/shared/dialog-popup/create-invoice/create-invoice.component';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-otc-swaps',
  templateUrl: './otc-swaps.component.html',
  styleUrls: ['./otc-swaps.component.css']
})
export class OtcSwapsComponent implements OnInit {

  public isdisplaydensityhigh:boolean = false;
  public disableBtn11:boolean = true;
  public isCollapsed:boolean = false;
  public isChecked:boolean = false;
  @Output() enableOTCSettle = new EventEmitter();
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
    this.enableOTCSettle.emit(this.isChecked);
    // if(event.node.selected){
    //     this.isChecked = true;
    //     this.enableOTCSettle.emit(this.isChecked);
    // }else{
    //     this.isChecked = false;
    //     this.enableOTCSettle.emit(this.isChecked);
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
    width:10,
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
    {headerName: 'Counterparty', field: 'counterparty', headerTooltip : 'Counterparty', width: 120, cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']}, 
    {headerName: 'Product/Cost', headerTooltip:'Product/Cost', field: 'product_cost', width: 130, cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    {headerName: 'Quantity',headerTooltip:'Quantity', width: 100, field: 'quantity',cellClass: ['aggridtextalign-right'], headerClass:['p-l-0'] },
    {headerName: 'Quant', field: 'quant', headerTooltip : 'Quant', width: 70, cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    {headerName: 'Pricing Date From', field: 'from_date', width: 185, headerTooltip: 'Pricing Date From',cellClass: ['aggridtextalign-center'], cellRendererFramework:AGGridCellRendererComponent,
    cellRendererParams: function(params) { 
      return { cellClass: 'custom-chip dark'}
    }},
    {headerName: 'Pricing Date To', field: 'to_date', width: 185, headerTooltip: 'Pricing Date To',cellClass: ['aggridtextalign-center'], cellRendererFramework:AGGridCellRendererComponent,
    cellRendererParams: function(params) { 
      return { cellClass: 'custom-chip dark'}
    }},
    {headerName: 'Buy Price/Cost', field: 'buy_price_cost', width: 100, headerTooltip: 'Buy Price/Cost', cellClass: ['aggridtextalign-right'], headerClass:['p-l-0']  },
    {headerName: 'Buy Price Currency', field: 'buy_price_currency', width: 70, headerTooltip: 'Buy Price Currency', cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    {headerName: 'Sell Price/Revenue', field: 'sell_price_revenue', width: 100, headerTooltip: 'Sell Price/Revenue',cellClass: ['product-cell aggridtextalign-right'], headerClass:['p-l-0']},
    {headerName: 'Sell Price Currency', field: 'sell_price_currency', width: 70, headerTooltip: 'Sell Price Currency', cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    {headerName: 'P&L', field: 'pl', width: 100, headerTooltip: 'P&L', cellClass: ['aggridtextalign-right'], headerClass:['p-l-0']},
    {headerName: 'P&L Currency', field: 'pl_currency', width: 70, headerTooltip: 'P&L Currency', cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    {headerName: 'Book', field: 'book', headerTooltip: 'CI', cellClass: ['aggridtextalign-left'], width:100, headerClass:['p-l-0']},
    {headerName: 'Stratergy', field: 'stratergy', width: 120, headerTooltip: 'Blend Ref No.',cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    {headerName: 'Cost Type', field: 'cost_type', width: 120, headerTooltip: 'Trade No.',cellClass: ['aggridtextalign-left'], headerClass:['p-l-0']},
    ];

private rowData = [
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell USA', product_cost: 'Gasoline', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell', product_cost: 'Local Charges', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell USA', product_cost: 'Barge Cost', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell', product_cost: 'Biodiesel', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell USA', product_cost: 'Discounts Allowed', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell USA', product_cost: 'Gasoline', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell', product_cost: 'Local Charges', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell USA', product_cost: 'Barge Cost', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell', product_cost: 'Biodiesel', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell USA', product_cost: 'Discounts Allowed', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell USA', product_cost: 'Gasoline', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell', product_cost: 'Local Charges', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell USA', product_cost: 'Barge Cost', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell', product_cost: 'Biodiesel', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell USA', product_cost: 'Discounts Allowed', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell USA', product_cost: 'Gasoline', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell', product_cost: 'Local Charges', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell USA', product_cost: 'Barge Cost', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell', product_cost: 'Biodiesel', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell USA', product_cost: 'Discounts Allowed', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell USA', product_cost: 'Barge Cost', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    },
    {
      trade_id: 'SB200350', trade_date: '29-Jan-2020', counterparty: 'Shell', product_cost: 'Biodiesel', quantity: '2500.00', quant: 'MT',
      from_date: '29-Jan-2020', to_date: '29-Jan-2020', buy_price_cost: '2500.00', buy_price_currency: 'USD', sell_price_revenue: '2500.00', sell_price_currency: 'USD', pl: '2500.00', pl_currency: 'USD',
      book: 'Swap Book', stratergy: 'Swap Stratergy', cost_type: 'NA'
    }
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