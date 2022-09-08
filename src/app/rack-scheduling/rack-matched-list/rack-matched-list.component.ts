import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { AGGridDateTimePickerComponent } from 'src/app/shared/ag-grid/ag-grid-datetimePicker.component';
import { MatDialog } from '@angular/material/dialog';
import { TechAvailableFiltersComponent } from 'src/app/shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { CustomHeaderGroupNotify } from 'src/app/shared/ag-grid/custom-header-group-notification.component';
import { TransactionSummaryComponent } from 'src/app/shared/dialog-popup/transaction-summary/transaction-summary.component';
import { EmailPreviewComponent } from 'src/app/shared/dialog-popup/email-preview/email-preview.component';

@Component({
  selector: 'app-rack-matched-list',
  templateUrl: './rack-matched-list.component.html',
  styleUrls: ['./rack-matched-list.component.scss']
})
export class RackMatchedListComponent implements OnInit {
  public gridOptions: GridOptions;
  private components;
  public rowCount:Number;
  public disableBtn:boolean = true;
  public rowselect:boolean = false;
  public previewProceed:boolean = true;
  public isdisplaydensityhigh:boolean = false;
  public menuopen:boolean = false;
  public selectedBtn:boolean = false;
  public isCollapsed:boolean = false;
  constructor(public dialog: MatDialog) {
    this.gridOptions = <GridOptions>{      
      columnDefs: this.columnDefs,
      enableColResize: true,
      enableSorting: true,
      filter: true,
      // pagination: true,
      // floatingFilter:true,
      // paginationPageSize: 6,
      rowHeight: 100,
      headerHeight:40,
      groupHeaderHeight:40,
      rowSelection: 'multiple',
      animateRows:true,
      defaultColDef: {
        filter: true,
        enableSorting: true,
    },
      onCellValueChanged: ($event)=>{
        console.log($event);
      },
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 100:55
       },
      onGridReady: (params) => {
          this.gridOptions.api = params.api;
          this.gridOptions.columnApi = params.columnApi;
          this.gridOptions.enableColResize = true;
          this.gridOptions.api.sizeColumnsToFit(); 
          this.gridOptions.api.setRowData(this.rowData);  
          this.rowCount = this.gridOptions.api.getDisplayedRowCount();                   
      },
      getRowClass:(params)=> {
        if (params.node.rowIndex % 2 === 0) {
            return '';
        }
        if(params.node.rowIndex === 2){
            return 'aggrid-notification';
        }
    },
    frameworkComponents: {
      customHeaderGroupNotifyComponent: CustomHeaderGroupNotify
    }
    }; 

