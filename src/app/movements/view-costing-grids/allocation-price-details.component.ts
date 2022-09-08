import { Component, Input } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { AGGridCellActionsComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';

@Component({
    selector: 'allocation-price-details',
    template:
        `
    <div class="agGrid-v2" style="width:100%;height:245px;margin: 0;">
        <ag-grid-angular style="width: 100%;height: 100%;"  [gridOptions]="table_gridOptions" 
        class="ag-grid-v2 ag-theme-material angular-v9 custom-total-row">
        </ag-grid-angular>
    </div>
    <!-- GRIDS -->
    <div class="view-costing-grids detail" *ngFor="let item of displayGridList">
        <div *ngIf="item.key.includes('show-detail-journal')">
            <div class="title">Draft Journal for Allocation <span class="highlight">{{item.data.delivery_no}}</span>
            </div>
            <journal-grid [journalData]="item.data.detailJournalData"></journal-grid>
        </div>
        <div *ngIf="item.key.includes('show-trade-details')">
            <div class="title">Trade Details  <span
                    class="highlight">{{item.data.delivery_no}}</span></div>
            <trade-details [tradeDetailsData]="item.data.tradedetailsData"></trade-details>
        </div>
    </div>
    `,
})
export class AllocationPriceDetailsComponent {
    public table_gridOptions: GridOptions;
    @Input('allocationData') allocationData;
    public rowData = [];
    public displayGridList = [];

    ngOnInit() {
    }
    ngOnChanges() {
        this.rowData = this.allocationData;
    }
    showMasterJournal(e) {
        let key = "show-detail-journal" + e.node.rowIndex;

        if ((this.displayGridList.length <= 0) || this.displayGridList.filter(item => item.key == key).length <= 0) {
            let entry = {
                key: key,
                data: e.node.data
            }
            this.displayGridList.unshift(entry);
        }
        else if (this.displayGridList.length > 0) {
            this.displayGridList = this.displayGridList.filter(item => item.key != key)
        }
    }
    showAlocationDetails(e) {
        let key = "show-trade-details" + e.node.rowIndex;

        if ((this.displayGridList.length <= 0) || this.displayGridList.filter(item => item.key == key).length <= 0) {
            let entry = {
                key: key,
                data: e.node.data
            }
            this.displayGridList.unshift(entry);
        }
        else if (this.displayGridList.length > 0) {
            this.displayGridList = this.displayGridList.filter(item => item.key != key)
        }
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
            headerHeight: 35,
            rowHeight: 35,
            animateRows: false,
            onGridReady: params => {
                this.table_gridOptions.api = params.api;
                this.table_gridOptions.columnApi = params.columnApi;
                this.table_gridOptions.api.sizeColumnsToFit();
                this.table_gridOptions.api.setRowData(this.rowData);

            },
            onFirstDataRendered(params) {
                params.api.sizeColumnsToFit();
            },
            onColumnResized: function (params) {
                if (params.columnApi.getAllDisplayedColumns().length <= 13 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
                    params.api.sizeColumnsToFit();
                }
            },
            onColumnVisible: function (params) {
                if (params.columnApi.getAllDisplayedColumns().length <= 13) {
                    params.api.sizeColumnsToFit();

                }
            }
        };
    }

    public columnDefs = [
        { headerName: 'Delivery No.', headerTooltip: 'Delivery No', field: 'delivery_no', cellClass: ['aggridlink'] },
        { headerName: 'Movement ID', headerTooltip: 'Movement ID', field: 'mov_id', cellClass: ['aggridlink'] },
        { headerName: 'COGS Tkt ID', headerTooltip: 'COGS Tkt ID', field: 'cogs_id', cellClass: ['aggridlink'] },
        { headerName: 'Tkt Type', headerTooltip: 'Tkt Type', field: 'tkt_type' },
        { headerName: 'Category', headerTooltip: 'Category', field: 'category' },
        { headerName: 'COGS Grp/B2B Deal ID', headerTooltip: 'COGS Grp/B2B Deal ID', field: 'cogs_deal_id' },
        { headerName: 'Sort Order / Deliv#', headerTooltip: 'Sort Order / Deliv#', field: 'sort_del' },
        { headerName: 'Quantity', headerTooltip: 'Quantity', field: 'quantity' },
        { headerName: 'UOM', headerTooltip: 'UOM', field: 'uom' },
        { headerName: 'Per Unit COGS', headerTooltip: 'Per Unit COGS', field: 'per_unit', type: "numericColumn" },
        { headerName: 'Amount', headerTooltip: 'Amount', field: 'amount', type: "numericColumn" },
        {
            headerName: 'Show Journal', headerTooltip: 'Show Journal', field: 'show_journal', suppressMenu: true, resizable: false, headerClass: ['aggridtextalign-center'],
            cellClass: ['aggridtextalign-center'], cellStyle: { 'align-items': 'center' },
            cellRenderer: (params) => {
                let eDiv = document.createElement('div');
                let className = 'show-detail-journal' + params.node.rowIndex;
                eDiv.innerHTML = '<div id= ' + className + ' class=" toggle-grid-arrow" ></div>';
                var eButton = eDiv.querySelectorAll('#' + className).length > 0 ? eDiv.querySelectorAll('#' + className)[0] : null;
                if (eButton != null) {
                    eButton.addEventListener('click', function (e) {
                        if (eButton.classList.contains('rotate180'))
                            eButton.classList.remove('rotate180');
                        else
                            eButton.classList.add('rotate180');
                        params.onClick(params);
                    });
                }
                return eDiv;
            },
            cellRendererParams: {
                onClick: this.showMasterJournal.bind(this)
            }
        },
        {
            headerName: 'Show Calc.', headerTooltip: 'Show Calc.', field: 'show_calc', suppressMenu: true, resizable: false, headerClass: ['aggridtextalign-center'],
            cellClass: ['aggridtextalign-center'], cellStyle: { 'align-items': 'center' },
            cellRenderer: (params) => {
                let eDiv = document.createElement('div');
                let className = 'show-trade-details' + params.node.rowIndex;
                eDiv.innerHTML = '<div id= ' + className + ' class=" toggle-grid-arrow" ></div>';
                var eButton = eDiv.querySelectorAll('#' + className).length > 0 ? eDiv.querySelectorAll('#' + className)[0] : null;
                if (eButton != null) {
                    eButton.addEventListener('click', function (e) {
                        if (eButton.classList.contains('rotate180'))
                            eButton.classList.remove('rotate180');
                        else
                            eButton.classList.add('rotate180');
                        params.onClick(params);
                    });
                }
                return eDiv;
            },
            cellRendererParams: {
                onClick: this.showAlocationDetails.bind(this)
            }
        },

    ];
    // private rowData = [
    //     {
    //         delivery_no: 'DEL0001319', mov_id: 'MV0001318', cogs_id: 'CG0091827', tkt_type: 'INV IN', category: '',
    //         cogs_deal_id: 'Math COGS FIFO', sort_del: '00001', quantity: '1000.0000', uom: 'GAL', per_unit: '1000.0000',
    //         amount: '-1000.0000', show_journal: '', show_calc: ''
    //     }
    // ]

}