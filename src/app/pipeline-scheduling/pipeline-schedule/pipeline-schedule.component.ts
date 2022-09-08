import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PipelineFilterComponent } from '../../shared/dialog-popup/pipeline-filter/pipeline-filter.component';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
//import { MatDialog } from '@angular/material/dialog';
import { TechAvailableFiltersComponent } from 'src/app/shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { CustomHeaderGroup } from 'src/app/shared/ag-grid/custom-header-group.component';
import { CustomHeaderGroupNotify } from 'src/app/shared/ag-grid/custom-header-group-notification.component';

@Component({
  selector: 'app-pipeline-schedule',
  templateUrl: './pipeline-schedule.component.html',
  styleUrls: ['./pipeline-schedule.component.scss']
})
export class PipelineScheduleComponent implements OnInit {
 
  @ViewChild('headerChip') headerChip:ElementRef;
  
  public gridOptions_purchase: GridOptions;
  public gridOptions_sales: GridOptions;
  public getMainMenuItems;
  public salesHeaderWidth;
  public marginHeaderWidth;
  public rowCount_purchase;
  public rowCount_sales;
  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;
  public isExpandable1: boolean = false;
  public isExpandable2: boolean = false;
  public hidePurchaseBadge: boolean = false;
  public hideSalesBadge: boolean = false;
  public chips = ["Default","Physical an Vitol","BP Marine Fuels"];
  public showChips = [];
  public expandgrid1;
  public expandgrid2;
  public footerWidth;
  public grid1Width = {
    width: '50%'
  }
  public grid2Width = {
    width: '50%'
  }

