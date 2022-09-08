import { Component, OnInit } from '@angular/core';
import { TechAvailableFiltersComponent } from 'src/app/shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AggridCustomFilter } from 'src/app/shared/ag-grid/ag-grid-custom-filter.component';
import { AGGridEditorComponent } from 'src/app/shared/ag-grid/ag-grid-editor.component';
import { CustomHeaderGroup } from 'src/app/shared/ag-grid/custom-header-group.component';

@Component({
  selector: 'app-blrecon-matched-list',
  templateUrl: './blrecon-matched-list.component.html',
  styleUrls: ['./blrecon-matched-list.component.scss']
})
export class BlreconMatchedListComponent implements OnInit {
  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;
  public gridOptions: GridOptions;
  public getMainMenuItems;
  public rowCount:Number;
  public unMatchWidth;
  public quatntityInfoWidth;
  public quatntityInfoWidth1;

  ngOnInit() {
    document.querySelector('.pcoded-main-container').classList.add('doublegrid-collapsed');
  }
  constructor(public dialog: MatDialog) {

    this.gridOptions = <GridOptions>{      
      columnDefs: this.columnDefs,
      enableColResize: true,
      enableSorting: true,
      filter: true,
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
          this.gridOptions.api = params.api;
          this.gridOptions.columnApi = params.columnApi;
          // this.gridOptions.api.sizeColumnsToFit(); 
          this.gridOptions.enableColResize = true;
          this.gridOptions.api.setRowData(this.rowData); 
          this.rowCount = this.gridOptions.api.getDisplayedRowCount();    
          // this.marginHeaderWidth   
          //this.unMatchWidth = params.columnApi.getColumn("unmatchbtn").getActualWidth()+43;  
          this.quatntityInfoWidth = params.columnApi.getColumn("blquantity").getActualWidth()+
                                    params.columnApi.getColumn("orderquantity").getActualWidth()+
                                    params.columnApi.getColumn("quantitydiff").getActualWidth()+150;
          this.quatntityInfoWidth1 = this.quatntityInfoWidth;
      },
        getRowClass:(params)=> {
          return 'aggrid-evenrow-bg';
      },
      // getMainMenuItems
      onColumnResized: function(params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            params.api.sizeColumnsToFit();
        }
        if (params.type === 'columnResized' && params.finished === true) {
          // this.gridOptions.api.sizeColumnsToFit();
    }
      },
      onColumnVisible: function(params) {
        if(params.columnApi.getAllDisplayedColumns().length <= 10)
          params.api.sizeColumnsToFit();
      },
      onFilterChanged: function(params){
        this.rowCount = params.api.getDisplayedRowCount(); 
      },
      onColumnPinned: function(params){
        var allCols = params.columnApi.getAllGridColumns();
          var allFixedCols = allCols.filter(function(col) {
            return col.isLockPosition();
          });
          var allNonFixedCols = allCols.filter(function(col) {
            return !col.isLockPosition();
          });
          var pinnedCount = allNonFixedCols.filter(function(col) {
            return col.getPinned() === "right";
          }).length;
          var pinFixed = pinnedCount > 0;
          // params.columnApi.setColumnsPinned(allFixedCols, pinFixed);
      },
      onColumnMoved: function(params){
        console.log("Hello",params.columnApi.getAllDisplayedColumns().length);
        console.log("Index",params.toIndex);
        if(params.toIndex< params.columnApi.getAllDisplayedColumns().length){
          console.log("Yes");
        }
        else
          console.log("Nooo");
      },

