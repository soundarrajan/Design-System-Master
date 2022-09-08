import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellActionsComponent } from '../../shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { Observable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-figma-links-screen',
  templateUrl: './figma-links-screen.component.html',
  styleUrls: ['./figma-links-screen.component.css']
})
export class FigmaLinksScreenComponent implements OnInit {

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
      autoGroupColumnDef : {
        headerName: '',
        cellRendererParams: {
          suppressCount: true,
         },
        
      },
      columnDefs: this.columnDef_aggrid,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: true,
      
      onGridReady: (params) => {
        console.log("sssssssss");
    console.log(this.rowData_aggrid);
        this.gridOptions_data.api = params.api;
        this.gridOptions_data.columnApi = params.columnApi;
        this.gridOptions_data.api.sizeColumnsToFit();
        this.gridOptions_data.api.setRowData(this.rowData_aggrid);
        this.getGridData();

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
    this.http.get("./assets/data/figma-links-json/figma-links.json").subscribe(data =>{
      this.rowData_aggrid = data;
    })
    
  }

  private getGridData(){
    //Grid Data
    this.http.get("./assets/data/figma-links-json/figma-links.json").subscribe(data =>{
      this.rowData_aggrid  = data;
      this.gridOptions_data.api.setRowData(this.rowData_aggrid)
    })
  }
  

  private columnDef_aggrid = [
    { headerName: '', headerTooltip: '', field: 'projectname', rowGroup: true, hide: true, width: 100},
    { headerName: 'Screen name', headerTooltip: 'Screen name', field: 'screenname'},
    { headerName: 'Module name', headerTooltip: 'Module name', field: 'modulename',cellClass: ['aggridtextalign-left'] },
    { headerName: 'Last Updated Date', headerTooltip: 'Last Updated Date', field: 'lastupdatedDate',cellClass: ['aggridtextalign-left'] },
    { headerName: '', headerTooltip: '', field: 'viewFigma',cellClass: ['aggridtextalign-center'],
    cellRenderer: 'group',  cellRendererParams: {
      innerRendererFramework: AGGridCellActionsComponent,
      type: 'view-figma-btn',
    },
  },
    { headerName: '', headerTooltip: '', field: 'changeLogs',cellClass: ['aggridlink aggridtextalign-center'],
    cellRenderer: 'group',  cellRendererParams: {
      innerRendererFramework: AGGridCellActionsComponent,
      type: 'change-logs-btn'
    },
  }
  ];

 
}