  constructor(public dialog: MatDialog) {
    this.gridOptions_purchase = <GridOptions>{      
      columnDefs: this.columnDefs_purchase,
      enableColResize: true,
      enableSorting: true,
      filter: true,
      // pagination: true,
      suppressRowClickSelection:true,
      paginationPageSize: 6,
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 48:25
      },
      headerHeight:this.isdisplaydensityhigh? 60:35,
      groupHeaderHeight:this.isdisplaydensityhigh? 60:35,
      rowSelection: 'single',
      animateRows:true,
      autoGroupColumnDef: {
        headerName: "Athlete",
        field: "athlete",
        width: 200,
        cellRenderer: "agGroupCellRenderer",        
        cellRendererParams: { checkbox: true }
      },
      defaultColDef: {
        filter: true,
        enableSorting: true
    },
      onCellValueChanged: ($event)=>{
        console.log($event);
      },
      onGridReady: (params) => {
          this.gridOptions_purchase.api = params.api;
          this.gridOptions_purchase.columnApi = params.columnApi;
          //this.gridOptions_purchase.api.sizeColumnsToFit(); 
          this.gridOptions_purchase.enableColResize = true;
         // this.gridOptions_purchase.api.setRowData(this.rowData_purchaseempty);   
          this.rowCount_purchase = this.gridOptions_purchase.api.getDisplayedRowCount();
          var count = this.gridOptions_purchase.api.getDisplayedRowCount();
          console.log("getDisplayedRowCount() =>. " + this.rowCount_purchase);  
          // document.getElementById("expandId1").addEventListener("click", function () {
          //   params.api.sizeColumnsToFit();
          // });       
      },
      getRowClass:(params)=> {        
        return 'aggrid-evenrow-bg';
      },
      onColumnResized: function(params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 11 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function(params) {
        if(params.columnApi.getAllDisplayedColumns().length <= 11)
          params.api.sizeColumnsToFit();
      },
      frameworkComponents: {
        customHeaderGroupComponent: CustomHeaderGroup,
        customHeaderGroupNotifyComponent: CustomHeaderGroupNotify
      }
    }; 

    this.gridOptions_sales = <GridOptions>{      
      columnDefs: this.columnDefs_sales,
      enableColResize: true,
      enableSorting: true,
      filter: true,
      // pagination: true,
      suppressRowClickSelection:true,
      paginationPageSize: 6,
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 48:25
      },
      headerHeight:this.isdisplaydensityhigh? 60:35,
      groupHeaderHeight:this.isdisplaydensityhigh? 60:35,
      rowSelection: 'multiple',
      cellClass:'p-0',
      animateRows:true,
      defaultColDef: {
        filter: true,
        enableSorting: true,
    },
      onCellValueChanged: ($event)=>{
        console.log($event);
      },
      onGridReady: (params) => {
        this.changeRoute();
          this.gridOptions_sales.api = params.api;
          this.gridOptions_sales.columnApi = params.columnApi;
          //this.gridOptions_sales.api.sizeColumnsToFit(); 
          this.gridOptions_sales.enableColResize = true;
         // this.gridOptions_sales.api.setRowData(this.rowData_salesempty); 

          // this.marginHeaderWidth = (params.columnApi.getColumn("fuel").getActualWidth() +
          //       params.columnApi.getColumn("freight").getActualWidth()+
          //       params.columnApi.getColumn("total").getActualWidth())
          //       +18; 

          this.salesHeaderWidth = (params.columnApi.getColumn("tradeid").getActualWidth() +
                params.columnApi.getColumn("counterparty").getActualWidth()+
                params.columnApi.getColumn("product").getActualWidth())+
                params.columnApi.getColumn("quantity").getActualWidth()+
                params.columnApi.getColumn("unitprice").getActualWidth()+
                params.columnApi.getColumn("salestype").getActualWidth()+
                params.columnApi.getColumn("location").getActualWidth()
                +80; 
          this.setSalesHeaderWidth();
          this.rowCount_sales = this.gridOptions_sales.api.getDisplayedRowCount();  
          
          // document.getElementById("expandId2").addEventListener("click", function () {
          //   params.api.sizeColumnsToFit();  
          // });
      },
        getRowClass:(params)=> {
          return 'aggrid-evenrow-bg';
      },
      onColumnResized: function(params) {
        // this.marginHeaderWidth = (params.columnApi.getColumn("fuel").getActualWidth() +
        //       params.columnApi.getColumn("freight").getActualWidth()+
        //       params.columnApi.getColumn("total").getActualWidth())
        //       -3; 
              
      this.salesHeaderWidth = (params.columnApi.getColumn("tradeid").getActualWidth() +
              params.columnApi.getColumn("counterparty").getActualWidth()+
              params.columnApi.getColumn("product").getActualWidth())+
              params.columnApi.getColumn("quantity").getActualWidth()+
              params.columnApi.getColumn("unitprice").getActualWidth()+
              params.columnApi.getColumn("salestype").getActualWidth()+
              params.columnApi.getColumn("location").getActualWidth()
              +68; 

      if (params.type === 'columnResized' && params.finished === true) {
              // this.gridOptions.api.sizeColumnsToFit();
        }
        if (params.columnApi.getAllDisplayedColumns().length <= 12 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function(params) {
        if(params.columnApi.getAllDisplayedColumns().length <= 12)
          params.api.sizeColumnsToFit();
      },
      frameworkComponents: {
        customHeaderGroupComponent: CustomHeaderGroup,
        customHeaderGroupNotifyComponent: CustomHeaderGroupNotify
      }        
    };

    this.getMainMenuItems = function getMainMenuItems(params){
      let finalMenuItem = [];
      let itemsToExclude = ["pinSubMenu","separator"];
      let firstSeparator=true;
      params.defaultItems.forEach(function(item) {
        if (itemsToExclude.indexOf(item) < 0) {
            finalMenuItem.push(item);
        }  
        else{
          if("separator" == item && firstSeparator)                        
            firstSeparator=false;
          else if("separator" == item && !firstSeparator)
            finalMenuItem.push(item);
        } 
      });
      return finalMenuItem;
   }
   
   }

  ngOnInit() {
    this.showChips = this.chips;
 this.startTimer();
 document.querySelector('.pcoded-main-container').classList.add('doublegrid-collapsed');
  }
  // openDialog() {
  //   const dialogRef = this.dialog.open(PipelineFilterComponent, {
  //     id: 'advanced-filter',
  //     //maxHeight: '400px',
  //     width: '900px',
  //     position: { left: '15px',top:'110px'}
  //   });


  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  private columnDefs_purchase = [
    {  
        headerName: "",
        field: "",
        filter: true,
        enableSorting :true,
        suppressMenu:true,
        width:40,
        checkboxSelection: true,
        suppressSizeToFit: true,
        resizable: false,
        suppressMovable: true,
        // headerClass:'p-0',
        headerClass:'header-checkbox-center',
        cellClass:'p-1 checkbox-center',
        pinned: 'left'      
    },
      { headerName: 'ID', headerTooltip:'ID', field:'tradeid', cellClass:'aggridlink',minWidth:20},
      {  headerName: 'Counterparty', headerTooltip:'Counterparty', field:'counterparty', cellClass:'aggridlink',minWidth:20},
      { headerName: 'Product', headerTooltip:'Product', field:'product', cellClass:'aggridlink',minWidth:20},
      { headerName: 'QTY', headerTooltip:'Quantity', field:'quantity', cellClass: ['aggrid-cell-bg-color','aggrid-text-align-r'], type: "numericColumn", width:110, suppressSizeToFit: true},
      { headerName: 'Delivery From', headerTooltip:'Delivery From', field: 'todelivery',minWidth:20 },
      { headerName: 'Delivery To', headerTooltip:'Delivery To', field: 'fromdelivery',minWidth:20,width:110 },
      { headerName: 'Pipeline', headerTooltip:'Pipeline', field: 'unitprice', width:110, suppressSizeToFit: true},
      { headerName: 'Cycle', headerTooltip:'Cycle', field: 'salestype',minWidth:20 },
      { headerName: 'Type', headerTooltip:'Type', field: 'type',minWidth:20 },
      { headerName: 'Location From', headerTooltip:'Location From', field: 'location',minWidth:20 }
  ];

  
  private columnDefs_sales = [
    {
      // headerName: 'Sales',
      headerTooltip:'Sales',        
      
      marryChildren: true,
      resizable:false,
      children: [ {
          headerName: "",
          field: "",
          filter: true,
          pinned: 'left',
          enableSorting :true,
          headerCheckboxSelection: true,
          suppressMenu:true,
          resizable: false,
          width:40,
          checkboxSelection: true, 
          headerClass:'header-checkbox-center',          
          // headerClass:'left-10',
          // cellClass: ['space-border'],
          cellClass:'p-0 checkbox-center',      
          suppressSizeToFit: true
      }, 
        { headerName: 'ID', headerTooltip:'ID', field:'tradeid', cellClass:'aggridlink',minWidth:20},
        { headerName: 'Counterparty', headerTooltip:'Counterparty', field:'counterparty', cellClass:'aggridlink',minWidth:20 },
        { headerName: 'Product', headerTooltip:'Product', field:'product', cellClass:'aggridlink',minWidth:20 },
        { headerName: 'QTY', headerTooltip:'Quantity', field:'quantity', cellClass:['aggrid-greencell', 'aggrid-editable','aggrid-text-align-r'],headerClass:['aggrid-text-align-r'], width:110, suppressSizeToFit: true, },
        { headerName: 'Delivery From', headerTooltip:'Delivery From', field: 'todelivery',minWidth:20 },
        { headerName: 'Delivery To', headerTooltip:'Delivery To', field: 'fromdelivery',minWidth:20 },
        { headerName: 'Pipeline', headerTooltip:'Pipeline', field: 'unitprice', width:110, suppressSizeToFit: true},
        { headerName: 'Cycle', headerTooltip:'Cycle', field: 'salestype', minWidth:20},
        { headerName: 'Type', headerTooltip:'Type', field: 'type',minWidth:20 },
        { headerName: 'Location To', headerTooltip:'Location To', field: 'location', headerClass:[''],minWidth:20},
      ]},
      {
        headerName: 'Margin',       
        // headerGroupComponent: 'customHeaderGroupNotifyComponent',
        headerClass:[ 'm-l-5 aggrid-columgroup-splitter-left aggridtextalign-center text-center'],
        // headerGroupComponentParams : {
        //   subtitles: 'USD/BBL',
        // },
        marryChildren: true,
        children: [
          { headerName: 'Product', headerTooltip:'Product', field:'fuel', headerClass:['aggrid-columgroup-splitter-left','aggrid-text-align-r','m-l-5'], lockPosition: true, resizable: false, suppressNavigable: true, pinned: 'right', suppressSizeToFit: true, width: 110
          ,cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'hover-info-toggle-table'},  hide: true,
          cellClass: function(params) { 
            let classes:string []=[];   
            classes.push('aggrid-columgroup-splitter-left product-cell aggrid-text-align-r');
            classes.push(Number(params.value.substr(0,params.value.length - 4)) < 0 ? "aggrid-nagativelabel":
            Number(params.value.substr(0,params.value.length - 4)) > 0 ? "aggrid-positivelabel":"");
            //classes.push("trademargin");            
            return classes;
            }   
          // pinned: 'right',
            // filter: true,
            // enableSorting: true,
            // suppressMenu:true,
            // resizable: false,
            // suppressMovable: true 
          }
          // ,{ headerName: 'Freight', headerTooltip:'Freight', field:'freight', cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'emptydropdown-blue', values: ["ABC Trucking", "DEC Trucking"]},
          //   hide: true, lockPosition: true, resizable: false, suppressNavigable: true, pinned: 'right', suppressSizeToFit: true, width: 120
          //   // pinned: 'right',
          //   // filter: true,
          //   // enableSorting: true,
          //   // suppressMenu:true,
          //   // resizable: false,
          //   // suppressMovable: true
          // },
          // { headerName: 'Total', headerTooltip:'Total', field:'total',
          //   hide: true, lockPosition: true, resizable: false, suppressNavigable: true, pinned: 'right', suppressSizeToFit: true, width: 120
          // //   pinned: 'right',
          // //  filter: true,
          // //  enableSorting: true,
          // //  suppressMenu:true,
          // //  resizable: false,
          // //  suppressMovable: true
          // }
        ]}
  ];

