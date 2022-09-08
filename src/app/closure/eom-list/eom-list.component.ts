import { Component, OnInit,EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid-community";
import { AGGridCellRendererComponent } from "src/app/shared/ag-grid/ag-grid-cell-renderer.component";
import { AGGridCellDataComponent } from "src/app/shared/ag-grid/ag-grid-celldata.component";
import { AGGridCellActionsComponent } from "src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component";

@Component({
  selector: "app-eom-list",
  templateUrl: "./eom-list.component.html",
  styleUrls: ["./eom-list.component.css"]
})
export class EomListComponent implements OnInit {
  public isdisplaydensityhigh: boolean = false;
  public isCollapsed: boolean = false;
  @Output() createNewEvent = new EventEmitter();
  headerCollapse: boolean = false;
    ngOnInit() {}
  
    public gridOptions: GridOptions;
    public columnSelection: any;
    public rowCount: Number;
  
    constructor(private router: Router) {
      this.gridOptions = <GridOptions>{
        suppressRowTransform: true,
        columnDefs: this.columnDefs,
        enableColResize: true,
        enableSorting: true,
        animateRows: true,
        filter: true,
        getRowHeight: params => {
          return this.isdisplaydensityhigh ? 48 : 25;
        },
        headerHeight: this.isdisplaydensityhigh ? 60 : 35,
        groupHeaderHeight: this.isdisplaydensityhigh ? 60 : 35,
        defaultColDef: {
          filter: true,
          enableSorting: true
        },
        onGridReady: params => {
          this.gridOptions.api = params.api;
          this.gridOptions.columnApi = params.columnApi;
          this.gridOptions.api.sizeColumnsToFit();
          this.gridOptions.enableColResize = true;
          this.gridOptions.api.setRowData(this.rowData);
          this.rowCount = this.gridOptions.api.getDisplayedRowCount();
        },
        /* getRowClass: params => {
          var classArray: string[] = [];
          let newClass =
            params.data.createdon ="aggrid-left-ribbon dark";
          classArray.push(newClass);
  
          if (params.node.rowIndex % 2 === 0) {
            classArray.push("aggrid-evenrow-bg");
            classArray.push("aggrid-evenrow-border-dark");
          } else {
            classArray.push("aggrid-oddrow-bg");
            classArray.push("aggrid-evenrow-border-dark");
          }
  
          return classArray.length > 0 ? classArray : null;
        }, */
        /* onColumnResized: function(params) {
          if (
            params.columnApi.getAllDisplayedColumns().length <= 10 &&
            params.type === "columnResized" &&
            params.finished === true &&
            params.source === "uiColumnDragged"
          ) {
            params.api.sizeColumnsToFit();
          }
        } */
      };
    }
  
    public columnDefs = [
      {
        headerName: 'Closure Period',
        headerTooltip:'Closure Period', 
        field: 'closureperiod',
        cellRendererFramework:AGGridCellDataComponent,
        headerClass:'p-l-0',
        cellClass: ['text-ellipsis product-cell aggridlink'], 
        width: 120,
        cellRendererParams: {type:'cell-hover-click-menu-cancel'}
      },
      {
        headerName: "Status",
        field: "status",
        headerTooltip: "Status",
        cellClass: ["aggridtextalign-center"],
        headerClass: ["", "aggrid-text-align-c"],
        width: 120,
        cellRendererFramework: AGGridCellRendererComponent,
        cellRendererParams: function(params) { 
          var classArray:string[] =[]; 
            classArray.push('aggridtextalign-center');
            let newClass= params.value==='Initiated'?'custom-chip lightblue':
                          params.value==='Partially Closed'?'custom-chip amber':
                          params.value==='Closed'?'custom-chip lightgreen':
                          'custom-chip dark';
                          classArray.push(newClass);
            return {cellClass: classArray.length>0?classArray:null} }
      },
      {
        headerName: "P&L",
        field: "pandl",
        headerTooltip: " P&L",
        type: "numericColumn" ,
        width: 150,
        headerClass: ["aggrid-text-align-r"],
        cellRendererFramework: AGGridCellRendererComponent
      },
      {
        headerName: "P&L YTD",
        field: "pandlytd",
        headerTooltip: "P&L ytd",
        type: "numericColumn" ,
        width: 150,
        headerClass: ["aggrid-text-align-r"],
        cellRendererFramework: AGGridCellRendererComponent
      },
      {
        headerName: "Created On",
        field: "createdon",
        headerTooltip: "Created On",
        cellClass: ["aggridtextalign-center"],
        headerClass: ["", "aggrid-text-align-c"],
        width: 120,
        cellRendererFramework: AGGridCellRendererComponent,
        cellRendererParams: { cellClass: ["custom-chip dark"] }
      },
      {
        headerName: "Created By",
        field: "createdby",
        headerTooltip: "Created By",
        cellClass: ["aggridtextalign-left"],
        headerClass: ["aggrid-text-align-l"],
        width: 200,
        cellRendererFramework: AGGridCellRendererComponent
      }
    ];
  
    private rowData = [
      {
        closureperiod: "Aug-20",
        status: "Initiated",
        pandl: "-",
        pandlytd: "-",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Sep-20",
        status: "Partially Closed",
        pandl: "-",
        pandlytd: "-",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct-20",
        status: "Closed",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Nov-20",
        status: "Closed",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Dec-20",
        status: "Partially Closed",
        pandl: "-",
        pandlytd: "-",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Jan-20",
        status: "Closed",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Feb-20",
        status: "Closed",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Mar-20",
        status: "Closed",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Apr-20",
        status: "Partially Closed",
        pandl: "-",
        pandlytd: "-",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "May-20",
        status: "Closed",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      }
    ];
  
    public change_rowdensity() {
      this.isdisplaydensityhigh = !this.isdisplaydensityhigh;
      if (this.isdisplaydensityhigh) {
        this.gridOptions.rowHeight = 48;
        this.gridOptions.headerHeight = 60;
        this.gridOptions.groupHeaderHeight = 60;
      } else {
        this.gridOptions.rowHeight = 26;
        this.gridOptions.headerHeight = 35;
        this.gridOptions.groupHeaderHeight = 35;
      }
      this.gridOptions.api.resetRowHeights();
      this.gridOptions.api.refreshHeader();
    }

    toggleCollapse(){
      this.headerCollapse = !this.headerCollapse;
    }
    newClosure(){
      this.router.navigate(['techoil/closure/eom-closure']);
    }
  }
  

 
