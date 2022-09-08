import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { AGGridCellRendererComponent } from "src/app/shared/ag-grid/ag-grid-cell-renderer.component";
import { AGGridCellDataComponent } from "src/app/shared/ag-grid/ag-grid-celldata.component";


@Component({
  selector: "app-accrual",
  templateUrl: "./accrual.component.html",
  styleUrls: ["./accrual.component.scss"]
})
export class AccrualComponent implements OnInit {
  public isdisplaydensityhigh: boolean = false;
  
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
          return this.isdisplaydensityhigh ? 48 : 25
        },
        headerHeight: this.isdisplaydensityhigh ? 60 : 35,
       
        defaultColDef: {
          filter: true,
          enableSorting: true,
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
            params.data.creditamount ==="3,50,000 USD"?'aggrid-left-ribbon mediumpurple': 'aggrid-left-ribbon blue';
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
          if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === "columnResized" && params.finished === true && params.source === "uiColumnDragged") {
            params.api.sizeColumnsToFit();
          }
        }
      };
    }
  
    public columnDefs = [
      {
        headerName: "GL Code",
        field: "glcode",
        headerTooltip: "GL Code",
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
        headerName: "Date",
        field: "date",
        headerTooltip: "Date",
        cellClass: ["aggridtextalign-center"],
        headerClass: ["", "aggrid-text-align-c"],        
        cellRendererFramework: AGGridCellRendererComponent,
        cellRendererParams: { cellClass: ["custom-chip dark"] }
      },
  
      {
        headerName: "Description",
        field: "description",
        headerTooltip: " Description",
        cellClass: ["aggridtextalign-left"],
        headerClass: ["", "aggrid-text-align-l"],        
        cellRendererFramework: AGGridCellRendererComponent
      },
      {
        headerName: "Debit Amount",
        field: "debitamount",
        headerTooltip: "Debit Amount",
        type: "numericColumn" ,
        cellRendererFramework: AGGridCellRendererComponent
      },
  
     
      {
        headerName: "Credit Amount",
        field: "creditamount",
        headerTooltip: "Credit Amount",
        type: "numericColumn" ,       
        cellRendererFramework: AGGridCellRendererComponent
      }
    ];
  
    // text-center custom-chip dark mat-chip mat-primary mat-standard-chip
    private rowData = [
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  }, { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  }, { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  }, { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },

      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised", debitamount: "3,50,000 USD",  },
      { glcode: "GL1234000-2", date: "05-Nov-2019", description: "Derivative Realised",  creditamount: "3,50,000 USD",  },
     
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
  }
    

  

 
