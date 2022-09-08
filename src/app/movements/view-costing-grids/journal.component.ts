import { Component, Input } from '@angular/core';
import { GridOptions } from "ag-grid-community";

@Component({
    selector: 'journal-grid',
    template:
        `
    <div class="agGrid-v2" style="width:100%;height:245px;margin: 0;">
        <ag-grid-angular style="width: 100%;height: 100%;" [gridOptions]="table_gridOptions" 
        class="ag-grid-v2 ag-theme-material angular-v9 custom-total-row">
        </ag-grid-angular>
    </div>
    `,
})
export class JournalComponent {

    public table_gridOptions: GridOptions;
    public totalDebit;
    public totalCredit;
    public rowData = [];
    @Input('journalData') journalData;
    ngOnInit() {
    }
    ngOnChanges() {
        this.rowData = this.journalData;
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
                    { date: 'Total', debit: this.totalDebit, credit: this.totalCredit }
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
        this.totalDebit = this.rowData
            .map(data => data.debit)
            .reduce((res, curr) => res + curr, 0);
        this.totalCredit = this.rowData
            .map(data => data.credit)
            .reduce((res, curr) => res + curr, 0);
    }

    public columnDefs = [
        {
            headerName: "Date",
            headerTooltip: "Date",
            field: "date"
        },
        {
            headerName: "Journal ID",
            headerTooltip: "Journal ID",
            field: "journalId"
        },

        {
            headerName: "GL Account",
            headerTooltip: "GL Account",
            field: "glAccount"
        },

        {
            headerName: "Description",
            headerTooltip: "Description",
            field: "description",
            width: 350
        },

        {
            headerName: "Debit Amount",
            headerTooltip: "Debit Amount",
            field: "debit",
            type: 'numericColumn',
            valueFormatter: this.numberFormatter
        },

        {
            headerName: "Credit Amount",
            headerTooltip: "Credit Amount",
            field: "credit",
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