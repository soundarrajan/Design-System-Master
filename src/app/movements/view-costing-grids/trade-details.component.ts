import { Component, Input } from '@angular/core';
import { GridOptions } from "ag-grid-community";

@Component({
    selector: 'trade-details',
    template:
        `
    <div class="agGrid-v2" style="width:100%;height:245px;margin: 0;">
        <ag-grid-angular style="width: 100%;height: 100%;"  [gridOptions]="table_gridOptions" 
        class="ag-grid-v2 ag-theme-material angular-v9 custom-total-row">
        </ag-grid-angular>
    </div>
    `,
})
export class TradeDetailsComponent {
    public table_gridOptions: GridOptions;
    public totalQuantity;
    public totalPrice;
    public totalAmount;
    public rowData = [];
    @Input('tradeDetailsData') tradeDetailsData;
    ngOnInit() {
    }
    ngOnChanges() {
        this.rowData = this.tradeDetailsData;
    }
    constructor() {
        this.table_gridOptions = <GridOptions>{
            defaultColDef: {
                filter: true,
                sortable: true,
                resizable: true
            },
            columnDefs: this.columnDefs,
            suppressRowClickSelection: true,
            headerHeight: 30,
            rowHeight: 35,
            onGridReady: params => {
                this.table_gridOptions.api = params.api;
                this.table_gridOptions.columnApi = params.columnApi;
                this.table_gridOptions.api.sizeColumnsToFit();
                this.table_gridOptions.api.setRowData(this.rowData);
                // this.table_gridOptions.api.setPinnedBottomRowData(this.totalrowData);
                params.api.setPinnedBottomRowData([
                    { description: 'COGS', price: this.totalPrice, amount: this.totalAmount }
                ]);

            },
            onFirstDataRendered(params) {
                params.api.sizeColumnsToFit();
            },
            onColumnResized: function (params) {
                if (params.columnApi.getAllDisplayedColumns().length <= 6 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
                    params.api.sizeColumnsToFit();
                }
            }
        };
        this.totalQuantity = this.rowData
            .map(data => data.quantity)
            .reduce((res, curr) => res + curr, 0);
        this.totalPrice = this.rowData
            .map(data => data.price)
            .reduce((res, curr) => res + curr, 0);
        this.totalAmount = this.rowData
            .map(data => data.amount)
            .reduce((res, curr) => res + curr, 0);
    }

    public columnDefs = [

        {
            headerName: "Description",
            headerTooltip: "Description",
            field: "description",
            width: 350
        },

        {
            headerName: "Quantity",
            headerTooltip: "Quantity",
            field: "quantity",
            type: 'numericColumn',
            valueFormatter: this.numberFormatter
        },

        {
            headerName: "Per Unit Price",
            headerTooltip: "Per Unit Price",
            field: "price",
            type: 'numericColumn',
            valueFormatter: this.numberFormatter
        },
        {
            headerName: "Amount",
            headerTooltip: "Amount",
            field: "amount",
            type: 'numericColumn',
            valueFormatter: this.numberFormatter
        }
    ];

    public numberFormatter(params) {
        // params.data - full row data
        // params.value - cell value
        if (isNaN(params.value))
            return params.value;
        else
            return params.value.toFixed(4);
    }

}