    // this.components = { datePicker: getDatePicker() };
  }

  ngOnInit() {
  }

  public removefloatingFilter(){
    console.log(this.gridOptions.floatingFilter);
    this.gridOptions.floatingFilter=false;
    console.log(this.gridOptions.floatingFilter);
  }

  private columnDefs = [
    {
      headerName: "",
      field: "",
      filter: true,
      enableSorting: true,
      suppressMenu:true,
      resizable: false,
      suppressMovable: true,
      headerCheckboxSelection: true,
      suppressSizeToFit: true,
      width:60,
      cellRendererFramework:AGGridCellDataComponent,
      headerClass:['aggrid-checkbox-m-left',''],
      cellRendererParams: {label: 'traction_type', type:'roundchip', letter:0}
    },
    { headerName: 'Delivery Information', headerTooltip:'Delivery Information', hide: false, headerClass:['aggrid-columgroup-splitter',''],
      children: [
        { headerName: 'ID', headerTooltip:'ID', headerClass:[''], cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {label: 'trade', type:'text', classes:'aggridlink'},
          valueGetter : function(params) { 
            return params.data.data[0].trade;
          }
        },
        { headerName: 'Counterparty', headerTooltip:'Counterparty', headerClass:[''], cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'counterparty', type:'text'},
          valueGetter : function(params) { 
          return params.data.data[0].counterparty;
        } },
        { headerName: 'Location', headerTooltip:'Location', headerClass:[''], cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'location', type:'text'},
          valueGetter : function(params) { 
          return params.data.data[0].location;
        }  },
        { headerName: 'Type', headerTooltip:'Type', cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'salestype', type:'text'},headerClass:[''],
          valueGetter : function(params) { 
          return params.data.data[0].salestype;
        } },
        { headerName: 'Product', headerTooltip:'Product', field: 'product', headerClass:['','aggrid-text-align-c'], cellClass:'aggridlink aggrid-content-center'},
        { headerName: 'Quantity', headerTooltip:'Quantity', field: 'quantity',cellClass:['aggrid-content-center'], headerClass:['','aggrid-text-align-c'] },
        { headerName: 'Release No', headerTooltip:'Release No', field: 'releaseno',cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {stylemode:'editable'}, cellClass:['aggrid-content-center','aggrid-columgroup-splitter'], headerClass:['', 'aggrid-columgroup-splitter','aggrid-text-align-c'] },
    ]},
    { headerName: 'Freight Information', headerTooltip:'Freight Information',  headerClass:['aggrid-columgroup-splitter',''],
      children: [
        { headerName: 'Freight Company', headerTooltip:'Freight Company', field: 'freightcompany', headerClass:['','aggrid-text-align-c'],cellClass:['aggrid-content-center'],
          cellRendererParams: {stylemode:'dropdown-editable', type:'dropdown-grey', values: ["ABC Trucking", "DEC Trucking"]},
          cellRendererFramework:AGGridCellDataComponent
        },
        { headerName: 'From Delivery', headerClass:['fromdelivery','aggrid-text-align-c'],cellEditorFramework:AGGridDateTimePickerComponent, cellClass:['aggrid-content-center'], headerTooltip:'From Delivery', field: 'fromdelivery', filter: "AggridCustomFilter",editable: true},
        { headerName: 'To Delivery', cellClass:["aggrid-columgroup-splitter","aggrid-content-center"], headerTooltip:'To Delivery', field: 'todelivery', cellEditor: "datePicker", headerClass:['', 'aggrid-columgroup-splitter','aggrid-text-align-c'],cellRendererParams: {stylemode:'editable'}, cellRendererFramework:AGGridCellDataComponent },
    ]},
    { headerName: 'Margin Information', headerClass:['','aggrid-columgroup-splitter aggridtextalign-center text-center'],headerGroupComponent: 'customHeaderGroupNotifyComponent',
      children: [
        { headerName: 'Product', headerTooltip:'Product', field: 'trademargin' ,   headerClass:['','aggrid-text-align-c'],
          cellClass: function(params) { 
            let classes:string []=[];   
            classes.push('aggrid-content-center');
            classes.push(Number(params.value.substr(0,params.value.length - 4)) < 0 ? "aggrid-nagativelabel":"aggrid-positivelabel");
            classes.push("trademargin");            
            return classes;
            }
        },
        { headerName: 'Freight', headerTooltip:'Freight', field: 'freightmargin' , headerClass:['','aggrid-text-align-c'],
          cellClass: function(params) { 
            let classes:string []=[];
            classes.push('aggrid-content-center');
            classes.push(Number(params.value.substr(0,params.value.length - 4)) < 0 ? "aggrid-nagativelabel":"aggrid-positivelabel");
            classes.push("freightmargin");
            return classes;
          } 
        },
        { headerName: 'Total', headerTooltip:'Total', field: 'totalmargin' , headerClass:['','aggrid-columgroup-splitter','aggrid-text-align-c'], 
          cellClass: function(params) {
            let classes:string []=[];     
            classes.push('aggrid-content-center');    
            let negativeclass = Number(params.value.substr(0,params.value.length - 4)) < 0 ? "aggrid-nagativelabel":"aggrid-positivelabel";
            classes.push(negativeclass);
            classes.push("aggrid-columgroup-splitter totalmargin");
            return classes;
          }
        }
    ]},
    { headerName: '', headerClass:["","aggrid-text-align-c"],cellClass:['aggrid-content-center'], headerTooltip:'Unmatch', field: 'unmatch', cellRendererFramework:AGGridCellDataComponent, cellRendererParams:{type:'unmatch'},
      filter: true,
      enableSorting: true,
      suppressMenu:true,
      resizable: false,
      suppressMovable: true,
      width:85
    }
  ];