      ondragStopped: function(params){
        console.log("kjhsadlkhsaoid");
      },
      frameworkComponents: {
        AggridCustomFilter: AggridCustomFilter,
        customHeaderGroupComponent: CustomHeaderGroup
      },
    //   statusBar: {
    //     statusPanels: [
    //       {
    //         statusPanel: "agTotalRowCountComponent",
    //         align: "left"
    //       },
    //       { statusPanel: "agFilteredRowCountComponent" },
    //       { statusPanel: "agSelectedRowCountComponent" },
    //       { statusPanel: "agAggregationComponent" }
    //     ]
    // }
    };

    this.getMainMenuItems = function getMainMenuItems(params){
      let finalMenuItem = [];
      let itemsToExclude = "autoSizeAll";
      // if(params.column.colId==='blquantity' || params.column.colId=== 'orderquantity' || params.column.colId=== 'quantitydiff' ){
        params.defaultItems.forEach(function(item) {
            if (itemsToExclude.indexOf(item) < 0) {
                finalMenuItem.push(item);
            }
        });
        return finalMenuItem;
      // }   
      // return  params.defaultItems;
    }
   }

  private columnDefs = [
    {
      headerName: '', headerTooltip:'Delivery Information', headerClass:['aggridtextalign-left-50per'],
      headerGroupComponent: 'customHeaderGroupComponent',
      marryChildren: true,
      resizable: false,
      children: [  
        { headerName: "",
          field: "",
          filter: true,
          enableSorting :true,
          suppressMenu:true,
          resizable: false,
          width:40,
          checkboxSelection: true,
          suppressSizeToFit: true,
          // headerClass:'left-10',
          headerClass:'header-checkbox-center',
          cellClass:'p-1 aggrid-textoverflow checkbox-center',
          pinned:'left',
          headerCheckboxSelection: true
        }, 
        {headerName: 'B/L Number', field: 'blnumber', cellClass: [' aggridlink text-ellipsis product-cell'], suppressSizeToFit: true, pinned:'left',
        cellRendererFramework:AGGridCellDataComponent,
        cellRendererParams: {type:'cell-hover-click-menu-recon'} },
        {headerName: 'Business Line', field: 'businessline', cellRendererFramework:AGGridCellRendererComponent, headerClass:['aggrid-text-align-c'], cellClass: ['aggridtextalign-center'],
        cellRendererParams: function(params) { 
          var classArray:string[] =[]; 
            classArray.push('aggridtextalign-center');
            let newClass= params.value==='Pipeline'?'custom-chip lightgreen':
                          params.value==='Rack'?'custom-chip amber':
                          params.value==='Cargo'?'custom-chip mediumblue':
                          'custom-chip darkblue';
                          classArray.push(newClass);
            return {cellClass: classArray.length>0?classArray:null} }
        },   
        {headerName: 'Type', field: 'type', headerTooltip : 'Type'},
        {headerName: 'Buy/Sell', field: 'buysell', cellRendererFramework:AGGridCellRendererComponent, cellClass: ['aggridtextalign-center'], headerClass:['aggridtextalign-center','aggrid-text-align-c'], suppressSizeToFit:true,
        cellRendererParams: function(params) { 
          var classArray:string[] =[]; 
            classArray.push('creator-bg bg-light-blue');
            let newClass= params.value==='B'?'custom-chip darkgreen':
                          params.value==='S'?'custom-chip darkblue':
                          'custom-chip dark';
                          classArray.push(newClass);
            return {cellClass: classArray.length>0?classArray:null} }
        },
        {headerName: 'Date', field: 'date',headerTooltip:'Date', cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: ['custom-chip dark aggrid-space']}, cellClass: ['aggridtextalign-center'], headerClass:['aggrid-text-align-c']},
        {headerName: 'Counterparty', field: 'counterparty', headerClass:['text-ellipsis'], headerTooltip : 'Counterparty'},
        {headerName: 'Product', field: 'product', cellClass: ['aggridlink'], headerTooltip : 'Product' },
        {headerName: 'DeliveryQty', field: 'deliveryquality', headerTooltip : 'DeliveryQty', hide:true},
        {headerName: 'DeliveryUnit', field: 'deliveryunit', headerTooltip : 'DeliveryUnit', hide:true},
        {headerName: 'Qty', field: 'deliveryqualitywithunit', headerTooltip : 'Qty', type:"numericColumn",  filter: "AggridCustomFilter", 
          filterParams: {primaryColId:'deliveryquality', secondaryColId: 'deliveryunit' }    
        , editable: true, cellEditorFramework:AGGridEditorComponent,
            valueGetter: function(params) { 
              return params.data.deliveryquality+" "+params.data.deliveryunit;
            },
            valueSetter: function(params) {
              var dataSplit = params.newValue.split(",");    
              var deliveryquality = dataSplit[0];
              var deliveryunit = dataSplit[1];
              if (params.data.deliveryquality !== deliveryquality || params.data.deliveryunit !== deliveryunit){
                  params.data.deliveryquality = deliveryquality;
                  params.data.deliveryunit = deliveryunit;
                  return true;
              }
              else {
                  return false;
              }
            }
        },
        {headerName: 'Site/Location', field: 'location', cellClass: [' text-ellipsis'], headerClass:[' text-ellipsis'], headerTooltip : 'Site/Location',  filterParams: {apply: true} },
        {headerName: 'Terminal', field: 'terminal', headerTooltip : 'Terminal'},
        {headerName: 'Carrier', field: 'carrier',  headerTooltip : 'Carrier' },
        {headerName: 'Reff Number', field: 'reffno', headerTooltip : 'Reff Number' }
      ]}
      ,
      {
        headerName: 'Quantity Info', headerTooltip:'Quantity Info', headerClass:['aggrid-columgroup-splitter-left'], 
        marryChildren: true,
        children: [
          {headerName: 'BL Qty',lockPosition: true, suppressNavigable: true, pinned: 'right', suppressSizeToFit: true,  resizable: false,  field: 'blquantity', cellClass: ['aggrid-columgroup-splitter-left','aggrid-text-align-r'],headerClass:['aggrid-columgroup-splitter-left','aggrid-text-align-r'],headerTooltip : 'BL Qty', width: 120, type: "numericColumn",  menuTabs:['filterMenuTab','columnsMenuTab']},
          {headerName: 'Order Qty',lockPosition: true, suppressNavigable: true, pinned: 'right', field: 'orderquantity', headerTooltip : 'Order Qty', width: 150, suppressSizeToFit: true, resizable: false, type: "numericColumn",  menuTabs:['filterMenuTab','columnsMenuTab'] },
          {headerName: 'Qty Difference',lockPosition: true, suppressNavigable: true, pinned: 'right', field: 'quantitydiff',headerTooltip:'Qty Difference', suppressSizeToFit: true, width:150, resizable: false, type: "numericColumn", menuTabs:['filterMenuTab','columnsMenuTab']}
        ]
      }
      // ,
      // {
      //   headerName: '', headerTooltip:'', headerClass:['aggrid-columgroup-splitter-left'], 
      //   marryChildren: true,
      //   children: [
      //   {headerName: '', colId:'unmatchbtn',  
      //   lockPosition: true, suppressNavigable: true, pinned: 'right', field: 'unmatch', headerTooltip:'Unmatch',cellClass:['aggrid-columgroup-splitter-left','aggrid-content-center'], headerClass:['aggrid-columgroup-splitter-left','','aggrid-text-align-c'],  
      //   cellRendererFramework:AGGridCellDataComponent, cellRendererParams:{type:'unmatch'}, suppressSizeToFit: true, width:70,
      //   filter: true,
      //   enableSorting: true,
      //   suppressMenu:true,
      //   resizable: false, suppressMovable: true } 
      //   ]}
    ];

  private rowData = [

    {
      blnumber:'BL0363782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8100, deliveryunit:'GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL0368782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8500, deliveryunit:'GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,200 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL0536782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8200, deliveryunit:'GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL0367882', businessline: 'Cargo', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8700, deliveryunit:'MT', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL0336782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 9200, deliveryunit:'BBL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,600 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 18500, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"9,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Cargo', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8100, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL0361782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8300, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL0336782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8700, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,010 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8100, deliveryunit:'MT', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"7,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782' , businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8200, deliveryunit:'BBL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,100 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL035782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8000, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,600 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL06712', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8900, deliveryunit:'GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL032782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8400, deliveryunit:'GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,020 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL0317182', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8600, deliveryunit:'GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"7,010 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL03078122', businessline: 'Cargo', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8100, deliveryunit:'BBL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8200 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL0327812', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8100, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,500 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL031782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8000, deliveryunit:'MT', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"6,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036882', businessline: 'Cargo', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8100, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"9,200 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL034782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8400, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL033782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8600, deliveryunit:'BBL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,100 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL0396782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8100, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,200 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL0356782' , businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8500, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"7,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL0360782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8500, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"6,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL0363782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8100, deliveryunit:'GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL0368782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8500, deliveryunit:'GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,200 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL0536782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8200, deliveryunit:'GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL0367882', businessline: 'Cargo', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8700, deliveryunit:'MT', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL0336782', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 9200, deliveryunit:'BBL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,600 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 18500, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"9,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL036782', businessline: 'Cargo', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8100, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL0361782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8300, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL0336782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8700, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,010 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8100, deliveryunit:'MT', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"7,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036782' , businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8200, deliveryunit:'BBL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,100 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL035782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8000, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,600 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL06712', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8900, deliveryunit:'GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL032782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8400, deliveryunit:'GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,020 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL0317182', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8600, deliveryunit:'GAL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"7,010 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL03078122', businessline: 'Cargo', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8100, deliveryunit:'BBL', location:'No. 134,street',  terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8200 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
    },
    {
      blnumber:'BL0327812', businessline: 'Pipeline', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8100, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,500 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL031782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8000, deliveryunit:'MT', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"6,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL036882', businessline: 'Cargo', type: 'Contract', buysell: 'S', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8100, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"9,200 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL034782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8400, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL033782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8600, deliveryunit:'BBL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,100 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL0396782', businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8100, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"8,200 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL0356782' , businessline: 'Pipeline', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8500, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"7,000 GAL", orderquantity:"8,500 GAL", quantitydiff:"500"
    },
    {
      blnumber:'BL0360782', businessline: 'Rack', type: 'Contract', buysell: 'B', date: '12/12/2018', product: 'Red Carbon Diesel', counterparty: 'Valero', deliveryquality: 8500, deliveryunit:'GAL', location:'No. 134,street',   terminal: 'PDTC', carrier:'ABC Trucking', reffno: '101-10-2358', blquantity:"6,000 GAL", orderquantity:"8,100 GAL", quantitydiff:"100"
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

  onResize(event) {
    this.quatntityInfoWidth1 = event.target.innerWidth-this.quatntityInfoWidth;
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

  public headerToggle(){    
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

// $(document).ready(function() {
//   $('#cart').scrollToFixed({ marginTop: 10, limit: 20 });
// });