  private rowData_purchase = [

    {
      type:'salse', tradeid: 'PHB012-1', counterparty: 'Shell', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'purchase', tradeid: 'PHS012-2', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'sale', tradeid: 'PHB012-3', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'purchase', tradeid: 'PHS012-4', counterparty: 'Shell America', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'sale', tradeid: 'PHB012-5', counterparty: 'Toyota', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'purchase', tradeid: 'PHS012-6', counterparty: 'Toyota America', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'sale', tradeid: 'PHB012-7', counterparty: 'Shell United State', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'purchase', tradeid: 'PHB012-8', counterparty: 'Toyota America', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'sale', tradeid: 'PHB012-9', counterparty: 'Shell', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'purchase', tradeid: 'PHB012-10', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'sale' , tradeid: 'PHB012-11', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'purchase', tradeid: 'PHB012-12', counterparty: 'Shell', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'salse', tradeid: 'PHB012-1', counterparty: 'Shell', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'purchase', tradeid: 'PHS012-2', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'sale', tradeid: 'PHB012-3', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'purchase', tradeid: 'PHS012-4', counterparty: 'Shell America', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'sale', tradeid: 'PHB012-5', counterparty: 'Toyota', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'purchase', tradeid: 'PHS012-6', counterparty: 'Toyota America', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'sale', tradeid: 'PHB012-7', counterparty: 'Shell United State', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'purchase', tradeid: 'PHB012-8', counterparty: 'Toyota America', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'sale', tradeid: 'PHB012-9', counterparty: 'Shell', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'purchase', tradeid: 'PHB012-10', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'sale' , tradeid: 'PHB012-11', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    },
    {
      type:'purchase', tradeid: 'PHB012-12', counterparty: 'Shell', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline'
    }
    
  ];

