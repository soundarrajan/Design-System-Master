import { Component, OnInit,EventEmitter, Output, ViewChild, Input } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid-community";
import { AGGridCellRendererComponent } from "src/app/shared/ag-grid/ag-grid-cell-renderer.component";
import { AGGridCellDataComponent } from "src/app/shared/ag-grid/ag-grid-celldata.component";
import { BulkImportComponent } from "../bulk-import/bulk-import.component";

@Component({
  selector: "app-inventory-recon",
  templateUrl: "./inventory-recon.component.html",
  styleUrls: ["./inventory-recon.component.css"]
})
export class InventoryReconComponent implements OnInit {
  public isdisplaydensityhigh: boolean = false;
  public isCollapsed: boolean = false;
  @Output() createNewEvent = new EventEmitter();
  @ViewChild(BulkImportComponent) child:BulkImportComponent;
  @Input() collapseTab: boolean;
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
        getRowClass:(params)=> {        
          var classArray:string[] =[];
            let newClass= params.data.status==='New'?'aggrid-left-ribbon mediumlightblue':
                            params.data.status==='Confirmed'?'aggrid-left-ribbon mediumgreen':
                            'aggrid-left-ribbon mediumlightblue';
                            classArray.push(newClass);
            return classArray.length>0?classArray:null;
        },
      };
    }
  
    public columnDefs = [
      // {
      //   headerName: "",
      //   field: "",
      //   filter: true,
      //   enableSorting :true,
      //   suppressMenu:true,
      //   headerCheckboxSelection: true,
      //   resizable: true,
      //   width:40,
      //   checkboxSelection: true,
      //   cellClass:'p-1 aggrid-textoverflow checkbox-center',
      //   headerClass:'header-checkbox-center',
      // }, 
      {
        headerName: "Date",
        field: "date",
        headerTooltip: "Date",
        cellClass: ["aggridtextalign-center hoverdisable hover-cell-menu-icon"],
        headerClass: ["aggrid-text-align-c"],
        minWidth: 20,
        width: 180,
        cellStyle: { 'align-items': 'center' },
        cellRendererFramework: AGGridCellDataComponent,
        cellRendererParams: { type: 'inventoryReport-popup', 
        cellClass: ["custom-chip dark"] }
      },
      {
        headerName: "File Name",
        field: "filename",
        headerTooltip: "File Name",
        width: 300,
        headerClass: ["aggrid-text-align-l"],
        cellClass: ["aggridtextalign-left"],
        cellRendererFramework: AGGridCellRendererComponent
      },
      {
        headerName: "Imported Date",
        field: "importeddate",
        headerTooltip: "Imported Date",
        cellClass: ["aggridtextalign-center"],
        headerClass: ["", "aggrid-text-align-c"],
        width: 200,
        cellRendererFramework: AGGridCellRendererComponent,
        cellRendererParams: { cellClass: ["custom-chip dark"] }
      },
      {
        headerName: "Status",
        field: "status",
        headerTooltip: "Status",
        cellClass: ["aggridtextalign-center"],
        headerClass: ["", "aggrid-text-align-c"],
        width: 250,
        cellRendererFramework: AGGridCellRendererComponent,
        cellRendererParams: function(params) { 
          var classArray:string[] =[]; 
            classArray.push('aggridtextalign-center');
            let newClass= params.value==='New'?'custom-chip mediumlightblue':
                          params.value==='Confirmed'?'custom-chip mediumgreen':
                          'custom-chip dark';
                          classArray.push(newClass);
            return {cellClass: classArray.length>0?classArray:null} }
      }
    ];
  
    private rowData = [
      {date: '29-Aug-2020', filename: 'TR-29-Aug-2020.xls', importeddate: '29-Aug-2020 17:32', status: 'New'},
      {date: '29-Aug-2020', filename: 'TR-29-Aug-2020.xls', importeddate: '29-Aug-2020 17:32', status: 'Confirmed'},
      {date: '29-Aug-2020', filename: 'TR-29-Aug-2020.xls', importeddate: '29-Aug-2020 17:32', status: 'New'},
      {date: '29-Aug-2020', filename: 'TR-29-Aug-2020.xls', importeddate: '29-Aug-2020 17:32', status: 'Confirmed'},
      {date: '29-Aug-2020', filename: 'TR-29-Aug-2020.xls', importeddate: '29-Aug-2020 17:32', status: 'New'},
      {date: '29-Aug-2020', filename: 'TR-29-Aug-2020.xls', importeddate: '29-Aug-2020 17:32', status: 'Confirmed'},
      {date: '29-Aug-2020', filename: 'TR-29-Aug-2020.xls', importeddate: '29-Aug-2020 17:32', status: 'New'},
      {date: '29-Aug-2020', filename: 'TR-29-Aug-2020.xls', importeddate: '29-Aug-2020 17:32', status: 'Confirmed'},
      {date: '29-Aug-2020', filename: 'TR-29-Aug-2020.xls', importeddate: '29-Aug-2020 17:32', status: 'New'},
      {date: '29-Aug-2020', filename: 'TR-29-Aug-2020.xls', importeddate: '29-Aug-2020 17:32', status: 'Confirmed'},
      {date: '29-Aug-2020', filename: 'TR-29-Aug-2020.xls', importeddate: '29-Aug-2020 17:32', status: 'New'},
      {date: '29-Aug-2020', filename: 'TR-29-Aug-2020.xls', importeddate: '29-Aug-2020 17:32', status: 'Confirmed'},
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
    selectedTabChange(e){
      this.child.tabChange();
    }
    openBulkUpdate(){

    }
    showNoDataMessage(flag){

    }
  }
  

 
