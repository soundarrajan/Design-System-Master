import { Component, OnInit,EventEmitter, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid-community";
import { ToastrService } from "ngx-toastr";
import { AGGridCellRendererComponent } from "src/app/shared/ag-grid/ag-grid-cell-renderer.component";
import { AGGridCellActionsComponent } from "src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component";
import { CancelClosureDialog } from "../popup-screens/cancel-closure-dialog.component";

@Component({
  selector: "app-eom-closure",
  templateUrl: "./eom-closure.component.html",
  styleUrls: ["./eom-closure.component.css"]
})
export class EomClosureComponent implements OnInit {
  public isdisplaydensityhigh: boolean = false;
  public isCollapsed: boolean = false;
  public popupOpen: boolean;
  @Output() createNewEvent = new EventEmitter();
  headerCollapse: boolean = false;
  displayRowData: boolean = false;
  enableSnapshot: boolean = false;
  stopProgressBar: boolean = true;
  showProgressBar: boolean = false;
  eomStatus:any;
  eomReturn:any;
  tabLabel = 'New EOM Closure';
  //rowData = [];
    ngOnInit() {
      var eomActiontxt = history.state.eomStatus;
      this.eomStatus = eomActiontxt;
      var eomReturn = history.state.eomReturn;
      this.eomReturn = eomReturn;

      if(this.eomReturn){
        setTimeout(() => {
        this.startClosure();
        }, 1000);
      }else{}
    }
  
    public gridOptions: GridOptions;
    public columnSelection: any;
    public rowCount: Number;
  
    constructor(public dialog: MatDialog, private toaster: ToastrService, public router: Router) {
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
          this.gridOptions.api.setRowData([]);
          this.rowCount = this.gridOptions.api.getDisplayedRowCount();
        }
      };
    }
    public rowData = [
      {
        companyname: 'XYZ Europe',
        lastclosedon: '04-Nov-2020',
        status: 'Closed',
        eomaction: 'View EOM',
        lastclosedby: 'Alexander James'
      },
      {
        companyname: 'XYZ America',
        lastclosedon: '04-Nov-2020',
        status: 'In Progress',
        eomaction: 'View EOM',
        lastclosedby: 'Yusuf Hassan'
      },
      {
        companyname: 'XYZ Middle East',
        lastclosedon: '04-Nov-2020',
        status: 'In Progress',
        eomaction: 'View EOM',
        lastclosedby: 'Yusuf Hassan'
      },
      {
        companyname: 'XYZ India',
        lastclosedon: '04-Nov-2020',
        status: 'Open',
        eomaction: 'Run EOM',
        lastclosedby: 'Yusuf Hassan'
      },
      {
        companyname: 'XYZ Japan',
        lastclosedon: '04-Nov-2020',
        status: 'Open',
        eomaction: 'Run EOM',
        lastclosedby: 'Yusuf Hassan'
      },
      {
        companyname: 'XYZ America',
        lastclosedon: '04-Nov-2020',
        status: 'Open',
        eomaction: 'Run EOM',
        lastclosedby: 'Yusuf Hassan'
      },
      {
        companyname: 'XYZ Australia',
        lastclosedon: '04-Nov-2020',
        status: 'Open',
        eomaction: 'Run EOM',
        lastclosedby: 'Yusuf Hassan'
      },
      {
        companyname: 'XYZ Singapore',
        lastclosedon: '04-Nov-2020',
        status: 'Open',
        eomaction: 'Run EOM',
        lastclosedby: 'Yusuf Hassan'
      },
      {
        companyname: 'XYZ Canada',
        lastclosedon: '04-Nov-2020',
        status: 'Open',
        eomaction: 'Run EOM',
        lastclosedby: 'Yusuf Hassan'
      },
      {
        companyname: 'XYZ Korea',
        lastclosedon: '04-Nov-2020',
        status: 'Open',
        eomaction: 'Run EOM',
        lastclosedby: 'Yusuf Hassan'
      }
    ];
    public columnDefs = [
      {
        headerName: 'Company Name',
        headerTooltip:'Company Name', 
        field: 'companyname',
        headerClass:'p-l-0',
        cellClass: ['aggridlink'], 
        width: 100,
      },
      {
        headerName: "Last Closed On",
        field: "lastclosedon",
        headerTooltip: "Last Closed On",
        cellClass: ["aggridtextalign-center"],
        headerClass: ["", "aggrid-text-align-c"],
        width: 100,
        cellRendererFramework: AGGridCellRendererComponent,
        cellRendererParams: { cellClass: ["custom-chip dark"] }
      },
      {
        headerName: "Status",
        field: "status",
        headerTooltip: "Status",
        cellClass: ["aggridtextalign-center"],
        headerClass: ["", "aggrid-text-align-c"],
        width: 100,
        cellRendererFramework: AGGridCellRendererComponent,
        cellRendererParams: function(params) { 
          var classArray:string[] =[]; 
            classArray.push('aggridtextalign-center');
            let newClass= params.value==='In Progress'?'custom-chip lightblue':
                          params.value==='Open'?'custom-chip lightgrey':
                          params.value==='Closed'?'custom-chip lightgreen':
                          'custom-chip dark';
                          classArray.push(newClass);
            return {cellClass: classArray.length>0?classArray:null} }
      },
      {
        headerName: 'EOM Action',
        headerTooltip:'EOM Action', 
        field: 'eomaction',
        headerClass:'p-l-0',
        cellClass: ['aggridlink'], 
        width: 120,
        cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: {
          type: 'run-link', onClick: this.runEOM.bind(this)
        }
      },
      {
        headerName: "Last Closed By",
        field: "lastclosedby",
        headerTooltip: "Last Closed By",
        cellClass: ["aggridtextalign-left"],
        headerClass: ["aggrid-text-align-l"],
        width: 250,
        cellRendererFramework: AGGridCellRendererComponent
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
    
    runEOM(e) {
      this.router.navigate(['techoil/closure/eomclosure'],{ state: { eomAction: e.value, eomStage: this.eomStatus}});
    }

    startClosure(){ 
      this.showProgressBar = !this.showProgressBar;    
      const timeoutFunc = () => this.displayRowData = !this.displayRowData;
      setTimeout(timeoutFunc.bind(this.stopProgressBar), 2000);   
      this.tabLabel = (this.displayRowData) ? 'EOM Closure - Oct 20' : 'New EOM Closure';
      
      this.gridOptions.api.setRowData(this.rowData);
    }

    cancelClosure(){
      this.popupOpen = true;
      const dialogRef = this.dialog.open(CancelClosureDialog, {
          width: '390px',
          maxHeight: '200px',
          panelClass: ''
      });

      dialogRef.afterClosed().subscribe(result => {
          this.popupOpen = false;
      });    
    }

    createSnapshot(){
      this.toaster.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">Snapshots created successfully</div>',
               '' , {
                        enableHtml: true,
                        toastClass: "toast-alert toast-green",
                        timeOut: 2000
                    });
    }

  }
  

 
