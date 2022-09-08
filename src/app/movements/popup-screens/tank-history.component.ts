import { Component, OnInit, Inject } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AGGridCellEditableComponent } from '../../shared/designsystem-v2/ag-grid/ag-grid-cell-editable.component';
import { AGGridCellActionsComponent } from '../../shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { AgGridDatetimePickerV2Component } from '../../shared/designsystem-v2/ag-grid/ag-grid-datetime-picker.component';
import { AGGridCellMenuPopupComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-menu.component';

@Component({
    selector: 'tank-history-dialog',
    template:
        `
      <div class="header-container">
        <div class="title">Tank Product History</div>
        <div class="popup-close-icon"  [mat-dialog-close]="true"></div>
      </div>
      <div>
        <mat-dialog-content>
          <ag-grid-angular domLayout='autoHeight' style="width: 100%;height: 100%;" [gridOptions]="dialog_gridOptions" class="ag-popupgrid-v2 ag-theme-material angular-v9">
          </ag-grid-angular>
        </mat-dialog-content>
      </div>
      <div>
        <mat-dialog-actions align="end">
            <button class="save-action-btn" [mat-dialog-close]="true" disabled>
                <span>Save</span>
            </button>
        </mat-dialog-actions>
      </div>
    `,
})
export class TankHistoryDialog {

    public dialog_gridOptions: GridOptions;

    ngOnInit() {
    }
    constructor(
        public dialogRef: MatDialogRef<TankHistoryDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.dialog_gridOptions = <GridOptions>{
            defaultColDef: {
                filter: false,
                sortable: false,
                resizable: true
            },
            columnDefs: this.columnDefs,
            suppressRowClickSelection: true,
            headerHeight: 30,
            rowHeight: 28,
            onGridReady: params => {
                this.dialog_gridOptions.api = params.api;
                this.dialog_gridOptions.columnApi = params.columnApi;
                this.dialog_gridOptions.api.sizeColumnsToFit();
                this.dialog_gridOptions.api.setRowData(this.rowData);
                this.addCustomHeaderEventListener();
            },
            onColumnResized: function (params) {
                if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
                    params.api.sizeColumnsToFit();
                }
            }
        };
    }
    addCustomHeaderEventListener() {
        let addButtonElement = document.getElementsByClassName('add-btn');
        addButtonElement[0].addEventListener('click', (event) => {
            this.dialog_gridOptions.api.applyTransaction({
                add: [{
                    from: '', to: '', product: 'Ethanol', specgroup: 'Default Spec Group', customStatus: '', labresultid: '', cncode: "", vcf: '', wcf: '',
                }]
            });
        });

    }
    public columnDefs = [
        {
            resizable: false,
            width: 30,
            suppressMenu: true,
            headerName: "",
            headerClass: ['aggridtextalign-center'],
            headerComponentParams: {
                template: `<span  unselectable="on">
                   <div class="add-btn"></div>
                   <span ref="eMenu"></span>`
            },
            cellClass: ['aggridtextalign-left'],
            cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
        },
        {
            headerName: 'From', headerTooltip: 'From', field: 'from', width: 180, cellClass: ['editable-cell'],
            cellRendererFramework: AgGridDatetimePickerV2Component, cellRendererParams: { type: 'cell-edit-date' }
        },
        {
            headerName: 'To', headerTooltip: 'To', field: 'to', width: 180
        },
        {
            headerName: 'Product', headerTooltip: 'Product', field: 'product', cellClass: ['editable-cell'],
            cellRendererFramework: AGGridCellEditableComponent, cellRendererParams: { type: 'cell-edit-autocomplete', label: 'product' }
        },
        // {
        //     headerName: 'Spec Group', headerTooltip: 'Spec Group', field: 'specgroup', cellClass: ['editable-cell product-cell'],
        //     cellRendererFramework: AGGridCellMenuPopupComponent, cellRendererParams: { type: 'cell-hover-click-menu-popup', label: ['Spec Group'], align:"left" }
        // },
        {
            headerName: 'Spec Group', headerTooltip: 'Spec Group', field: 'specgroup', cellClass: ['editable-cell product-cell'],
            cellRendererFramework: AGGridCellMenuPopupComponent, cellRendererParams: { type: 'cell-hover-click-menu-popup', labels: [{ name: 'Spec Parameter', iconClass: 'edit-pen-icon' }], align: "left" }
        },
        // {
        //     headerName: 'Spec Group', headerTooltip: 'Spec Group', field: 'specgroup', cellClass: ['editable-cell product-cell'],
        //     cellRendererFramework: AGGridCellEditableComponent, cellRendererParams: { type: 'cell-edit-autocomplete-withpopup', label: 'spec-param' }
        // },
        {
            headerName: 'Lab Result ID', headerTooltip: 'Lab Result ID', width: 150, field: 'labresultid'
        },
        {
            headerName: 'CN Code', headerTooltip: 'CN Code', field: 'cncode', width: 150, cellClass: ['editable-cell'],
            cellRendererFramework: AGGridCellEditableComponent, cellRendererParams: { type: 'cell-edit-autocomplete', label: 'cn-code' }
        },
        {
            headerName: 'Custom Status', editable: true, singleClickEdit: true, width: 150, headerTooltip: 'Custom Status', field: 'customStatus', cellClass: ['editable-cell'],
            cellRendererFramework: AGGridCellEditableComponent, cellRendererParams: { type: 'cell-edit-dropdown', label: 'custom-status', items: ['Status1'] }
        },
        {
            headerName: 'VCF', suppressMenu: true, headerTooltip: 'VCF', field: 'vcf', width: 90, cellClass: ['editable-cell'],
            editable: true, singleClickEdit: true,
        },
        {
            headerName: 'WCF', suppressMenu: true, headerTooltip: 'WCF', field: 'wcf', width: 90, cellClass: ['editable-cell'],
            editable: true, singleClickEdit: true,
        }
    ];

    private rowData = [
        {
            from: '2020-07-01 08:34', to: '', product: 'Ethanol', specgroup: 'Default Spec Group', customStatus: 'Status1', labresultid: '', cncode: "Code1", vcf: '231', wcf: '20',
        },
        {
            from: '2020-07-01 16:00', to: '', product: 'Ethanol', specgroup: 'Default Spec Group', customStatus: 'Status1', labresultid: '', cncode: "Code1", vcf: '231', wcf: '20',
        }
    ]

}