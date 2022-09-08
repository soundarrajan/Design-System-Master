import { Component, OnInit,EventEmitter, Output } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { AGGridCellRendererComponent } from "src/app/shared/ag-grid/ag-grid-cell-renderer.component";
import { AGGridCellDataComponent } from "src/app/shared/ag-grid/ag-grid-celldata.component";

@Component({
  selector: "app-eomlistdetails",
  templateUrl: "./eomlistdetails.component.html",
  styleUrls: ["./eomlistdetails.component.scss"]
})
export class EomlistdetailsComponent implements OnInit {
  public isdisplaydensityhigh: boolean = false;
  public isCollapsed: boolean = false;
  @Output() createNewEvent = new EventEmitter();
    ngOnInit() {}
  
    public gridOptions: GridOptions;
    public columnSelection: any;
    public rowCount: Number;
  
    constructor() {
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
        getRowClass: params => {
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
        },
        onColumnResized: function(params) {
          if (
            params.columnApi.getAllDisplayedColumns().length <= 10 &&
            params.type === "columnResized" &&
            params.finished === true &&
            params.source === "uiColumnDragged"
          ) {
            params.api.sizeColumnsToFit();
          }
        }
      };
    }
  
    public columnDefs = [
      {
        headerName: "Closure Period",
        field: "closureperiod",
        headerTooltip: "Closure Period",
        cellRendererFramework: AGGridCellDataComponent,
        cellRendererParams: { type: "active-deactive" },
        cellClass: function(params) {
          var classArray: string[] = [];
          classArray.push("aggridtextalign-left");
          classArray.push("aggridlink");
          return classArray;
        },
        headerClass: ["", "aggridtextalign-left"],
        width: 150
      },
  
      {
        headerName: "P&L",
        field: "pandl",
        headerTooltip: " P&L",
        type: "numericColumn" ,
        width: 150,
        cellRendererFramework: AGGridCellRendererComponent
      },
      {
        headerName: "P&L YTD",
        field: "pandlytd",
        headerTooltip: "P&L ytd",
        type: "numericColumn" ,
        width: 150,
        cellRendererFramework: AGGridCellRendererComponent
      },
  
      {
        headerName: "Created On",
        field: "createdon",
        headerTooltip: "Created On",
        cellClass: ["aggridtextalign-center"],
        headerClass: ["", "aggrid-text-align-c"],
        width: 150,
        cellRendererFramework: AGGridCellRendererComponent,
        cellRendererParams: { cellClass: ["custom-chip dark"] }
      },
      {
        headerName: "Created By",
        field: "createdby",
        headerTooltip: "Created By",
        cellClass: ["aggridtextalign-left"],
        headerClass: ["", ],
        width: 150,
        cellRendererFramework: AGGridCellRendererComponent
      }
    ];
  
    // text-center custom-chip dark mat-chip mat-primary mat-standard-chip
    private rowData = [
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
  
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
        pandl: "8,400,900 USD",
        pandlytd: "31,763,800 USD",
        createdon: "05-Nov-2019",
        createdby: "Yusuf Hassan"
      },
      {
        closureperiod: "Oct 2019",
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

    public headerToggle(){
      // var element = document.getElementsByClassName("mat-tab-header");
      // var mainHeader = document.getElementsByClassName("header-navbar");
      // console.log(element);
      // console.log(mainHeader);
      
      if(document.querySelector('.mat-tab-header').classList.contains('collapsed')) {
        //alert("sss");
        this.isCollapsed = false;
        document.querySelector('.pcoded-main-container').classList.remove('collapsed');
        document.querySelector('.header-slide').classList.remove('collapsed');
        document.querySelector('.mat-tab-header').classList.remove('collapsed');
        document.querySelector('.mat-tab-header').classList.add('expand');
        document.querySelector('.header-navbar').classList.remove('collapsed');
        document.querySelector('.header-navbar').classList.add('expand');
        //(<HTMLElement>document.querySelector(".light-blue-button")).style.display = "block";
        
        
        
      }else{
        this.isCollapsed = true;
        document.querySelector('.pcoded-main-container').classList.add('collapsed');
        document.querySelector('.header-slide').classList.add('collapsed');
        
        document.querySelector('.mat-tab-header').classList.add('collapsed');
        document.querySelector('.header-navbar').classList.add('collapsed');
        document.querySelector('.header-navbar').classList.remove('expand');
        document.querySelector('.mat-tab-header').classList.remove('expand');
      // const invoicelogo = document.querySelector('.mat-tab-header');
      // invoicelogo.classList.add('collapsed');
      // const mainHeader = document.querySelector('.header-navbar');
      // mainHeader.classList.add('collapsed');
      //(<HTMLElement>document.querySelector(".light-blue-button")).style.display = "none";
     
      
      }
    }
  }
  

 
