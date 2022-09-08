import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellActionsComponent } from '../../../../shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';

@Component({
  selector: 'app-allocation-details',
  templateUrl: './allocation-details.component.html',
  styleUrls: ['./allocation-details.component.css']
})
export class AllocationDetailsComponent implements OnInit {

  @Output() navigateToLink = new EventEmitter();
  public gridOptions_data: GridOptions;
  constructor() {
    this.gridOptions_data = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_aggrid,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,

      onGridReady: (params) => {
        this.gridOptions_data.api = params.api;
        this.gridOptions_data.columnApi = params.columnApi;
        this.gridOptions_data.api.sizeColumnsToFit();
        this.gridOptions_data.api.setRowData(this.rowData_aggrid);

      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 11 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 11) {
          params.api.sizeColumnsToFit();

        }
      }
    }
  }

  ngOnInit(): void {
  }

  viewManualMatch(e) {
    this.navigateToLink.emit('manual-match');

  }
  private columnDef_aggrid = [
    { headerName: 'Trade ID', headerTooltip: 'Trade ID', field: 'tradeId', cellClass: ['aggridlink'] },
    { headerName: 'Delivery Schedule', headerTooltip: 'Delivery Schedule', field: 'del_no', cellClass: ['aggridlink'] },
    { headerName: 'Movement ID', headerTooltip: 'Movement ID', field: 'mov_id', cellClass: ['aggridlink'] },
    { headerName: 'COGS Tkt ID', headerTooltip: 'COGS Tkt ID', field: 'cogs_id' },
    { headerName: 'Movement Date', headerTooltip: 'Movement Date', field: 'mov_date' },
    { headerName: 'Movement Qty (GAL)', headerTooltip: 'Movement Qty (GAL)', field: 'mov_qty', type: "numericColumn" },
    { headerName: 'Allocated Qty (GAL)', headerTooltip: 'Allocated Qty (GAL)', field: 'allocate_qty', type: "numericColumn" },
    { headerName: 'Allocated Qty in COGS UOM (GAL)', headerTooltip: 'Allocated Qty in COGS UOM (GAL', field: 'allocate_qty_cogs', type: "numericColumn" },
    {
      headerName: 'Matching Movements', headerTooltip: 'Matching Movements', field: 'match', cellClass: ['aggridlink'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: {
        type: 'view-link', onClick: this.viewManualMatch.bind(this)
      }
    }];

  private rowData_aggrid = [

    {
      del_no: 'PHB200251-3986', mov_id: 'MOV0001521', cogs_id: 'CG00141521', tradeId: 'PHB200251', mov_date: '12-01-2021    13:00', mov_qty: '1,000.0000 GAL', allocate_qty: "1,000.0000 GAL", allocate_qty_cogs: "1,000.0000 GAL"
    }
  ]

}
