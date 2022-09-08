import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PipelineFilterComponent } from '../../shared/dialog-popup/pipeline-filter/pipeline-filter.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger  } from '@angular/material/menu';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
//import { MatDialog } from '@angular/material/dialog';
import { TechAvailableFiltersComponent } from 'src/app/shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { CustomHeaderGroup } from 'src/app/shared/ag-grid/custom-header-group.component';
import { CustomHeaderGroupNotify } from 'src/app/shared/ag-grid/custom-header-group-notification.component';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AgGridCellStyleComponent } from 'src/app/shared/ag-grid/ag-grid-cell-style.component';
import { AgGridCustomRadiobuttonComponent } from '../../shared/ag-grid/ag-grid-custom-radiobutton.component';


@Component({
  selector: 'app-risk-simulator',
  templateUrl: './risk-simulator.component.html',
  styleUrls: ['./risk-simulator.component.scss']
})
export class RiskSimulatorComponent implements OnInit {
  underlyingIndexOptions: Observable<string[]>;
  periodOptions: Observable<string[]>;
  underlyingPriceOptions: Observable<string[]>;
  hVolatalityOptions: Observable<string[]>;
  riskFreerateOptions: Observable<string[]>;
  dYieldOptions: Observable<string[]>;
  incrementsOptions: Observable<string[]>;
  uindex = ['ICE Brent Crude', 'test'];
  period = ['March','August'];
  uprice = ['1.0928', '2.0928'];
  hvolatality = ['1.283', '2.283'];
  riskfreerate = ['2.50', '1.50'];
  dyield = ['2.50', '1.50'];
  increments = ['0.1000', '1.1000'];
  public spinner: boolean = false;
  public loadingBar: boolean = false;
  public priceDate = new FormControl("");
  public expiryDate = new FormControl("");
  public selected = 'usd';
  public selectednos = '15';
  public close: boolean = false;
  public slideChecked: boolean = true;
  public lightTheme: boolean = false;
  public isoptionsCollapsed: boolean = false;
  public disableBtn: boolean = true;
  public disableAddTrade: boolean = true;
  public disablesimulation: boolean = true;
  public hideresizeIcon: boolean = true;
  public selectedValues = [];
  public reselected: boolean = false;
  item = new FormGroup({
    uindex: new FormControl(''),
    period: new FormControl(''),
    uprice: new FormControl(''),
    hvolatality: new FormControl(''),
    riskfreerate: new FormControl(''),
    dyield: new FormControl(''),
    increments: new FormControl(''),
  });
  myControl = new FormControl();
  headerOptionsToggle() {
    this.close = !this.close;
    this.isoptionsCollapsed = !this.isoptionsCollapsed;  
  }
  navigateTo() {
    this.router.navigate(['techoil/trade/newoptionstrade']);
  }

  strategy = [
    { value: 'ICE Brent Crude', viewValue: 'ICE Brent Crude' },
    { value: 'test', viewValue: 'test' },
  ]
  // item = {
  //   template: "",
  //   company: "",
  //   strategy: "",
  //   trader: "",
  //   book: "",
  //   pproduct: "",
  //   location: "",
  // }

  @ViewChild('headerChip') headerChip:ElementRef;
  
