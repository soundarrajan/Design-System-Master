import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridOptions } from "ag-grid-community";

@Component({
  selector: 'app-tank-popup',
  templateUrl: './tank-popup.component.html',
  styleUrls: ['./tank-popup.component.css']
})
export class TankPopupComponent implements OnInit {
  public isdisplaydensityhigh: boolean = false;
  public gridOptions: GridOptions;
  public columnSelection: any;

  ngOnInit() {
  }

  constructor(
    public dialogRef: MatDialogRef<TankPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.gridOptions = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filter: true,
        sortable: true
      },
      columnDefs: this.columnDefs,
      animateRows: true,
      suppressRowClickSelection: true,
      headerHeight: 30,
      rowHeight: 25,
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },
      onGridReady: params => {
        this.gridOptions.api = params.api;
        this.gridOptions.columnApi = params.columnApi;
        this.gridOptions.api.sizeColumnsToFit();
        this.gridOptions.api.setRowData(this.rowData);
      },
      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 5 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      }
    };

  }

  public columnDefs = [
    {
      headerName: "Tank ID",
      field: "id",
      width: 80
    },
    {
      headerName: "Tank",
      field: "tank"
    },

    {
      headerName: "COGS Group",
      field: "group"
    },
    {
      headerName: "Terminal",
      field: "terminal"
    },
    {
      headerName: "Costing Type",
      field: "type",
      width: 90
    }
  ];


  private rowData = [
    {
      id: "0001",
      tank: "Ethanol RIN 2019",
      group: "Ethanol RIN 2019",
      terminal: "Petro Diamond Terminal Corporation",
      type: "FIFO"

    },
    {
      id: "0002",
      tank: "Ethanol RIN 2021",
      group: "Ethanol RIN 2021",
      terminal: "Petro Diamond Terminal Corporation",
      type: "FIFO"

    },
    {
      id: "0003",
      tank: "Diesel Tank",
      group: "Diesel Tank",
      terminal: "Petro Diamond Terminal Corporation",
      type: "MOVAVG"

    },
    {
      id: "0004",
      tank: "Gasoil",
      group: "Gasoil",
      terminal: "Petro Diamond Terminal Corporation",
      type: "FIFO"

    },
    {
      id: "0005",
      tank: "Ethanol RIN 2020",
      group: "Ethanol RIN 2020",
      terminal: "Petro Diamond Terminal Corporation",
      type: "MOVAVG"

    },
    {
      id: "0006",
      tank: "Bio Fuel",
      group: "Bio Fuel",
      terminal: "Petro Diamond Terminal Corporation",
      type: "FIFO"

    }
  ];

}
