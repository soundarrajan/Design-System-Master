import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { GridOptions } from "ag-grid-community";

@Component({
  selector: 'app-new-vessel',
  templateUrl: './new-vessel.component.html',
  styleUrls: ['./new-vessel.component.css']
})
export class NewVesselComponent implements OnInit {

  public gridOptions_auditLog: GridOptions;
  public isdisplaydensityhigh: boolean = false;
  public customCollapsedHeight = "65px";
  public customExpandedHeight = "40px";
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'data-picker-gray',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/customicons/datepicker_drk.svg'));
    this.gridOptions_auditLog = <GridOptions>{
      columnDefs: this.columnDef_auditLog,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      // pagination: true,
      suppressRowClickSelection: true,
      // paginationPageSize: 6,
      headerHeight: 50,
      rowHeight: 50,
      rowSelection: 'multiple',
      animateRows: true,
      autoGroupColumnDef: {
        headerName: "Athlete",
        field: "athlete",
        width: 200,
        cellRenderer: "agGroupCellRenderer",
        cellRendererParams: { checkbox: true }
      },
      onCellValueChanged: ($event) => {
        console.log($event);
      },
      getRowHeight: (params) => {
        return this.isdisplaydensityhigh ? 48 : 25
      },
      onGridReady: (params) => {
        this.gridOptions_auditLog.api = params.api;
        this.gridOptions_auditLog.columnApi = params.columnApi;
        this.gridOptions_auditLog.api.sizeColumnsToFit();
        this.gridOptions_auditLog.enableColResize = true;
        this.gridOptions_auditLog.api.setRowData(this.rowData_auditLog);
      },
      getRowClass: (params) => {
        let classes: string[] = [];

        if (params.node.rowIndex % 2 === 0) {
          classes.push('aggrid-evenrow-bg');
          classes.push('aggrid-evenrow-border-dark');
        }
        else {
          classes.push('aggrid-oddrow-bg');
          classes.push('aggrid-evenrow-border-dark');
        }
        if (classes.length > 0)
          return classes;
      },
      onColumnResized: function (params) {
        console.log(params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged');
        if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        console.log(params.columnApi.getAllDisplayedColumns().length <= 10);
        if (params.columnApi.getAllDisplayedColumns().length <= 10)
          params.api.sizeColumnsToFit();
      }
    }
  }

  ngOnInit(): void {
  }

  private columnDef_auditLog = [
    { headerName: 'Entity Name', headerTooltip: 'Entity Name', field: 'entityname', headerClass: ['aggridtextalign-left'], cellClass: ['aggrid-left-ribbon darkgray'] },
    { headerName: 'Event Type', headerTooltip: 'Event Type', field: 'eventtype', headerClass: ['aggridtextalign-left'], cellClass: ['aggridtextalign-left'] },
    //{ headerName: 'Location', headerTooltip:'Location', field:'location'},
    //{ headerName: 'Terminal', headerTooltip:'Terminal', field:'terminal'},
    //{ headerName: 'Product', headerTooltip:'Product', field:'product'},
    { headerName: 'Field Name', headerTooltip: 'Field Name', field: 'fieldname' },
    { headerName: 'New Value', headerTooltip: 'New Value', field: 'newvalue', type: "numericColumn" },
    { headerName: 'Old Value', headerTooltip: 'Old Value', field: 'oldvalue', type: "numericColumn" },
    { headerName: 'User Name', headerTooltip: 'User Name', field: 'username' },
    { headerName: 'Date', headerTooltip: 'Date', field: 'date', cellRendererFramework: AGGridCellRendererComponent, cellRendererParams: { cellClass: 'custom-chip dark aggrid-space' }, cellClass: ['aggridtextalign-center'], headerClass: ['aggrid-text-align-c'], width: 250 }
  ];

  private rowData_auditLog = [

    {
      entityname: 'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH', fieldname: 'Base Price', newvalue: '18', oldvalue: '18', username: 'vaishnavi.n@inatech.com', date: '27-Apr-2018  11:34'
    },
    {
      entityname: 'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH', fieldname: 'Base Price', newvalue: '18', oldvalue: '18', username: 'vaishnavi.n@inatech.com', date: '27-Apr-2018  11:34'
    },
    {
      entityname: 'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH', fieldname: 'Base Price', newvalue: '18', oldvalue: '18', username: 'vaishnavi.n@inatech.com', date: '27-Apr-2018  11:34'
    },
    {
      entityname: 'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH', fieldname: 'Base Price', newvalue: '18', oldvalue: '18', username: 'vaishnavi.n@inatech.com', date: '27-Apr-2018  11:34'
    },

  ]
}
