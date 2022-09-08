import { Component, OnInit } from '@angular/core';
import { TechAvailableFiltersComponent } from 'src/app/shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AgGridLookupEditor } from 'src/app/shared/ag-grid/ag-grid-lookup.component';
import { AgGridDatetimePickerNewComponent } from 'src/app/shared/ag-grid/ag-grid-datetime-picker-new.component';
import { reconciliationPopupComponent } from 'src/app/shared/dialog-popup/reconciliation-pop/reconciliation-popup.component';
import { DeliveryConfirmationComponent } from 'src/app/shared/dialog-popup/delivery-confirmation/delivery-confirmation.component';
@Component({
  selector: 'app-blrecon-unmatched-list',
  templateUrl: './blrecon-unmatched-list.component.html',
  styleUrls: ['./blrecon-unmatched-list.component.scss']
})
export class BlreconUnmatchedListComponent implements OnInit {
  public gridOptions_purchase: GridOptions;
  public gridOptions_sales: GridOptions;
  public getMainMenuItems;
  public rowCount_purchase:Number;
  public rowCount_sales:Number;
  public isLoading:boolean;
  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;
  public coleditable:boolean = false;
  public disableBtn:boolean = true;

  ngOnInit() {
  }
  onRowSelected(event) {
    this.coleditable = true;
    if(event.node.selected){
      this.disableBtn = false;
    }else{
        this.disableBtn = true;
    }
  }
  deliveryConfirmation() {
    const dialogRef = this.dialog.open(DeliveryConfirmationComponent, {
      width: '450px',
      height: '300px',
      panelClass: 'delivery-confirmation'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getCellEditorFramework(){
    return AgGridDatetimePickerNewComponent;
  }
  constructor(public dialog: MatDialog) {
    this.gridOptions_purchase = <GridOptions>{      
      columnDefs: this.columnDefs_purchase,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
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
      onColumnResized: function(params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 6 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function(params) {
        if(params.columnApi.getAllDisplayedColumns().length <= 6)
          params.api.sizeColumnsToFit();
      }
    }; 

    this.gridOptions_sales = <GridOptions>{      
      columnDefs: this.columnDefs_sales,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
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
      onCellValueChanged: ($event)=>{
        console.log($event);
      },
      onGridReady: (params) => {
          this.gridOptions_sales.api = params.api;
          this.gridOptions_sales.columnApi = params.columnApi;
          // this.gridOptions_sales.api.sizeColumnsToFit(); 
          this.gridOptions_sales.enableColResize = true;
          this.gridOptions_sales.api.setRowData(this.rowData_sales); 
          this.rowCount_sales = this.gridOptions_sales.api.getDisplayedRowCount();     
          // this.marginHeaderWidth      
          
      },
      getRowClass:(params)=> {
          return 'aggrid-evenrow-bg';
      },
      onColumnResized: function(params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 6 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            params.api.sizeColumnsToFit();
        }
        if (params.type === 'columnResized' && params.finished === true) {
          // this.gridOptions.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function(params) {
        if(params.columnApi.getAllDisplayedColumns().length <= 6)
          params.api.sizeColumnsToFit();
      }
    };

    this.getMainMenuItems = function getMainMenuItems(params){
      console.log(params);
      let finalMenuItem = [];
      let itemsToExclude = "resetColumns";
      params.defaultItems.forEach(function(item) {
        console.log(params);
          if (itemsToExclude.indexOf(item) < 0) {
              finalMenuItem.push(item);
          }
      });
      return finalMenuItem;
   }
   
   }

   private columnDefs_purchase = [
    // { headerName: 'Bill of Lading List', headerTooltip:'Bill of Lading List', hide: false, headerClass:['aggrid-columgroup-splitter'],
    // children: [
    {  
        headerName: "",
        field: "",
        suppressFilter: true,
        enableSorting :true,
        suppressMenu:true,
        suppressResize: true,
        width:40,
        checkboxSelection: true,
        suppressSizeToFit: true,
        // headerClass:'left-10',
        headerClass:'header-checkbox-center',
        pinned:'left',
        cellClass:'p-0 aggrid-textoverflow checkbox-center'      
    },
    // {headerName: 'B/L Number', field: 'blnumber', cellClass: [' aggridlink'], headerClass:[''], width: 120, suppressSizeToFit: true },
    {headerName: 'B/L Number', field: 'blnumber', cellClass: ['aggridlink hoverdisable product-cell'], headerClass:[''], width: 120, suppressSizeToFit: true,cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'hover-popup-toggle'}, pinned:'left', },
    {headerName: 'Business Line', field: 'businessline', cellRendererFramework:AGGridCellRendererComponent, headerClass:['aggrid-text-align-c'], cellClass: ['aggridtextalign-center'],suppressSizeToFit:true,
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        // classArray.push('aggrid-editable');
        
        let newClass= params.value==='Pipeline'?'custom-chip lightgreen ':
                      params.value==='Rack'?'custom-chip amber':
                      params.value==='Cargo'?'custom-chip mediumblue':
                      'custom-chip dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} }},   
    {headerName: 'Type', field: 'type', headerClass:[''], width: 120, suppressSizeToFit: true},
    {headerName: 'Buy/Sell', field: 'buysell', cellRendererFramework:AGGridCellRendererComponent, cellClass: ['aggridtextalign-center'],headerClass:['aggrid-text-align-c'] , suppressSizeToFit:true,
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('creator-bg bg-light-blue');
        let newClass= params.value==='B'?'custom-chip darkgreen':
                      params.value==='S'?'custom-chip darkblue':
                      'custom-chip dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} }, width: 80},
    {headerName: 'Date', field: 'date', cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: ['aggrid-space']}, headerClass:['aggrid-text-align-c'], suppressSizeToFit:true
    ,cellClass: function(params) { 
      // console.log("ddddddd");
      // console.log(params);
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        
                      //if (params.node.selected == true) {
                        classArray.push('aggrid-editable');
                        classArray.push('no-shadow');
                      //}
                      return classArray.length > 0 ? classArray : null},
                      cellEditorFramework: this.getCellEditorFramework(),
                      editable:true },
    {headerName: 'Counterparty', field: 'counterparty', cellClass: [''], headerClass:[' text-ellipsis'], width: 120, suppressSizeToFit: true },
    {headerName: 'Product', field: 'product', cellClass: ['aggridlink text-ellipsis product-cell'],headerClass:[''],  width: 120, suppressSizeToFit: true,cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'product-details-popup'}},
    {headerName: 'Qty', field: 'quality', type:"numericColumn", width: 120, suppressSizeToFit: true },
    {headerName: 'Site/Location', field: 'location', cellClass: [' text-ellipsis'], headerClass:[' text-ellipsis'], enableTooltip : true,editable:true, width: 130 },
    {headerName: 'Terminal', field: 'terminal',cellClass: [''],  headerClass:[''], enableTooltip : true, width: 150},
    {headerName: 'Carrier', field: 'carrier',  headerClass:[''], enableTooltip : true, width: 130, editable: true, cellEditorFramework:AgGridLookupEditor },
    {headerName: 'Reff Number', field: 'reffno',cellClass: ['','aggrid-columgroup-splitter'],  headerClass:[' aggrid-columgroup-splitter'], enableTooltip : true, width: 150 }
    // ]}
  ];

  
  private columnDefs_sales = [
    // { headerName: 'Deliveries List', headerTooltip:'Deliveries List', hide: false, headerClass:['aggrid-columgroup-splitter'],
    // children: [
    {  
        headerName: "",
        field: "",
        suppressFilter: true,
        enableSorting :true,
        suppressMenu:true,
        suppressResize: true,
        width:40,
        checkboxSelection: true,
        suppressSizeToFit: true,
        // headerClass:'left-10',
        headerClass:'header-checkbox-center',
        cellClass:'p-0 aggrid-textoverflow checkbox-center', 
        pinned:'left',     
    },
    {headerName: 'Delivery ID', field: 'blid', cellClass: ['aggridlink hoverdisable1 product-cell'], headerClass:[''], width: 150, cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'hover-popup-toggle1'},pinned:'left', },
    {headerName: 'Business Line', field: 'businessline', cellRendererFramework:AGGridCellRendererComponent, headerClass:['aggrid-text-align-c'], cellClass: ['aggridtextalign-center'],
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='Pipeline'?'custom-chip lightgreen':
                      params.value==='Rack'?'custom-chip amber':
                      params.value==='Cargo'?'custom-chip mediumblue':
                      'custom-chip dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} }},   
    {headerName: 'Counterparty', field: 'counterparty', cellClass: [''], headerClass:[' text-ellipsis'], enableTooltip : true, width: 150 },
    {headerName: 'Product', field: 'product', cellClass: ['aggridlink'],headerClass:[''],  enableTooltip : true, width: 170  },
    {headerName: 'Qty', field: 'quality', type:"numericColumn"},
    {headerName: 'Site/Location', field: 'location', cellClass: [' text-ellipsis'], headerClass:[' text-ellipsis'], enableTooltip : true, width: 130 },
    {headerName: 'Date', field: 'date', cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: ['custom-chip dark aggrid-space']}, cellClass: ['aggridtextalign-center'], headerClass:['aggrid-text-align-c'] },    
    {headerName: 'Type', field: 'type', cellClass: [''], headerClass:[''], enableTooltip : true, width: 130 },
    {headerName: 'Buy/Sell', field: 'buysell',cellRendererFramework:AGGridCellRendererComponent, cellClass: ['aggridtextalign-center'], headerClass:['aggrid-text-align-c'], width: 60,
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('creator-bg bg-light-blue');
        let newClass= params.value==='B'?'custom-chip darkgreen':
                      params.value==='S'?'custom-chip darkblue':
                      'custom-chip dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} }},    
    {headerName: 'Terminal', field: 'terminal',cellClass: [''],  headerClass:[''], enableTooltip : true, width: 150},
    {headerName: 'Carrier', field: 'carrier',  headerClass:[''], enableTooltip : true, width: 130 },
    {headerName: 'Reff Number', field: 'reffno',cellClass: ['','aggrid-columgroup-splitter'],  headerClass:[' aggrid-columgroup-splitter'], enableTooltip : true, width: 150 }
    // ]}
  ];

  private rowData_purchase = [

    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Cargo', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Cargo', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782' , businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Cargo', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8500 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Cargo', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782' , businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Cargo', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Cargo', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782' , businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Cargo', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8500 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Cargo', type: 'Contract', buysell: 'S', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782' , businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018 10:10', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    }
    
  ];

  private rowData_sales = [

    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Cargo', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Cargo', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1' , businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Cargo', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8500 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Cargo', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1' , businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Cargo', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Cargo', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1' , businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Cargo', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8500 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Cargo', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1' , businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blid:'PHS001234-1', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', quality: '8500 GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    }
    
  ];

  openAvailableFilter() {
    const dialogRef = this.dialog.open(TechAvailableFiltersComponent, {      
      width: '500px',      
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.isLoading = true;
      setTimeout(() => this.isLoading = false , 2000);
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