  public gridOptions_CallOptions: GridOptions;
  public gridOptions_putOptions: GridOptions;
  public getMainMenuItems;
  public salesHeaderWidth;
  public marginHeaderWidth;
  public rowCount_purchase;
  public rowCount_sales;
  public isdisplaydensityhigh:boolean = false;
  public isCollapsed:boolean = false;
  public isExpandable1: boolean = false;
  public isExpandable2: boolean = false;
  public hidePurchaseBadge: boolean = false;
  public hideSalesBadge: boolean = false;
  public chips = ["Default","Physical an Vitol","BP Marine Fuels"];
  public showChips = [];
  public grid1Width = {
    width: '50%'
  }
  public grid2Width = {
    width: '50%'
  }
public rowSelection;
public noRowsTemplate;
  constructor(public dialog: MatDialog,private router: Router,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'data-picker-white',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/customicons/calendar-white.svg'));
      iconRegistry.addSvgIcon(
        'data-picker-dark',
        sanitizer.bypassSecurityTrustResourceUrl('../assets/customicons/calendar-dark.svg'));
    this.rowSelection = 'single';
    this.noRowsTemplate = '<span style="color:transparent;">no data</span>';
    this.gridOptions_CallOptions = <GridOptions>{      
      columnDefs: this.columnDefs_calloptions,
      enableColResize: true,
      enableSorting: true,
      filter: true,
      //suppressHorizontalScroll: true,
      //scrollbarWidth: 0,
      // pagination: true,
      suppressRowClickSelection:true,
      paginationPageSize: 6,
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 48:25
      },
      headerHeight:this.isdisplaydensityhigh? 60:24,
      groupHeaderHeight:this.isdisplaydensityhigh? 60:18,
      rowSelection: 'single',
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
        enableSorting: true
    },
      onCellValueChanged: ($event)=>{
        console.log($event);
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit(); 
      },
      onGridReady: (params) => {
          this.gridOptions_CallOptions.api = params.api;
          this.gridOptions_CallOptions.columnApi = params.columnApi;
          this.gridOptions_CallOptions.api.sizeColumnsToFit(); 
          //console.log(this.gridOptions_CallOptions);
          // var allColumnIds = [];
          // this.gridOptions_CallOptions.columnApi.getAllColumns().forEach(function(column) {
          // allColumnIds.push(column);
          // });
          // this.gridOptions_CallOptions.columnApi.autoSizeColumns(allColumnIds);

          this.gridOptions_CallOptions.enableColResize = true;
         // this.gridOptions_CallOptions.api.setRowData(this.rowData_putempty);   
          this.rowCount_purchase = this.gridOptions_CallOptions.api.getDisplayedRowCount();
          var count = this.gridOptions_CallOptions.api.getDisplayedRowCount();
          console.log("getDisplayedRowCount() =>. " + this.rowCount_purchase);  
          // document.getElementById("expandId1").addEventListener("click", function () {
          //   params.api.sizeColumnsToFit();
          // });       
      },
      getRowClass:(params)=> {
        var classArray:string[] =[];
        classArray.push('aggrid-evenrow-bg');
        let newClass= params.data.status==='Confirmed'?'aggrid-rowribbon-thin-cell darkgreen':
                        params.data.status==='Unconfirmed'?'aggrid-rowribbon-thin-cell lightred':
                        params.data.status==='Settled'?'aggrid-rowribbon-thin-cell mediumskyblue':
                        'aggrid-rowribbon-thin-cell dark';
                        classArray.push(newClass);
        // if (params.node.rowIndex % 2 === 0)
        //   classArray.push('aggrid-evenrow-bg');
        // else
        //   classArray.push('aggrid-oddrow-bg');
        return classArray.length>0?classArray:null;        
        //return 'aggrid-evenrow-bg';
      },
      onColumnResized: function(params) {
        //alert("");
        if (params.columnApi.getAllDisplayedColumns().length <= 11 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            //params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function(params) {
        //if(params.columnApi.getAllDisplayedColumns().length <= 11)
          //params.api.sizeColumnsToFit();
      },
      frameworkComponents: {
        customHeaderGroupComponent: CustomHeaderGroup,
        customHeaderGroupNotifyComponent: CustomHeaderGroupNotify
      }
    }; 

