import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';

@Component({
  selector: 'freight-contracts-new',
  templateUrl: './freight-contracts-new.component.html',
  styleUrls: ['./freight-contracts-new.component.scss']
})
export class FreightContractsNewComponent implements OnInit {
  customCollapsedHeight: string = '65px';
  customExpandedHeight: string = '40px';
  customExpandedHeightFreight: string = '60px';
  auditlog_isopen = false;
  public isdisplaydensityhigh:boolean = false;
  @Output() returnlist: EventEmitter<string> = new EventEmitter<string>();

   //AG GRID COFICS
   //public gridOptions: GridOptions;  
   //public gridOptions_emailLog: GridOptions;  
   public gridOptions_auditLog: GridOptions;

  constructor() {
    
    this.gridOptions_auditLog = <GridOptions>{      
      columnDefs: this.columnDef_auditLog,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      // pagination: true,
      suppressRowClickSelection:true,
      // paginationPageSize: 6,
      headerHeight:50,
      rowHeight: 50,
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
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 48:25
       },
      onGridReady: (params) => {
          this.gridOptions_auditLog.api = params.api;
          this.gridOptions_auditLog.columnApi = params.columnApi;
          this.gridOptions_auditLog.api.sizeColumnsToFit(); 
          this.gridOptions_auditLog.enableColResize = true;
          this.gridOptions_auditLog.api.setRowData(this.rowData_auditLog);          
      },
      getRowClass:(params)=> {
        let classes:string []=[];
        
        if (params.node.rowIndex % 2 === 0) {
          classes.push('aggrid-evenrow-bg');
          classes.push('aggrid-evenrow-border-dark');
        }
        else {
          classes.push('aggrid-oddrow-bg');
          classes.push('aggrid-evenrow-border-dark');
        }       
        if(classes.length>0)
          return classes;       
      },
      onColumnResized: function(params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function(params) {
        if(params.columnApi.getAllDisplayedColumns().length <= 10)
          params.api.sizeColumnsToFit();
      }
    } 
   }

  ngOnInit() {
  }

  returnToList() {
    this.returnlist.emit();
  }

  public change_rowdensity(){
    this.isdisplaydensityhigh = !this.isdisplaydensityhigh;
    if(this.isdisplaydensityhigh){
      this.gridOptions_auditLog.rowHeight = 48;
    }
    else{
      this.gridOptions_auditLog.rowHeight = 35;
    }
    this.gridOptions_auditLog.api.resetRowHeights();
  }

  private columnDef_auditLog = [
    { headerName: 'Entity Name', headerTooltip:'Entity Name', field:'entityname', headerClass:['aggridtextalign-left'], cellClass:['aggridtextalign-left','aggrid-left-ribbon darkgray'], },
    { headerName: 'Event Type', headerTooltip:'Event Type', field:'eventtype', headerClass:['aggridtextalign-left'], cellClass:['aggridtextalign-left']  },
    // { headerName: 'Location', headerTooltip:'Location', field:'location', headerClass:['aggridtextalign-left'], cellClass:['aggridtextalign-left'] },
    // { headerName: 'Terminal', headerTooltip:'Terminal', field:'terminal', headerClass:['aggridtextalign-left'], cellClass:['aggridtextalign-left'] },
    // { headerName: 'Product', headerTooltip:'Product', field:'product', headerClass:['aggridtextalign-left'], cellClass:['aggridtextalign-left'] },
    { headerName: 'Field Name', headerTooltip:'Field Name', field:'fieldname', headerClass:['aggridtextalign-left'], cellClass:['aggridtextalign-left'] },
    { headerName: 'New Value', headerTooltip:'New Value', field:'newvalue', headerClass:['aggridtextalign-right'], cellClass:['aggridtextalign-right'] },
    { headerName: 'Old Value', headerTooltip:'Old Value', field:'oldvalue', headerClass:['aggridtextalign-right'], cellClass:['aggridtextalign-right'] },
    { headerName: 'User Name', headerTooltip:'User Name', field:'username', headerClass:['aggridtextalign-left'], cellClass:['aggridtextalign-left'] },
    { headerName: 'Date', headerTooltip:'Date', field:'date', cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: 'custom-chip dark aggrid-space'}, cellClass: ['aggridtextalign-center'], headerClass:['aggrid-text-align-c'], }
  ];
  
  private rowData_auditLog = [
  
    {
      entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
    },
    {
      entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
    },
    {
      entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
    },
    {
      entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
    },
    {
      entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
    },
    {
      entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
    },
    {
      entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
    },
    {
      entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
    },
    {
      entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
    },
    {
      entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
    },
    {
      entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
    },
    {
      entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
    },
    
  ]

}
