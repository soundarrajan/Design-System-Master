import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { ToastrService } from 'ngx-toastr';
import { AggridLinkComponent } from 'src/app/shared/ag-grid/ag-grid-link.component';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { DynamicPopupComponent } from 'src/app/shared/dialog-popup/dynamic-popup/dynamic-popup.component';


@Component({
  selector: 'app-approval-list-screen',
  templateUrl: './approval-list-screen.component.html',
  styleUrls: ['./approval-list-screen.component.css']
})
export class ApprovalListScreenComponent implements OnInit {

  @Input('toggleHeader') toggleHeader: boolean = false;
  public isdisplaydensityhigh: boolean = false;
  public selectedRow=[];
  public filterChip = "Pending";
  //selected - Filter chip which is currently selected/applied on grid
  //pinned - Filter chips which are pinned for displaying on screen
  //defaultFilter - Filters which user cannot modify/delete,always displayed on screen
  filterList = {
    filters: [
      {
        name: 'Default View',
        defaultFilter: false,
        selected: true,
        pinned: true,
        position: 0
      },
      {
        name: 'Approved',
        defaultFilter: false,
        selected: false,
        pinned: true,
        position: 1
      },
      {
        name: 'Rejected',
        defaultFilter: false,
        selected: false,
        pinned: true,
        position: 2
      },
     
    ],
    enableMoreFilters: true,
    multiSelect: false
  }
  ngOnInit() {
    
  }


  onRowSelected(event) {
    //alert("");
  }

  filterGridNew(name){
    //alert(name);
    if(name=="Default View"){
      name="Pending";
    }
    var instance = this.gridOptions.api.getFilterInstance('appStatus');
      instance.setModel({
        values: [name],
      });
      this.gridOptions.api.onFilterChanged();
  }

  public onScroll: boolean = true;

  get isScrolling() {
    return onScroll
  }

  get isPinnedRight() {
    return isColPinned_right
  }

  get isPinnedLeft() {
    return isColPinned_left
  }

