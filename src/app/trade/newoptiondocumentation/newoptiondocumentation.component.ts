import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';

@Component({
  selector: 'app-newoptiondocumentation',
  templateUrl: './newoptiondocumentation.component.html',
  styleUrls: ['./newoptiondocumentation.component.scss']
})
export class NewoptiondocumentationComponent implements OnInit {
  public gridOptions_doclist: GridOptions;

  constructor() {
    this.gridOptions_doclist = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: true,
        sortable: true
      },
      columnDefs: this.columnDef_doclist,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 38,
      animateRows: false,
      onCellValueChanged: ($event) => {
        console.log($event);
      },

      onGridReady: (params) => {
        this.gridOptions_doclist.api = params.api;
        this.gridOptions_doclist.columnApi = params.columnApi;
        params.api.sizeColumnsToFit();
        this.gridOptions_doclist.api.setRowData(this.rowData_doclist);


      },
      getRowClass: (params) => {
        let classes: string[] = [];

        if (classes.length > 0)
          return classes;
      },
      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8) {
          params.api.sizeColumnsToFit();

        }
      }
    }
  }

  ngOnInit() {
  }
  private columnDef_doclist = [
    {
      field: "remove",
      resizable: false,
      width: 30,
      cellClass: ['aggridtextalign-left align-c pd-l-10'],
      cellRenderer: function (params) {
        let deleteicon =
          `<div class="remove-icon"></div>`;
        return deleteicon;
      }
    },
    {
      headerName: 'Document Name', headerTooltip: 'Document Name', field: 'name', headerClass: ['aggridtextalign-left'], cellClass: ['align-c'],
      // cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    {
      headerName: 'Document Type', headerTooltip: 'Document Type', field: 'type', headerClass: ['aggridtextalign-left'], cellClass: ['align-c'],
      // cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-dropdown', items: ['Contract Document'] }
    },
    { headerName: 'Format', headerTooltip: 'Format', field: 'format', width: 110, headerClass: ['aggridtextalign-left'], cellClass: ['align-c'] },
    { headerName: 'Uloaded by', headerTooltip: 'Uploaded by', field: 'uploadedby', width: 150, headerClass: ['aggridtextalign-left'], cellClass: ['align-c'], },
    { headerName: 'Date uploaded', headerTooltip: 'Date uploaded', field: 'date', width: 170, headerClass: ['aggridtextalign-left'], cellClass: ['align-c'], },
    {
      headerName: 'Remarks', headerTooltip: 'Remarks', field: 'remarks', headerClass: ['aggridtextalign-left'], width: 200, cellClass: ['align-c']
    },
    {
      field: "download",
      menuTabs: [],
      resizable: false,
      width: 140,
      filter: false,
      sortable: false,
      headerName: 'Download', headerTooltip: "Download", headerClass: ['aggridtextalign-center'],
      cellClass: ['align-c aggridtextalign-center'],
      cellRenderer: function (params) {
        let deleteicon =
          `<div class="download-icon"></div>`;
        return deleteicon;
      }
    }

  ];

  private rowData_doclist = [

    {
      name: "Demo contract", uploadedby: 'Alexander James', format: 'PDF', date: '12/10/2020', currency: 'USD', doclist: 'AMS texas August', type: 'Contract Document', remarks: 'modified contract on 12/10/2020'
    },
    {
      name: "Demo contract", uploadedby: 'Alexander James', format: 'PDF', date: '12/10/2020', currency: 'USD', doclist: 'Colonial Test', type: 'Contract Document', remarks: 'modified contract on 12/10/2020'
    },
    {
      name: "Demo contract", uploadedby: 'Alexander James', format: 'PDF', date: '12/10/2020', currency: 'USD', doclist: 'Colonial Test', type: 'Contract Document', remarks: 'modified contract on 12/10/2020'
    },
    {
      name: "Demo contract", uploadedby: 'Alexander James', format: 'PDF', date: '12/10/2020', currency: 'USD', doclist: 'Colonial Test', type: 'Contract Document', remarks: 'modified contract on 12/10/2020'
    },
    {
      name: "Demo contract", uploadedby: 'Alexander James', format: 'PDF', date: '12/10/2020', currency: 'USD', doclist: 'Colonial Test', type: 'Contract Document', remarks: 'modified contract on 12/10/2020'
    }


  ]
}
