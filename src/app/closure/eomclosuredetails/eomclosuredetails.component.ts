import { Component, OnInit,EventEmitter,Output, ElementRef, ViewChild, Input } from '@angular/core';
import { EompopupComponent } from '../../shared/dialog-popup/eompopup/eompopup.component';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from "ag-grid-community";
import { AGGridCellRendererComponent } from "src/app/shared/ag-grid/ag-grid-cell-renderer.component";
import { AGGridCellDataComponent } from "src/app/shared/ag-grid/ag-grid-celldata.component";
import { CancelClosureDialog } from '../popup-screens/cancel-closure-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eomclosuredetails',
  templateUrl: './eomclosuredetails.component.html',
  styleUrls: ['./eomclosuredetails.component.scss']
})
export class EomclosuredetailsComponent implements OnInit {
  public isdisplaydensityhigh: boolean = false;
  public isCollapsed: boolean = false;
  count:number = 3;
  warning:number = 0;
  customCollapsedHeight: string = '40px';
  customExpandedHeight: string = '35px';
  auditlog_isopen = false;
  pagedisabled: boolean;
  current_state='initial';
  selectedTab = 0;
  panel_inactive: boolean = true;
  showGridMenu: boolean = true;
  public stepLevel: any;
  func: number =0;
  //public progressStepper1: any;
  funcArr: any;
  public buttonCounter:number = 0;
  public enableTabs: boolean = true;
  public showTab: boolean = true;
  public pnlTab: boolean = true;
  public showHeadText: boolean = false;
  public showHeadTextFinal: boolean = false;
  public headerCollapse: boolean = true;
  public showProgressBar: boolean;
  public showFooter: boolean = false;
  public showJournalFooter: boolean = false;
  public showAccReceivable: boolean = true;
  public showAccPayable: boolean = true;
  public showInventory: boolean = true;
  public showDerivatives: boolean = true;
  public showBorder: boolean = true;
  public showJournalBorder: boolean = true;
  public showDerivativeJournals: boolean = true;
  public showInvJournals: boolean = true;
  public showArJournals: boolean = true;
  public showApJournals: boolean = true;
  @Output() generatePL = new EventEmitter();
  @Output() onLoad = new EventEmitter();
  @ViewChild('alltabs') alltabs: ElementRef;
  @Input() eomAction: string;
  @Input() eomStateAction: any = false;
  public acceptClosedReturn:boolean = false;
  public eomActionTypes: string;
  public summaryloadingText: boolean = true;
  public loadPNL: boolean = false;
  progressStepper1 = [
    { name: 'Run EOM', status: 'incomplete', index: 0, class: "incomplete" },
    { name: 'Generate P&L', status: 'incomplete', index: 1, class: "incomplete" },
    { name: 'Accept & Close', status: 'incomplete', index: 2, class: "incomplete" }
  ];
  // Start Closure- complete
  progressStepper2 = [
    { name: 'Run EOM', status: 'complete', index: 0, class: "complete light-green" },
    { name: 'Generate P&L', status: 'incomplete', index: 1, class: "incomplete" },
    { name: 'Accept & Close', status: 'incomplete', index: 2, class: "incomplete" }
  ];
  //Draft P&L - complete
  progressStepper3 = [
    { name: 'Run EOM', status: 'complete', index: 0, class: "complete light-green" },
    { name: 'Generate P&L', status: 'complete', index: 1, class: "complete medium-green" },
    { name: 'Accept & Close', status: 'incomplete', index: 2, class: "incomplete" }
  ];
  //Final P&L - complete
  progressStepper4 = [
    { name: 'Run EOM', status: 'complete', index: 0, class: "complete light-green" },
    { name: 'Generate P&L', status: 'complete', index: 1, class: "complete medium-green" },
    { name: 'Accept & Close', status: 'complete', index: 2, class: "complete dark-green" }
  ];

