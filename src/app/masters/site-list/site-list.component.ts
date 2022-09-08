import { Component, OnInit } from '@angular/core';
import { TechAvailableFiltersComponent } from 'src/app/shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {
  public isdisplaydensityhigh:boolean = false;
  ngOnInit() {
    
  }

 // AG GRID
public gridOptions: GridOptions;
public columnSelection:any;
public rowCount:Number;
constructor(public dialog: MatDialog) {
  this.gridOptions = <GridOptions>{   
    suppressRowTransform:true,   
    columnDefs: this.columnDefs,
    enableColResize: true,
    enableSorting: true,
    animateRows:true,
    filter: true,
    getRowHeight:(params) => {
      return this.isdisplaydensityhigh? 48:25
    },
    headerHeight:this.isdisplaydensityhigh? 60:35,
    groupHeaderHeight:this.isdisplaydensityhigh? 60:35,
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
        if(params.columnApi.getDisplayedLeftColumns().length>0) 
          isColPinned_left = true;
        else if(params.columnApi.getDisplayedLeftColumns().length==0 &&  params.columnApi.getDisplayedRightColumns().length>0)
          isColPinned_right = true;        
    },
    getRowClass:(params)=> {      
      var classArray:string[] =[]; 
      let newClass= params.data.status==='Active'?'aggrid-left-ribbon darkgreen':
                        params.data.status==='Inactive'?'aggrid-left-ribbon grey':
                    'aggrid-left-ribbon grey';
                    classArray.push(newClass);

        if (params.node.rowIndex % 2 === 0) {
          classArray.push('aggrid-evenrow-bg');
          classArray.push('aggrid-evenrow-border-dark');
        }
        else{
          classArray.push('aggrid-oddrow-bg');
          classArray.push('aggrid-evenrow-border-dark');
        }
            
      return classArray.length>0?classArray:null
    },
    onColumnResized: function(params) {
      if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
          params.api.sizeColumnsToFit();
      }
    },
    onColumnVisible: function(params) {
      if(params.columnApi.getAllDisplayedColumns().length <= 10)
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

 public columnDefs = [
  {headerName: 'Site ID', field: 'siteid',headerTooltip:'Site ID',pinned: 'left',
  cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'active-deactive'}, 
    cellClass: function(params) { 
    var classArray:string[] =[]; 
      classArray.push('aggridtextalign-center');
      classArray.push('aggridlink');
      classArray.push('aggridlink-dropdown');
      //classArray.push('product-cell');
      // let newClass= params.data.status==='Active'?'aggrid-left-ribbon darkgreen':
      //                   params.data.status==='Inactive'?'aggrid-left-ribbon grey':
      // let newClass= params.data.status==='Active'?'aggrid-left-ribbon-green':
      //               params.data.status==='Inactive'?'aggrid-left-ribbon-greyblue':
                    // 'aggrid-left-ribbon grey';
                    // classArray.push(newClass);
      return classArray;},
      // cellClass: ['aggrid-left-ribbon-green', 'aggridtextalign-center'], 
  headerClass:['','aggrid-text-align-c'], width:150}, 
  {headerName: 'Site Name', field: 'sitename', headerTooltip:'Site Name', cellClass: [''], headerClass:[''], width:150},
  {headerName: 'Counterparty', field: 'counterparty', headerTooltip:'Counterparty',  cellClass: [''], headerClass:[''], width:200},
  {headerName: 'Site Type', field: 'sitetype', headerTooltip:'Site Type',  cellClass: [''], headerClass:[''], width:150},
  {headerName: 'Address Line', field: 'addressline', headerTooltip:'Address Line', cellClass: [''], headerClass:[''], width:170},
  {headerName: 'Billing Address', field: 'billingaddress', headerTooltip:'Billing Address', cellClass: [''], headerClass:[''], width:180},
  {headerName: 'Created By', field: 'createby', headerTooltip:'Created By',  cellClass: ['aggridtextalign-center'], headerClass:['','aggrid-text-align-c'], width:150, cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: ['creator-bg bg-green']}},
  {headerName: 'Created On', field: 'createdon', headerTooltip:'Created On', cellClass: ['aggridtextalign-center'], headerClass:['','aggrid-text-align-c'], width:150, cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: ['custom-chip dark']}},
  {headerName: 'Updated By', field: 'updateby', headerTooltip:'Updated By',  cellClass: ['aggridtextalign-center'], headerClass:['','aggrid-text-align-c'], width:150, cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: ['creator-bg bg-green']}},
  {headerName: 'Updated On', field: 'updateon', headerTooltip:'Updated On',  cellClass: ['aggridtextalign-center'], headerClass:['','aggrid-text-align-c'], width:150, cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: ['custom-chip dark']}},
  {headerName: 'Status', field: 'status',headerTooltip:'Status',  
  // cellClass: ['aggridtextalign-center'], 
  cellRendererParams: function(params) { 
    var classArray:string[] =[]; 
      classArray.push('aggridtextalign-center');
      let newClass= params.value==='Active'?'custom-chip darkgreen':
                    params.value==='Inactive'?'custom-chip grey':
                    'custom-chip dark';
                    classArray.push(newClass);
      return {cellClass: classArray.length>0?classArray:null} },
      cellRendererFramework:AGGridCellRendererComponent, cellClass: ['aggridtextalign-center'], headerClass:['','aggrid-text-align-c']}
];