  // AG GRID
  public gridOptions: GridOptions;
  private paginationPageSize: number;
  public rowCount: Number;
  constructor(public dialog: MatDialog, private toastr: ToastrService,) {
    this.gridOptions = <GridOptions>{
      columnDefs: this.columnDefs,
      getRowHeight: (params) => {
        return this.isdisplaydensityhigh ? 48 : 25
      },
      headerHeight: this.isdisplaydensityhigh ? 60 : 35,
      groupHeaderHeight: this.isdisplaydensityhigh ? 60 : 35,
      rowSelection: 'single',
     // rowMultiSelectWithClick: true,
     //suppressRowClickSelection:true,
      animateRows: true,
      defaultColDef: {
        filter: true,
        sortable: true,
        resizable: true
      },
      onGridReady: (params) => {
        this.gridOptions.api = params.api;
        this.gridOptions.columnApi = params.columnApi;
        this.gridOptions.api.setRowData(this.rowData);
        this.gridOptions.api.sizeColumnsToFit(); 
        this.rowCount = this.gridOptions.api.getDisplayedRowCount();
        this.filterGridNew("Pending");
      },
      getRowClass: (params) => {

        var classArray: string[] = [];
        classArray.push('aggrid-evenrow-border-dark');
        let newClass = params.data.appStatus === 'Pending' ? 'aggrid-left-ribbon amber' :
          params.data.appStatus === 'Approved' ? 'aggrid-left-ribbon darkgreen' :
          params.data.appStatus === 'Rejected' ? 'aggrid-left-ribbon darkred' :
            'aggrid-left-ribbon dark2';
        classArray.push(newClass);
        if (params.node.rowIndex % 2 === 0)
          classArray.push('aggrid-evenrow-bg');
        else
          classArray.push('aggrid-oddrow-bg');

        if (params.node.rowIndex % 2 === 0) {
          classArray.push('aggrid-evenrow-bg');
          classArray.push('aggrid-evenrow-border-dark');
        }
        else {
          classArray.push('aggrid-oddrow-bg');
          classArray.push('aggrid-evenrow-border-dark');
        }
        return classArray.length > 0 ? classArray : null;
      },
      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getDisplayedLeftColumns().length > 0) {
          isColPinned_left = true;
          isColPinned_right = false;
        }
        else if (params.columnApi.getDisplayedLeftColumns().length == 0 && params.columnApi.getDisplayedCenterColumns().length == 0 && params.columnApi.getDisplayedRightColumns().length > 0) {
          isColPinned_right = false;
          isColPinned_left = false;
        }
        else if (params.columnApi.getDisplayedLeftColumns().length == 0 && params.columnApi.getDisplayedCenterColumns().length > 0) {
          isColPinned_right = true;
          isColPinned_left = false;
        }
        else {
          isColPinned_right = false;
          isColPinned_left = false;
        }

        if (params.columnApi.getAllDisplayedColumns().length <= 11)
          params.api.sizeColumnsToFit();
      },
      onColumnselected: function (params) {
        if (params.columnApi.getDisplayedLeftColumns().length > 0) {
          isColPinned_left = true;
          isColPinned_right = false;
        }
        else if (params.columnApi.getDisplayedLeftColumns().length == 0 && params.columnApi.getDisplayedCenterColumns().length == 0 && params.columnApi.getDisplayedRightColumns().length > 0) {
          isColPinned_right = false;
          isColPinned_left = false;
        }
        else if (params.columnApi.getDisplayedLeftColumns().length == 0 && params.columnApi.getDisplayedCenterColumns().length > 0) {
          isColPinned_right = true;
          isColPinned_left = false;
        }
        else {
          isColPinned_right = false;
          isColPinned_left = false;
        }
      },
      onBodyScroll: ($event) => {
        if ($event.direction == "horizontal")
          onScrollTrue();
      },
    };
  }

  private columnDefs = [
    
    {
      headerName:'Trade ID/Enquiry ID',headerTooltip:'Trade ID/Enquiry ID',
      field: 'tradeid',
      cellClass:'aggridlink',
      pinned: 'left',
      width:300      
        
    },
    {headerName: 'Approval Status',headerTooltip:'Approval Status', 
    field: 'appStatus', cellRendererFramework:AGGridCellRendererComponent, width:300,headerClass:['aggrid-text-align-c'], cellClass: ['aggridtextalign-center'],
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='Pending'?'custom-chip amber':
                      params.value==='Approved'?'custom-chip darkgreen':
                      params.value==='Rejected'?'custom-chip mediumred':
                      'custom-chip dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} }},
    {headerName: 'Buy/Sell', field: 'type',headerTooltip:'Buy/Sell'},   
    {headerName: 'Vessel Name', field: 'name',headerTooltip:'Vessel Name'},  
    
    {headerName: 'Vessel IMO', field: 'imo',headerTooltip:'Vessel IMO' },
    {headerName: 'Vessel Type', field: 'vesselType',headerTooltip:'Vessel Type'},
    {headerName: 'Trader Name', field: 'traderName', headerTooltip:'Trader Name' },
    {headerName: 'Counterparty', field: 'counterparty', headerTooltip:'Counterparty' },
    {headerName: 'Status', field: 'status', headerTooltip:'Status' },
    {headerName: 'Location', field: 'location', headerTooltip:'Location' },
    {headerName: 'Trade Date', field: 'tradeDate', headerTooltip:'Trade Date' },
    {headerName: 'ETA', field: 'eta', type: "numericColumn",headerTooltip:'ETA' },
    {headerName: 'ETD', field: 'etd', type: "numericColumn",headerTooltip:'ETD' },
    {headerName: 'Requested By', field: 'requestedBy', headerTooltip:'Requested By'}
  ];

  private rowData = [
    {
      tradeid: 'ENS2022010000007', appStatus: 'Pending', type: 'Sell', name: 'Check-vessel',
       imo: 'PS001-1', vesselType: 'MAINLINE', 	traderName:'Lead Trader', counterparty: 'Shell USA', 
       status: 'New', location:'California', tradeDate: 'BBLS',eta:'01-21-2022',etd:'02-24-2022',requestedBy:'Prem Vijay'
    },
    {
      tradeid: 'ENS2022111000009', appStatus: 'Pending', type: 'Sell', name: 'phani_vessel',
       imo: 'PS001-1', vesselType: 'FEEDER', 	traderName:'Lead Trader', counterparty: 'Shell USA', 
       status: 'RFQ Sent', location:'Long Beach', tradeDate: 'BBLS',eta:'01-21-2022',etd:'02-24-2022',requestedBy:'Prem Vijay'
    },
    {
      tradeid: 'ENS2022111000010', appStatus: 'Pending', type: 'Sell', name: 'Check-vessel',
       imo: 'PS001-1', vesselType: 'MAINLINE', 	traderName:'Lead Trader', counterparty: 'Shell USA', 
       status: 'New', location:'California', tradeDate: 'BBLS',eta:'01-21-2022',etd:'02-24-2022',requestedBy:'Prem Vijay'
    },
    {
      tradeid: 'ENS2022111000011', appStatus: 'Pending', type: 'Sell', name: 'phani_vessel',
       imo: 'PS001-1', vesselType: 'FEEDER', 	traderName:'Lead Trader', counterparty: 'Shell USA', 
       status: 'RFQ Sent', location:'Long Beach', tradeDate: 'BBLS',eta:'01-21-2022',etd:'02-24-2022',requestedBy:'Prem Vijay'
    },
    {
      tradeid: 'ENS2022010000005', appStatus: 'Approved', type: 'Sell', name: 'phani_vessel',
       imo: 'PS001-1', vesselType: 'FEEDER', 	traderName:'Lead Trader', counterparty: 'Shell USA', 
       status: 'RFQ Sent', location:'Long Beach', tradeDate: 'BBLS',eta:'01-21-2022',etd:'02-24-2022',requestedBy:'Prem Vijay'
    },
    {
      tradeid: 'ENS2022010000003', appStatus: 'Rejected', type: 'Sell', name: 'check-vessel',
       imo: 'PS001-1', vesselType: 'MAINLINE', 	traderName:'Lead Trader', counterparty: 'Shell USA', 
       status: 'Nominted', location:'California', tradeDate: 'BBLS',eta:'01-21-2022',etd:'02-24-2022',requestedBy:'Prem Vijay'
    },
    
    
  ];

  public change_rowdensity() {
    this.isdisplaydensityhigh = !this.isdisplaydensityhigh;
    if (this.isdisplaydensityhigh) {
      this.gridOptions.rowHeight = 48;
      this.gridOptions.headerHeight = 60;
      this.gridOptions.groupHeaderHeight = 60;
    }
    else {
      this.gridOptions.rowHeight = 26;
      this.gridOptions.headerHeight = 35;
      this.gridOptions.groupHeaderHeight = 35;
    }
    this.gridOptions.api.resetRowHeights();
    this.gridOptions.api.refreshHeader();
  }

  public verify() {


    this.toastr.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">Movement verified successfully!</div>',
      '', {
      enableHtml: true,
      toastClass: "toast-alert toast-green", // toast-green, toast-amber, toast-red, toast-grey
      timeOut: 2000
    });
  }

  public onrowClicked (ev){
    //alert("");
    //this.selectedRow=[];
    var selectedData = this.gridOptions.api.getSelectedRows();
    //console.log(selectedData);
    //this.selectedRow.push(selectedData[0]);
    const dialogRef = this.dialog.open(DynamicPopupComponent, {
      width: '700px',
      height: 'auto',
      maxHeight:'500px',
      panelClass: ['dynamicPopup' ,'popup-modal-component'],
      data:selectedData
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log(result.data);
      if(result.data != undefined){
      var itemsToUpdate = [];
    this.gridOptions.api.forEachNodeAfterFilterAndSort(function(rowNode, index) {
      // console.log("eeeeeeeee");
      // console.log(rowNode);
      if (!rowNode.isSelected() === true) {
        return;
      }
      var data = rowNode.data;
      data.appStatus = result.data;
      itemsToUpdate.push(data);
    });
    var res = this.gridOptions.api.applyTransaction({ update: itemsToUpdate });
    this.gridOptions.api.deselectAll();//optional

   }
    });
  
  }

}

var onScroll = false;
var onscrolltimmer;
var isColPinned_right = true;
var isColPinned_left = true;
function onScrollTrue() {
  onScroll = true;
  clearInterval(onscrolltimmer);
  onscrolltimmer = setTimeout(function () {
    onScroll = false;
  }, 200);

 

}