  @Output() createNewEvent = new EventEmitter();
  ngOnInit() {
    //alert(this.eomStateAction);
    if((this.eomAction =='Run EOM' && this.eomStateAction) || (this.eomAction =='View EOM' && this.eomStateAction)){
      //this.selectedTab = 0;
    this.stepLevel = this.progressStepper4;
    this.showTab = false;
    this.enableTabs = false;
    this.generatePL.emit('eomDone');
    this.selectedTab = 0;
    this.showHeadTextFinal = true;
    this.pnlTab = true;
    this.loadPNL = true;
    this.showHeadText = true;
    } else if(this.eomAction =='Run EOM' && !this.eomStateAction){
    this.stepLevel = this.progressStepper1;
    this.showProgressBar = true;
    this.pagedisabled = true;
    setTimeout(() => {
          this.onLoad.emit();
          this.pagedisabled = false;
           this.showProgressBar = false;
     },1000)

    } else if(this.eomAction =='View EOM' && !this.eomStateAction){
      setTimeout(() => {
      this.onLoad.emit();
    },10)
    this.stepLevel = this.progressStepper2;
    this.showProgressBar = false;
    this.pagedisabled = false;
    
    
  }
    
    //this.showTab = true;
    document.querySelector('.pcoded-main-container').classList.add('doublegrid-collapsed');
   
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //     this.onLoad.emit();
    //     this.showProgressBar = false;
    // },1000)
  }
  
  goBack() {
    this.router.navigate(['techoil/closure/eom-closure'],{ state: { eomReturn: true, eomStatus: this.acceptClosedReturn}});
  }
  headerToggling(){
    //alert("");
    this.headerCollapse = !this.headerCollapse;
    var tabHeaders = document.querySelectorAll('.mat-tab-header');
    if(tabHeaders[1].classList.contains('d-none')) {
      //document.querySelector('.mat-tab-header').classList.remove('collapsed');
      tabHeaders[1].classList.remove('d-none');
    }else{
      tabHeaders[1].classList.add('d-none');
      
    }
  }
 
  cancelEom() {
    // this.pagedisabled = false;
    // this.current_state= 'startclosure';

    const dialogRef = this.dialog.open(CancelClosureDialog, {
      width: '390px',
      maxHeight: '200px',
      panelClass: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }

 
  tabClick(tab){
   console.log(tab);
  }
  activeTabChange(tabs,tabIndex){
    
    var tabLength = tabs._tabs.length;
    //console.log(tabLength);
    //alert(tabLength);
    if(tabLength == 3){
    if(tabIndex === 0){
      this.showHeadText = false;
    }else if(tabIndex === 1){
      this.showHeadText = true;
      this.pnlTab = true;
    }else{
      this.showHeadText = true;
      this.pnlTab = false;
    }
   }else if(tabLength == 2){
    if(tabIndex === 0){
      this.showHeadText = true;
      this.pnlTab = true;
    }else if(tabIndex === 1){
      this.showHeadText = true;
      this.pnlTab = false;

    }
   }else{

   }
   
  }

  

  runEOMReady(){
    //alert("ssssss");
    this.stepLevel = this.progressStepper2;
  }
  runEOMReady2(){
    this.toaster.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">EOM Run succesfull with no errors. Ready to generate P&L</div>',
               '' , {
                        enableHtml: true,
                        toastClass: "toast-alert toast-green",
                        timeOut: 2000
                    });
    this.generatePL.emit('genPL');
    }
    generatePNL(){
    this.showProgressBar = true;
    this.summaryloadingText = false;
    
    setTimeout(() => {
      //this.onLoad.emit();
      this.showProgressBar = false;
      this.loadPNL = true;
    },1000)
    this.stepLevel = this.progressStepper3;
    this.toaster.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">P&L and Journal entires successfully created</div>',
               '' , {
                        enableHtml: true,
                        toastClass: "toast-alert toast-green",
                        timeOut: 2000
                    });
  this.generatePL.emit('acceptClose');
  
  this.enableTabs = false;
  this.selectedTab = 1;
  
  }

  acceptClose(){
    this.selectedTab = 0;
    this.stepLevel = this.progressStepper4;
    this.showTab = false;
    this.toaster.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">EOM Closure process completed successfully</div>',
               '' , {
                        enableHtml: true,
                        toastClass: "toast-alert toast-green",
                        timeOut: 2000
                    });
    
