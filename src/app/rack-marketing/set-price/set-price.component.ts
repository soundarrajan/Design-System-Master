import { Component, OnInit,ViewChild, ElementRef, asNativeElements } from '@angular/core';
import { SetpricePublishComponent } from '../../shared/dialog-popup/setprice-publish/setprice-publish.component';
import { SetpriceRepublishComponent } from '../../shared/dialog-popup/setprice-republish/setprice-republish.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { GridOptions } from "ag-grid-community";
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { DomSanitizer } from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-set-price',
  templateUrl: './set-price.component.html',
  styleUrls: ['./set-price.component.scss']
})
export class SetPriceComponent implements OnInit {
  //@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  isDisabled = true;
  opacity = false;
  emaillog_isopen = false;
  auditlog_isopen = false;
  isconfirm =false;
  toastRef;
  public dateTime;
  current_state = 'dismissed'; //'save','confirm','publish','send','dismissed'
  customCollapsedHeight: string = '65px';
  customExpandedHeight: string = '40px';
  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;

  @ViewChild('togglecolumn') togglecolumn;
  @ViewChild('priceInput') InputPrice;

  ngOnInit() {
    document.querySelector('.pcoded-main-container').classList.add('doublegrid-collapsed');
  }

  toggleColumn() {
    this.togglecolumn.openMenu();
  }

  toastGreen() {
    this.current_state='confirm';
    this.toastr.show('<span class="image"></span><span class="message">Trade created successfully!</span>',
               '' , {
                        enableHtml: true,
                        //closeButton: true,
                        toastClass: "toast-alert toast-green", // toast-green, toast-amber, toast-red, toast-grey
                        timeOut: 2000
                    });
  }

  toastAmber() {
    this.current_state='confirm';
    this.toastr.show('<span class="image"></span><span class="message">Valid date range is required!</span>',
               '' , {
                        enableHtml: true,
                        //closeButton: true,
                        toastClass: "toast-alert toast-amber", // toast-green, toast-amber, toast-red, toast-grey
                        timeOut: 2000
                    });
  }

  toastRed() {
    this.current_state='confirm';
    this.toastr.show('<span class="image"></span><span class="message">Fatal Error! Please refresh</span>',
               '' , {
                        enableHtml: true,
                        //closeButton: true,
                        toastClass: "toast-alert toast-red", // toast-green, toast-amber, toast-red, toast-grey
                        timeOut: 2000
                    });
  }

  toastGrey() {
    this.current_state='confirm';
    this.toastr.show('<span class="image"></span><span class="message">Default Notification</span>',
               '' , {
                        enableHtml: true,
                        //closeButton: true,
                        toastClass: "toast-alert toast-grey", // toast-green, toast-amber, toast-red, toast-grey
                        timeOut: 2000
                    });
  }

  openPublishDialog() {
    const dialogRef = this.dialog.open(SetpricePublishComponent, {
      //height: '200px',
      //width: '200px',      
      //position: { left: '15px',top:'150px'}
      width: '843px',
      position: { top:'25px'},
      //top: '25px',
      panelClass: 'custom-popup-container'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      const element = <HTMLElement>document.activeElement;
      element.blur();       
    });
    
  }