    this.gridOptions_putOptions = <GridOptions>{      
      columnDefs: this.columnDefs_putOptions,
      enableColResize: true,
      enableSorting: true,
      filter: true,
      // pagination: true,
      //suppressHorizontalScroll: true,
      //scrollbarWidth: 0,
      suppressRowClickSelection:true,
      paginationPageSize: 6,
      getRowHeight:(params) => {
        return this.isdisplaydensityhigh? 48:25
      },
      headerHeight:this.isdisplaydensityhigh? 60:24,
      groupHeaderHeight:this.isdisplaydensityhigh? 60:18,
      rowSelection: 'single',
      cellClass:'p-0',
      animateRows:true,
      defaultColDef: {
        filter: true,
        enableSorting: true,
    },
      onCellValueChanged: ($event)=>{
        console.log($event);
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit(); 
      },
      onGridReady: (params) => {
          //debugger;
          //params.api.hideOverlay();
          // this.gridOptions_putOptions.api.setRowData(this.rowData_put); 
          // this.gridOptions_CallOptions.api.setRowData(this.rowData_call);
          this.gridOptions_putOptions.api = params.api;
          this.gridOptions_putOptions.columnApi = params.columnApi;
          //this.gridOptions_putOptions.api.hideOverlay();
           
          this.gridOptions_putOptions.api.sizeColumnsToFit();
          // var allColumnIds = [];
          // this.gridOptions_putOptions.columnApi.getAllColumns().forEach(function(column) {
          // allColumnIds.push(column);
          // });
          // this.gridOptions_putOptions.columnApi.autoSizeColumns(allColumnIds); 
          this.gridOptions_putOptions.enableColResize = true;
         // this.gridOptions_putOptions.api.setRowData(this.rowData_callempty); 

          // this.marginHeaderWidth = (params.columnApi.getColumn("fuel").getActualWidth() +
          //       params.columnApi.getColumn("freight").getActualWidth()+
          //       params.columnApi.getColumn("total").getActualWidth())
          //       +18; 

          this.salesHeaderWidth = (params.columnApi.getColumn("sprice").getActualWidth() +
          params.columnApi.getColumn("tprice").getActualWidth()+
          params.columnApi.getColumn("delta").getActualWidth())+
          params.columnApi.getColumn("gamma").getActualWidth()+
          params.columnApi.getColumn("vega").getActualWidth()+
          params.columnApi.getColumn("theta").getActualWidth()+
          params.columnApi.getColumn("rho").getActualWidth()
                +80; 
          //this.setSalesHeaderWidth();
          this.rowCount_sales = this.gridOptions_putOptions.api.getDisplayedRowCount();  
          
          // document.getElementById("expandId2").addEventListener("click", function () {
          //   params.api.sizeColumnsToFit();  
          // });
      },
        getRowClass:(params)=> {
          var classArray:string[] =[];
          classArray.push('aggrid-evenrow-bg');
          let newClass= params.data.status==='Confirmed'?'aggrid-rowribbon-thin-cell lightred':
                          params.data.status==='Unconfirmed'?'aggrid-rowribbon-thin-cell darkgreen':
                          params.data.status==='Settled'?'aggrid-rowribbon-thin-cell mediumskyblue':
                          'aggrid-rowribbon-thin-cell dark';
                          classArray.push(newClass);
          // if (params.node.rowIndex % 2 === 0)
          //   classArray.push('aggrid-evenrow-bg');
          // else
          //   classArray.push('aggrid-oddrow-bg');
          return classArray.length>0?classArray:null;        
          //return 'aggrid-evenrow-bg';
      },
      onColumnResized: function(params) {
        // this.marginHeaderWidth = (params.columnApi.getColumn("fuel").getActualWidth() +
        //       params.columnApi.getColumn("freight").getActualWidth()+
        //       params.columnApi.getColumn("total").getActualWidth())
        //       -3; 
              
      this.salesHeaderWidth = (params.columnApi.getColumn("sprice").getActualWidth() +
              params.columnApi.getColumn("tprice").getActualWidth()+
              params.columnApi.getColumn("delta").getActualWidth())+
              params.columnApi.getColumn("gamma").getActualWidth()+
              params.columnApi.getColumn("vega").getActualWidth()+
              params.columnApi.getColumn("theta").getActualWidth()+
              params.columnApi.getColumn("rho").getActualWidth()
              +68; 

      if (params.type === 'columnResized' && params.finished === true) {
              // this.gridOptions.api.sizeColumnsToFit();
        }
        if (params.columnApi.getAllDisplayedColumns().length <= 12 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
            //params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function(params) {
        //if(params.columnApi.getAllDisplayedColumns().length <= 12)
         // params.api.sizeColumnsToFit();
      },
      frameworkComponents: {
        customHeaderGroupComponent: CustomHeaderGroup,
        customHeaderGroupNotifyComponent: CustomHeaderGroupNotify
      }        
    };

    this.getMainMenuItems = function getMainMenuItems(params){
      let finalMenuItem = [];
      let itemsToExclude = ["pinSubMenu","separator"];
      let firstSeparator=true;
      params.defaultItems.forEach(function(item) {
        if (itemsToExclude.indexOf(item) < 0) {
            finalMenuItem.push(item);
        }  
        else{
          if("separator" == item && firstSeparator)                        
            firstSeparator=false;
          else if("separator" == item && !firstSeparator)
            finalMenuItem.push(item);
        } 
      });
      return finalMenuItem;
   }
   
   }