    this.generatePL.emit('eomDone');
    this.selectedTab = 1;
    this.showHeadTextFinal = true;
    this.pnlTab = true;
    this.showHeadText = true;
    //this.changeTabs(e);
    this.acceptClosedReturn = true;
  }
  
  runEOM(){
    //this.pagedisabled = false;
    this.panel_inactive = false;
    this.current_state= 'startclosure';
    //this.stepLevel = this.progressStepper2;

    this.buttonCounter++;
  switch (this.buttonCounter) {
    case 1:
      this.runEOMReady();
      break;
   case 2:
    this.runEOMReady2();
     break;
   case 3:
    this.generatePNL();
     break;
   case 4:
    this.acceptClose();
     break;
  default:
    break;


  }
    
}
  
  panelClosed(gridType){
    this.showGridMenu = false;
    this.showFooter = false;
    this.showAccReceivable = true;
    this.showAccPayable = true;
    this.showInventory = true;
    this.showDerivatives = true;
    this.showBorder = true;

  }
  panelOpened(gridType){
    //alert(gridType);
    if(gridType == 'accReceivable'){
      this.showAccPayable = false;
      this.showInventory = false;
      this.showDerivatives = false;
      this.showFooter = true;
    }
    if(gridType == 'accPayable'){
      this.showAccReceivable = false;
      this.showInventory = false;
      this.showDerivatives = false;
      this.showFooter = true;
    }
    if(gridType == 'inventory'){
      this.showAccReceivable = false;
      this.showAccPayable = false;
      this.showDerivatives = false;
      this.showFooter = true;
    }
    if(gridType == 'derivatives'){
      this.showAccReceivable = false;
      this.showAccPayable = false;
      this.showInventory = false;
      this.showFooter = true;
    }
    this.showGridMenu = true;
    this.showBorder = false;
  }

  journalPanelClosed(gridType){
    this.showGridMenu = false;
    this.showJournalFooter = false;
    this.showDerivativeJournals = true;
    this.showInvJournals = true;
    this.showArJournals = true;
    this.showApJournals = true;
    this.showJournalBorder = true;
  }
  journalPanelOpened(gridType){
    if(gridType == 'derivativeJournals'){
      this.showInvJournals = false;
      this.showApJournals = false;
      this.showArJournals = false;
      this.showJournalFooter = true;
    }
    if(gridType == 'invJournals'){
      this.showDerivativeJournals = false;
      this.showApJournals = false;
      this.showArJournals = false;
      this.showJournalFooter = true;
    }
    if(gridType == 'arJournals'){
      this.showDerivativeJournals = false;
      this.showInvJournals = false;
      this.showApJournals = false;
      this.showJournalFooter = true;
    }
    if(gridType == 'apJournals'){
      this.showDerivativeJournals = false;
      this.showInvJournals = false;
      this.showArJournals = false;
      this.showJournalFooter = true;
    }
    this.showGridMenu = true;
    this.showJournalBorder = false;
  }
  //Ag-Grid

    public gridOptions: GridOptions;
    public gridOptions_journals: GridOptions;
    public columnSelection: any;
    public rowCount: Number;
  
    constructor(public dialog: MatDialog,private toaster: ToastrService,public router: Router,private _location: Location) {
      this.gridOptions = <GridOptions>{
        suppressRowTransform: true,
        columnDefs: this.columnDefs,
        enableColResize: true,
        enableSorting: true,
        animateRows: true,
        filter: true,
        getRowHeight: params => {
          return this.isdisplaydensityhigh ? 50 : 25;
        },
        headerHeight:  25,
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
        onFirstDataRendered(params) {
          params.api.sizeColumnsToFit();
        },
        getRowClass: params => {
          var classArray: string[] = [];                     
        //     let newClass= params.data.type==='Passed'?'aggrid-left-ribbon darkgreen':
        //     params.data.type==='Warning'?'aggrid-left-ribbon amber':
        // 'aggrid-left-ribbon mediumred';
        //   classArray.push(newClass);
  
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
            //params.api.sizeColumnsToFit();
          }
        }
      };

      this.gridOptions_journals = <GridOptions>{
        suppressRowTransform: true,
        columnDefs: this.columnDefs_journals,
        enableColResize: true,
        enableSorting: true,
        animateRows: true,
        filter: true,
        getRowHeight: params => {
          return this.isdisplaydensityhigh ? 50 : 25;
        },
        headerHeight:  25,
        defaultColDef: {
          filter: true,
          enableSorting: true
        },
        onGridReady: params => {
          this.gridOptions_journals.api = params.api;
          this.gridOptions_journals.columnApi = params.columnApi;
          this.gridOptions_journals.api.sizeColumnsToFit();
          this.gridOptions_journals.enableColResize = true;
          this.gridOptions_journals.api.setRowData(this.rowData_journals);
          // params.api.setPinnedBottomRowData([
          //   { gl_code: 'Total', debit_amount: '1,050,000 USD', credit_amount: '1,050,000 USD' }
          // ]);
          this.rowCount = this.gridOptions_journals.api.getDisplayedRowCount();
        },
        onFirstDataRendered(params) {
          params.api.sizeColumnsToFit();
        },
        /* 
        getRowClass: params => {
          var classArray: string[] = [];                     
        //     let newClass= params.data.type==='Passed'?'aggrid-left-ribbon darkgreen':
        //     params.data.type==='Warning'?'aggrid-left-ribbon amber':
        // 'aggrid-left-ribbon mediumred';
        //   classArray.push(newClass);
  
          if (params.node.rowIndex % 2 === 0) {
            classArray.push("aggrid-evenrow-bg");
            classArray.push("aggrid-evenrow-border-dark");
          } else {
            classArray.push("aggrid-oddrow-bg");
            classArray.push("aggrid-evenrow-border-dark");
          }
  
          return classArray.length > 0 ? classArray : null;
        }, */
        getRowClass:(params)=> {
          var classArray:string[] =[];
          classArray.push('aggrid-evenrow-border-dark');
          let newClass= (params.data.debit_amount!=='' && params.data.credit_amount==='')?'aggrid-left-ribbon-lightblue':
                          (params.data.debit_amount==='' && params.data.credit_amount!=='')?'aggrid-left-ribbon-purple':
                          (params.data.debit_amount!=='' && params.data.credit_amount!=='')?'aggrid-left-ribbon dark':
                          'aggrid-left-ribbon dark';
                          classArray.push(newClass);
          return classArray.length>0?classArray:null;
      },
        onColumnResized: function(params) {
          if (
            params.columnApi.getAllDisplayedColumns().length <= 10 &&
            params.type === "columnResized" &&
            params.finished === true &&
            params.source === "uiColumnDragged"
          ) {
            //params.api.sizeColumnsToFit();
          }
        }
      };
    }
  
    public columnDefs = [
      {
        headerName: "Delivery Number",
        field: "deliverynumber",
        headerTooltip: "Delivery Number",
        type: "numericColumn" ,
        cellClass: ["aggridlink","aggridtextalign-right",],
        //width: 150
      },
      {
        headerName: "Trade ID",
        field: "tradeid",
        headerTooltip: "Trade ID",
        type: "numericColumn" ,
        cellClass: ["aggridlink","aggridtextalign-right",],
        //width: 150
      },
  
      {
        headerName: " Delivery Date",
        field: "deliverydate",
        headerTooltip: " Delivery Date",
        cellClass: ["aggridtextalign-center"],
        headerClass: ["", "aggrid-text-align-c"],
        //width: 150,
        cellRendererFramework: AGGridCellRendererComponent,
        cellRendererParams: { cellClass: ["custom-chip dark"] }
      },
      {
        headerName: "Invoice Number",
        field: "invoicenumber",
        headerTooltip: "Invoice Number",
        type: "numericColumn" ,
        cellClass: ["aggridlink","aggridtextalign-right",],
        //width: 150,
        cellRendererFramework: AGGridCellRendererComponent
      },
  
      {
        headerName: "Invoice Date",
        field: "invoicedate",
        headerTooltip: "Invoice Date",
        cellClass: ["aggridtextalign-center"],
        headerClass: ["", "aggrid-text-align-c"],
        //width: 150,
        cellRendererFramework: AGGridCellRendererComponent,
        cellRendererParams: { cellClass: ["custom-chip dark"] }
      },
      // {
      //   headerName: "Work Progress",
      //   field: "workprogress",
      //   headerTooltip: "Work Progress",       
      //   headerClass: ["", ],
      //   cellClass: ["aggrid-graycell"],
      //   width: 150,
      //   cellRendererFramework: AGGridCellDataComponent,
      //   cellRendererParams: {stylemode:'dropdown-editable-singlerow', type:'dropdown-grey', values: ["Not Started", "In Progress"]},
     
      // },
      {
        headerName: "Message",
        field: "message",
        headerTooltip: "Message",
        cellClass: ["aggridtextalign-left"],
        //headerClass: ["", ],
        //suppressSizeToFit: true,
        //width: 300,
        //cellRendererFramework: AGGridCellRendererComponent
      },
      {
        headerName: "Type",
        field: "type",
        headerTooltip: "Type",        
        headerClass: ["","aggrid-text-align-c" ],
        cellClass: ["aggridtextalign-center"],
        //width: 150,
        //suppressSizeToFit: true,
        cellRendererFramework: AGGridCellRendererComponent,
        cellRendererParams: function(params) { 
          var classArray:string[] =[]; 
            classArray.push('aggridtextalign-center');
            let newClass= params.value==='Warning'?'custom-chip amber':
                          params.value==='Error'?'custom-chip mediumred':
                          'custom-chip dark';
                          classArray.push(newClass);
            return {cellClass: classArray.length>0?classArray:null} }
      }
    ];
  
    // text-center custom-chip dark mat-chip mat-primary mat-standard-chip
    private rowData = [
      {
        deliverynumber: "PHS0012334-1", tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started",  message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1",  tradeid:"PHS0012334",deliverydate: "05-Nov-2019", invoicenumber: "INS0012334-1", invoicedate: "05-Nov-2019", workprogress: "Not Started", message:"Invoice approved in front office but not posted in Back office", type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",   tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started", message:"Invoice not posted",        type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",        tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",  workprogress: "Not Started",        message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1", tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started",  message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1",  tradeid:"PHS0012334",deliverydate: "05-Nov-2019", invoicenumber: "INS0012334-1", invoicedate: "05-Nov-2019", workprogress: "Not Started", message:"Invoice approved in front office but not posted in Back office", type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",   tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started", message:"Invoice not posted",        type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",        tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",  workprogress: "Not Started",        message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1", tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started",  message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1",  tradeid:"PHS0012334",deliverydate: "05-Nov-2019", invoicenumber: "INS0012334-1", invoicedate: "05-Nov-2019", workprogress: "Not Started", message:"Invoice approved in front office but not posted in Back office", type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",   tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started", message:"Invoice not posted",        type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",        tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",  workprogress: "Not Started",        message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1", tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started",  message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1",  tradeid:"PHS0012334",deliverydate: "05-Nov-2019", invoicenumber: "INS0012334-1", invoicedate: "05-Nov-2019", workprogress: "Not Started", message:"Invoice approved in front office but not posted in Back office", type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",   tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started", message:"Invoice not posted",        type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",        tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",  workprogress: "Not Started",        message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1", tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started",  message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1",  tradeid:"PHS0012334",deliverydate: "05-Nov-2019", invoicenumber: "INS0012334-1", invoicedate: "05-Nov-2019", workprogress: "Not Started", message:"Invoice approved in front office but not posted in Back office", type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",   tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started", message:"Invoice not posted",        type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",        tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",  workprogress: "Not Started",        message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1", tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started",  message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1",  tradeid:"PHS0012334",deliverydate: "05-Nov-2019", invoicenumber: "INS0012334-1", invoicedate: "05-Nov-2019", workprogress: "Not Started", message:"Invoice approved in front office but not posted in Back office", type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",   tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started", message:"Invoice not posted",        type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",        tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",  workprogress: "Not Started",        message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1", tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started",  message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1",  tradeid:"PHS0012334",deliverydate: "05-Nov-2019", invoicenumber: "INS0012334-1", invoicedate: "05-Nov-2019", workprogress: "Not Started", message:"Invoice approved in front office but not posted in Back office", type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",   tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started", message:"Invoice not posted",        type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",        tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",  workprogress: "Not Started",        message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1", tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started",  message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1",  tradeid:"PHS0012334",deliverydate: "05-Nov-2019", invoicenumber: "INS0012334-1", invoicedate: "05-Nov-2019", workprogress: "Not Started", message:"Invoice approved in front office but not posted in Back office", type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",   tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started", message:"Invoice not posted",        type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",        tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",  workprogress: "Not Started",        message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1", tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started",  message:"Invoice not posted",        type:"Error",
      },
      {
        deliverynumber: "PHS0012334-1",  tradeid:"PHS0012334",deliverydate: "05-Nov-2019", invoicenumber: "INS0012334-1", invoicedate: "05-Nov-2019", workprogress: "Not Started", message:"Invoice approved in front office but not posted in Back office", type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",   tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",        workprogress: "Not Started", message:"Invoice not posted",        type:"Warning",
      },
      {
        deliverynumber: "PHS0012334-1",        tradeid:"PHS0012334",        deliverydate: "05-Nov-2019",        invoicenumber: "INS0012334-1",        invoicedate: "05-Nov-2019",  workprogress: "Not Started",        message:"Invoice not posted",        type:"Error",
      },
      

      

    ];

    public columnDefs_journals = [
      {
        headerName: "GL Code",
        field: "gl_code",
        headerTooltip: "GL Code",
        cellClass: ["aggridlink","aggridtextalign-left align-left"],
        headerClass: ["", "aggrid-text-align-l"],
        width: 150
      },      
      {
        headerName: "Date",
        field: "date",
        headerTooltip: "Date",
        cellClass: ["aggridtextalign-center"],
        headerClass: ["", "aggrid-text-align-c"],
        width: 150,
        cellRendererFramework: AGGridCellRendererComponent,
        cellRendererParams: { cellClass: ["custom-chip dark"] }
      },
      {
        headerName: "Description",
        field: "description",
        headerTooltip: "Description",
        cellClass: ["aggridtextalign-left align-left"],
        headerClass: ["", "aggrid-text-align-l"],
        width: 300
      },
      {
        headerName: "Debit Amount",
        field: "debit_amount",
        headerTooltip: "Debit Amount",
        type: "numericColumn" ,
        cellClass: ["aggridtextalign-right"],
        width: 150,
        cellRendererFramework: AGGridCellRendererComponent
      },
      {
        headerName: "Credit Amount",
        field: "credit_amount",
        headerTooltip: "Credit Amount",
        type: "numericColumn" ,
        cellClass: ["aggridtextalign-right"],
        width: 150,
        cellRendererFramework: AGGridCellRendererComponent
      } 
    ];

    private rowData_journals = [
      {
        gl_code: 'GL1234000-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '350,000 USD', credit_amount: ''
      },
      {
        gl_code: 'GL1234100-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '', credit_amount: '350,000 USD'
      },
      {
        gl_code: 'GL1234200-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '350,000 USD', credit_amount: ''
      },
      {
        gl_code: 'GL1234300-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '', credit_amount: '350,000 USD'
      },
      {
        gl_code: 'GL1234000-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '350,000 USD', credit_amount: ''
      },
      {
        gl_code: 'GL1234100-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '', credit_amount: '350,000 USD'
      },
      {
        gl_code: 'GL1234000-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '350,000 USD', credit_amount: ''
      },
      {
        gl_code: 'GL1234100-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '', credit_amount: '350,000 USD'
      },
      {
        gl_code: 'GL1234200-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '350,000 USD', credit_amount: ''
      },
      {
        gl_code: 'GL1234300-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '', credit_amount: '350,000 USD'
      },
      {
        gl_code: 'GL1234000-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '350,000 USD', credit_amount: ''
      },
      {
        gl_code: 'GL1234100-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '', credit_amount: '350,000 USD'
      },
      {
        gl_code: 'GL1234000-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '350,000 USD', credit_amount: ''
      },
      {
        gl_code: 'GL1234100-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '', credit_amount: '350,000 USD'
      },
      {
        gl_code: 'GL1234200-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '350,000 USD', credit_amount: ''
      },
      {
        gl_code: 'GL1234300-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '', credit_amount: '350,000 USD'
      },
      {
        gl_code: 'GL1234000-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '350,000 USD', credit_amount: ''
      },
      {
        gl_code: 'GL1234100-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '', credit_amount: '350,000 USD'
      },
      {
        gl_code: 'GL1234000-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '350,000 USD', credit_amount: ''
      },
      {
        gl_code: 'GL1234100-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '', credit_amount: '350,000 USD'
      },
      {
        gl_code: 'GL1234200-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '350,000 USD', credit_amount: ''
      },
      {
        gl_code: 'GL1234300-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '', credit_amount: '350,000 USD'
      },
      {
        gl_code: 'GL1234000-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '350,000 USD', credit_amount: ''
      },
      {
        gl_code: 'GL1234100-2', date: '05-Nov-2019', description: 'Derivative Realised', debit_amount: '', credit_amount: '350,000 USD'
      }
    ];
  
    public change_rowdensity() {
      this.isdisplaydensityhigh = !this.isdisplaydensityhigh;
      if (this.isdisplaydensityhigh) {
        this.gridOptions.rowHeight = 50;
        this.gridOptions.headerHeight = 50;
       
      } else {
        this.gridOptions.rowHeight = 25;
        this.gridOptions.headerHeight = 25;
        
      }
      this.gridOptions.api.resetRowHeights();
      this.gridOptions.api.refreshHeader();
    }
  
}
