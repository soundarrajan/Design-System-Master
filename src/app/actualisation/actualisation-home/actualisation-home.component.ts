import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { TechAvailableFiltersComponent } from 'src/app/shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';

@Component({
  selector: 'app-actualisation-home',
  templateUrl: './actualisation-home.component.html',
  styleUrls: ['./actualisation-home.component.scss']
})
export class ActualisationHomeComponent implements OnInit {
  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;
  public isRowSelected:boolean = false;

  ngOnInit() {
    //alert(this.menuOpen);
    // this.change_rowdensity();
  }
  
  
  // Available Filters Popup
  openAvailableFilter() {
    const dialogRef = this.dialog.open(TechAvailableFiltersComponent, {      
      width: '500px',      
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  
  public onScroll:boolean =true;
    
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
  private paginationPageSize:number;
  public rowCount:Number;
  constructor(public dialog: MatDialog) { 
    this.gridOptions = <GridOptions>{   
      masterDetail:true, 
      isRowMaster: function (dataItem){
        // return true when row data has children, false otherwise
          return dataItem ? dataItem.credit_product.length > 0 : false;
      },
      columnDefs: this.columnDefs,
      detailRowHeight:262,
      enableColResize: true,
      enableSorting: true,
      filter: true,
      // pagination: false,
      // paginationPageSize: this.paginationPageSize,
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 48:25
      },
      headerHeight:this.isdisplaydensityhigh? 60:35,
      groupHeaderHeight:this.isdisplaydensityhigh? 60:35,
      rowSelection: 'multiple',
      rowMultiSelectWithClick:true,
      animateRows:true,
////////////////////////////////////
      detailCellRendererParams: {
        // provide detail grid options
         detailGridOptions:{
          animateRows:true,
           //rowHeight:20,
           getRowHeight:(params) => {
            return this.isdisplaydensityhigh? 48:25
          },
          headerHeight:this.isdisplaydensityhigh? 60:35,
          groupHeaderHeight:this.isdisplaydensityhigh? 60:35,
          columnDefs:[  
         { headerName: 'Delivery ID', field: "delivery_id", menuTabs:[] },
         { headerName: 'Product', field: "product", menuTabs:[] },
         { headerName: 'Planned QTY', field: "planned_qty", menuTabs:[], type: "numericColumn" },         
         { headerName: 'Planned Date', field: "planned_date", cellClass: ['aggridtextalign-center'],headerClass:['aggrid-text-align-c'], type: "numericColumn",
            cellRendererFramework:AGGridCellRendererComponent, cellRendererParams: {cellClass: ['custom-chip dark']}, menuTabs:[] },
         { headerName: 'Actual QTY', field: "actual_qty", menuTabs:[], type: "numericColumn" },
         { headerName: 'Actual Date', field: "actual_date", cellClass: ['aggridtextalign-center'],headerClass:['aggrid-text-align-c'],
            cellRendererFramework:AGGridCellRendererComponent, cellRendererParams: {cellClass: ['custom-chip dark']}, menuTabs:[] }
        ],        
        defaultColDef: {
          editable: true,
          resizable: true,
          suppressMovable: true,
          enableSorting: true,
        },
        onFirstDataRendered(params) {
          params.api.sizeColumnsToFit();
        },
       
        getRowClass:(params)=> {     
          var classArray:string[] =[];
            classArray.push('aggrid-evenrow-border-dark');            
            let newClass= params.data.invoice==='Yes'?'aggrid-left-ribbon-imp lightamber':
                            params.data.invoice==='No'?'aggrid-left-ribbon-imp skyblue':
                            'aggrid-left-ribbon-imp dark';
              classArray.push(newClass);
            if (params.node.rowIndex % 2 === 0)
              classArray.push('aggrid-evenrow-bg');
            else
              classArray.push('aggrid-oddrow-bg');
    
              if (params.node.rowIndex % 2 === 0) {
                classArray.push('aggrid-evenrow-bg');
                classArray.push('aggrid-evenrow-border-dark');
            }  
            else{
              classArray.push('aggrid-oddrow-bg');
              classArray.push('aggrid-evenrow-border-dark');
            } 
            return classArray.length>0?classArray:null;
        },
        onGridReady: (params) => {
          this.gridOptions.detailCellRendererParams.detailGridOptions.api = params.api;
          this.gridOptions.detailCellRendererParams.detailGridOptions.columnApi = params.columnApi;
          this.gridOptions.detailCellRendererParams.detailGridOptions.api.sizeColumnsToFit(); 
          this.gridOptions.detailCellRendererParams.detailGridOptions.enableColResize = true;
        }
      },
        getDetailRowData: function(params) {
            params.successCallback(params.data.credit_product);
        },
        // getRowHeight:262,
        // detailRowHeight :262,
        // onFirstDataRendered(params) {
        //   params.api.sizeColumnsToFit();
        // },
        //getRowHeight:262,
        template: function (params) {
          var personName = params.data.name;
          return '<div class="aggrid-inner-table">'             
              + '<div class="int-container">'
              + '<div class="int-header">Credit Products</div>'
              + '<span class="int-whitespace"></span>'
              + '<div id="innerGrid" ref="eDetailGrid" class="int-grid"></div>'
              + '</div>'
              + '</div>';
      }
    },
    
/////////////////////////////////
      defaultColDef: {
        filter: true,
        enableSorting: true,
    },
    // getRowHeight:(params) => {
    //   return this.isdisplaydensityhigh? 48:25
    //  },
     onGridReady: (params) => {
          this.gridOptions.api = params.api;
          this.gridOptions.columnApi = params.columnApi;
          // this.gridOptions.api.sizeColumnsToFit(); 
          this.gridOptions.enableColResize = true;
          this.gridOptions.api.setRowData(this.rowData);        
          this.rowCount = this.gridOptions.api.getDisplayedRowCount();  
          //params.api.resetRowHeights();

          // setTimeout(function() {
          //   params.api.resetRowHeights();
          //   var rowCount = 0;
          //   params.api.forEachNode(function(node) {
          //     node.setExpanded(rowCount++ === 0);
          //   });
          // }, 500);
      },
     
      getRowClass:(params)=> {             
        var classArray:string[] =[];
          classArray.push('aggrid-evenrow-border-dark');         
          let newClass= params.data.invoice==='Yes'?'aggrid-left-ribbon skyblue':
                          params.data.invoice==='No'?'aggrid-left-ribbon lightamber':
                          'aggrid-left-ribbon dark';
                          classArray.push(newClass);
          if (params.node.rowIndex % 2 === 0)
            classArray.push('aggrid-evenrow-bg');
          else
            classArray.push('aggrid-oddrow-bg');
  
            if (params.node.rowIndex % 2 === 0) {
              classArray.push('aggrid-evenrow-bg');
              classArray.push('aggrid-evenrow-border-dark');
          }  
          else{
            classArray.push('aggrid-oddrow-bg');
            classArray.push('aggrid-evenrow-border-dark');
          } 
          return classArray.length>0?classArray:null;
      },
      onColumnResized: function(params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function(params) {
        if(params.columnApi.getDisplayedLeftColumns().length>0){
            isColPinned_left=true;
            isColPinned_right = false;
        }     
        else if(params.columnApi.getDisplayedLeftColumns().length==0  && params.columnApi.getDisplayedCenterColumns().length==0 && params.columnApi.getDisplayedRightColumns().length>0){
            isColPinned_right = false;
            isColPinned_left = false;
        }       
        else if(params.columnApi.getDisplayedLeftColumns().length==0 &&  params.columnApi.getDisplayedCenterColumns().length>0){
            isColPinned_right = true;
            isColPinned_left = false;
        }
        else{
            isColPinned_right = false;
            isColPinned_left = false;
        }
  
        if(params.columnApi.getAllDisplayedColumns().length <= 11)
            params.api.sizeColumnsToFit();
      },
      onColumnPinned: function(params){
        if(params.columnApi.getDisplayedLeftColumns().length>0){
            isColPinned_left=true;
            isColPinned_right = false;
        }     
        else if(params.columnApi.getDisplayedLeftColumns().length==0  && params.columnApi.getDisplayedCenterColumns().length==0 && params.columnApi.getDisplayedRightColumns().length>0){
            isColPinned_right = false;
            isColPinned_left = false;
        }       
        else if(params.columnApi.getDisplayedLeftColumns().length==0 &&  params.columnApi.getDisplayedCenterColumns().length>0){
            isColPinned_right = true;
            isColPinned_left = false;
        }
        else{
            isColPinned_right = false;
            isColPinned_left = false;
        }
      },
      onBodyScroll:($event)=>{
        if($event.direction=="horizontal")
          onScrollTrue();         
      },
    };  
  }
  
  private columnDefs = [
    
    {
      headerName: "",
      field: "",
      filter: true,
      enableSorting :true,
      headerCheckboxSelection: true,
      resizable: true,
      width:40,
      checkboxSelection: true,
      headerClass:'header-checkbox-center',
      cellClass:'p-1 aggrid-textoverflow checkbox-center',
      pinned:'left'
    }, 
      {headerName: 'Delivery ID',headerTooltip:'Delivery ID', field: 'delivery_id', cellClass: ['aggridlink'], pinned:'left', width: 170, cellRenderer: "agGroupCellRenderer"},
      {headerName: 'Product', headerTooltip:'Product', field: 'product', cellClass: ['aggridlink text-ellipsis product-cell'],headerClass:[''],  width: 120, suppressSizeToFit: true,cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'product-details-popup'}},  
      {headerName: 'Business Line', field: 'business_line', headerTooltip : 'Business Line'}, 
      {headerName: 'Business Type', headerTooltip:'Business Type', field: 'business_type'},
      {headerName: 'Counterparty', field: 'spec_group', headerTooltip : 'Counterparty'},
      {headerName: 'Planned QTY', field: 'planned_qty', headerTooltip : 'Planned QTY', type: 'numericColumn'},
      {headerName: 'Planned Date', field: 'planned_date', headerTooltip : 'Planned Date', type: "numericColumn",
        cellClass: ['aggridtextalign-center'],headerClass:['aggrid-text-align-c'],
        cellRendererFramework:AGGridCellRendererComponent, cellRendererParams: {cellClass: ['custom-chip dark']}},
      {headerName: 'Actual QTY', field: 'actual_qty', headerTooltip : 'Actual QTY', type: "numericColumn"},
      {headerName: 'Actual Date', field: 'actual_date', headerTooltip : 'Actual Date', type: "numericColumn",
        cellClass: ['aggridtextalign-center'],headerClass:['aggrid-text-align-c'],
        cellRendererFramework:AGGridCellRendererComponent, cellRendererParams: {cellClass: ['custom-chip dark']}},
      {headerName: 'Planned CI', field: 'planned_ci', headerTooltip : 'Planned CI', type: "numericColumn"},
      {headerName: 'Actual CI', field: 'actual_ci', headerTooltip : 'Actual CI', type: "numericColumn"},
      {headerName: 'Actual CI Date', field: 'planned_date', headerTooltip : 'Actual CI Date', type: "numericColumn",
        cellClass: ['aggridtextalign-center'],headerClass:['aggrid-text-align-c'],
        cellRendererFramework:AGGridCellRendererComponent, cellRendererParams: {cellClass: ['custom-chip dark']}}
      
           
  ];
  
  private rowData =
    [
      {
       delivery_id:'BL036782-1',
       product:'Red Card Diesel',
       business_line:'Rack',
       business_type:'Spot',
       spec_group:'Shell America',
       planned_qty:'1000 BBL',
       actual_qty:'1000 BBL',
       planned_ci:'NA',
       actual_ci:'NA',
       planned_date:'21/04/2019',
       actual_date:'21/04/2019',invoice:'Yes',
       credit_product:[
        {
          delivery_id:'TC036782-1',
          product:'RIN',
          planned_qty:'2500 RIN',
          actual_qty:'2500 RIN',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'Yes'
        },
        {
          delivery_id:'TC036782-1',
          product:'CAR',
          planned_qty:'2500 CAR',
          actual_qty:'2500 CAR',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'Yes'
        },
        {
          delivery_id:'TC036782-1',
          product:'LCFS',
          planned_qty:'2500 LCFS',
          actual_qty:'2500 LCFS',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'No',
        }]
      },
      {
       delivery_id:'BL036782-2',
       product:'BioDiesel',
       business_line:'Pipeline',
       business_type:'Contract',
       spec_group:'Shell America',
       planned_qty:'1000 BBL',
       actual_qty:'___________',
       planned_ci:'200',
       actual_ci:'200',
       planned_date:'21/04/2019',
       actual_date:'21/04/2019',invoice:'No',
       credit_product:[]
      },
      {
       delivery_id:'BL036782-1',
       product:'Ethanol',
       business_line:'Pipeline',
       business_type:'Contract',
       spec_group:'Shell America',
       planned_qty:'1000 BBL',
       actual_qty:'1000 BBL',
       planned_ci:'200',
       actual_ci:'200',
       planned_date:'21/04/2019',
       actual_date:'21/04/2019',invoice:'Yes',
       credit_product:[
        {
          delivery_id:'TC036782-1',
          product:'RIN',
          planned_qty:'2500 RIN',
          actual_qty:'2500 RIN',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'No'
        },
        {
          delivery_id:'TC036782-1',
          product:'CAR',
          planned_qty:'2500 CAR',
          actual_qty:'2500 CAR',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'Yes'
        },
        {
          delivery_id:'TC036782-1',
          product:'LCFS',
          planned_qty:'2500 LCFS',
          actual_qty:'2500 LCFS',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'Yes'
        }]
      },
      {
       delivery_id:'BL036782-1',
       product:'Ethanol',
       business_line:'Cargo',
       business_type:'Spot',
       spec_group:'Shell America',
       planned_qty:'1000 BBL',
       actual_qty:'1000 BBL',
       planned_ci:'NA',
       actual_ci:'NA',
       planned_date:'21/04/2019',
       actual_date:'21/04/2019',invoice:'Yes',
       credit_product:[
        {
          delivery_id:'TC036782-1',
          product:'RIN',
          planned_qty:'2500 RIN',
          actual_qty:'2500 RIN',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'No'
        },
        {
          delivery_id:'TC036782-1',
          product:'CAR',
          planned_qty:'2500 CAR',
          actual_qty:'2500 CAR',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'Yes'
        },
        {
          delivery_id:'TC036782-1',
          product:'LCFS',
          planned_qty:'2500 LCFS',
          actual_qty:'2500 LCFS',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'Yes'
        }]
      },
      {
       delivery_id:'BL036782-1',
       product:'Red Card Diesel',
       business_line:'Rack',
       business_type:'Spot',
       spec_group:'Shell America',
       planned_qty:'1000 BBL',
       actual_qty:'___________',
       planned_ci:'NA',
       actual_ci:'NA',
       planned_date:'21/04/2019',
       actual_date:'21/04/2019',invoice:'No',
       credit_product:[
        {
          delivery_id:'TC036782-1',
          product:'RIN',
          planned_qty:'2500 RIN',
          actual_qty:'2500 RIN',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'No'
        },
        {
          delivery_id:'TC036782-1',
          product:'CAR',
          planned_qty:'2500 CAR',
          actual_qty:'2500 CAR',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'Yes'
        },
        {
          delivery_id:'TC036782-1',
          product:'LCFS',
          planned_qty:'2500 LCFS',
          actual_qty:'2500 LCFS',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'Yes'
        }]
      },
      {
       delivery_id:'BL036782-1',
       product:'BioDiesel',
       business_line:'Pipeline',
       business_type:'Contract',
       spec_group:'Shell America',
       planned_qty:'1000 BBL',
       actual_qty:'1000 BBL',
       planned_ci:'200',
       actual_ci:'200',
       planned_date:'21/04/2019',
       actual_date:'21/04/2019',invoice:'Yes',
       credit_product:[
        {
          delivery_id:'TC036782-1',
          product:'RIN',
          planned_qty:'2500 RIN',
          actual_qty:'2500 RIN',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'Yes'
        },
        {
          delivery_id:'TC036782-1',
          product:'CAR',
          planned_qty:'2500 CAR',
          actual_qty:'2500 CAR',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'Yes'
        },
        {
          delivery_id:'TC036782-1',
          product:'LCFS',
          planned_qty:'2500 LCFS',
          actual_qty:'2500 LCFS',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'Yes'
        }]
      },
      {
       delivery_id:'BL036782-1',
       product:'Ethanol',
       business_line:'Pipeline',
       business_type:'Contract',
       spec_group:'Shell America',
       planned_qty:'1000 BBL',
       actual_qty:'1000 BBL',
       planned_ci:'200',
       actual_ci:'200',
       planned_date:'21/04/2019',
       actual_date:'21/04/2019',invoice:'No',
       credit_product:[
        {
          delivery_id:'TC036782-1',
          product:'RIN',
          planned_qty:'2500 RIN',
          actual_qty:'2500 RIN',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'Yes'
        },
        {
          delivery_id:'TC036782-1',
          product:'CAR',
          planned_qty:'2500 CAR',
          actual_qty:'2500 CAR',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'No'
        },
        {
          delivery_id:'TC036782-1',
          product:'LCFS',
          planned_qty:'2500 LCFS',
          actual_qty:'2500 LCFS',
          planned_date:'12/12/2018',
          actual_date:'12/12/2018',invoice:'Yes'
        }]
      },
      {
       delivery_id:'BL036782-1',
       product:'Ethanol',
       business_line:'Cargo',
       business_type:'Spot',
       spec_group:'Shell America',
       planned_qty:'1000 BBL',
       actual_qty:'1000 BBL',
       planned_ci:'NA',
       actual_ci:'NA',
       planned_date:'21/04/2019',
       actual_date:'21/04/2019',invoice:'Yes',
       credit_product:[]
      } 
];
  
    invoiceCurrency(){
      event.stopPropagation();
      const invoicelogo = document.querySelector('.logo');
      invoicelogo.classList.add('select');
      const invoicelabel = document.querySelector('.logo-label');
      invoicelabel.classList.add('select');
    }

    public change_rowdensity(){
      this.isdisplaydensityhigh = !this.isdisplaydensityhigh;
      if(this.isdisplaydensityhigh){
        this.gridOptions.rowHeight = 48;
        this.gridOptions.headerHeight = 60;
        this.gridOptions.groupHeaderHeight =60;

        this.gridOptions.detailCellRendererParams.detailGridOptions.rowHeight = 48;
        this.gridOptions.detailCellRendererParams.detailGridOptions.headerHeight = 60;
        this.gridOptions.detailCellRendererParams.detailGridOptions.groupHeaderHeight =60;
      }
      else{
        this.gridOptions.rowHeight = 26;
        this.gridOptions.headerHeight = 35;
        this.gridOptions.groupHeaderHeight = 35;

        this.gridOptions.detailCellRendererParams.detailGridOptions.rowHeight = 26;
        this.gridOptions.detailCellRendererParams.detailGridOptions.headerHeight = 35;
        this.gridOptions.detailCellRendererParams.detailGridOptions.groupHeaderHeight = 35;
      }
      this.gridOptions.api.resetRowHeights();
      this.gridOptions.api.refreshHeader();

       this.gridOptions.detailCellRendererParams.detailGridOptions.api.resetRowHeights();
       this.gridOptions.detailCellRendererParams.detailGridOptions.api.refreshHeader();
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

    
onSelectionChanged(evt) {
  this.isRowSelected = evt.api.getSelectedRows().length>0?true:false;
}
}

var onScroll=false;
var onscrolltimmer;
var isColPinned_right=false;
var isColPinned_left =true;
function onScrollTrue(){  
  onScroll=true;
  clearInterval(onscrolltimmer);
  onscrolltimmer = setTimeout(function() {
    onScroll=false;
  }, 200);
}