  ngOnInit() {
    //this.startTimer();
    debugger;
    this.periodOptions = this.item.get('period').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'period'))
    );

    this.underlyingIndexOptions = this.item.get('uindex').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'uindex'))
    );
    this.underlyingPriceOptions = this.item.get('uprice').valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, 'uprice'))
    );
    this.hVolatalityOptions = this.item.get('hvolatality').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'hvolatality'))
    );
    this.riskFreerateOptions = this.item.get('riskfreerate').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'riskfreerate'))
    );
    this.dYieldOptions = this.item.get('dyield').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'dyield'))
    );
    this.incrementsOptions = this.item.get('increments').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 'increments'))
    );


    setTimeout(() => {
    //document.querySelector('.ag-overlay-panel').classList.add('ag-hidden');
    const overlays = Array.from(document.querySelectorAll('.ag-overlay-wrapper'));
    overlays.forEach(function(el) {
      el.classList.add("bg-color")
    })
    }, 1000);
    
    this.showChips = this.chips;
    //this.startTimer();
    document.querySelector('.pcoded-main-container').classList.add('doublegrid-collapsed');
  }
  private _filter(value: string, field: string): string[] {
    const filterValue = value.toLowerCase();
    switch (field) {
     
      case 'uindex': {
        return this.uindex.filter(uindex => uindex.toLowerCase().includes(filterValue));
      }
      case 'period': {
        return this.period.filter(period => period.toLowerCase().includes(filterValue));
      }
      case 'uprice': {
        return this.uprice.filter(uprice => uprice.toLowerCase().includes(filterValue));
      }
      case 'hvolatality': {
        return this.hvolatality.filter(hvolatality => hvolatality.toLowerCase().includes(filterValue));
      }
      case 'riskfreerate': {
        return this.riskfreerate.filter(riskfreerate => riskfreerate.toLowerCase().includes(filterValue));
      }
      case 'dyield': {
        return this.dyield.filter(dyield => dyield.toLowerCase().includes(filterValue));
      }
      case 'increments': {
        return this.increments.filter(increments => increments.toLowerCase().includes(filterValue));
      }
     
  }
}
  // openDialog() {
  //   const dialogRef = this.dialog.open(PipelineFilterComponent, {
  //     id: 'advanced-filter',
  //     //maxHeight: '400px',
  //     width: '900px',
  //     position: { left: '15px',top:'110px'}
  //   });


  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  private columnDefs_calloptions = [
    {  
      headerName: "",
      field: "",
      filter: true,
      enableSorting :true,
      suppressMenu:true,
      width:25,
      //checkboxSelection: true,
      suppressSizeToFit: true,
      resizable: false,
      suppressMovable: true,
      rowSelection: 'single',
      cellClass:'border-r-white',
      cellRendererFramework:AgGridCustomRadiobuttonComponent,
      cellRendererParams: {label: 'radio', type:'radio-button'},
      pinned: 'left'      
  },
    { headerName: 'Strike Prices', headerTooltip:'Strike Prices', field:'sprice', type: "numericColumn",pinned: 'left', 
    cellRendererFramework:AgGridCellStyleComponent, cellRendererParams: {cellClass: ['div-in-cell aggridtextalign-right'],label:'div-in-cell'}},
    {  headerName: 'Theoritical Price', headerTooltip:'Theoritical Price', cellClass:'light-blue aggridtextalign-right', field:'tprice', type: "numericColumn",
    cellRendererFramework:AgGridCellStyleComponent, cellRendererParams: {cellClass: ['']}},
    { headerName: 'GREEKS PARAMETERS',headerClass: 'group-header',
      children: [
    { headerName: 'Delta', headerTooltip:'Delta', field:'delta', type: "numericColumn",cellClass:'border-padding-5 p-r-0',
    cellRendererFramework:AgGridCellStyleComponent, cellRendererParams: {cellClass: ['cell-bg-border'],label:'div-in-cell'}},
    { headerName: 'Gamma', headerTooltip:'Gamma', field:'gamma',  type: "numericColumn" , cellClass:'blue-opacity-cell pad-lr-0',
   },
    { headerName: 'Vega', headerTooltip:'Vega', field: 'vega',type: "numericColumn", cellClass:'blue-opacity-cell pad-lr-0' ,
    },
    { headerName: 'Theta', headerTooltip:'Theta', field: 'theta',type: "numericColumn", cellClass:'blue-opacity-cell pad-lr-0',
    },
    { headerName: 'Rho', headerTooltip:'Rho', field: 'rho',type: "numericColumn",cellClass:'blue-opacity-cell p-lr-5',
    },
    ]},
    { headerName: 'IMPLIED VOLATALITY',
      children: [
        { headerName: 'Market Price', headerTooltip:'Market Price', field: 'mprice', cellClass:['border-l-white','aggridtextalign-right','edit-cell'],
        cellRendererFramework:AgGridCellStyleComponent, cellRendererParams: {cellClass: ['aggrid-editable white-dash'],label:'div-in-cell'},
        type: "numericColumn", editable: true},
    { headerName: 'Implied Volatality', headerTooltip:'Implied Volatality', field: 'ivolatality',type: "numericColumn"},
    ]},
      
  ];

  
  private columnDefs_putOptions = [
    {  
      headerName: "",
      field: "",
      filter: true,
      enableSorting :true,
      suppressMenu:true,
      width:25,
      //checkboxSelection: true,
      suppressSizeToFit: true,
      resizable: false,
      suppressMovable: true,
      rowSelection: 'single',
      cellClass:'border-r-white',
      cellRendererFramework:AgGridCustomRadiobuttonComponent,
      cellRendererParams: {label: 'radio', type:'radio-button'},
      pinned: 'left'      
  },
    { headerName: 'Strike Prices', headerTooltip:'Strike Prices', field:'sprice', type: "numericColumn",pinned: 'left', 
    cellRendererFramework:AgGridCellStyleComponent, cellRendererParams: {cellClass: ['div-in-cell aggridtextalign-right'],label:'div-in-cell'}},
    {  headerName: 'Theoritical Price', headerTooltip:'Theoritical Price', cellClass:'light-blue aggridtextalign-right', field:'tprice', type: "numericColumn",
    cellRendererFramework:AgGridCellStyleComponent, cellRendererParams: {cellClass: ['']}},
    { headerName: 'GREEKS PARAMETERS',headerClass: 'group-header',
      children: [
    { headerName: 'Delta', headerTooltip:'Delta', field:'delta', type: "numericColumn",cellClass:'border-padding-5 p-r-0',
    cellRendererFramework:AgGridCellStyleComponent, cellRendererParams: {cellClass: ['cell-bg-border'],label:'div-in-cell'}},
    { headerName: 'Gamma', headerTooltip:'Gamma', field:'gamma',  type: "numericColumn" , cellClass:'blue-opacity-cell pad-lr-0',
   },
    { headerName: 'Vega', headerTooltip:'Vega', field: 'vega',type: "numericColumn", cellClass:'blue-opacity-cell pad-lr-0' ,
    },
    { headerName: 'Theta', headerTooltip:'Theta', field: 'theta',type: "numericColumn", cellClass:'blue-opacity-cell pad-lr-0',
    },
    { headerName: 'Rho', headerTooltip:'Rho', field: 'rho',type: "numericColumn",cellClass:'blue-opacity-cell p-lr-5',
    },
    ]},
    { headerName: 'IMPLIED VOLATALITY',
      children: [
        { headerName: 'Market Price', headerTooltip:'Market Price', field: 'mprice', cellClass:['border-l-white','aggridtextalign-right','edit-cell'],
        cellRendererFramework:AgGridCellStyleComponent, cellRendererParams: {cellClass: ['aggrid-editable white-dash'],label:'div-in-cell'},
        type: "numericColumn", editable: true},
    { headerName: 'Implied Volatality', headerTooltip:'Implied Volatality', field: 'ivolatality',type: "numericColumn"},
    ]},
    
  ];

  private rowData_put = [

    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Settled'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },

    
  ];

  private rowData_call = [

    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Confirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Settled'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
    {
      sprice: '1.4200',tprice: '0.1937',delta: '0.1937',gamma: '0.1937',vega: '0.1937',theta: '0.1937',rho: '0.1937',mprice: '0.0000',ivolatality: '0.0000',status: 'Unconfirmed'
    },
  ];
  private rowData_putempty = [
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
   
  ];

  private rowData_callempty = [

    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
    {
      type:'', tradeid: '', counterparty: '', location: '', salestype: '', product: '', quantity: '', freightcompany: '', fromdelivery:'', todelivery: '', tradeidmargin: '', freightmargin:'', unitprice: '', fuel:"", freight:"", total:""
    },
   
  ];


  openAvailableFilter() {
    const dialogRef = this.dialog.open(TechAvailableFiltersComponent, {      
      width: '500px',      
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public change_rowdensity(){
    this.isdisplaydensityhigh = !this.isdisplaydensityhigh;
      if(this.isdisplaydensityhigh){
        this.gridOptions_CallOptions.rowHeight = 48;
        this.gridOptions_CallOptions.headerHeight = 60;
        this.gridOptions_CallOptions.groupHeaderHeight =60;
        this.gridOptions_putOptions.rowHeight = 48;
        this.gridOptions_putOptions.headerHeight = 60;
        this.gridOptions_putOptions.groupHeaderHeight =60;        
      }
      else{
        this.gridOptions_CallOptions.rowHeight = 26;
        this.gridOptions_CallOptions.headerHeight = 35;
        this.gridOptions_CallOptions.groupHeaderHeight = 35;
        this.gridOptions_putOptions.rowHeight = 26;
        this.gridOptions_putOptions.headerHeight = 35;
        this.gridOptions_putOptions.groupHeaderHeight = 35;
      }
      this.gridOptions_CallOptions.api.resetRowHeights();
      this.gridOptions_CallOptions.api.refreshHeader();
      this.gridOptions_putOptions.api.resetRowHeights();
      this.gridOptions_putOptions.api.refreshHeader();
  }
  private tempTimer;
  public isLoading=false;
  public isRefresh=false;
  changeRoute()
    {
      
      clearInterval(this.tempTimer);
      //this.gridOptions_putOptions.api.setRowData(this.rowData_callempty); 
      //this.gridOptions_CallOptions.api.setRowData(this.rowData_putempty); 
      this.isLoading=false;
      
      //this.tempTimer = setTimeout(() => {
              this.gridOptions_putOptions.api.setRowData(this.rowData_put); 
        this.gridOptions_CallOptions.api.setRowData(this.rowData_call); 
        this.isLoading=true;
        this.isRefresh=true;
            //}, 100);
  }
  progressbarValue = 0;
  timeLeft: number = 100;
  interval; 
  progressinterval: number = 0;
  showProgressBar:boolean =false;

 public startTimer() {

    clearInterval(this.interval);
    this.showProgressBar = true;
    
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.progressinterval++;
        this.progressbarValue =  0 + this.progressinterval;
      } 
      else{
        this.showProgressBar = false;
      }
      
    },10)
   
  }
  public refresh(){
    this.isRefresh=true;
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
  
  // isExpandable1 = F && isExpandable2 = F----------50/50%
  // isExpandable1 = T && isExpandable2 = F----------80/20%
  // isExpandable1 = F && isExpandable2 = T----------20/80%
  public resizeTable(table1,table2) {
    this.isExpandable1 = table1;
    this.isExpandable2 = table2;
    if (this.isExpandable1) {
      setTimeout(() => {
        this.gridOptions_CallOptions.api.sizeColumnsToFit(); 
        this.gridOptions_putOptions.api.sizeColumnsToFit(); 
      }, 100);
      this.setWidth('100%', '0%');
    }
    else if (this.isExpandable2) {
      setTimeout(() => {
        this.gridOptions_CallOptions.api.sizeColumnsToFit(); 
        this.gridOptions_putOptions.api.sizeColumnsToFit(); 
      }, 100);
      this.setWidth('0%', '100%');
      this.hideresizeIcon = false;
    }
    else {
      setTimeout(() => {
        this.gridOptions_CallOptions.api.sizeColumnsToFit(); 
        this.gridOptions_putOptions.api.sizeColumnsToFit(); 
        // var allColumnIds = [];
        //     this.gridOptions_CallOptions.columnApi.getAllColumns().forEach(function(column) {
        //     allColumnIds.push(column);
        //     });
        //     this.gridOptions_CallOptions.columnApi.autoSizeColumns(allColumnIds);
          }, 100);
      this.setWidth('50%', '50%');
      this.hideresizeIcon = true;
      
    }
  }
  public setWidth(width1, width2) {
    this.grid1Width = {
      width: width1
    }
    this.grid2Width = {
      width: width2
    }
    //clearInterval(this.tempTimer);
    
  }

  //Execute whenever the grid width changes on expansion or resize.
  public onWidthChange(){
    this.gridOptions_CallOptions.api.sizeColumnsToFit(); 
    this.gridOptions_putOptions.api.sizeColumnsToFit(); 
    this.setSalesHeaderWidth();
    if(this.salesHeaderWidth < 400){
      this.hideSalesBadge = true;
    }
    else
      this.hideSalesBadge = false;
    if( document.getElementById("grid1").offsetWidth < 400)
      this.hidePurchaseBadge = true; 
    else
      this.hidePurchaseBadge = false;
  }

  //Set the sales header width excluding the Margin width.
  public setSalesHeaderWidth(){
    this.salesHeaderWidth = document.getElementsByClassName("ag-header-viewport")[1].clientWidth + 20;
  }

  public onrowClicked (callGrid){
    //alert(callGrid);
    //console.log(callGrid);
    if(callGrid){
      setTimeout(() => {
      this.gridOptions_putOptions.api.deselectAll();
      },500);
    }else{
      setTimeout(() => {
      this.gridOptions_CallOptions.api.deselectAll();
    },500);
    }
  }

  //Execute whnever a check box is selected.
  public onRowSelected(callGrid,ev){
    let rowCount_call  = this.gridOptions_CallOptions.api.getSelectedRows().length;
    let rowCount_put  = this.gridOptions_putOptions.api.getSelectedRows().length;
    //alert(callGrid);
    //alert(callGrid);
    if(callGrid){
      //this.gridOptions_putOptions.api.deselectAll();
      //this.gridOptions_CallOptions.api.getSelectedRows()
      //ev.preventDefault();
      //this.gridOptions_CallOptions.api.node.setSelected(true);
      //this.gridOptions_CallOptions.api.forEachNode(node=> node.setSelected(true));
      //callGrid = true;
    } else {
      //this.gridOptions_CallOptions.api.deselectAll();
      //callGrid = false;
      //ev.preventDefault();
      //this.gridOptions_putOptions.api.forEachNode(node=> node.setSelected(true));
    }
    //alert(callGrid);
    
    this.disableAddTrade = false;
    
    
    //alert(rowCount_call);
    // alert(rowCount_put);

    //alert("");

    // let rowCount_sales  = this.gridOptions_putOptions.api.getSelectedRows().length;
    // let rowCount_purchase  = this.gridOptions_CallOptions.api.getSelectedRows().length;

    // if((rowCount_purchase == 1 && rowCount_sales == 0)|| (rowCount_sales == 1 && rowCount_purchase == 0)){
    //   this.filterRows();
    // }
    // else if(rowCount_purchase == 0 && rowCount_sales == 0){
    //   this.gridOptions_putOptions.api.destroyFilter("product");
    //   this.gridOptions_CallOptions.api.destroyFilter("product");
    // }
    // //Expand/Collapse Purchase and Sales grids
    // if(isPurchaseGrid){
    //     if(rowCount_purchase>0 && rowCount_sales>=0 )
    //       this.resizeTable(false,true);
    //     else if(rowCount_purchase==0 && rowCount_sales>0)
    //       this.resizeTable(true,false);
    //     else if(rowCount_purchase ==0 && rowCount_sales==0)
    //       this.resizeTable(false,false);
    // }
    // else{
    //     if(rowCount_sales>0 && rowCount_purchase==0)
    //       this.resizeTable(true,false);
    //     else if(rowCount_purchase>0)
    //       this.resizeTable(false,true);
    //     else if(rowCount_sales ==0 && rowCount_purchase==0) 
    //       this.resizeTable(false,false);
    // }
    // //Display Margin Column
    // if(rowCount_sales > 0 && rowCount_purchase > 0){
    //   this.gridOptions_putOptions.columnApi.setColumnVisible('fuel',true);
    //   //this.gridOptions_putOptions.columnApi.setColumnVisible('freight',true);
    //   //this.gridOptions_putOptions.columnApi.setColumnVisible('total',true);
    // }
    // else{
    //   this.gridOptions_putOptions.columnApi.setColumnVisible('fuel',false);
    //   //this.gridOptions_putOptions.columnApi.setColumnVisible('freight',false);
    //   //this.gridOptions_putOptions.columnApi.setColumnVisible('total',false);
    // }
  }

  filterRows(){
      let product = [];
      if(this.gridOptions_CallOptions.api.getSelectedRows().length > 0){
        this.gridOptions_CallOptions.api.getSelectedRows().forEach((row)=>{
          product.push(row.product);
        })
      }
      else{
        this.gridOptions_putOptions.api.getSelectedRows().forEach((row)=>{
          product.push(row.product);
        })
      }
        let filterInstance1 = this.gridOptions_putOptions.api.getFilterInstance("product");
        filterInstance1.setModel(product);
        this.gridOptions_putOptions.api.onFilterChanged(); 

        let filterInstance2 = this.gridOptions_CallOptions.api.getFilterInstance("product");
        filterInstance2.setModel(product);
        this.gridOptions_CallOptions.api.onFilterChanged(); 

  }

  onResize() {
    if(Math.round(this.headerChip.nativeElement.offsetWidth/100)>0)
    this.showChips= this.chips.slice(0,Math.round(this.headerChip.nativeElement.offsetWidth/100)-1);
    else
    this.showChips= this.chips.slice(0,1);
  }

  loadData() {
    //console.log('### api.forEachNode() ###');
    //this.gridApi.forEachNode(this.printNode);
     // this.gridOptions_putOptions.api.showLoadingOverlay();
    //setTimeout(() => {
    
   
   
    // const overlays = Array.from(document.querySelectorAll('.ag-overlay-loading-center'));
    // overlays.forEach(function(el) {
    //   el.classList.add("show")
    // })
     //}, 2000);
     //this.startTimer();
    // clearInterval(this.interval);
    // this.showProgressBar = true;
    
    // this.interval = setInterval(() => {
    //   if(this.timeLeft > 0) {
    //     this.timeLeft--;
    //     this.progressinterval++;
    //     this.progressbarValue =  0 + this.progressinterval;
    //   } 
    //   else{
    //     //this.showProgressBar = false;
    //   }
      
    // },10)

    //this.spinner = true;
    this.loadingBar = true
    this.gridOptions_putOptions.api.setRowData([]); 
    this.gridOptions_CallOptions.api.setRowData([]);
    setTimeout(() => {
      this.gridOptions_putOptions.api.setRowData(this.rowData_put); 
      this.gridOptions_CallOptions.api.setRowData(this.rowData_call);
      // console.time('test');
      // /* stop time ‘test’ */
      // console.timeEnd('test');
      //this.spinner = false;
      this.loadingBar = false;
      }, 100);
    this.disablesimulation = true;
    this.reselected = true;
    
  }

dropChange(e,index){
//console.log(e);
this.selectedValues[index] = e.value;
    let myLength=this.selectedValues.reduce((acc,cv)=>(cv)?acc+1:acc,0);
    console.log(myLength);
    if(myLength == 9 || this.reselected)
    this.disablesimulation = false ;
  }
  autoChange(e,index){
    //alert("");
    //console.log(e);
    this.selectedValues[index] = e.option.value;
    let myLength=this.selectedValues.reduce((acc,cv)=>(cv)?acc+1:acc,0);
    console.log(myLength);
    // console.log(myLength.length);
    //this.selectedValues.push(e.option.value);
    //console.log(this.selectedValues);
    //console.log(this.selectedValues.length);
    if(myLength == 9 || this.reselected)
    this.disablesimulation = false ;

    // if(this.reselected)
    // this.disablesimulation = false ;
  }
  dateSelected(e,index){
    //alert("");
    this.selectedValues[index] = e.target.value;
    let myLength=this.selectedValues.reduce((acc,cv)=>(cv)?acc+1:acc,0);
    //this.selectedValues.push = e.target.value;
    console.log(myLength);
    // console.log(myLength.length);
    if(myLength == 9 || this.reselected)
    this.disablesimulation = false ;
    //this.selectedValues.push(e.option.value);
    //console.log(this.selectedValues);
    //console.log(this.selectedValues.length);
  }
  changeTheme(e){
    // if(e.checked){
    //   slideChecked
    // }else{
    //   alert("ssss");
    // }
    //alert("s1");
    this.slideChecked = !this.slideChecked;
    //this.lightTheme = !this.lightTheme;
    if(e.checked){
      //alert("s");
      document.querySelector('.theme-slider').classList.add('lightTheme-On');
      this.lightTheme = true;
    }else{
      //alert("s1");
      document.querySelector('.theme-slider').classList.remove('lightTheme-On');
      this.lightTheme = false;
    }
    
  }

autoOpened(){
  if(this.lightTheme){
    //document.querySelector('.darkPanelAuto').classList.add('lightPanelAuto');
    //setTimeout(() => {
      //document.querySelector('.ag-overlay-panel').classList.add('ag-hidden');
      const autocomplete = Array.from(document.querySelectorAll('.darkPanelAuto'));
      autocomplete.forEach(function(el) {
        el.classList.add("lightPanelAuto")
      })
      //}, 100);
  }else{
    document.querySelector('.darkPanelAuto').classList.remove('lightPanelAuto');
  }
}
  sliderMenuOpened(){
    if(this.lightTheme){
      document.querySelector('.theme-slider').classList.add('lightTheme-On');
    }else{
      document.querySelector('.theme-slider').classList.remove('lightTheme-On');
    }
  }
  sliderMenuClosed (){

  }
  dropdownTheme(){
    //alert(this.lightTheme);
    if(this.lightTheme){
      const dropdown = Array.from(document.querySelectorAll('.dark'));
      dropdown.forEach(function(el) {
        el.classList.add("light")
      })
      // setTimeout(() => {
      // document.querySelector('.dark-dropdown').classList.add('light-dropdown');
      // }, 1000);
    }else{
      const dropdown = Array.from(document.querySelectorAll('.dark'));
      dropdown.forEach(function(el) {
        el.classList.remove("light")
      })
    }
  }
}


