import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import {WarningPopupComponent} from '../../shared/dialog-popup/warning-popup/warning-popup.component';
//import {TradePopupComponent} from '../../shared/dialog-popup/trade-popup/trade-popup.component';
//import {AvailableColumnsComponent} from '../../shared/dialog-popup/available-columns/available-columns.component';
//import {MoreFiltersComponent} from '../../shared/dialog-popup/more-filters/more-filters.component';
//import {PipelineFilterComponent} from '../../shared/dialog-popup/pipeline-filter/pipeline-filter.component';
import {TechAvailableFiltersComponent} from '../../shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { GridOptions } from "ag-grid-community";
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AggridLinkComponent } from 'src/app/shared/ag-grid/ag-grid-link.component';

@Component({
  selector: 'app-bl-list',
  templateUrl: './bl-list.component.html',
  styleUrls: ['./bl-list.component.scss']
})
export class BlListComponent implements OnInit {

  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;
  ngOnInit() {
    // console.log(this.HideShowPanel);
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

  // AG GRID
  public gridOptions: GridOptions;
  private paginationPageSize:number;
  public rowCount:Number;
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

  constructor(public dialog: MatDialog) { 
    this.gridOptions = <GridOptions>{      
      columnDefs: this.columnDefs,
      enableColResize: true,
      enableSorting: true,
      animateRows:true,
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
      rowSelection: 'single',
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
        
        var classArray:string[] =[];
        classArray.push('aggrid-evenrow-border-dark');
        let newClass= params.data.status==='Confirmed'?'aggrid-left-ribbon darkgreen':
                        params.data.status==='BL Broken'?'aggrid-left-ribbon amber':
                        params.data.status==='Deleted'?'aggrid-left-ribbon mediumred':
                        params.data.status==='Master Validation Pending'?'aggrid-left-ribbon skyblue':
                        params.data.status==='Movement Verified'?'aggrid-left-ribbon lightgreen':
                        params.data.status==='Manually Unmatched'?'aggrid-left-ribbon darkblue':
                        params.data.status==='BL Reversed'?'aggrid-left-ribbon peach':
                        'aggrid-left-ribbon dark';
                        classArray.push(newClass);
        
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
      headerName:'B/L Number',headerTooltip:'B/L Number',
      field: 'blnumber',
      
      pinned: 'left',      
      
      cellClass:'aggridlink'    
    },
    {headerName: 'FileName', field: 'filename'},   
    {headerName: 'Source', field: 'source'},  
    {headerName: 'Release Number', field: 'releasenumber'},
    {headerName: 'Type', field: 'type'},
    {headerName: 'Uploaded Date', headerTooltip:'Uploaded Date', field: 'uploadeddate', cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: ['custom-chip dark aggrid-space']}, cellClass: ['aggridtextalign-center']},
    {headerName: 'Status', field: 'status', cellRendererFramework:AGGridCellRendererComponent, headerClass:['aggrid-text-align-c'], cellClass: ['aggridtextalign-center'],
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='Confirmed'?'custom-chip darkgreen':
                      params.value==='BL Broken'?'custom-chip amber':
                      params.value==='Deleted'?'custom-chip red':
                      params.value==='Master Validation Pending'?'custom-chip skyblue':
                      params.value==='Movement Verified'?'custom-chip lightgreen':
                      params.value==='Manually Unmatched'?'custom-chip darkblue':
                      params.value==='BL Reversed'?'custom-chip peach':
                      'custom-chip dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} }},
    {headerName: 'Error', field: 'error' },
    {headerName: 'Delivery ID', field: 'deliveryid', cellClass:'aggridlink'},
    {headerName: 'Counter Party', field: 'counterparty', },
    {headerName: 'Site', field: 'site', },
    {headerName:'Delivery Product', field:'deliverypro', cellClass:'aggridlink'},
    {headerName:'Gross QTY',field:'grossqty',type: "numericColumn", },
    {headerName: 'Net Qty', field:'netqty', type: "numericColumn",
      
  },
    
  ];

private rowData = [
  {
    blnumber: 'BL036782', filename: 'BLExcel673', status: 'Confirmed', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Excel', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract',  deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Not applicable' ,
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55', status: 'BL Broken',counterparty: 'Tesoro', source:'excel' , releasenumber: '72804836672' , uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Counterparty details not matched. Ref'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673', status: 'Deleted', counterparty: 'Tesoro', releasenumber: '72804836672' , source:'Excel', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55', status: 'Master Validation Pending', counterparty: 'Tesoro', releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673',  status: 'Movement Verified', counterparty: 'Tesoro', releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55',  status: 'Manually Unmatched', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Excel', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673',  status: 'BL Reversed', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55', status: 'Confirmed', counterparty: 'Tesoro', releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000' , error:'Counterparty details not matched. Ref'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673',  status: 'Confirmed', counterparty: 'Tesoro',   releasenumber: '72804836672' , source:'Excel', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55',  status: 'Deleted', counterparty: 'Tesoro', releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673', status: 'Confirmed', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Excel', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55',  status: 'Deleted', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Excel', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'PHB017-1', filename: 'BLExcel673',  status: 'BL Broken', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55',  status: 'BL Broken', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673',  status: 'Confirmed', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Excel', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55', status: 'Confirmed', counterparty: 'Tesoro', releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673',  status: 'Confirmed', counterparty: 'Tesoro', releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55',  status: 'Deleted', counterparty: 'Tesoro', releasenumber: '72804836672' , source:'Excel', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673',  status: 'Confirmed', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55', status: 'Confirmed', counterparty: 'Tesoro', releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673',  status: 'Confirmed', counterparty: 'Tesoro', releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55',  status: 'Deleted', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Excel', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673', status: 'Confirmed', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55',  status: 'Deleted', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673',  status: 'Confirmed', counterparty: 'Tesoro',   releasenumber: '72804836672' , source:'Excel', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55',  status: 'Deleted', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673', status: 'Confirmed', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55',  status: 'Deleted', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Excel', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673',  status: 'BL Broken', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55',  status: 'BL Broken', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673',  status: 'Confirmed', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Excel', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55', status: 'Confirmed', counterparty: 'Tesoro', releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673',  status: 'Confirmed', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55',  status: 'Deleted', counterparty: 'Tesoro',   releasenumber: '72804836672' , source:'Excel', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error: 'Counterparty details not matched.'
  },
  {
    blnumber: 'BL036782', filename: 'BLExcel673', status: 'Confirmed', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Avocet', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
  },
  {
    blnumber: 'BL036782', filename: 'BLTerminal55',  status: 'Deleted', counterparty: 'Tesoro',  releasenumber: '72804836672' , source:'Excel', uploadeddate:'12/04/2019', deliveryid: 'PHS0012334-1', site: 'No. 134, street', type: ' Contract', deliverypro: 'DMA GasOil', grossqty :'3,50,000', netqty:'3,50,000', error:'Not applicable'
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
var isColPinned_right=false;
var isColPinned_left =false;
function onScrollTrue(){  
  onScroll=true;
  clearInterval(onscrolltimmer);
  onscrolltimmer = setTimeout(function() {
    onScroll=false;
  }, 200);
}

  