import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { TechAvailableFiltersComponent } from 'src/app/shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { MatDialog } from '@angular/material/dialog';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
//import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-freight-contracts-masters',
  templateUrl: './freight-contracts-masters.component.html',
  styleUrls: ['./freight-contracts-masters.component.scss']
})
export class FreightContractsMastersComponent implements OnInit {
  //private rows: any;
  @Output() createNewEvent = new EventEmitter();
  freightContractsMasters = true;
  freightContractsNew = false;
  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;
  ngOnInit() {
    
  }

  
  freightNewComponent(){
    this.freightContractsNew = true;
    this.freightContractsMasters = false;
  }

  returnToList(){
    this.freightContractsMasters = true;
    this.freightContractsNew = false;
  }

  // showarrow(){
  //   //alert('');
  //   //document.getElementsByClassName('state-img')[0].opacity = "0.3";
  // }

  rows = [
    {
      image: '', freight: '10', product: 'RMA 10 - Sul max 3', counterparty: 'Aasen Chartering A/S', counterpartytype: 'Trucking Company', contractname: 'Contract ABC', loadlocation: 'Tesoro', deliverylocation: 'Tesoro', cost: 'C', baseprice: '1.20 USD', varprice: '1.20 USD', validfrom: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
    },
    {
      image: '', freight: '10', product: 'RMA 10 - Sul max 3', counterparty: 'Aasen Chartering A/S', counterpartytype: 'Trucking Company', contractname: 'Contract ABC', loadlocation: 'Tesoro', deliverylocation: 'Tesoro', cost: 'C', baseprice: '1.20 USD', varprice: '1.20 USD', validfrom: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
    },
    {
      image: '', freight: '10', product: 'RMA 10 - Sul max 3', counterparty: 'Aasen Chartering A/S', counterpartytype: 'Trucking Company', contractname: 'Contract ABC', loadlocation: 'Tesoro', deliverylocation: 'Tesoro', cost: 'C', baseprice: '1.20 USD', varprice: '1.20 USD', validfrom: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
    },
    {
      image: '', freight: '10', product: 'RMA 10 - Sul max 3', counterparty: 'Aasen Chartering A/S', counterpartytype: 'Trucking Company', contractname: 'Contract ABC', loadlocation: 'Tesoro', deliverylocation: 'Tesoro', cost: 'C', baseprice: '1.20 USD', varprice: '1.20 USD', validfrom: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
    },
    {
      image: '', freight: '10', product: 'RMA 10 - Sul max 3', counterparty: 'Aasen Chartering A/S', counterpartytype: 'Trucking Company', contractname: 'Contract ABC', loadlocation: 'Tesoro', deliverylocation: 'Tesoro', cost: 'C', baseprice: '1.20 USD', varprice: '1.20 USD', validfrom: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
    },
    {
      image: '', freight: '10', product: 'RMA 10 - Sul max 4', counterparty: 'Aasen Chartering A/S', counterpartytype: 'Trucking Company', contractname: 'Contract ABC', loadlocation: 'Tesoro', deliverylocation: 'Tesoro', cost: 'C', baseprice: '1.20 USD', varprice: '1.20 USD', validfrom: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
    },
    
  ];

  newrow = 
    {
      image: '', freight: '', product: '', counterparty: '', counterpartytype: '', contractname: '', loadlocation: '', deliverylocation: '', cost: '', baseprice: '', varprice: '', validfrom: '',validto:'',status:''
    };