  private rowData_sales = [

    {
      type:'salse', tradeid: 'PHB012-1', counterparty: 'Shell', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"0 USD", freight:"0 USD", total:"0 USD"
    },
    {
      type:'purchase', tradeid: 'PHS012-2', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"2.80 USD", freight:"2.80 USD", total:"2.80 USD"
    },
    {
      type:'sale', tradeid: 'PHB012-3', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"-2.80 USD", freight:"-2.80 USD", total:"-2.80 USD"
    },
    {
      type:'purchase', tradeid: 'PHS012-4', counterparty: 'Shell America', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"2.80 USD", freight:"_____", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-5', counterparty: 'Toyota', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"-2.80 USD", freight:"-2.80 USD", total:"-2.80 USD"
    },
    {
      type:'purchase', tradeid: 'PHS012-6', counterparty: 'Toyota America', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-7', counterparty: 'Shell United State', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-8', counterparty: 'Toyota America', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-9', counterparty: 'Shell', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-10', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale' , tradeid: 'PHB012-11', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-12', counterparty: 'Shell', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"_____", total:"_____"
    },
    {
      type:'salse', tradeid: 'PHB012-1', counterparty: 'Shell', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHS012-2', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-3', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHS012-4', counterparty: 'Shell America', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"2.80 USD", freight:"_____", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-5', counterparty: 'Toyota', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHS012-6', counterparty: 'Toyota America', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-7', counterparty: 'Shell United State', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-8', counterparty: 'Toyota America', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-9', counterparty: 'Shell', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-10', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Pure', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale' , tradeid: 'PHB012-11', counterparty: 'Vitol', location: 'Philadellphia', salestype: 'Pure', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-12', counterparty: 'Shell', location: 'Philadellphia', salestype: 'Nov18-02', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: 'Calnev Pipline', fuel:"_____", freight:"_____", total:"_____"
    }
    
  ];
  private rowData_purchaseempty = [
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
   
  ];

