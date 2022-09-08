import { Component, OnInit, Directive } from '@angular/core';
import { PipelineFilterComponent } from '../../shared/dialog-popup/pipeline-filter/pipeline-filter.component';
import { MatDialog } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
//import { MatDialog } from '@angular/material/dialog';
import { TechAvailableFiltersComponent } from 'src/app/shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { CustomHeaderGroupNotify } from 'src/app/shared/ag-grid/custom-header-group-notification.component';
import { TransactionSummaryComponent } from 'src/app/shared/dialog-popup/transaction-summary/transaction-summary.component';
import { EmailPreviewComponent } from 'src/app/shared/dialog-popup/email-preview/email-preview.component';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 200,
  hideDelay: 200,
  touchendHideDelay: 200,
};



@Component({
  selector: 'app-netout-list',
  templateUrl: './netout-list.component.html',
  styleUrls: ['./netout-list.component.scss'],
  providers: [
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
  ],
})


export class NetoutListComponent implements OnInit {

  public gridOptions: GridOptions;
  private components;
  public rowCount:Number;
  public isdisplaydensityhigh:boolean = false;
  public rowselect:boolean = false;
  public previewProceed:boolean = true;
  public menuopen:boolean = false;
  public selectedBtn:boolean = false;
  public disableBtn:boolean = true;
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
      rowSelection: 'multiple',
      animateRows:true,
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 100:88
      },
      headerHeight:this.isdisplaydensityhigh? 60:35,
      groupHeaderHeight:this.isdisplaydensityhigh? 60:35,
      defaultColDef: {
        filter: true,
        enableSorting: true,
    },
      onCellValueChanged: ($event)=>{
        console.log($event);
      },
      onGridReady: (params) => {
          this.gridOptions.api = params.api;
          this.gridOptions.columnApi = params.columnApi;
          this.gridOptions.enableColResize = true;
        //  this.gridOptions.api.sizeColumnsToFit(); 
          this.gridOptions.api.setRowData(this.rowData);    
          this.rowCount = this.gridOptions.api.getDisplayedRowCount();                   
      },
      onFirstDataRendered(params) {
        // params.api.sizeColumnsToFit();
      },
      getRowClass:(params)=> {
        if (params.node.rowIndex % 2 === 0) {
            return '';
        }
        if(params.node.rowIndex === 2){
            return 'aggrid-notification';
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
    },
    frameworkComponents: {
      customHeaderGroupNotifyComponent: CustomHeaderGroupNotify
    }
    }; 
    // this.components = { datePicker: getDatePicker() };
  }

  ngOnInit() {
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(PipelineFilterComponent, {
  //     // height: '400px',
  //     // width: '900px'      
  //     position: { left: '15px',top:'150px'}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

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
      enableSorting :true,
      headerCheckboxSelection: true,
      resizable: false,
      suppressMenu:true,
      suppressSizeToFit: true,
      width:60, 
      pinned: 'left',
      cellRendererFramework:AGGridCellDataComponent,
      headerClass:['aggrid-checkbox-m-left',''],
      cellRendererParams: {label: 'traction_type', type:'roundchip', letter:0}
    },
    { headerName: 'Delivery Information', headerTooltip:'Delivery Information', hide: false, headerClass:['aggrid-columgroup-splitter', ''],
      children: [
        { headerName: 'ID', headerTooltip:'ID', headerClass:[''], cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {label: 'trade', type:'text', classes:'aggridlink'},pinned: 'left',
          valueGetter : function(params) { 
            return params.data.data[0].trade;
          }
        },
        { headerName: 'Counterparty', headerTooltip:'Counterparty', headerClass:[''], cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'counterparty', type:'text', classes:'aggridlink'},
          valueGetter : function(params) { 
          return params.data.data[0].counterparty;
        } },
        { headerName: 'Type', headerTooltip:'Counterparty', headerClass:[''], cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'salestype', type:'text'},
          valueGetter : function(params) { 
          return params.data.data[0].salestype;
        } },
        { headerName: 'Location', headerTooltip:'Location', headerClass:[''], cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'location', type:'text'},
          valueGetter : function(params) { 
          return params.data.data[0].location;
        }  },
        { headerName: 'Pipeline Cost', headerTooltip:'Pipeline Cost', headerClass:[''], cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'cost', type:'editable-hover-popup'},
          valueGetter : function(params) { 
          return params.data.data[0].cost;
        }  },
        { headerName: 'Pipeline Revenue', headerTooltip:'Pipeline Revenue', headerClass:[''], cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'cost', type:'editable-hover-popup'},
          valueGetter : function(params) { 
          return params.data.data[0].cost;
        }  },
        { headerName: 'Pump Date', headerTooltip:'Pump Date', headerClass:[''], cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'pumpdate', type:'text'},
          valueGetter : function(params) { 
          return params.data.data[0].pumpdate;
        } },
        { headerName: 'Product', headerTooltip:'Product', field: 'product', cellClass:["aggrid-dual-vertical-center","aggridlink", "aggrid-text-align-l"], headerClass:["","aggrid-text-align-l"] },
        { headerName: 'Quantity', headerTooltip:'Quantity', field: 'quantity', cellClass:["aggrid-dual-vertical-center","aggrid-text-align-r"], headerClass:["aggrid-text-align-r","ag-numeric-header"],  type: "numericColumn", },
      ]},
    { headerName: 'Pipeline Information', headerTooltip:'Pipeline Information',  headerClass:['aggrid-columgroup-splitter',''],
      children: [
        { headerName: 'Pipeline', headerTooltip:'Pipeline', field: 'pipeline' , cellClass:["aggrid-dualrow-content-center"], headerClass:['','aggrid-text-align-c']},
        { headerName: 'Cycle', headerTooltip:'Cycle', headerClass:[''], cellRendererFramework:AGGridCellDataComponent,cellRendererParams: {label: 'cycle', type:'text'},
          valueGetter : function(params) { 
          return params.data.data[0].cycle;
        } },
        { headerName: 'Delivery Type', headerTooltip:'Delivery Type', headerClass:["","aggrid-text-align-l"], cellClass:["aggrid-dual-vertical-center","aggrid-text-align-l"], field: 'type'},
        { headerName: 'Tender No', headerClass:["","aggrid-text-align-c"], cellClass:["aggrid-dualrow-content-center"], headerTooltip:'Tender No', field: 'tenderno' },
        { headerName: 'Effective Date', headerClass:['','aggrid-text-align-c'], cellClass:["aggrid-dualrow-content-center"], headerTooltip:'Effective Date', field: 'todelivery', cellEditor: "datePicker"},
        { headerName: 'Supplier', headerClass:['','aggrid-text-align-c'], cellClass:["aggrid-dualrow-content-center"], headerTooltip:'Supplier', field: 'freightcompany',  },
        { headerName: 'Sequence No', headerClass:['aggrid-columgroup-splitter','','aggrid-text-align-c'], cellClass:["aggrid-columgroup-splitter","aggrid-dualrow-content-center"], headerTooltip:'Sequence No', field: 'seqno'},
    ]},
    { headerName: 'Margin Info',headerClass:['aggrid-columgroup-splitter',' aggridtextalign-center text-center','p-l-0','no-shadow'],headerGroupComponent: 'customHeaderGroupNotifyComponent',pinned: 'right',
    // width:200,
      children: [
        
        { headerName: 'Product', headerTooltip:'Trade Margin', field: 'trademargin' , 
        pinned:'right',
        width:120,
        type:"numericColumn",
        // minWidth:250,  
        headerClass:["ag-numeric-header","aggrid-columgroup-splitter"],
        
          cellClass: function(params) { 
            let classes:string []=[];   
            classes.push(Number(params.value.substr(0,params.value.length - 4)) < 0 ? "aggrid-nagativelabel":"aggrid-positivelabel");
            classes.push("aggrid-dual-vertical-center","aggrid-text-align-r");            
            return classes;
            }
        },
        // { headerName: 'Freight', headerTooltip:'Freight Margin', field: 'freightmargin' , 
        // pinned:'right',width:100,
        //  headerClass:["","aggrid-text-align-c"],
        
        //   cellClass: function(params) { 
        //     let classes:string []=[];
        //     classes.push(Number(params.value.substr(0,params.value.length - 4)) < 0 ? "aggrid-nagativelabel":"aggrid-positivelabel");
        //     classes.push("aggrid-content-center");
        //     return classes;
        //   } 
        // },
        // { headerName: 'Total', headerTooltip:'Total Margin', field: 'totalmargin' ,
        //  pinned:'right', width:100,
        //   headerClass:["aggrid-columgroup-splitter","","aggrid-text-align-c"], 
          
        //   cellClass: function(params) {
        //     let classes:string []=[];         
        //     let negativeclass = Number(params.value.substr(0,params.value.length - 4)) < 0 ? "aggrid-nagativelabel":"aggrid-positivelabel";
        //     classes.push(negativeclass);
        //     classes.push("aggrid-columgroup-splitter");
        //     classes.push("aggrid-content-center");
        //     return classes;
        //   }
        // }
    ]},
    {
      headerName: '', headerTooltip:'', headerClass:['aggrid-columgroup-splitter','d-none'],
      pinned: 'right',
      children: [{
          headerName: "Email",
          headerTooltip:"Email",
          field: "",
          pinned:'right',
          filter: true,
          enableSorting :true,
          headerCheckboxSelection: false,
          suppressMenu:true,
          resizable: false,
          width:100,
          checkboxSelection: true,
          headerClass:'left-10 aggrid-columgroup-splitter  aggrid-text-align-c header-checkbox-center',
          
          // cellClass: ['space-border'],
          cellClass:'p-0 aggrid-textoverflow space-border aggrid-columgroup-splitter aggrid-content-center checkbox-center'
      }]
  }, 
  { headerName: '', headerTooltip:'', headerClass:['aggrid-columgroup-splitter',''],
  pinned: 'right',
      children: [
      { headerName: 'Unmatch', headerTooltip:'Unmatch', field: 'unmatch', 
        headerClass:["","aggrid-text-align-c","aggrid-columgroup-splitter"], 
        cellClass:["aggrid-content-center"], cellRendererFramework:AGGridCellDataComponent, cellRendererParams:{type:'unmatch'},
        filter: true,
        pinned:'right',
        enableSorting: true,
        suppressMenu:true,
        resizable: false,
        suppressMovable: true,
        width:80
      }
    ]
  }
  ];

