import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {WarningPopupComponent} from '../../shared/dialog-popup/warning-popup/warning-popup.component';
import {TradePopupComponent} from '../../shared/dialog-popup/trade-popup/trade-popup.component';
import {AvailableColumnsComponent} from '../../shared/dialog-popup/available-columns/available-columns.component';
import {MoreFiltersComponent} from '../../shared/dialog-popup/more-filters/more-filters.component';
import {PipelineFilterComponent} from '../../shared/dialog-popup/pipeline-filter/pipeline-filter.component';
import {TechAvailableFiltersComponent} from '../../shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { GridOptions } from "ag-grid-community";
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AggridLinkComponent } from 'src/app/shared/ag-grid/ag-grid-link.component';
import { BulkUpdatePopupComponent } from 'src/app/shared/dialog-popup/bulk-update-popup/bulk-update-popup.component';


@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss']
})
export class TradeListComponent implements OnInit {
  // @ViewChild('hideshowpanel') HideShowPanel;
   
  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;
  public paginationSize:number = 7;

  ngOnInit() {
    // console.log(this.HideShowPanel);
  }

  openDialog() {
    const dialogRef = this.dialog.open(PipelineFilterComponent, {
      // height: '400px',
      width: '900px',
      position: { left: '15px',top:'110px'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openWarningDialog() {
    const dialogRef = this.dialog.open(WarningPopupComponent, {
      //height: '400px',
      width: '400px',
      position: {top:'110px'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openNewTradeDialog() {
    const dialogRef = this.dialog.open(TradePopupComponent, {
      height: '300px',
      width: '400px',
      //position: {top:'110px'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAvailableComponentDialog() {
    const dialogRef = this.dialog.open(AvailableColumnsComponent, {
      //height: '600px',
      width: '400px',
      position: {right: '15px', top:'200px'}
    });

    dialogRef.afterClosed().subscribe(result => {
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

  openMoreFiltersDialog() {
    const dialogRef = this.dialog.open(MoreFiltersComponent, {
      //height: '600px',
      width: '400px',
      position: {top: '110px'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openBulkUpdate() {
    const dialogRef = this.dialog.open(BulkUpdatePopupComponent, {
      height: '300px',
      width: '500px',
      //position: {top:'110px'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  rows = [
    {
      image: '' ,id: 'PHB012-1', transactiontype: 'Physical', counterparty: 'Aasen Chartering A/S', status: 'Confirmed', strategy: 'Physical', location: 'Tesoro', 'product/instrument': 'DMA GasOil', quantity: '50,000 BBL', price: '$ 0.20', 'p&l': '$ 3,50,000', exposure: '$ 3,50,000'
    },
    {
      image: '' ,id: 'PHB012-1', transactiontype: 'Physical', counterparty: 'Aasen Chartering A/S', status: 'Confirmed', strategy: 'Physical', location: 'Tesoro', 'product/instrument': 'DMA GasOil', quantity: '50,000 BBL', price: '$ 0.20', 'p&l': '$ 3,50,000', exposure: '$ 3,50,000'
    },
    {
      image: '' ,id: 'PHB012-1', transactiontype: 'Physical', counterparty: 'Aasen Chartering A/S', status: 'Confirmed', strategy: 'Physical', location: 'Tesoro', 'product/instrument': 'DMA GasOil', quantity: '50,000 BBL', price: '$ 0.20', 'p&l': '$ 3,50,000', exposure: '$ 3,50,000'
    },
    {
      image: '' ,id: 'PHB012-1', transactiontype: 'Physical', counterparty: 'Aasen Chartering A/S', status: 'Confirmed', strategy: 'Physical', location: 'Tesoro', 'product/instrument': 'DMA GasOil', quantity: '50,000 BBL', price: '$ 0.20', 'p&l': '$ 3,50,000', exposure: '$ 3,50,000'
    }
  ];


 
  // AG GRID
  public gridOptions: GridOptions;
  private paginationPageSize:number;
  public rowCount:Number;
  public onScroll:boolean =true;
  public noRowsTemplate;
  
  get isScrolling() { 
    return onScroll 
  }

  get isPinnedRight() { 
    return isColPinned_right
  }

  get isPinnedLeft() { 
    return isColPinned_left
  }

  constructor(public dialog: MatDialog) { 
    // If we want to overwrite the default text wis is as 'No Rows to Show'
    this.noRowsTemplate =
      `<span>No Rows To Display</span>`;

    this.gridOptions = <GridOptions>{      
      columnDefs: this.columnDefs,
      enableColResize: true,
      enableSorting: true,
      animateRows:true,
      // rowHeight:25,
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 48:25
      },
      headerHeight:this.isdisplaydensityhigh? 60:35,
      groupHeaderHeight:this.isdisplaydensityhigh? 60:35,
      defaultColDef: {
        filter: true,
        enableSorting: true,
        cellClassRules: {
          'aggrid-pinned-shadow': function(params) { return onScroll},
        },
      },
      // pagination: false,
      // paginationPageSize: this.paginationPageSize,     
      rowSelection: 'multiple',
      onGridReady: (params) => {
          this.gridOptions.api = params.api;
          this.gridOptions.columnApi = params.columnApi;
          this.gridOptions.api.sizeColumnsToFit(); 
          this.gridOptions.enableColResize = true;
          this.gridOptions.api.setRowData(this.rowData);  
          this.rowCount = this.gridOptions.api.getDisplayedRowCount();
          if(params.columnApi.getDisplayedLeftColumns().length>0) 
            isColPinned_left = true;
          else if(params.columnApi.getDisplayedLeftColumns().length==0 &&  params.columnApi.getDisplayedRightColumns().length>0)
            isColPinned_right = true;
            
      },
      getRowClass:(params)=> {
        // if(params.node.rowIndex === 1){
        //   return 'aggrid-celldisable';
        // }
        var classArray:string[] =[];
        classArray.push('aggrid-evenrow-border-dark');
        let newClass= params.data.status==='Confirmed'?'aggrid-left-ribbon darkgreen':
                        params.data.status==='Unconfirmed'?'aggrid-left-ribbon amber':
                        params.data.status==='Settled'?'aggrid-left-ribbon lightgreen':
                        'aggrid-left-ribbon dark';
                        classArray.push(newClass);
        // if (params.node.rowIndex % 2 === 0)
        //   classArray.push('aggrid-evenrow-bg');
        // else
        //   classArray.push('aggrid-oddrow-bg');
        return classArray.length>0?classArray:null;
    },
      onBodyScroll:($event)=>{
        if($event.direction=="horizontal")
          onScrollTrue();         
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
      }
    }; 
  }

  private columnDefs = [
    {  
        headerName: "",
        field: "",
        filter: true,
        enableSorting :true,
        suppressMenu:true,
        width:40,
        checkboxSelection:params =>{
          if(params.data.status=='Confirmed' || params.data.status=='Unconfirmed'){
              return true;
          }
          else{
            return false;
          }
        },
        suppressSizeToFit: true,
        resizable: false,
        suppressMovable: true,
        // headerClass:'p-0',
        headerClass:'header-checkbox-center',
        cellClass:'p-1 checkbox-center',
        pinned: 'left'
    },
    {
      headerName:'Trade ID',headerTooltip:'Trade ID',
      field: 'tradeid',
      cellRendererFramework:AggridLinkComponent,
      pinned: 'left',      
      cellClass: function(params) { 
        var classArray:string[] =[]; 
          // let newClass= params.data.status==='Confirmed'?'aggrid-left-ribbon darkgreen':
          //               params.data.status==='Unconfirmed'?'aggrid-left-ribbon amber':
          //               params.data.status==='Settled'?'aggrid-left-ribbon lightgreen':
          //               'aggrid-left-ribbon dark';
          //               classArray.push(newClass);
          return classArray.length>0?classArray:null }    
    },
    {headerName: 'Transaction Type', field: 'transactiontype',headerTooltip:'Transaction Type'},   
    {headerName: 'Counterparty', field: 'counterparty',headerTooltip:'Counterparty'},  
    {headerName: 'Status',headerTooltip:'Status', field: 'status', cellRendererFramework:AGGridCellRendererComponent, headerClass:['aggrid-text-align-c'], cellClass: ['aggridtextalign-center'],
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='Confirmed'?'custom-chip darkgreen':
                      params.value==='Unconfirmed'?'custom-chip amber':
                      params.value==='Settled'?'custom-chip lightgreen':
                      'custom-chip dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} }},
    {headerName: 'Strategy', field: 'strategy',headerTooltip:'Strategy' },
    {headerName: 'Location', field: 'location',headerTooltip:'Location'},
    {headerName: 'Product/Instrument', field: 'product_instrument', cellClass:'aggridlink',headerTooltip:'Product/Instrument'},
    {headerName: 'Quantity', field: 'quantity', type: "numericColumn",headerTooltip:'Quantity' },
    {headerName: 'Price', field:'price', type: "numericColumn",headerTooltip:'Price',
      valueGetter: function(params) { 
        let data:string = params.data.price.slice(1);
        return +data;
      } ,
      valueFormatter : function(params) { 
        return '$ ' + params.value;
      }
  },
    {headerName: 'P&L', field: 'p_and_l', type: "numericColumn",headerTooltip:'P&L' },
    {headerName: 'Exposure', field: 'exposure',  type: "numericColumn",headerTooltip:'Exposure'}
  ];

private rowData = [
  {
    tradeid: 'PHB012-1', transactiontype: 'Physical', status: 'Confirmed', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', 	product_instrument:'DMA GasOil', quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Futures', status: 'Unconfirmed', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil', quantity: '50,000 BBL', price: '$ 01.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'SWS013-1', transactiontype: 'Swaps', status: 'Settled', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil', quantity: '50,000 BBL', price: '$ 5.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'EFB013-2', transactiontype: 'EFP', status: 'Unposted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil', quantity: '50,000 BBL', price: '$ 052.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB017-1', transactiontype: 'Physical', status: 'Confirmed', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'FUS013-1', transactiontype: 'Futures', status: 'Unconfirmed', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'SWB015-2', transactiontype: 'Swaps', status: 'Settled', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'EFB013-1', transactiontype: 'EFP', status: 'Unposted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 15.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Physical', status: 'Delivered', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 10.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Futures', status: 'Posted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 100.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Swaps', status: 'Unposted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'EFB018-3', transactiontype: 'EFP', status: 'Posted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB017-1', transactiontype: 'Physical', status: 'Confirmed', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'FUS013-1', transactiontype: 'Futures', status: 'Unconfirmed', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'SWB015-2', transactiontype: 'Swaps', status: 'Settled', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'EFB013-1', transactiontype: 'EFP', status: 'Unposted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 15.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Physical', status: 'Delivered', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 10.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Futures', status: 'Posted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 100.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'SWB015-2', transactiontype: 'Swaps', status: 'Settled', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'EFB013-1', transactiontype: 'EFP', status: 'Unposted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 15.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Physical', status: 'Delivered', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 10.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Futures', status: 'Posted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 100.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Swaps', status: 'Unposted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'EFB018-3', transactiontype: 'EFP', status: 'Posted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Physical', status: 'Delivered', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 10.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Futures', status: 'Posted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 100.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Swaps', status: 'Unposted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'EFB018-3', transactiontype: 'EFP', status: 'Posted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB017-1', transactiontype: 'Physical', status: 'Confirmed', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'FUS013-1', transactiontype: 'Futures', status: 'Unconfirmed', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'SWB015-2', transactiontype: 'Swaps', status: 'Settled', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'EFB013-1', transactiontype: 'EFP', status: 'Unposted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 15.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Physical', status: 'Delivered', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 10.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Futures', status: 'Posted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 100.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'PHB012-1', transactiontype: 'Swaps', status: 'Unposted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
  },
  {
    tradeid: 'EFB018-3', transactiontype: 'EFP', status: 'Posted', counterparty: 'Shell', strategy: 'Physical', location: 'Houston', product_instrument:'DMA GasOil',  quantity: '50,000 BBL', price: '$ 0.775', p_and_l:'$ 350,000', exposure: '$ 350,000'
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

showNoDataMessage(flag){
  if(flag){
    this.gridOptions.api.setRowData(this.rowData);  
    this.gridOptions.api.hideOverlay();
  }
  else{
    this.gridOptions.api.setRowData([]);  
    this.gridOptions.api.showNoRowsOverlay();
  }
}
}


var onScroll=false;
var onscrolltimmer;
var isColPinned_right=false;
var isColPinned_left =false;
function onScrollTrue(){  
  onScroll=true;
  clearInterval(onscrolltimmer);
  onscrolltimmer = setTimeout(function() {
    onScroll=false;
  }, 200);
}