private rowData = [
  {  
    matchID:'001', data:[
      { traction_type:'salse', trade: 'PHB012-1', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-2', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '775 USD', freightmargin:'775 USD', totalmargin: '775 USD'
  },
  {  
    matchID:'002', data:[
      { traction_type:'salse', trade: 'PHB012-3', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-4', counterparty: 'Shell America', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '775 USD'
  },
  {  
    matchID:'003', data:[
      { traction_type:'salse', trade: 'PHB012-5', counterparty: 'Toyota America', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-6', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '775 USD', freightmargin:'775 USD', totalmargin: '775 USD'
  },
  {  
    matchID:'004', data:[
      { traction_type:'salse', trade: 'PHB012-7', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-8', counterparty: 'Shell America', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '102 USD', freightmargin:'775 USD', totalmargin: '-225 USD'
  },
  {  
    matchID:'005', data:[
      { traction_type:'salse', trade: 'PHB012-9', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-10', counterparty: 'Shell United State', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '-775 USD'
  },
  {  
    matchID:'006', data:[
      { traction_type:'salse', trade: 'PHB012-11', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-12', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '75,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '775 USD'
  },
  {  
    matchID:'007', data:[
      { traction_type:'salse', trade: 'PHB012-13', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-14', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '0 USD', freightmargin:'775 USD', totalmargin: '775 USD'
  },
  {  
    matchID:'008', data:[
      { traction_type:'salse', trade: 'PHB012-15', counterparty: 'Shell United State', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-16', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '775 USD'
  },
  {  
    matchID:'009', data:[
      { traction_type:'salse', trade: 'PHB012-17', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-18', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '100 USD', freightmargin:'775 USD', totalmargin: '-25 USD'
  },
  {  
    matchID:'001', data:[
      { traction_type:'salse', trade: 'PHB012-1', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-2', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '775 USD', freightmargin:'775 USD', totalmargin: '775 USD'
  },
  {  
    matchID:'002', data:[
      { traction_type:'salse', trade: 'PHB012-3', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-4', counterparty: 'Shell America', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '775 USD'
  },
  {  
    matchID:'003', data:[
      { traction_type:'salse', trade: 'PHB012-5', counterparty: 'Toyota America', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-6', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '775 USD', freightmargin:'775 USD', totalmargin: '775 USD'
  },
  {  
    matchID:'004', data:[
      { traction_type:'salse', trade: 'PHB012-7', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-8', counterparty: 'Shell America', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '102 USD', freightmargin:'775 USD', totalmargin: '-225 USD'
  },
  {  
    matchID:'005', data:[
      { traction_type:'salse', trade: 'PHB012-9', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-10', counterparty: 'Shell United State', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '-775 USD'
  },
  {  
    matchID:'006', data:[
      { traction_type:'salse', trade: 'PHB012-11', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-12', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '75,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '775 USD'
  },
  {  
    matchID:'007', data:[
      { traction_type:'salse', trade: 'PHB012-13', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-14', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '0 USD', freightmargin:'775 USD', totalmargin: '775 USD'
  },
  {  
    matchID:'008', data:[
      { traction_type:'salse', trade: 'PHB012-15', counterparty: 'Shell United State', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-16', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '775 USD'
  },
  {  
    matchID:'009', data:[
      { traction_type:'salse', trade: 'PHB012-17', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract'},
      { traction_type:'purchase', trade: 'PHS012-18', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Spot'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', releaseno:'121', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '100 USD', freightmargin:'775 USD', totalmargin: '-25 USD'
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
    this.gridOptions.rowHeight = 100;
    this.gridOptions.headerHeight = 60;
    this.gridOptions.groupHeaderHeight = 60;
  }
  else{
    this.gridOptions.rowHeight = 55;
    this.gridOptions.headerHeight = 40;
    this.gridOptions.groupHeaderHeight = 40;
    
  }
  this.gridOptions.api.resetRowHeights();
  this.gridOptions.api.refreshHeader();
  // this.gridOptions.api.reset();
}

onRowSelected(event) {
  //alert("");
  //console.log(event);
  //console.log(event.node.selected);
  if(event.node.selected){
  this.disableBtn = false;
  this.rowselect = true;
  //alert("");
  }else{
    this.disableBtn = true;
    this.rowselect = false;
  }
}

transactionSummary() {
  const dialogRef = this.dialog.open(EmailPreviewComponent, {
    width: '96vw',
    height: '930px',
    panelClass: ['transaction-summary-container','email-preview-container']
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
  
}

proceedText(text,selectbtn){
  this.previewProceed = text;
  if(selectbtn){
  this.selectedBtn = true;
  }else{
    this.selectedBtn = false;
  }

}

isOpened(event){
 this.menuopen = true;
}

isClosed(event){
  this.menuopen = false;
 }

 onChange(event){
  //console.log(event);
  if(event.checked){
    this.disableBtn = false;
  }else{
    this.disableBtn = true;
  }
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