  openRepublishDialog() {
    const dialogRef = this.dialog.open(SetpriceRepublishComponent, {
      //height: '200px',
      //width: '200px',      
      //position: { left: '15px',top:'150px'}
      width: '843px',
      height: '900px',
      position: { top:'25px'},
      //top: '25px',
      panelClass: 'custom-popup-container'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }

  changeTitle(){
    //alert("ss");
    this.opacity= true;

    //var panel = document.getElementsByClassName('add-terminal-panel')[0];
    var title = document.getElementsByClassName('add-terminal-title')[0];
    //document.getElementsByClassName('add-terminal-panels')[0].style.opacity = "0.3";
    title.innerHTML = 'Type and Select';
  }

  editablefocus(data){
    // var el = document.getElementById("editable");
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(this.InputPrice.firstChild, 5);
    range.collapse(true);
   sel.removeAllRanges();
    sel.addRange(range);
    this.InputPrice.focus();
  }


  //AG GRID COFICS
  public gridOptions_pricedataset: GridOptions;  
  public gridOptions_valero: GridOptions;
  public gridOptions_emailLog: GridOptions;  
  public gridOptions_auditLog: GridOptions;  
  
  constructor(public dialog: MatDialog, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private elRef: ElementRef,private toastr: ToastrService) {
    iconRegistry.addSvgIcon(
      'data-picker',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/customicons/datepicker.svg'));
      iconRegistry.addSvgIcon(
        'time-picker',
        sanitizer.bypassSecurityTrustResourceUrl('../assets/customicons/timepicker.svg'));
      

    this.gridOptions_pricedataset = <GridOptions>{      
      columnDefs: this.columnDef,
      enableColResize: true,
      enableSorting: true,
      filter: true,
      // pagination: true,
      suppressRowClickSelection:true,
      // paginationPageSize: 6,
      headerHeight:50,
      // rowHeight: 50,
      rowSelection: 'multiple',
      animateRows:true,
      autoGroupColumnDef: {
        headerName: "Athlete",
        field: "athlete",
        width: 200,
        cellRenderer: "agGroupCellRenderer",
        cellRendererParams: { checkbox: true }
      },
      defaultColDef: {
        filter: true,
        enableSorting: true,
    },
    
      onCellValueChanged: ($event)=>{
        console.log($event);
      },
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 50:25
       },
      onGridReady: (params) => {
          this.gridOptions_pricedataset.api = params.api;
          this.gridOptions_pricedataset.columnApi = params.columnApi;
          this.gridOptions_pricedataset.api.sizeColumnsToFit(); 
          this.gridOptions_pricedataset.enableColResize = true;
          this.gridOptions_pricedataset.api.setRowData(this.rowData);          
      },
     
      getRowClass:(params)=> {
        let classes:string []=[];   
        if (params.node.rowIndex % 2 === 0) {
          classes.push('aggrid-evenrow-bg');
          classes.push('aggrid-evenrow-border-dark');
        }
        else {
          classes.push('aggrid-oddrow-bg');
          classes.push('aggrid-evenrow-border-dark');
        }
        if(params.node.rowIndex==2){
          classes.push('aggrid-line-through');
          classes.push('aggrid-left-ribbon grey');
        }
        else{
          classes.push('aggrid-left-ribbon-greyblue');
        }
        if(classes.length>0)
          return classes;       
      },
      onColumnResized: function(params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function(params) {
        if(params.columnApi.getAllDisplayedColumns().length <= 10)
          params.api.sizeColumnsToFit();
      }
    } 

    this.gridOptions_valero = <GridOptions>{      
      columnDefs: this.columnDef,
      enableColResize: true,
      enableSorting: true,
      filter: true,
      // pagination: true,
      suppressRowClickSelection:true,
      // paginationPageSize: 6,
      headerHeight:50,
      // rowHeight: 50,
      rowSelection: 'multiple',
      animateRows:true,
      autoGroupColumnDef: {
        headerName: "Athlete",
        field: "athlete",
        width: 200,
        cellRenderer: "agGroupCellRenderer",
        cellRendererParams: { checkbox: true }
      },
      defaultColDef: {
        filter: true,
        enableSorting: true,
    },
    
      onCellValueChanged: ($event)=>{
        console.log($event);
      },
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 50:25
       },
      onGridReady: (params) => {
          this.gridOptions_valero.api = params.api;
          this.gridOptions_valero.columnApi = params.columnApi;
          this.gridOptions_valero.api.sizeColumnsToFit(); 
          this.gridOptions_valero.enableColResize = true;
          this.gridOptions_valero.api.setRowData(this.rowData2);          
      },
     
      getRowClass:(params)=> {
        let classes:string []=[];   
        if (params.node.rowIndex % 2 === 0) {
          classes.push('aggrid-evenrow-bg');
          classes.push('aggrid-evenrow-border-dark');
        }
        else {
          classes.push('aggrid-oddrow-bg');
          classes.push('aggrid-evenrow-border-dark');
        }
        if(params.node.rowIndex==2){
          classes.push('aggrid-line-through');
          classes.push('aggrid-left-ribbon grey');
        }
        else{
          classes.push('aggrid-left-ribbon-greyblue');
        }
        if(classes.length>0)
          return classes;       
      },
      onColumnResized: function(params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function(params) {
        if(params.columnApi.getAllDisplayedColumns().length <= 10)
          params.api.sizeColumnsToFit();
      }
    } 


    this.gridOptions_emailLog = <GridOptions>{      
      columnDefs: this.columnDef_emailLog,
      enableColResize: true,
      enableSorting: true,
      filter: true,
      // pagination: true,
      suppressRowClickSelection:true,
      // paginationPageSize: 6,
      headerHeight:50,
      rowHeight: 50,
      rowSelection: 'multiple',
      animateRows:true,
      defaultColDef: {
        filter: true,
        enableSorting: true,
    },
      autoGroupColumnDef: {
        headerName: "Athlete",
        field: "athlete",
        width: 200,
        cellRenderer: "agGroupCellRenderer",
        cellRendererParams: { checkbox: true }
      },
      onCellValueChanged: ($event)=>{
        console.log($event);
      },
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 50:25
       },
      onGridReady: (params) => {
          // this.gridOptions_pricedataset.api = params.api;
          this.gridOptions_emailLog.columnApi = params.columnApi;
          this.gridOptions_emailLog.api.sizeColumnsToFit(); 
          this.gridOptions_emailLog.enableColResize = true;
          this.gridOptions_emailLog.api.setRowData(this.rowData_emailLog);          
      },
      getRowClass:(params)=> {
        let classes:string []=[];
        
        if (params.node.rowIndex % 2 === 0) {
          classes.push('aggrid-evenrow-bg');
          classes.push('aggrid-evenrow-border-dark');
        }
        else {
          classes.push('aggrid-oddrow-bg');
          classes.push('aggrid-evenrow-border-dark');
        }
        if(classes.length>0)
          return classes;       
      },
      onColumnResized: function(params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function(params) {
        if(params.columnApi.getAllDisplayedColumns().length <= 10)
          params.api.sizeColumnsToFit();
      }
    } 


    this.gridOptions_auditLog = <GridOptions>{      
      columnDefs: this.columnDef_auditLog,
      enableColResize: true,
      enableSorting: true,
      filter: true,
      // pagination: true,
      suppressRowClickSelection:true,
      // paginationPageSize: 6,
      headerHeight:50,
      rowHeight: 50,
      rowSelection: 'multiple',
      animateRows:true,
      autoGroupColumnDef: {
        headerName: "Athlete",
        field: "athlete",
        width: 200,
        cellRenderer: "agGroupCellRenderer",
        cellRendererParams: { checkbox: true }
      },
      defaultColDef: {
        filter: true,
        enableSorting: true,
    },
      onCellValueChanged: ($event)=>{
        console.log($event);
      },
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 50:25
       },
      onGridReady: (params) => {
          // this.gridOptions_pricedataset.api = params.api;
          this.gridOptions_auditLog.columnApi = params.columnApi;
          this.gridOptions_auditLog.api.sizeColumnsToFit(); 
          this.gridOptions_auditLog.enableColResize = true;
          this.gridOptions_auditLog.api.setRowData(this.rowData_auditLog);          
      },
      getRowClass:(params)=> {
        let classes:string []=[];
        
        if (params.node.rowIndex % 2 === 0) {
          classes.push('aggrid-evenrow-bg');
          classes.push('aggrid-evenrow-border-dark');
        }
        else {
          classes.push('aggrid-oddrow-bg');
          classes.push('aggrid-evenrow-border-dark');
        }       
        if(classes.length>0)
          return classes;       
      },
      onColumnResized: function(params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function(params) {
        if(params.columnApi.getAllDisplayedColumns().length <= 10)
          params.api.sizeColumnsToFit();
      }
    } 

   }

  private columnDef = [
    { headerName: 'Product', headerTooltip:'Product', field:'product', cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {style:'link underline',type:'dropdown', values: ["Activate", "Deactivate", "Remove"]}, width:250, suppressSizeToFit: true},
    { headerName: 'OPIS Price', headerTooltip:'OPIS Price', field:'opisprice',  type: "numericColumn" },
    { headerName: 'Blended Avg Cost', headerTooltip:'Blended Avg Cost', field:'blendedavgcost', type: "numericColumn"},
    { headerName: 'Base Price', headerTooltip:'Base Price', field:'baseprice', cellClass:['aggrid-editable','aggridtextalign-right'],type: "numericColumn" },
    { headerName: 'LCFS', headerTooltip:'LCFS', field: 'lcfs',cellClass:['aggridtextalign-left','aggrid-editable'], cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {style:'checkbox'} },
    { headerName: 'C&T', headerTooltip:'C&T', field: 'candt', cellClass:['aggridtextalign-left','aggrid-editable'], cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {style:'checkbox'} },
    { headerName: 'Premium/Discount', headerTooltip:'Premium/Discount', field: 'premiumdiscount',cellClass:['aggrid-editable','aggridtextalign-right'], type: "numericColumn" },
    { headerName: 'Final Price', headerTooltip:'Final Price', field: 'finalprice', cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {style:'notification aggridtextalign-right'} },
    { headerName: 'Variance To Last Price', headerTooltip:'Variance To Last Price', field: 'variancetolastprice' , cellClass:['aggridtextalign-right'], cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {style:'raisedownicon aggridtextalign-right'}}
];

private rowData = [

// {
//   opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
// },
// {
//   opisprice:'3.3216', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
// },
// {
//   opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
// },
// {
//   opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
// },
// {
//   opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
// },
// {
//   opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
// },
// {
//   opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
// },
// {
//   opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
// },
// {
//   opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
// },
// {
//   opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
// },
// {
//   opisprice:'3.3216 ' , blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
// },
// {
//   opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
// }

];

private rowData2 = [

  {
    opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
  },
  {
    opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
  },
  {
    opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
  },
  {
    opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
  },
  {
    opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
  },
  {
    opisprice:'3.3216 ', blendedavgcost: '3.3216 ', baseprice: '3.3216 ', lcfs: '3.3216 ', candt: '3.3216 ', product: '87 CARFG - ETH', premiumdiscount: '3.3216 ', finalprice: '3.3216 ', variancetolastprice:'3.3216 '
  },

];

private columnDef_emailLog = [
  { headerName: 'Mail Sent To', headerTooltip:'Mail Sent To',  field:'mailto',
    cellClass:function(params) {
      if (params.data.status=='Failed') 
          return ['aggrid-left-ribbon mediumred'];
      else 
          return ['aggrid-left-ribbon darkgreen'];
    }, width:220, suppressSizeToFit: true
  },
  { headerName: 'Status', headerTooltip:'Status', field:'status',
    cellRendererFramework:AGGridCellRendererComponent, cellClass: ['aggridtextalign-center'],
      cellRendererParams: function(params) { 
        var classArray:string[] =[]; 
          classArray.push('aggridtextalign-center');
          let newClass= params.value==='Success'?'custom-chip darkgreen':
                        params.value==='Failed'?'custom-chip mediumred':
                        'custom-chip dark';
                        classArray.push(newClass);
          return {cellClass: classArray.length>0?classArray:null} },
    width:150, suppressSizeToFit: true },
  { headerName: 'Sender', headerTooltip:'Sender', field:'sender'},
  { headerName: 'Subject', headerTooltip:'Subject', field:'subject'},
  { headerName: 'Mail Date', headerTooltip:'Mail Date', field:'maildate',cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: 'custom-chip dark'}, headerClass:['aggridtextalign-center'], suppressSizeToFit: true, cellClass: ['aggridtextalign-center'] }

];


private rowData_emailLog = [

  {
    mailto:'ajayan.K@inatech.com', status: 'Success', sender: 'uat5@twentyfoursoftwareoutlook.onmicrosoft.com ', subject: 'Rack Prices', maildate: '27-Apr-2018  11:34'
  },
  {
    mailto:'ajayan.K@inatech.com', status: 'Failed', sender: 'uat5@twentyfoursoftwareoutlook.onmicrosoft.com', subject: 'Rack Prices', maildate: '27-Apr-2018  11:34'
  },
  {
    mailto:'ajayan.K@inatech.com ', status: 'Success', sender: 'uat5@twentyfoursoftwareoutlook.onmicrosoft.com', subject: 'Rack Prices', maildate: '27-Apr-2018  11:34'
  },
  {
    mailto:'ajayan.K@inatech.com', status: 'Success', sender: 'uat5@twentyfoursoftwareoutlook.onmicrosoft.com', subject: 'Rack Prices', maildate: '27-Apr-2018  11:34'
  },
  {
    mailto:'ajayan.K@inatech.com', status: 'Success', sender: 'uat5@twentyfoursoftwareoutlook.onmicrosoft.com ', subject: 'Rack Prices', maildate: '27-Apr-2018  11:34'
  },
  {
    mailto:'ajayan.K@inatech.com', status: 'Failed', sender: 'uat5@twentyfoursoftwareoutlook.onmicrosoft.com', subject: 'Rack Prices', maildate: '27-Apr-2018  11:34'
  },
  {
    mailto:'ajayan.K@inatech.com ', status: 'Success', sender: 'uat5@twentyfoursoftwareoutlook.onmicrosoft.com', subject: 'Rack Prices', maildate: '27-Apr-2018  11:34'
  },
  {
    mailto:'ajayan.K@inatech.com', status: 'Success', sender: 'uat5@twentyfoursoftwareoutlook.onmicrosoft.com', subject: 'Rack Prices', maildate: '27-Apr-2018  11:34'
  }
]

private columnDef_auditLog = [
  { headerName: 'Entity Name', headerTooltip:'Entity Name', field:'entityname', cellClass:['aggrid-left-ribbon darkgray']},
  { headerName: 'Event Type', headerTooltip:'Event Type', field:'eventtype'},
  //{ headerName: 'Location', headerTooltip:'Location', field:'location'},
  //{ headerName: 'Terminal', headerTooltip:'Terminal', field:'terminal'},
  //{ headerName: 'Product', headerTooltip:'Product', field:'product'},
  { headerName: 'Field Name', headerTooltip:'Field Name', field:'fieldname'},
  { headerName: 'New Value', headerTooltip:'New Value', field:'newvalue', type: "numericColumn" },
  { headerName: 'Old Value', headerTooltip:'Old Value', field:'oldvalue', type: "numericColumn" },
  { headerName: 'User Name', headerTooltip:'User Name', field:'username'},
  { headerName: 'Date', headerTooltip:'Date', field:'date', cellRendererFramework:AGGridCellRendererComponent,  cellRendererParams: {cellClass: 'custom-chip dark aggrid-space'}, cellClass: ['aggridtextalign-center'], headerClass:['aggridtextalign-center'], width: 250 }
];

private rowData_auditLog = [

  {
    entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
  },
  {
    entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
  },
  {
    entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
  },
  {
    entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
  },
  {
    entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
  },
  {
    entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
  },
  {
    entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
  },
  {
    entityname:'Rack Price', eventtype: 'Add', location: 'Colton', terminal: 'Valero', product: '87 CARFG - ETH',fieldname:'Base Price',newvalue:'18',oldvalue:'18',username:'vaishnavi.n@inatech.com',date:'27-Apr-2018  11:34'
  },
  
]

public change_rowdensity(){
  this.isdisplaydensityhigh = !this.isdisplaydensityhigh;
  if(this.isdisplaydensityhigh){
    this.gridOptions_pricedataset.rowHeight = 50;
    this.gridOptions_valero.rowHeight = 50;
    this.gridOptions_emailLog.rowHeight = 50;
    this.gridOptions_auditLog.rowHeight = 50;
  }
  else{
    this.gridOptions_pricedataset.rowHeight = 25;
    this.gridOptions_valero.rowHeight = 25;
    this.gridOptions_emailLog.rowHeight = 25;
    this.gridOptions_auditLog.rowHeight = 25;
  }
  this.gridOptions_pricedataset.api.resetRowHeights();
  this.gridOptions_valero.api.resetRowHeights();
  this.gridOptions_emailLog.api.resetRowHeights();
  this.gridOptions_auditLog.api.resetRowHeights();
  console.log(this.gridOptions_pricedataset.getRowHeight());
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


