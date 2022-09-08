import { Component, OnInit, Inject } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'volume-quantity-dialog',
    template:
        `
      <div class="header-container">
        <div class="title">Volume Quantity Calculation</div>
        <div class="popup-close-icon"  [mat-dialog-close]="true"></div>
      </div>
      <div>
        <mat-dialog-content>
          <ag-grid-angular domLayout='autoHeight' style="width: 100%;height: 100%;" [gridOptions]="dialog_gridOptions" class="ag-popupgrid-v2 ag-theme-material angular-v9">
          </ag-grid-angular>
        </mat-dialog-content>
      </div>
    `,
})
export class VolumeQuantityDialog {

    public dialog_gridOptions: GridOptions;
    public totalHeightDiff;
    public totalQuantity;
    ngOnInit() {
    }
    constructor(
        public dialogRef: MatDialogRef<VolumeQuantityDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.dialog_gridOptions = <GridOptions>{
            defaultColDef: {
                filter: true,
                sortable: true,
                resizable: true
            },
            columnDefs: this.columnDefs,
            suppressRowClickSelection: true,
            headerHeight: 30,
            rowHeight: 25,
            // groupIncludeTotalFooter: true,
            onGridReady: params => {
                this.dialog_gridOptions.api = params.api;
                this.dialog_gridOptions.columnApi = params.columnApi;
                this.dialog_gridOptions.api.sizeColumnsToFit();
                this.dialog_gridOptions.api.setRowData(this.rowData);
                params.api.setPinnedBottomRowData([
                    { heightFrom: 'Total Quantity', heightDiff: this.totalHeightDiff, quantity: this.totalQuantity }
                ]);
            },
            onColumnResized: function (params) {
                if (params.columnApi.getAllDisplayedColumns().length <= 5 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
                    params.api.sizeColumnsToFit();
                }
            }
        };
        this.totalHeightDiff = this.rowData
            .map(data => data.heightDiff)
            .reduce((res, curr) => res + curr, 0);
        this.totalQuantity = this.rowData
            .map(data => data.quantity)
            .reduce((res, curr) => res + curr, 0);
    }
    public columnDefs = [
        {
            headerName: "Tank Height From",
            headerTooltip: "Tank Height From",
            field: "heightFrom",
            type: 'numericColumn',
            valueFormatter: this.numberFormatter
        },
        {
            headerName: "Tank Height To",
            headerTooltip: "Tank Height To",
            field: "heightTo",
            type: 'numericColumn',
            valueFormatter: this.numberFormatter
        },

        {
            headerName: "Tank Height Diference",
            headerTooltip: "Tank Height Diference",
            field: "heightDiff",
            type: 'numericColumn',
            valueFormatter: this.numberFormatter
            // aggFunc: 'sum'
        },

        {
            headerName: "Volume per Inch",
            headerTooltip: "Volume per Inch",
            field: "volume",
            type: 'numericColumn',
            valueFormatter: this.numberFormatter
        },

        {
            headerName: "Quantity(CAR)",
            headerTooltip: "Quantity(CAR)",
            field: "quantity",
            type: 'numericColumn',
            valueFormatter: this.numberFormatter
            // aggFunc: 'sum'
        },
    ];

    public numberFormatter(params) {
        // params.data - full row data
        // params.value - cell value
        if (isNaN(params.value))
            return params.value;
        else
            return params.value.toFixed(4);
    }
    private rowData = [
        {
            heightFrom: 0.1000,
            heightTo: 15.0000,
            heightDiff: 10.0000,
            volume: 5.0000,
            quantity: 50.0000
        },
        {
            heightFrom: 150.0000,
            heightTo: 0.0000,
            heightDiff: 5.0000,
            volume: 15.0000,
            quantity: 75.0000
        }
    ]

}