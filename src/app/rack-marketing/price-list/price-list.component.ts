import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { AggridLinkComponent } from 'src/app/shared/ag-grid/ag-grid-link.component';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { TechAvailableFiltersComponent } from 'src/app/shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {
  show= false;
  searchValue:string = '';
  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;
  public rowCount:Number;

  @Output() createNewEvent = new EventEmitter();
  ngOnInit() {
    this. show = false;
    //this.show = false;
    //this.datePicker(title);
  }

  rows = [
    {
      id: '001', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018  11:34', validityto: '27-Apr-2018  11:34', status: 'Published', createdby: 'GG', createdon: '27-Apr-2018  11:34', updatedby: 'GG', updatedon: '27-Apr-2018  11:34'
    },
    {
      id: '002', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018  11:34', validityto: '27-Apr-2018  11:34', status: 'Published', createdby: 'GG', createdon: '27-Apr-2018  11:34', updatedby: 'GG', updatedon: '27-Apr-2018  11:34'
    },
    {
      id: '003', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018  11:34', validityto: '27-Apr-2018  11:34', status: 'Published', createdby: 'GG', createdon: '27-Apr-2018  11:34', updatedby: 'GG', updatedon: '27-Apr-2018  11:34'
    },
    {
      id: '004', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018  11:34', validityto: '27-Apr-2018  11:34', status: 'Published', createdby: 'GG', createdon: '27-Apr-2018  11:34', updatedby: 'GG', updatedon: '27-Apr-2018  11:34'
    }
    
  ];

  get isPinnedRight() { 
    return isColPinned_right
  }

  get isPinnedLeft() { 
    return isColPinned_left
  }

  // rows = [
  //   { 'Price ID': '001', gender: 'Male', company: 'Swimlane',company1: 'Swimlane' }
  //   // { name: 'Dany', gender: 'Male', company: 'KFC' },
  //   // { name: 'Molly', gender: 'Female', company: 'Burger King' },
  // ];
  // columns = [
  //   { prop: 'Price ID' },
  //   { name: 'Gender' },
  //   { name: 'Company' },
  //   { name: 'Company' }
  // ];


  //AG GRID CONFICS

  public gridOptions: GridOptions;
  public columnSelection:any;
  private paginationPageSize:number; 

  constructor(public dialog: MatDialog,iconRegistry: MatIconRegistry,sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'data-picker',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/customicons/datepicker.svg'));

    this.gridOptions = <GridOptions>{   
      suppressRowTransform:true,   
      columnDefs: this.columnDefs,
      enableColResize: true,
      enableSorting: true,
      filter: true,
      animateRows:true,
      // pagination: true,
      // paginationPageSize: this.paginationPageSize,
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 48:25
      },
      headerHeight:this.isdisplaydensityhigh? 60:35,
      groupHeaderHeight:this.isdisplaydensityhigh? 60:35,
      defaultColDef: {
        filter: true,
        enableSorting: true,
    },
      onColumnMoved: function(params) {
        console.log(params.columnApi.getColumnState());
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
        let newClass= params.data.status==='Published'?'aggrid-left-ribbon darkgreen':
                      params.data.status==='Dismissed'?'aggrid-left-ribbon mediumred':
                      params.data.status==='Saved'?'aggrid-left-ribbon lightgreen':
                      params.data.status==='Confirmed'?'aggrid-left-ribbon teal':
                      'aggrid-left-ribbon-red';
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
    onColumnVisible: function(params) {
      if(params.columnApi.getAllDisplayedColumns().length <= 10)
        params.api.sizeColumnsToFit();
    }
    };
   }

  public columnDefs = [
    {headerName: 'Price ID',headerTooltip:'Price ID', field: 'id',  cellRendererFramework:AggridLinkComponent, hide: false,  cellStyle: {textAlign: "left"},
      pinned: 'left', suppressSizeToFit: true,
      cellClass: function(params) { 
        // var classArray:string[] =[]; 
        //   // classArray.push('aggridtextalign-center');
        //   let newClass= params.data.status==='Published'?'aggrid-left-ribbon darkgreen':
        //                 params.data.status==='Dismissed'?'aggrid-left-ribbon mediumred':
        //                 params.data.status==='Saved'?'aggrid-left-ribbon lightgreen':
        //                 params.data.status==='Confirmed'?'aggrid-left-ribbon teal':
        //                 'aggrid-left-ribbon-red';
        //                 classArray.push(newClass);
        //   return classArray.length>0?classArray:null
         }
    },
    {headerName: 'Location', headerTooltip:'Location', field: 'location'},
    {headerName: 'Terminal', field: 'terminal', headerTooltip:'Terminal'},
    {headerName: 'Validity from', headerTooltip:'Validity from', field: 'validityfrom', cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: ['custom-chip dark aggrid-space']}, headerClass:['aggrid-text-align-c'], cellClass: ['aggridtextalign-center']},
    {headerName: 'Validity To', headerTooltip:'Validity To', field: 'validityto', cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: 'custom-chip dark aggrid-space'}, headerClass:['aggrid-text-align-c'],cellClass: ['aggridtextalign-center']},
    {headerName: 'Status', headerTooltip:'Status', field: 'status', cellRendererFramework:AGGridCellRendererComponent, headerClass:['aggrid-text-align-c'], cellClass: ['aggridtextalign-center'],
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='Published'?'custom-chip darkgreen':
                      params.value==='Dismissed'?'custom-chip mediumred':
                      params.value==='Saved'?'custom-chip lightgreen':
                      params.value==='Confirmed'?'custom-chip teal':
                      'custom-chip dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} }},
    {headerName: 'Created By', headerTooltip:'Created By', field: 'createdby', cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: 'creator-bg bg-light-blue'} , headerClass:['aggrid-text-align-c'], cellClass: ['aggridtextalign-center']},
    {headerName: 'Created On', headerTooltip:'Created On', field: 'createdon', cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: 'custom-chip dark aggrid-space'}, headerClass:['aggrid-text-align-c'], cellClass:['aggridtextalign-center']},
    {headerName: 'Updated By', headerTooltip:'Updated By', field: 'createdby', cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: 'creator-bg bg-light-blue'}, headerClass:['aggrid-text-align-c'], cellClass: ['aggridtextalign-center']},
    {headerName: 'Updated On', headerTooltip:'Updated On', field: 'createdon', cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: 'custom-chip dark aggrid-space'}, headerClass:['aggrid-text-align-c'], cellClass: ['aggridtextalign-center']}
];