  concatrows = this.rows.concat(this.newrow);

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
    filter: true,
    animateRows:true,
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
        // this.gridOptions.api.sizeColumnsToFit(); 
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
    console.log("*****************");
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
  {headerName: 'Freight Contract', field: 'freight',headerTooltip:'Freight Contract',
  cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'active-deactive'},  
  cellClass: function(params) { 
    var classArray:string[] =[];
    classArray.push('aggridtextalign-center');
      classArray.push('aggridlink');
      classArray.push('aggridlink-dropdown'); 
      // let newClass= params.data.status==='Active'?'aggrid-left-ribbon darkgreen':
      //               params.data.status==='Inactive'?'aggrid-left-ribbon grey':
      //               'aggrid-left-ribbon grey';
      //               classArray.push(newClass);
      return classArray.length>0?classArray:null },
      headerClass:['','aggrid-text-align-c']}, 
  {headerName: 'Product', field: 'product', headerTooltip:'Product',},
  {headerName: 'Counterparty', field: 'counterparty', headerTooltip:'Counterparty', },
  {headerName: 'Counterparty Type', field: 'counterpartytype', headerTooltip:'Counterparty Type',suppressSizeToFit:true,  
  cellClass: function(params) { 
    var classArray:string[] =[]; 
      let newClass= params.data.counterpartytype==='Customer/Counterparty'?'aggrid-cell-bg-color dblue':
                    'aggrid-cell-bg-color persian';
                    classArray.push(newClass);
      return classArray.length>0?classArray:null },
      headerClass:['','aggrid-text-align-c']},
  {headerName: 'Contract Name', field: 'contractname', headerTooltip:'Contract Name'},
  {headerName: 'Load Location', field: 'loadlocation', headerTooltip:'Load Location'},
  {headerName: 'Delivery Location', field: 'deliverylocation', headerTooltip:'Delivery Location'},
  {headerName: 'Cost/Price', field: 'cost', headerTooltip:'Cost/Price',cellClass:['aggridtextalign-center'], cellRendererFramework:AGGridCellRendererComponent,  
  cellRendererParams: function(params) { 
    var classArray:string[] =[]; 
      classArray.push('creator-bg');
      let newClass= params.value==='P'?'aggrid-cell-bg-color dblue':
                    params.value==='C'?'aggrid-cell-bg-color persian':
                    'custom-chip dark';
                    classArray.push(newClass);
      return {cellClass: classArray.length>0?classArray:null} },
      headerClass:['','aggrid-text-align-c']
  },
  {headerName: 'Base Price', field: 'baseprice', headerTooltip:'Base Price', type: "numericColumn"},
  {headerName: 'Variable Price', field: 'varprice', headerTooltip:'Variable Price', type: "numericColumn"},
  {headerName: 'Valid From', field: 'validfrom', headerTooltip:'Valid From',  headerClass:['','aggrid-text-align-c'], cellClass:['aggridtextalign-center'], cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: ['custom-chip dark']}, suppressSizeToFit:true,},
  {headerName: 'Valid To', field: 'validto', headerTooltip:'Valid To',  headerClass:['','aggrid-text-align-c'], cellClass:['aggridtextalign-center'], cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: ['custom-chip dark']}, suppressSizeToFit:true,},
  {headerName: 'Status', field: 'status',headerTooltip:'Status',  headerClass:['','aggrid-text-align-c'], cellClass:['aggridtextalign-center'], cellRendererFramework:AGGridCellRendererComponent,  suppressSizeToFit:true,
  cellRendererParams: function(params) { 
    var classArray:string[] =[]; 
      classArray.push('custom-chip');
      let newClass= params.value==='Active'?'darkgreen':
                    params.value==='Inactive'?'grey':
                    ' grey';
                    classArray.push(newClass);
      return {cellClass: classArray.length>0?classArray:null} }
  
  }
];

// text-center custom-chip dark mat-chip mat-primary mat-standard-chip
private rowData = [
  {
    image: '', freight: '10', product: 'RMA 10 - Sul max 3', counterparty: 'Aasen Chartering A/S', counterpartytype: 'Trucking Company', contractname: 'Contract ABC', loadlocation: 'Tesoro', deliverylocation: 'Tesoro', cost: 'C', baseprice: '1.20 USD', varprice: '1.20 USD', validfrom: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
  },
  {
    image: '', freight: '10', product: 'RMA 10 - Sul max 3', counterparty: 'Aasen Chartering A/S', counterpartytype: 'Customer/Counterparty', contractname: 'Contract ABC', loadlocation: 'Tesoro', deliverylocation: 'Tesoro', cost: 'P', baseprice: '1.20 USD', varprice: '1.20 USD', validfrom: '27-Apr-2019',validto:'27-Apr-2019',status:'Inactive'
  },
  {
    image: '', freight: '10', product: 'RMA 10 - Sul max 3', counterparty: 'Aasen Chartering A/S', counterpartytype: 'Customer/Counterparty', contractname: 'Contract ABC', loadlocation: 'Tesoro', deliverylocation: 'Tesoro', cost: 'P', baseprice: '1.20 USD', varprice: '1.20 USD', validfrom: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
  },
  {
    image: '', freight: '10', product: 'RMA 10 - Sul max 3', counterparty: 'Aasen Chartering A/S', counterpartytype: 'Trucking Company', contractname: 'Contract ABC', loadlocation: 'Tesoro', deliverylocation: 'Tesoro', cost: 'C', baseprice: '1.20 USD', varprice: '1.20 USD', validfrom: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
  },
  {
    image: '', freight: '10', product: 'RMA 10 - Sul max 3', counterparty: 'Aasen Chartering A/S', counterpartytype: 'Trucking Company', contractname: 'Contract ABC', loadlocation: 'Tesoro', deliverylocation: 'Tesoro', cost: 'C', baseprice: '1.20 USD', varprice: '1.20 USD', validfrom: '27-Apr-2019',validto:'27-Apr-2019',status:'Active'
  },
  {
    image: '', freight: '10', product: 'RMA 10 - Sul max 4', counterparty: 'Aasen Chartering A/S', counterpartytype: 'Trucking Company', contractname: 'Contract ABC', loadlocation: 'Tesoro', deliverylocation: 'Tesoro', cost: 'C', baseprice: '1.20 USD', varprice: '1.20 USD', validfrom: '27-Apr-2019',validto:'27-Apr-2019',status:'Inactive'
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

get isPinnedRight() { 
  return isColPinned_right
}

get isPinnedLeft() { 
  return isColPinned_left
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
var isColPinned_left =false;