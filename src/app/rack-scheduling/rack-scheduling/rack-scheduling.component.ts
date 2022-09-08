import { Component, OnInit, ViewChild, ElementRef, ViewChildren} from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { MatDialog } from '@angular/material/dialog';
import { TechAvailableFiltersComponent } from 'src/app/shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { CustomHeaderGroup } from 'src/app/shared/ag-grid/custom-header-group.component';
import { CustomHeaderGroupNotify } from 'src/app/shared/ag-grid/custom-header-group-notification.component';

@Component({
  selector: 'app-rack-scheduling',
  templateUrl: './rack-scheduling.component.html',
  styleUrls: ['./rack-scheduling.component.scss']
})
export class RackSchedulingComponent implements OnInit { 
  @ViewChildren('salesheader', {read: ElementRef}) private salesheaderdiv : ElementRef;
  @ViewChild('headerChip') headerChip:ElementRef;
  public gridOptions_purchase: GridOptions;
  public gridOptions_sales: GridOptions;
  public getMainMenuItems;
  public salesHeaderWidth;
  public marginHeaderWidth;
  public rowCount_sales:Number;
  public rowCount_purchase:Number;
  public headerWidth;
  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;
  public chips = ["Default","Physical an Vitol","BP Marine Fuels"];
  public showChips = [];
  public expandgrid1;
  public expandgrid2;
  ngOnInit() {
    this.showChips = this.chips;
    document.querySelector('.pcoded-main-container').classList.add('doublegrid-collapsed');
  }

  ngAfterViewInit() {
    console.log('on after view init', this.salesheaderdiv);
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
      rowSelection: 'multiple',
      animateRows:true,
      defaultColDef: {
        filter: true,
        enableSorting: true,
    },
      autoGroupColumnDef: {
        headerName: "Athlete",
        field: "athlete",
        width: 200,
        cellRenderer: "agGroupCellRenderer",        
        cellRendererParams: { checkbox: true }
      },
      onCellValueChanged: ($event)=>{
        console.log($event);
      },
      onGridReady: (params) => {
          this.gridOptions_purchase.api = params.api;
          this.gridOptions_purchase.columnApi = params.columnApi;
          this.gridOptions_purchase.api.sizeColumnsToFit(); 
          this.gridOptions_purchase.enableColResize = true;
          this.gridOptions_purchase.api.setRowData(this.rowData_purchase);   
          this.rowCount_purchase = this.gridOptions_purchase.api.getDisplayedRowCount();       
      },     
      getRowClass:(params)=> {        
        return 'aggrid-evenrow-bg';
      },
      frameworkComponents: {
        customHeaderGroupComponent: CustomHeaderGroup,
        customHeaderGroupNotifyComponent: CustomHeaderGroupNotify
      }
    }; 