// text-center custom-chip dark mat-chip mat-primary mat-standard-chip
private rowData = [
  {
    image: '', siteid: '001', sitename: 'Valero', counterparty: 'Aasen Chartering A/S', sitetype: 'Site To, Bill To', contractname: 'Contract ABC', addressline: 'Houston, Texas', billingaddress: 'Houston, Texas', createby: 'CR', createdon: '27-Apr-2018', updateby: 'CK', updateon: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
  },
  {
    image: '', siteid: '002', sitename: 'Valero', counterparty: 'Aasen Chartering A/S', sitetype: 'Site To, Bill To', contractname: 'Contract ABC', addressline: 'Houston, Texas', billingaddress: 'Houston, Texas', createby: 'CR', createdon: '27-Apr-2018', updateby: 'CK', updateon: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
  },
  {
    image: '', siteid: '003', sitename: 'Valero', counterparty: 'Aasen Chartering A/S', sitetype: 'Ship To', contractname: 'Contract ABC', addressline: 'Houston, Texas', billingaddress: 'Houston, Texas', createby: 'CR', createdon: '27-Apr-2018', updateby: 'CK', updateon: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
  },
  {
    image: '', siteid: '004', sitename: 'Valero', counterparty: 'Aasen Chartering A/S', sitetype: 'Bill To', contractname: 'Contract ABC', addressline: 'Houston, Texas', billingaddress: 'Houston, Texas', createby: 'CR', createdon: '27-Apr-2018', updateby: 'CK', updateon: '27-Apr-2019',validto:'27-Apr-2019',status:'Inactive'
  },
  {
    image: '', siteid: '005', sitename: 'Valero', counterparty: 'Aasen Chartering A/S', sitetype: 'Ship To', contractname: 'Contract ABC', addressline: 'Houston, Texas', billingaddress: 'Houston, Texas', createby: 'CR', createdon: '27-Apr-2018', updateby: 'CK', updateon: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
  },
  {
    image: '', siteid: '006', sitename: 'Valero', counterparty: 'Aasen Chartering A/S', sitetype: 'Bill To', contractname: 'Contract ABC', addressline: 'Houston, Texas', billingaddress: 'Houston, Texas', createby: 'CR', createdon: '27-Apr-2018', updateby: 'CK', updateon: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
  }
];

openAvailableFilter() {
  const dialogRef = this.dialog.open(TechAvailableFiltersComponent, {      
    width: '500px',      
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}


get isPinnedRight() { 
  return isColPinned_right
}

get isPinnedLeft() { 
  return isColPinned_left
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

}
var isColPinned_right=false;
var isColPinned_left =true;