  private rowData_salesempty = [

    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
   
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
        this.gridOptions_purchase.rowHeight = 48;
        this.gridOptions_purchase.headerHeight = 60;
        this.gridOptions_purchase.groupHeaderHeight =60;
        this.gridOptions_sales.rowHeight = 48;
        this.gridOptions_sales.headerHeight = 60;
        this.gridOptions_sales.groupHeaderHeight =60;        
      }
      else{
        this.gridOptions_purchase.rowHeight = 26;
        this.gridOptions_purchase.headerHeight = 35;
        this.gridOptions_purchase.groupHeaderHeight = 35;
        this.gridOptions_sales.rowHeight = 26;
        this.gridOptions_sales.headerHeight = 35;
        this.gridOptions_sales.groupHeaderHeight = 35;
      }
      this.gridOptions_purchase.api.resetRowHeights();
      this.gridOptions_purchase.api.refreshHeader();
      this.gridOptions_sales.api.resetRowHeights();
      this.gridOptions_sales.api.refreshHeader();
  }
  private tempTimer;
  public isLoading=false;
  public isRefresh=false;
  changeRoute()
    {
      
      clearInterval(this.tempTimer);
      this.gridOptions_sales.api.setRowData(this.rowData_salesempty); 
      this.gridOptions_purchase.api.setRowData(this.rowData_purchaseempty); 
      this.isLoading=false;
      
      this.tempTimer = setTimeout(() => {
              this.gridOptions_sales.api.setRowData(this.rowData_sales); 
        this.gridOptions_purchase.api.setRowData(this.rowData_purchase); 
        this.isLoading=true;
        this.isRefresh=true;
            }, 100);
  }
  progressbarValue = 0;
  timeLeft: number = 60;
  interval; 
  progressinterval: number =40;
  showProgressBar:boolean =true;

 public startTimer() {

    clearInterval(this.interval);
    this.showProgressBar = false;
    
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.progressinterval++;
        this.progressbarValue =  0 + this.progressinterval;
      } 
      else{
        this.showProgressBar = true;
      }
      
    },100)
   
  }
  public refresh(){
    this.isRefresh=true;
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
  
  // isExpandable1 = F && isExpandable2 = F----------50/50%
  // isExpandable1 = T && isExpandable2 = F----------80/20%
  // isExpandable1 = F && isExpandable2 = T----------20/80%
  public resizeTable(table1,table2) {
    this.isExpandable1 = table1;
    this.isExpandable2 = table2;
    if (this.isExpandable1) {
      this.setWidth('80%', '20%');
      this.expandgrid1 = true;
      this.expandgrid2 = false;
      this.footerWidth = "79.7%"
    }
    else if (this.isExpandable2) {
      this.setWidth('20%', '80%');
      this.expandgrid1 = false;
      this.expandgrid2 = true;
      this.footerWidth = "79.7%"
    }
    else {
      this.setWidth('50%', '50%');
      this.expandgrid1 = false;
      this.expandgrid2 = false;
      this.footerWidth = "49.7%"
    }
  }
  public setWidth(width1, width2) {
    this.grid1Width = {
      width: width1
    }
    this.grid2Width = {
      width: width2
    }
    clearInterval(this.tempTimer);
    this.tempTimer = setTimeout(() => {
      this.onWidthChange();
    }, 0.01);
  }

  //Execute whenever the grid width changes on expansion or resize.
  public onWidthChange(){
    this.gridOptions_purchase.api.sizeColumnsToFit(); 
    this.gridOptions_sales.api.sizeColumnsToFit(); 
    this.setSalesHeaderWidth();
    if(this.salesHeaderWidth < 400){
      this.hideSalesBadge = true;
    }
    else
      this.hideSalesBadge = false;
    if( document.getElementById("grid1").offsetWidth < 400)
      this.hidePurchaseBadge = true; 
    else
      this.hidePurchaseBadge = false;
  }

  //Set the sales header width excluding the Margin width.
  public setSalesHeaderWidth(){
    this.salesHeaderWidth = document.getElementsByClassName("ag-header-viewport")[1].clientWidth + 20;
  }

  //Execute whnever a check box is selected.
  public onRowSelected(isPurchaseGrid){

    let rowCount_sales  = this.gridOptions_sales.api.getSelectedRows().length;
    let rowCount_purchase  = this.gridOptions_purchase.api.getSelectedRows().length;

    if((rowCount_purchase == 1 && rowCount_sales == 0)|| (rowCount_sales == 1 && rowCount_purchase == 0)){
      this.filterRows();
    }
    else if(rowCount_purchase == 0 && rowCount_sales == 0){
      this.gridOptions_sales.api.destroyFilter("product");
      this.gridOptions_purchase.api.destroyFilter("product");
    }
    //Expand/Collapse Purchase and Sales grids
    if(isPurchaseGrid){
        if(rowCount_purchase>0 && rowCount_sales>=0 )
          this.resizeTable(false,true);
        else if(rowCount_purchase==0 && rowCount_sales>0)
          this.resizeTable(true,false);
        else if(rowCount_purchase ==0 && rowCount_sales==0)
          this.resizeTable(false,false);
    }
    else{
        if(rowCount_sales>0 && rowCount_purchase==0)
          this.resizeTable(true,false);
        else if(rowCount_purchase>0)
          this.resizeTable(false,true);
        else if(rowCount_sales ==0 && rowCount_purchase==0) 
          this.resizeTable(false,false);
    }
    //Display Margin Column
    if(rowCount_sales > 0 && rowCount_purchase > 0){
      this.gridOptions_sales.columnApi.setColumnVisible('fuel',true);
      //this.gridOptions_sales.columnApi.setColumnVisible('freight',true);
      //this.gridOptions_sales.columnApi.setColumnVisible('total',true);
    }
    else{
      this.gridOptions_sales.columnApi.setColumnVisible('fuel',false);
      //this.gridOptions_sales.columnApi.setColumnVisible('freight',false);
      //this.gridOptions_sales.columnApi.setColumnVisible('total',false);
    }
  }

  filterRows(){
      let product = [];
      if(this.gridOptions_purchase.api.getSelectedRows().length > 0){
        this.gridOptions_purchase.api.getSelectedRows().forEach((row)=>{
          product.push(row.product);
        })
      }
      else{
        this.gridOptions_sales.api.getSelectedRows().forEach((row)=>{
          product.push(row.product);
        })
      }
        let filterInstance1 = this.gridOptions_sales.api.getFilterInstance("product");
        filterInstance1.setModel(product);
        this.gridOptions_sales.api.onFilterChanged(); 

        let filterInstance2 = this.gridOptions_purchase.api.getFilterInstance("product");
        filterInstance2.setModel(product);
        this.gridOptions_purchase.api.onFilterChanged(); 

  }

  onResize() {
    if(Math.round(this.headerChip.nativeElement.offsetWidth/100)>0)
    this.showChips= this.chips.slice(0,Math.round(this.headerChip.nativeElement.offsetWidth/100)-1);
    else
    this.showChips= this.chips.slice(0,1);
  }
}