private rowData = [
  {  
    matchID:'001', data:[
      { traction_type:'salse', trade: 'PHB012-1', counterparty: 'Shell', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-2', counterparty: 'Vitol', cost: '', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '775 USD', freightmargin:'775 USD', totalmargin: '775 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Net out'
  },
  {  
    matchID:'002', data:[
      { traction_type:'salse', trade: 'PHB012-3', counterparty: 'Shell', cost: '1.3400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-4', counterparty: 'Shell America', cost: '', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '775 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Bookout'
  },
  {  
    matchID:'003', data:[
      { traction_type:'salse', trade: 'PHB012-5', counterparty: 'Toyota America', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-6', counterparty: 'Vitol', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot',  pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '775 USD', freightmargin:'775 USD', totalmargin: '775 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'B2B'
  },
  {  
    matchID:'004', data:[
      { traction_type:'salse', trade: 'PHB012-7', counterparty: 'Shell', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract',  pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-8', counterparty: 'Shell America', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot',  pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '102 USD', freightmargin:'775 USD', totalmargin: '-225 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Net out'
  },
  {  
    matchID:'005', data:[
      { traction_type:'salse', trade: 'PHB012-9', counterparty: 'Shell', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-10', counterparty: 'Shell United State', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '-775 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'B2B'
  },
  {  
    matchID:'006', data:[
      { traction_type:'salse', trade: 'PHB012-11', counterparty: 'Shell', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-12', counterparty: 'Vitol', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '75,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '775 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Bookout'
  },
  {  
    matchID:'007', data:[
      { traction_type:'salse', trade: 'PHB012-13', counterparty: 'Shell', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-14', counterparty: 'Vitol', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot',  pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '0 USD', freightmargin:'775 USD', totalmargin: '775 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'B2B'
  },
  {  
    matchID:'008', data:[
      { traction_type:'salse', trade: 'PHB012-15', counterparty: 'Shell United State', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-16', counterparty: 'Vitol', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '775 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Net out'
  },
  {  
    matchID:'009', data:[
      { traction_type:'salse', trade: 'PHB012-17', counterparty: 'Shell', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-18', counterparty: 'Toyota America', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '100 USD', freightmargin:'775 USD', totalmargin: '-25 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Net out'
  },
  {  
    matchID:'001', data:[
      { traction_type:'salse', trade: 'PHB012-1', counterparty: 'Shell', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-2', counterparty: 'Vitol', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '775 USD', freightmargin:'775 USD', totalmargin: '775 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Net out'
  },
  {  
    matchID:'002', data:[
      { traction_type:'salse', trade: 'PHB012-3', counterparty: 'Shell', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-4', counterparty: 'Shell America', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '775 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Net out'
  },
  {  
    matchID:'003', data:[
      { traction_type:'salse', trade: 'PHB012-5', counterparty: 'Toyota America', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-6', counterparty: 'Vitol', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '775 USD', freightmargin:'775 USD', totalmargin: '775 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Net out'
  },
  {  
    matchID:'004', data:[
      { traction_type:'salse', trade: 'PHB012-7', counterparty: 'Shell', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-8', counterparty: 'Shell America', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '102 USD', freightmargin:'775 USD', totalmargin: '-225 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Net out'
  },
  {  
    matchID:'005', data:[
      { traction_type:'salse', trade: 'PHB012-9', counterparty: 'Shell', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-10', counterparty: 'Shell United State', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '-775 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Net out'
  },
  {  
    matchID:'006', data:[
      { traction_type:'salse', trade: 'PHB012-11', counterparty: 'Shell', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-12', counterparty: 'Vitol', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '75,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '775 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Net out'
  },
  {  
    matchID:'007', data:[
      { traction_type:'salse', trade: 'PHB012-13', counterparty: 'Shell', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-14', counterparty: 'Vitol', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '0 USD', freightmargin:'775 USD', totalmargin: '775 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Net out'
  },
  {  
    matchID:'008', data:[
      { traction_type:'salse', trade: 'PHB012-15', counterparty: 'Shell United State', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-16', counterparty: 'Vitol', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '-51 USD', freightmargin:'775 USD', totalmargin: '775 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Net out'
  },
  {  
    matchID:'009', data:[
      { traction_type:'salse', trade: 'PHB012-17', counterparty: 'Shell', cost: '1.2400', location: 'Tesoro, 34, Texas', salestype: 'Contract', pumpdate:'03/02/2019',  cycle:'Nov18-03'},
      { traction_type:'purchase', trade: 'PHS012-18', counterparty: 'Toyota America', cost: '1.3400', location: 'Valero, 34, Texas', salestype: 'Spot', pumpdate:'03/02/2019',  cycle:'Oct18-03'}
    ],
    product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', trademargin: '100 USD', freightmargin:'775 USD', totalmargin: '-25 USD', pipeline:'Kinder Morgan', tenderno:'124-129', seqno:'123/232', type:'Net out'
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
    this.gridOptions.groupHeaderHeight =60;
  }
  else{
    this.gridOptions.rowHeight = 88;
    this.gridOptions.headerHeight = 35;
    this.gridOptions.groupHeaderHeight = 35;
  }
  this.gridOptions.api.resetRowHeights();
  this.gridOptions.api.refreshHeader();
}

onRowSelected(event) {
  //alert("s");
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