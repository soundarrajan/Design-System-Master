import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';

@Component({
  selector: 'app-new-option-emaillog',
  templateUrl: './new-option-emaillog.component.html',
  styleUrls: ['./new-option-emaillog.component.scss']
})
export class NewOptionEmaillogComponent implements OnInit {
  public gridOptions_emailLog: GridOptions;

  constructor() {

    this.gridOptions_emailLog = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: true,
        sortable: true
      },
      columnDefs: this.columnDef_emailLog,
      suppressRowClickSelection: true,
      headerHeight: 31,
      rowHeight: 25,
      animateRows: true,
      onCellValueChanged: ($event) => {
        console.log($event);
      },

      onGridReady: (params) => {
        this.gridOptions_emailLog.api = params.api;
        this.gridOptions_emailLog.columnApi = params.columnApi;
        params.api.sizeColumnsToFit();
        this.gridOptions_emailLog.api.setRowData(this.rowData_emailLog);

      },
      getRowClass: (params) => {
        let classes: string[] = [];

        if (classes.length > 0)
          return classes;
      },
      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 5 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 5) {
          params.api.sizeColumnsToFit();

        }
      }
    }
  }

  ngOnInit() {
  }
  private columnDef_emailLog = [
    { headerName: 'Mail Sent to', headerTooltip: 'Mail Sent to', field: 'username', headerClass: ['aggridtextalign-left'], cellClass: ['aggrid-left-ribbon amberyellow'] },
    {
      headerName: 'Status', headerTooltip: 'Status', field: 'status', headerClass: ['aggrid-text-align-c'],
      cellRendererFramework: AGGridCellRendererComponent, cellClass: ['aggridtextalign-center'],
      cellRendererParams: function (params) {
        var classArray: string[] = [];
        classArray.push('aggridtextalign-center custom-chip medium-chip amberyellow');
        return { cellClass: classArray.length > 0 ? classArray : null }
      }
    },
    { headerName: 'Sender ', headerTooltip: 'Sender ', field: 'sender', headerClass: ['aggridtextalign-left'] },
    { headerName: 'Subject', headerTooltip: 'Subject', field: 'subject', headerClass: ['aggridtextalign-left'] },
    { headerName: 'Mail Date', headerTooltip: 'Mail Date', field: 'date', headerClass: ['aggridtextalign-left'] }];

  private rowData_emailLog = [

    {
      subject: 'Feed Failed', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'alex@inatech.com', status: 'Pending'
    },
    {
      subject: 'Feed Failed', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'alex@inatech.com', status: 'Pending'
    },
    {
      subject: 'Ref no. 19226751', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'alex@inatech.com', status: 'Pending'
    },
    {
      subject: 'Feed Failed', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'alex@inatech.com', status: 'Pending'
    },
    {
      subject: 'Feed Failed', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'alex@inatech.com', status: 'Pending'
    },
    {
      subject: 'Ref no. 19226751', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'alex@inatech.com', status: 'Pending'
    },
    {
      subject: 'Feed Failed', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'alex@inatech.com', status: 'Pending'
    },
    {
      subject: 'Feed Failed', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'yusuf@inatech.com', status: 'Pending'
    },
    {
      subject: 'Ref no. 19226751', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'yusuf@inatech.com', status: 'Pending'
    },
    {
      subject: 'Feed Failed', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'yusuf@inatech.com', status: 'Pending'
    },
    {
      subject: 'Feed Failed', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'yusuf@inatech.com', status: 'Pending'
    },
    {
      subject: 'Ref no. 19226751', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'yusuf@inatech.com', status: 'Pending'
    },
    {
      subject: 'Feed Failed', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'alex@inatech.com', status: 'Pending'
    },
    {
      subject: 'Feed Failed', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'alex@inatech.com', status: 'Pending'
    },
    {
      subject: 'Ref no. 19226751', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'alex@inatech.com', status: 'Pending'
    },
    {
      subject: 'Feed Failed', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'yusuf@inatech.com', status: 'Pending'
    },
    {
      subject: 'Ref no. 19226751', sender: 'alex@inatech.com', date: '12/09/2020 09:34', username: 'yusuf@inatech.com', status: 'Pending'
    }
  ]

}