private rowData = [
  {
    id: '001', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018   11:34', validityto: '27-Apr-2018   11:34', status: 'Published', createdby: 'CL', createdby_name:'Cyril Lagarde', createdon: '27-Apr-2018 11:34', updatedby: 'YH', updatedby_name:'Yusuf Hassan', updatedon: '27-Apr-2018   11:34'
  },
  {
    id: '002', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018   11:34', validityto: '27-Apr-2018   11:34', status: 'Dismissed', createdby: 'YH', createdby_name:'Yusuf Hassan', createdon: '27-Apr-2018  11:34', updatedby: 'CL', updatedby_name:'Cyril Lagarde', updatedon: '27-Apr-2018   11:34'
  },
  {
    id: '003', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018   11:34', validityto: '27-Apr-2018   11:34', status: 'Saved', createdby: 'PK', createdby_name:'Praveen Kumar', createdon: '27-Apr-2018  11:34', updatedby: 'PK', updatedby_name:'Praveen Kumar', updatedon: '27-Apr-2018   11:34'
  },
  {
    id: '004', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018   11:34', validityto: '27-Apr-2018   11:34', status: 'Dismissed', createdby: 'AJ', createdby_name:'Alexander James', createdon: '27-Apr-2018  11:34', updatedby: 'AJ', updatedby_name:'Alexander James', updatedon: '27-Apr-2018   11:34'
  },
  {
    id: '005', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018   11:34', validityto: '27-Apr-2018   11:34', status: 'Confirmed', createdby: 'GS', createdby_name:'Gokul Simson',  createdon: '27-Apr-2018  11:34', updatedby: 'GS', updatedby_name:'Gokul Simson', updatedon: '27-Apr-2018   11:34'
  },
  {
    id: '006', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018   11:34', validityto: '27-Apr-2018   11:34', status: 'Saved', createdby: 'KM', createdby_name:'Kevin Miranda',  createdon: '27-Apr-2018  11:34', updatedby: 'KM', updatedby_name:'Kevin Miranda', updatedon: '27-Apr-2018   11:34'
  },
  {
    id: '007', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018   11:34', validityto: '27-Apr-2018   11:34', status: 'Dismissed', createdby: 'SR', createdby_name:'Soundar Rajan',  createdon: '27-Apr-2018  11:34', updatedby: 'SR', updatedby_name:'Soundar Rajan', updatedon: '27-Apr-2018   11:34'
  }
  ,
  {
    id: '001', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018   11:34', validityto: '27-Apr-2018   11:34', status: 'Confirmed', createdby: 'CL', createdby_name:'Cyril Lagarde', createdon: '27-Apr-2018 11:34', updatedby: 'YH', updatedby_name:'Yusuf Hassan', updatedon: '27-Apr-2018   11:34'
  },
  {
    id: '002', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018   11:34', validityto: '27-Apr-2018   11:34', status: 'Dismissed', createdby: 'YH', createdby_name:'Yusuf Hassan', createdon: '27-Apr-2018  11:34', updatedby: 'CL', updatedby_name:'Cyril Lagarde', updatedon: '27-Apr-2018   11:34'
  },
  {
    id: '003', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018   11:34', validityto: '27-Apr-2018   11:34', status: 'Dismissed', createdby: 'PK', createdby_name:'Praveen Kumar', createdon: '27-Apr-2018  11:34', updatedby: 'PK', updatedby_name:'Praveen Kumar', updatedon: '27-Apr-2018   11:34'
  },
  {
    id: '004', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018   11:34', validityto: '27-Apr-2018   11:34', status: 'Confirmed', createdby: 'AJ', createdby_name:'Alexander James', createdon: '27-Apr-2018  11:34', updatedby: 'AJ', updatedby_name:'Alexander James', updatedon: '27-Apr-2018   11:34'
  },
  {
    id: '005', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018   11:34', validityto: '27-Apr-2018   11:34', status: 'Published', createdby: 'GS', createdby_name:'Gokul Simson',  createdon: '27-Apr-2018  11:34', updatedby: 'GS', updatedby_name:'Gokul Simson', updatedon: '27-Apr-2018   11:34'
  },
  {
    id: '006', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018   11:34', validityto: '27-Apr-2018   11:34', status: 'Published', createdby: 'KM', createdby_name:'Kevin Miranda',  createdon: '27-Apr-2018  11:34', updatedby: 'KM', updatedby_name:'Kevin Miranda', updatedon: '27-Apr-2018   11:34'
  },
  {
    id: '007', location: 'Carson', terminal: 'Tesoro', validityfrom: '27-Apr-2018   11:34', validityto: '27-Apr-2018   11:34', status: 'Published', createdby: 'SR', createdby_name:'Soundar Rajan',  createdon: '27-Apr-2018  11:34', updatedby: 'SR', updatedby_name:'Soundar Rajan', updatedon: '27-Apr-2018   11:34'
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


datePicker(datevalue:string){
  //alert(datevalue);
  // if(datevalue.length == 0){
  //   alert("empty");
  // }else{
  //   this.show = true;
  // }
  this.show = true;
}
  
closeBtn(){
  //alert("ss");
  //alert(this.searchValue);
  this.show = false;
  this.searchValue = '';
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

var isColPinned_right=false;
var isColPinned_left =true;