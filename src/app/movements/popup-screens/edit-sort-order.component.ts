import { Component, OnInit, Inject } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AGGridCellActionsComponent } from '../../shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { WarningDialog } from './warning.component';

@Component({
    selector: 'edit-sort-order-dialog',
    template:
        `
      <div class="header-container">
        <div class="title">Cogs Sort Order Change</div>
        <div style="display: flex;">
            <button class="cancel-action-btn" style="margin-right: 10px;" [mat-dialog-close]="true">
                <span>Cancel</span>
            </button>
            <button class="reset-action-btn" [disabled]="!enableReset || !enableSave" style="margin-right: 10px;" [mat-dialog-close]="true">
                <span>Reset</span>
            </button>
            <button class="save-action-btn" [disabled]="!enableReset || !enableSave" [mat-dialog-close]="true" (click)="openWarningPopup()">
                <span>Save</span>
            </button>
            <span class="seperator-line"></span>
            <span class="popup-close-icon close-icon" style="padding-left: 7px;" [mat-dialog-close]="true"></span>
        </div>
      </div>
      <div>
        <mat-dialog-content class="agGrid-v2">
          <ag-grid-angular domLayout='autoHeight' style="width: 100%;height: 100%;" [gridOptions]="dialog_gridOptions" [rowDragManaged]="true" (rowDragMove)="onRowDragMove($event)" class="ag-theme-material ag-grid-v2 angular-v9">
          </ag-grid-angular>
        </mat-dialog-content>
      </div>
    `,
    styles: [`
        .seperator-line{
            top: -1px;
            position: relative;
            left: 4px;
            padding: 0px 4px;
            content: url("data:image/svg+xml,%3Csvg width='2' height='29' viewBox='0 0 2 29' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 0V29' stroke='%23E5E5E5'/%3E%3C/svg%3E%0A");
        }
        .close-icon{
            margin-top: 3px;
            width: 30px;
            height: 23px;
        }
    `]
})
export class EditSortOrderDialog {

    public dialog_gridOptions: GridOptions;
    public popupOpen: boolean;
    enableReset: boolean = false;
    enableSave: boolean = false;

    ngOnInit() {
    }
    constructor(
        public dialogRef: MatDialogRef<EditSortOrderDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
        this.dialog_gridOptions = <GridOptions>{
            defaultColDef: {
                filter: false,
                sortable: false,
                resizable: true
            },
            columnDefs: this.columnDefs,
            suppressRowClickSelection: true,
            headerHeight: 30,
            rowHeight: 30,
            onGridReady: params => {
                this.dialog_gridOptions.api = params.api;
                this.dialog_gridOptions.columnApi = params.columnApi;
                this.dialog_gridOptions.api.sizeColumnsToFit();
                this.dialog_gridOptions.api.setRowData(this.rowData);
            },
            onColumnResized: function (params) {
                if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
                    params.api.sizeColumnsToFit();
                }
            }
        };
    }

    public columnDefs = [
        /* { headerName: 'New Sort Order', headerTooltip: 'New Sort Order', width: 100, field: 'new_sort_order', cellClass: ['aggridtextalign-left'],
        cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'cell-edit-sort-order' } },
         */
        { headerName: '', headerTooltip: '', width: 10, field: 'new_sort_order', cellClass: ['aggridtextalign-center'], cellStyle: {'padding-left': '40px'}, rowDrag: true },
        { headerName: 'Sort Order', headerTooltip: 'Sort Order', width: 100, field: 'sort_order', editable: true, singleClickEdit: true, cellClass: ['aggridtextalign-left'] },
        { headerName: 'Ticket ID', headerTooltip: 'Ticket ID', width: 100, field: 'ticket_id', editable: true, singleClickEdit: true, cellClass: ['aggridtextalign-left'] },
        { headerName: 'Linked Movement ID', headerTooltip: 'Linked Movement ID', width: 100, field: 'mov_id', editable: true, singleClickEdit: true, cellClass: ['aggridlink'] },
        { headerName: 'Movement Date', headerTooltip: 'Movement Date', width: 100, field: 'mov_date', editable: true, singleClickEdit: true, cellClass: ['aggridtextalign-left'] },
        { headerName: 'COGS Group', headerTooltip: 'COGS Group', width: 100, field: 'cogs_grp', editable: true, singleClickEdit: true, cellClass: ['aggridtextalign-left'] },
        { headerName: 'Quantity', headerTooltip: 'Quantity', width: 100, field: 'quantity', editable: true, singleClickEdit: true, cellClass: ['aggridtextalign-left'] },
        { headerName: 'Movement Type', headerTooltip: 'Movement Type', width: 100, field: 'mov_type', editable: true, singleClickEdit: true, cellClass: ['aggridtextalign-left'] },
        
    ];

    private rowData = [
        {
            new_sort_order: '', sort_order: '001', ticket_id: 'CG0091827', mov_id: 'MV0001319', mov_date: '05-11-2020', cogs_grp: 'Math COGS FIFO', quantity: '1000.0000', mov_type: 'Transfer Out' 
        },
        {
            new_sort_order: '', sort_order: '002', ticket_id: 'CG0091828', mov_id: 'MV0001318', mov_date: '05-11-2020', cogs_grp: 'Math COGS FIFO', quantity: '1000.0000', mov_type: 'Transfer Out' 
        },
        {
            new_sort_order: '', sort_order: '003', ticket_id: 'CG0091828', mov_id: 'MV0001312', mov_date: '05-11-2020', cogs_grp: 'Math COGS FIFO', quantity: '1000.0000', mov_type: 'Transfer Out' 
        },
        {
            new_sort_order: '', sort_order: '004', ticket_id: 'CG0091828', mov_id: 'MV0001313', mov_date: '05-11-2020', cogs_grp: 'Math COGS FIFO', quantity: '1000.0000', mov_type: 'Transfer Out' 
        },
        {
            new_sort_order: '', sort_order: '005', ticket_id: 'CG0091828', mov_id: 'MV0001314', mov_date: '05-11-2020', cogs_grp: 'Math COGS FIFO', quantity: '1000.0000', mov_type: 'Transfer Out' 
        }
           
    ];

    openWarningPopup() {
        this.popupOpen = true;
        const dialogRef = this.dialog.open(WarningDialog, {
            width: '600px',
            maxHeight: '500px',
            panelClass: 'movements-popup-grid'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.popupOpen = false;
        });
    }

    onRowDragMove(e) {
        this.enableReset = true;
        this.enableSave = true;
    }

}