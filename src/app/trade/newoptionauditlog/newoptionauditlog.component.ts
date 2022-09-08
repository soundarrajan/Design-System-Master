import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";

@Component({
  selector: 'app-newoptionauditlog',
  templateUrl: './newoptionauditlog.component.html',
  styleUrls: ['./newoptionauditlog.component.scss']
})
export class NewoptionauditlogComponent implements OnInit {
  public gridOptions_auditLog: GridOptions;

  constructor() {

    this.gridOptions_auditLog = <GridOptions>{
      masterDetail: true,
      defaultColDef: {
        resizable: true,
        filtering: true,
        sortable: true
      },
      icons: {
        groupExpanded: '<img src="../../../assets/icon/collapseGridIcon.svg" style="width: 15px;margin-top:5px;"/>',
        groupContracted: '<img src="../../../assets/icon/expandGridIcon.svg" style="width: 15px;margin-top:5px;"/>'
      },
      columnDefs: this.columnDef_auditLog,
      suppressRowClickSelection: true,
      headerHeight: 35,
      rowHeight: 25,
      // detailRowHeight: 140,
      animateRows: true,
      detailCellRendererParams: {
        detailGridOptions: {
          suppressRowClickSelection: true,
          headerHeight: 35,
          rowHeight: 25,
          animateRows: false,
          suppressHorizontalScroll: true,
          columnDefs: [
            { headerName: 'Entity ', headerTooltip: 'Entity ', field: 'entity', headerClass: ['aggridtextalign-left'], width: 100 },
            { headerName: 'Field ', headerTooltip: 'Field ', field: 'field', headerClass: ['aggridtextalign-left'], width: 100 },
            { headerName: 'Old Value', headerTooltip: 'Old Value', field: 'oldvalue', headerClass: ['aggridtextalign-left'], width: 100 },
            { headerName: 'New Value', headerTooltip: 'New Value', field: 'newvalue', headerClass: ['aggridtextalign-left'] },
          ],
          defaultColDef: {
            flex: 1,
            sortable: true,
            resizable: true,
            filtering: true
          },
          onFirstDataRendered(params) {
            params.api.sizeColumnsToFit();
          }
        },

        getDetailRowData: function (params) {
          params.successCallback(params.data.sub_data);
        }
      },
      getRowHeight: function (params) {
        if (params.node && params.node.detail) {
          //add header height + an extra 5 for margin to the total calculated detail height
          var detailPanelHeight = (params.data.sub_data.length * 25) + 40;
          return detailPanelHeight;
        }
        else return 25;
      },
      onCellValueChanged: ($event) => {
        console.log($event);
      },

      onGridReady: (params) => {
        this.gridOptions_auditLog.api = params.api;
        this.gridOptions_auditLog.columnApi = params.columnApi;
        this.gridOptions_auditLog.api.setRowData(this.rowData_auditLog);
        params.api.sizeColumnsToFit();

      },
      getRowClass: (params) => {
        let classes: string[] = [];

        if (classes.length > 0)
          return classes;
      },
      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 6 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 6) {
          params.api.sizeColumnsToFit();

        }
      }
    }
  }

  ngOnInit() {
  }
  private columnDef_auditLog = [
    { headerName: 'Date', headerTooltip: 'Date', field: 'date', cellRenderer: "agGroupCellRenderer", headerClass: ['aggridtextalign-left'], width: 100 },
    { headerName: 'User Name', headerTooltip: 'User Name', field: 'username', headerClass: ['aggridtextalign-left'], width: 100 },
    { headerName: 'Event Type', headerTooltip: 'Event Type', field: 'eventtype', headerClass: ['aggridtextalign-left'] }
  ];

  private rowData_auditLog = [
    {
      eventtype: 'Edit', fieldname: 'Base Price', newvalue: '2 Lot', oldvalue: '0 Lot', username: 'Alexander James', date: '27-Apr-2018  11:34', sub_data:
        [{
          entity: 'Options',
          field: 'Lots',
          oldvalue: '1',
          newvalue: '2'
        },
        {
          entity: 'Additional cost',
          field: 'Buyer/Seller',
          oldvalue: 'PMG oil co',
          newvalue: 'ABC oil co'
        },
        {
          entity: 'Options',
          field: 'Book',
          oldvalue: 'Book1',
          newvalue: 'Book2'
        },
        {
          entity: 'Additional cost',
          field: 'Premium',
          oldvalue: '0.1900',
          newvalue: '0.1928'
        }]
    },
    {
      eventtype: 'Edit', fieldname: 'Base Price', newvalue: '0 Lot', oldvalue: '2 Lot', username: 'Yusuf Hassan', date: '27-Apr-2018  11:34', sub_data:
        [{
          entity: 'Options',
          field: 'Lots',
          oldvalue: '1',
          newvalue: '2'
        },
        {
          entity: 'Additional cost',
          field: 'Buyer/Seller',
          oldvalue: 'PMG oil co',
          newvalue: 'ABC oil co'
        },
        {
          entity: 'Options',
          field: 'Book',
          oldvalue: 'Book1',
          newvalue: 'Book2'
        },
        {
          entity: 'Additional cost',
          field: 'Premium',
          oldvalue: '0.1900',
          newvalue: '0.1928'
        }]
    },
    {
      eventtype: 'Edit', fieldname: 'Base Price', newvalue: '3 Lot', oldvalue: '0 Lot', username: 'Yusuf Hassan', date: '27-Apr-2018  11:34', sub_data:
        [{
          entity: 'Options',
          field: 'Lots',
          oldvalue: '1',
          newvalue: '2'
        },
        {
          entity: 'Additional cost',
          field: 'Buyer/Seller',
          oldvalue: 'PMG oil co',
          newvalue: 'ABC oil co'
        },
        {
          entity: 'Options',
          field: 'Book',
          oldvalue: 'Book1',
          newvalue: 'Book2'
        },
        {
          entity: 'Additional cost',
          field: 'Premium',
          oldvalue: '0.1900',
          newvalue: '0.1928'
        }]
    },

  ]

}
