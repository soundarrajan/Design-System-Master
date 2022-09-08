import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellActionsComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';

@Component({
  selector: 'app-configurable-listing',
  templateUrl: './configurable-listing.component.html',
  styleUrls: ['./configurable-listing.component.css']
})
export class ConfigurableListingComponent implements OnInit {

  rowData_aggrid: any = [];
  saveBtn:boolean=false;
  @Output() navigateToLink = new EventEmitter();
  public gridOptions_data: GridOptions;
  constructor(private http: HttpClient) {
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
    this.http.get("./assets/data/config-ui-json/configurable-listing.json").subscribe(data =>{
      this.rowData_aggrid = data;
    })
  }

  private columnDef_aggrid = [
    { headerName: 'ID', headerTooltip: 'ID', field: 'id', width: 100, cellClass: ['aggridtextalign-center'], headerClass: ['aggrid-text-align-c'] },
    { headerName: 'Name', headerTooltip: 'Name', field: 'name', width: 400, cellClass: ['aggridtextalign-left'] },
    {
      headerName: '', headerTooltip: '', field: 'download-json', width: 200, cellClass: ['aggridlink aggridtextalign-center'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: {
        type: 'download-json-btn'
      }
    },
    {
      headerName: '', headerTooltip: '', field: 'view', width: 150, cellClass: ['aggridlink aggridtextalign-center'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: {
        type: 'view-link'
      }
    },
    {
      headerName: '', headerTooltip: '', field: 'edit', width: 150, cellClass: ['aggridlink aggridtextalign-center'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: {
        type: 'edit-link'
      }
    },
    {
      headerName: '', headerTooltip: '', field: 'copy', width: 150, cellClass: ['aggridlink aggridtextalign-center'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: {
        type: 'copy-link'
      }
    },
    {
      headerName: '', headerTooltip: '', field: 'delete',  width: 150, cellClass: ['aggridlink aggridtextalign-center'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: {
        type: 'delete-link'
      }
    },
  ];


}
