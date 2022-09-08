import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { Location } from '@angular/common';

@Component({
  selector: 'app-movements-auditlog',
  templateUrl: './movements-auditlog.component.html',
  styleUrls: ['./movements-auditlog.component.scss']
})
export class MovementsAuditlogComponent implements OnInit {
  public gridOptions_auditLog: GridOptions;

  constructor(private _location: Location) {
    this.gridOptions_auditLog = <GridOptions>{
      masterDetail: true,
      //detailRowAutoHeight: true,
      defaultColDef: {
        resizable: true,
        filter: true,
        sortable: true
      },
      icons: {
        groupExpanded: '<img src="../../../assets/icon/collapseGridIcon.svg" style="width: 15px;margin-top:5px;"/>',
        groupContracted: '<img src="../../../assets/icon/expandGridIcon.svg" style="width: 15px;margin-top:5px;"/>'
      },
      columnDefs: this.columnDef_auditLog,
      suppressRowClickSelection: true,
      suppressHorizontalScroll: true,
      headerHeight: 35,
      //rowHeight: 25,
      //detailRowHeight: 100,
      animateRows: true,
      detailCellRendererParams: {
        detailGridOptions: {
          headerHeight: 35,
          rowHeight: 25,
        //  / domLayout: 'autoHeight',
          animateRows: false,
          suppressHorizontalScroll: true,
          suppressRowClickSelection: true,
          columnDefs: [
            { headerName: 'Entity ', headerTooltip: 'Entity ', field: 'entity', headerClass: ['aggridtextalign-left']},
            { headerName: 'Field ', headerTooltip: 'Field ', field: 'field', headerClass: ['aggridtextalign-left']},
            { headerName: 'Old Value', headerTooltip: 'Old Value', field: 'oldvalue', headerClass: ['aggridtextalign-left'] },
            { headerName: 'New Value', headerTooltip: 'New Value', field: 'newvalue', headerClass: ['aggridtextalign-left'] },
          ],
          defaultColDef: {
            flex: 1,
            sortable: true,
            resizable: true,
            filter: true,
            suppressSizeToFit: true
          },
          onFirstDataRendered(params) {
            params.api.sizeColumnsToFit();
          },
          onColumnResized: function (params) {
            if (params.columnApi.getAllDisplayedColumns().length <= 4 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
              params.api.sizeColumnsToFit();
            }
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
          if(!(detailPanelHeight>200))
          detailPanelHeight = 245;
          // if (params.data.sub_data.length > 5)
          //   var detailPanelHeight = (params.data.sub_data.length * 25) + 40;
          // else
          //   var detailPanelHeight = (params.data.sub_data.length * 25) + 200;
          return detailPanelHeight;
        }
        else return 25;
      },

      onGridReady: (params) => {
        this.gridOptions_auditLog.api = params.api;
        this.gridOptions_auditLog.columnApi = params.columnApi;
        this.gridOptions_auditLog.api.setRowData(this.rowData_auditLog);
        params.api.sizeColumnsToFit();

      },
    
      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 3 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      }
    }
  }

  ngOnInit() {
  }
  goBack() {
    this._location.back();
  }

  private columnDef_auditLog = [
    { headerName: 'Date', headerTooltip: 'Date', field: 'date', cellRenderer: "agGroupCellRenderer", headerClass: ['aggridtextalign-left'] ,width:300,suppressSizeToFit: true},
    { headerName: 'User Name', headerTooltip: 'User Name', field: 'username', headerClass: ['aggridtextalign-left'],suppressSizeToFit: true ,width:300},
    { headerName: 'Event Type', headerTooltip: 'Event Type', field: 'eventtype', headerClass: ['aggridtextalign-left'] }
  ];

  private rowData_auditLog = [
    {
      eventtype: 'Edit', fieldname: 'Base Price', newvalue: '2 Lot', oldvalue: '0 Lot', username: 'Alexander James', date: '27-Apr-2018  11:34', sub_data:
        [{
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        }]
    },
    {
      eventtype: 'Edit', fieldname: 'Base Price', newvalue: '0 Lot', oldvalue: '2 Lot', username: 'Yusuf Hassan', date: '27-Apr-2018  11:34', sub_data:
        [{
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        }, {
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        }, {
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        }, {
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        }, {
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        }]
    },
    {
      eventtype: 'Edit', fieldname: 'Base Price', newvalue: '3 Lot', oldvalue: '0 Lot', username: 'Yusuf Hassan', date: '27-Apr-2018  11:34', sub_data:
        [{
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        },
        {
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        }, {
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        }, {
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        }, {
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        }, {
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        },
        {
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        }, {
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        }, {
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        }, {
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '1000.00'
        }, {
          entity: 'Quantity',
          field: 'Mass Qty',
          oldvalue: '1500.00',
          newvalue: '220.00'
        }]
    },

  ]
}