    this.gridOptions_sales = <GridOptions>{    
      marryChildren: true,  
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
          this.gridOptions_sales.api = params.api;
          this.gridOptions_sales.columnApi = params.columnApi;
          // this.gridOptions_sales.api.sizeColumnsToFit(); 
          this.gridOptions_sales.enableColResize = true;
          this.gridOptions_sales.api.setRowData(this.rowData_sales);   
          this.marginHeaderWidth = (params.columnApi.getColumn("fuel").getActualWidth() +
                params.columnApi.getColumn("freight").getActualWidth()+
                params.columnApi.getColumn("total").getActualWidth())
                -3; 

          this.salesHeaderWidth = (params.columnApi.getColumn("tradeid").getActualWidth() +
                params.columnApi.getColumn("counterparty").getActualWidth()+
                params.columnApi.getColumn("product").getActualWidth())+
                params.columnApi.getColumn("quantity").getActualWidth()+
                params.columnApi.getColumn("unitprice").getActualWidth()+
                params.columnApi.getColumn("type").getActualWidth()+
                params.columnApi.getColumn("location").getActualWidth()
                +60; 
          // this.marginHeaderWidth      
          this.rowCount_sales = this.gridOptions_sales.api.getDisplayedRowCount();
          this.headerAlign();
      },
        getRowClass:(params)=> {
          return 'aggrid-evenrow-bg';
      },
      // getRowStyle:(params)=> {
      //   if (params.node.rowIndex % 2 === 0) {
      //       return { background: 'red' }
      //   }
      // },    
      onColumnResized: function(params) {
              if (params.columnApi.getAllDisplayedColumns().length <= 11 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
                  // params.api.sizeColumnsToFit();
              }
              this.marginHeaderWidth = (params.columnApi.getColumn("fuel").getActualWidth() +
              params.columnApi.getColumn("freight").getActualWidth()+
              params.columnApi.getColumn("total").getActualWidth())
              -3; 
              
              this.salesHeaderWidth = (params.columnApi.getColumn("tradeid").getActualWidth() +
              params.columnApi.getColumn("counterparty").getActualWidth()+
              params.columnApi.getColumn("product").getActualWidth())+
              params.columnApi.getColumn("quantity").getActualWidth()+
              params.columnApi.getColumn("unitprice").getActualWidth()+
              params.columnApi.getColumn("type").getActualWidth()+
              params.columnApi.getColumn("location").getActualWidth()
              +60; 

        // if (params.type === 'columnResized' && params.finished === true) {
        //       // this.gridOptions.api.sizeColumnsToFit();
        // }
    },
    onColumnVisible: function(params) {
      // if(params.columnApi.getAllDisplayedColumns().length <= 11)
        // params.api.sizeColumnsToFit();
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

   private columnDefs_purchase = [
    //  {
    //     headerName: 'Purchase', headerTooltip:'Purchase',        
    //     headerGroupComponent: 'customHeaderGroupComponent',
    //     headerGroupComponentParams : {
    //       subtitles: ' 800,000 GAL Total Quantity', 
    //       badge: {
    //         color:"amber", 
    //         value:"8,000",
    //         unit:"GAL"
    //       }
    //     },
    //     children: [
          {  
              headerName: "",
              field: "",
              filter: true,
              enableSorting :true,
              suppressMenu:true,
              resizable: true,
              width:40,
              checkboxSelection: true,
              headerClass:'header-checkbox-center',
              suppressSizeToFit: true,
              // headerClass:'left-10',
              cellClass:'p-1 aggrid-textoverflow checkbox-center',  
              pinned:'left'    
          },
          { headerName: 'ID', headerTooltip:'ID', field:'tradeid', cellClass:'aggridlink', pinned:'left' },
          { headerName: 'Counterparty', headerTooltip:'Counterparty', field:'counterparty', cellClass:'aggridlink', },
          { headerName: 'Product', headerTooltip:'Product', field:'product', cellClass:'aggridlink', },
          { headerName: 'QTY', headerTooltip:'Quantity', field:'quantity', headerClass:['aggrid-text-align-r'], 
            // cellClass: ['aggridtextalign-right'], 
            cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {style:'notification right'}, cellClass:['aggrid-text-align-r']
          },
          { headerName: 'Unit Price', headerTooltip:'Unit Price', field: 'unitprice', headerClass:['aggridtextalign-right'], cellClass: ['aggridtextalign-right']},
          { headerName: 'Type', headerTooltip:'Type', field: 'salestype',  },
          { headerName: 'Location From', headerTooltip:'Location From', field: 'location', }
      //   ]
      // }
  ];
 
  private columnDefs_sales = [
    {
      headerName: '', headerTooltip:'Sales',        
      // headerGroupComponent: 'customHeaderGroupComponent',
      headerClass:['aggrid-columgroup-splitter'],
      headerGroupComponentParams : {
        subtitles: ' 800,000 GAL Total Quantity',
        badge: {
          color:"teal", 
          value:"50,000",
          unit:"BBl"
        },
        marryChildren: true,
        
      },
      children: [
          {
            headerName: "",
            field: "",
            filter: true,
            enableSorting :true,
            headerCheckboxSelection: true,
            suppressMenu:true,
            resizable: true,
            width:40,
            checkboxSelection: true,
            headerClass:'header-checkbox-center',
            suppressSizeToFit: true,
            // headerClass:'left-10',
            // cellClass: ['space-border'],
            cellClass:'p-1 aggrid-textoverflow checkbox-center'   ,
            pinned: 'left',
            
                   
        }, 
          { headerName: 'ID', headerTooltip:'ID', field:'tradeid', cellClass:'aggridlink' , pinned: 'left',width:110,},
          { headerName: 'Counterparty', headerTooltip:'Counterparty', field:'counterparty', cellClass:'aggridlink' ,width:110,},
          { headerName: 'Product', headerTooltip:'Product', field:'product', cellClass:'aggridlink' ,width:110,},
          { headerName: 'QTY', headerTooltip:'Quantity', field:'quantity', headerClass:['aggrid-text-align-r'], cellClass:['aggrid-greencell', 'aggrid-editable','aggrid-text-align-r'], width:110, },
          { headerName: 'Unit Price', headerTooltip:'Unit Price',width:110, field: 'unitprice', cellClass: ['aggrid-cell-bg-color','aggrid-text-align-r'], type: "numericColumn"},
          { headerName: 'Type', headerTooltip:'Type', field: 'type',width:110,},
          { headerName: 'Location To', headerTooltip:'Location To', field: 'location'}
      ]
      },  
      {
        headerName: 'Margin',        
        headerGroupComponent: 'customHeaderGroupNotifyComponent',headerClass:['aggrid-columgroup-splitter-left aggridtextalign-center text-center m-l-5'],resizable: false,
        headerGroupComponentParams : {
          subtitles: 'USD/BBL',
        },
        children: [
          { headerName: 'Product', headerTooltip:'Fuel', field:'fuel', headerClass:['m-l-5', 'aggrid-columgroup-splitter-left','flexi-col'], lockPosition: true, resizable: false, suppressNavigable: true, pinned: 'right', suppressSizeToFit: true, width: 120,
          cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'hover-info-toggle-table'},
          cellClass: function(params) { 
            let classes:string []=[];   
            classes.push('aggrid-columgroup-splitter-left product-cell flexi-col');
            classes.push(Number(params.value.substr(0,params.value.length - 4)) < 0 ? "aggrid-nagativelabel":
            Number(params.value.substr(0,params.value.length - 4)) > 0 ? "aggrid-positivelabel":"");
            //classes.push("trademargin");            
            return classes;
            }   
          },
          { headerName: 'Freight', headerTooltip:'Freight', field:'freight',headerClass:['aggrid-text-align-c','flexi-col'], cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'emptydropdown-blue', values: ["ABC Trucking", "DEC Trucking"]}, lockPosition: true, resizable: false, suppressNavigable: true, pinned: 'right', suppressSizeToFit: true, width: 120,
            cellClass: function(params) { 
            let classes:string []=[];   
            classes.push('freight-price p-t-10 flexi-col');
            classes.push(Number(params.value.substr(0,params.value.length - 4)) < 0 ? "aggrid-nagativelabel":
            Number(params.value.substr(0,params.value.length - 4)) > 0 ? "aggrid-positivelabel":"");
            //classes.push("trademargin");            
            return classes;
            }   
          },
          { headerName: 'Total', headerTooltip:'Total', headerClass:'flexi-col', field:'total', lockPosition: true, resizable: false, suppressNavigable: true, pinned: 'right', suppressSizeToFit: true, width: 120,
          cellClass: function(params) { 
            let classes:string []=[];
            classes.push('flexi-col');   
            classes.push(Number(params.value.substr(0,params.value.length - 4)) < 0 ? "aggrid-nagativelabel":
            Number(params.value.substr(0,params.value.length - 4)) > 0 ? "aggrid-positivelabel":"");
            //classes.push("trademargin");            
            return classes;
            }
          }
        ]
      }
  ];

  private rowData_purchase = [

    {
      type:'salse', tradeid: 'PHB012-1', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHS012-2', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-3', counterparty: 'Vitol', location: 'Tesoro, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHS012-4', counterparty: 'Shell America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-5', counterparty: 'Toyota', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD'
    },
    {
      type:'purchase', tradeid: 'PHS012-6', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-7', counterparty: 'Shell United State', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHB012-8', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-9', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHB012-10', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale' , tradeid: 'PHB012-11', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHB012-12', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'salse', tradeid: 'PHB012-1', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHS012-2', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-3', counterparty: 'Vitol', location: 'Tesoro, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHS012-4', counterparty: 'Shell America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-5', counterparty: 'Toyota', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD'
    },
    {
      type:'purchase', tradeid: 'PHS012-6', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-7', counterparty: 'Shell United State', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHB012-8', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-9', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHB012-10', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale' , tradeid: 'PHB012-11', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHB012-12', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'salse', tradeid: 'PHB012-1', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHS012-2', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-3', counterparty: 'Vitol', location: 'Tesoro, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHS012-4', counterparty: 'Shell America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-5', counterparty: 'Toyota', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD'
    },
    {
      type:'purchase', tradeid: 'PHS012-6', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-7', counterparty: 'Shell United State', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHB012-8', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-9', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHB012-10', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale' , tradeid: 'PHB012-11', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHB012-12', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'salse', tradeid: 'PHB012-1', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHS012-2', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-3', counterparty: 'Vitol', location: 'Tesoro, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHS012-4', counterparty: 'Shell America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-5', counterparty: 'Toyota', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD'
    },
    {
      type:'purchase', tradeid: 'PHS012-6', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-7', counterparty: 'Shell United State', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHB012-8', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale', tradeid: 'PHB012-9', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHB012-10', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'sale' , tradeid: 'PHB012-11', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD'
    },
    {
      type:'purchase', tradeid: 'PHB012-12', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD'
    }
    
  ];

  private rowData_sales = [

    {
      type:'salse', tradeid: 'PHB012-1', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"0 USD", freight:"0 USD", total:"0 USD"
    },
    {
      type:'purchase', tradeid: 'PHS012-2', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"2.80 USD", freight:"2.80 USD", total:"2.80 USD"
    },
    {
      type:'sale', tradeid: 'PHB012-3', counterparty: 'Vitol', location: 'Tesoro, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"-2.80 USD", freight:"-2.80 USD", total:"-2.80 USD"
    },
    {
      type:'purchase', tradeid: 'PHS012-4', counterparty: 'Shell America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"2.80 USD", freight:"", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-5', counterparty: 'Toyota', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHS012-6', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-7', counterparty: 'Shell United State', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-8', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-9', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-10', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale' , tradeid: 'PHB012-11', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-12', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"", total:"_____"
    },
    {
      type:'salse', tradeid: 'PHB012-1', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHS012-2', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-3', counterparty: 'Vitol', location: 'Tesoro, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHS012-4', counterparty: 'Shell America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"2.80 USD", freight:"", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-5', counterparty: 'Toyota', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHS012-6', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-7', counterparty: 'Shell United State', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-8', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-9', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-10', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale' , tradeid: 'PHB012-11', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-12', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"", total:"_____"
    },
    {
      type:'salse', tradeid: 'PHB012-1', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHS012-2', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-3', counterparty: 'Vitol', location: 'Tesoro, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHS012-4', counterparty: 'Shell America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"2.80 USD", freight:"", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-5', counterparty: 'Toyota', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHS012-6', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-7', counterparty: 'Shell United State', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-8', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-9', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-10', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale' , tradeid: 'PHB012-11', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-12', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"", total:"_____"
    },
    {
      type:'salse', tradeid: 'PHB012-1', counterparty: 'Shell', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHS012-2', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '-51 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-3', counterparty: 'Vitol', location: 'Tesoro, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHS012-4', counterparty: 'Shell America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15', todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"2.80 USD", freight:"", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-5', counterparty: 'Toyota', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHS012-6', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Contract', product: 'Diesel', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '-75 USD', freightmargin:'775 USD', unitprice: '-775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-7', counterparty: 'Shell United State', location: 'Tesoro, 34, Texas', salestype: 'Contract', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-8', counterparty: 'Toyota America', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '775 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale', tradeid: 'PHB012-9', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-10', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Diesel', quantity: '50,000 GAL', freightcompany: 'ABC Truck', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '102 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'sale' , tradeid: 'PHB012-11', counterparty: 'Vitol', location: 'Valero, 34, Texas', salestype: 'Pure', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"2.80 USD", total:"_____"
    },
    {
      type:'purchase', tradeid: 'PHB012-12', counterparty: 'Shell', location: 'Valero, 34, Texas', salestype: 'Spot', product: 'Gasoline', quantity: '25,000 GAL', freightcompany: 'ABC Trucking', fromdelivery:'03/14/18 14:15',  todelivery: '03/14/18 14:15', tradeidmargin: '0 USD', freightmargin:'775 USD', unitprice: '775 USD', fuel:"_____", freight:"", total:"_____"
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

  onResize(event) {
    if(Math.round(this.headerChip.nativeElement.offsetWidth/100)>0)
    this.showChips= this.chips.slice(0,Math.round(this.headerChip.nativeElement.offsetWidth/100)-1);
    else
    this.showChips= this.chips.slice(0,1);
    // this.headerWidth = event.target.innerWidth-this.quatntityInfoWidth;
    this.headerAlign();
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

  public headerAlign(){
    //alert("");
    // setTimeout(() => {
    var gridWidth = document.getElementsByClassName("ag-pinned-left-header")[1].clientWidth;
    var marginWidth  = document.getElementsByClassName("ag-header-viewport")[1].clientWidth;
    var salesHeaderWidth = gridWidth + marginWidth;
    //console.log(document.getElementById('salesHeaderAlign'));
    console.log(gridWidth);
    console.log(marginWidth);
    console.log(salesHeaderWidth);
    document.getElementById('salesHeaderAlign').style.width = (salesHeaderWidth - 10) + "px";
  //},1000);
    
  }

}
