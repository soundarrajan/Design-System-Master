import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellActionsComponent } from '../../designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { AGGridCellRendererV2Component } from '../../designsystem-v2/ag-grid/ag-grid-cell-rendererv2.component';
@Component({
  selector: 'app-shiptech-contract-pricing-details-popup',
  templateUrl: './shiptech-contract-pricing-details-popup.component.html',
  styleUrls: ['./shiptech-contract-pricing-details-popup.component.css']
})
export class ShiptechContractPricingDetailsPopupComponent implements OnInit {
  public gridOptions: GridOptions;
  public gridOptions1: GridOptions;
  public gridOptions2: GridOptions;
  public gridOptions3: GridOptions;
  public showaddbtn=true;
  isShown: boolean = true;
  isBtnActive: boolean = false;
  isButtonVisible=true;
  iscontentEditable=false;
  public switchTheme:boolean = false;
  public selectedFormulaTab='Pricing formula';
 // public initialized;
  public initialized = 1;
  expandPricingDayCalendar: any = false;
  expandEventDayCalendar: any = false;
  expandPricingDayCalendar1: any = false;
  expandEventDayCalendar1: any = false;
  rules: any = 1;
  prop:string = 'A';

  expressType: string;
  pricingScheduleList:string[] = ['Date Range', 'Specific Date', 'Event Based Simple','Event Based Extended','Event Based Continuous'];
  expressType1: string;
  pricingFormulaList:any=[
  {"name": "Simple", ID: "D1", "checked": true},
  {"name": "Complex", ID: "D2", "checked": false},
  {"name": "Formula editor", ID: "D1", "checked": false},
   
];
  
  ngOnInit(): void {
    this.expressType1=this.pricingFormulaList[0].name;
    this.expressType= this.pricingScheduleList[0];
    this.addNotesEventListener1();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.addNotesEventListener1();
    },1000)
  }
  constructor(public dialogRef: MatDialogRef<ShiptechContractPricingDetailsPopupComponent>,    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.gridOptions = <GridOptions>{
      enableColResize: true,
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef1,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      // getRowClass:(params) => {
      //   // Make invoice amount text red if the type is Credit Note or Pre-Claim Credit Note
      //   if(params.node.data.type === "Credit Note" || params.node.data.type === "Pre-claim Credit Note"){
      //     return ["related-invoice-red-text"]
      //   }
      // },
      animateRows: false,
      onGridReady: (params) => {
        this.gridOptions.api = params.api;
        this.gridOptions.columnApi = params.columnApi;
        //this.gridOptions_rel_invoice.api.setPinnedBottomRowData(this.totalrowData);
        this.gridOptions.api.setRowData(this.rowData1);
        this.gridOptions.api.sizeColumnsToFit();
        // params.api.sizeColumnsToFit();
        this.addNotesEventListener1();
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          //params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8) {
          params.api.sizeColumnsToFit();
        }
      }
    }
    this.gridOptions1 = <GridOptions>{
      enableColResize: true,
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef11,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      // getRowClass:(params) => {
      //   // Make invoice amount text red if the type is Credit Note or Pre-Claim Credit Note
      //   if(params.node.data.type === "Credit Note" || params.node.data.type === "Pre-claim Credit Note"){
      //     return ["related-invoice-red-text"]
      //   }
      // },
      animateRows: false,
      onGridReady: (params) => {
        this.gridOptions1.api = params.api;
        this.gridOptions1.columnApi = params.columnApi;
        //this.gridOptions_rel_invoice.api.setPinnedBottomRowData(this.totalrowData);
        this.gridOptions1.api.setRowData(this.rowData11);
        this.gridOptions1.api.sizeColumnsToFit();
        // params.api.sizeColumnsToFit();
        this.addNotesEventListener11();
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          //params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8) {
          params.api.sizeColumnsToFit();
        }
      }
    }
    this.gridOptions2 = <GridOptions>{
      enableColResize: true,
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef22,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      // getRowClass:(params) => {
      //   // Make invoice amount text red if the type is Credit Note or Pre-Claim Credit Note
      //   if(params.node.data.type === "Credit Note" || params.node.data.type === "Pre-claim Credit Note"){
      //     return ["related-invoice-red-text"]
      //   }
      // },
      animateRows: false,
      onGridReady: (params) => {
        this.gridOptions2.api = params.api;
        this.gridOptions2.columnApi = params.columnApi;
        //this.gridOptions_rel_invoice.api.setPinnedBottomRowData(this.totalrowData);
        this.gridOptions2.api.setRowData(this.rowData22);
        this.gridOptions2.api.sizeColumnsToFit();
        // params.api.sizeColumnsToFit();
        this.addNotesEventListener22();
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          //params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8) {
          params.api.sizeColumnsToFit();
        }
      }
    }
    this.gridOptions3 = <GridOptions>{
      enableColResize: true,
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef33,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      // getRowClass:(params) => {
      //   // Make invoice amount text red if the type is Credit Note or Pre-Claim Credit Note
      //   if(params.node.data.type === "Credit Note" || params.node.data.type === "Pre-claim Credit Note"){
      //     return ["related-invoice-red-text"]
      //   }
      // },
      animateRows: false,
      onGridReady: (params) => {
        this.gridOptions3.api = params.api;
        this.gridOptions3.columnApi = params.columnApi;
        //this.gridOptions_rel_invoice.api.setPinnedBottomRowData(this.totalrowData);
        this.gridOptions3.api.setRowData(this.rowData33);
        this.gridOptions3.api.sizeColumnsToFit();
        // params.api.sizeColumnsToFit();
        this.addNotesEventListener33();
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          //params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8) {
          params.api.sizeColumnsToFit();
        }
      }
    }

  }
   
  closeDialog() {
      this.dialogRef.close();
  } 

  quantityDiscountRules = [{id: 0}];
  addNewQuantityBasedLine() {
    this.quantityDiscountRules.push({ id: 0 });
  }
  removeQuantityBasedLine(key) {
    this.quantityDiscountRules.splice(key, 1);
  }

  productDiscountRules = [{id: 0}];
  addNewProductBasedLine() {
    this.productDiscountRules.push({ id: 0 });
  }
  removeProductBasedLine(key) {
      this.productDiscountRules.splice(key, 1);
  }

  locationDiscountRules = [{id: 0}];
  addNewLocationBasedLine() {
    this.locationDiscountRules.push({ id: 0 });
  }
  removeLocationBasedLine(key) {
      this.locationDiscountRules.splice(key, 1);
  }

  complexFormulaQuoteLines = [];
  addComplexFormulaQuoteLine() {
    if (!this.complexFormulaQuoteLines) {
      this.complexFormulaQuoteLines = [];
    }
    var count = 0;
    this.complexFormulaQuoteLines.forEach((val, key) => {
      if (!val.isDeleted) {
        count++;
      }
    });
    if (count < 3) {
      this.complexFormulaQuoteLines.push({
        id: 0,
        formulaOperation: {
          id: '',
          name: '',
          internalName: null,
          code: null
        },
        weight: '100',
        formulaFunction: {
          id: 1,
          name: 'Min',
          internalName: null,
          code: null
        },
        systemInstruments: [
          {
            id: 0
          },
          {
            id: 0
          },
          {
            id: 0
          }
        ]
      });
    } else {
      //this.toastr.error('Max 3 Quotes allowed');
    }
  }

  removeComplexFormulaQuoteLine(key) {
      this.complexFormulaQuoteLines.splice(key, 1);
  }

  pricingScheduleOptionSpecificDate = [{id: 0}];
  addNewSpecificDateLine() {
    this.pricingScheduleOptionSpecificDate.push({'id': 0});
  }

  removeSpecificDateLine(key) {
        this.pricingScheduleOptionSpecificDate.splice(key, 1);
  }
  saveFormula(){
    this.dialogRef.close();
  }
  cancelFormula(){
    this.dialogRef.close();
  }
  closeClick(){
    this.dialogRef.close();
  }
  private columnDef1 = [
    {
      resizable: false,
      width: 50,
      field: 'add',
      suppressMenu: true,
      headerName: "",
      headerClass: ['aggridtextalign-center'],
      headerComponentParams: {
        template: `<span  unselectable="on">
             <div class="add-btn add-btn3 add-row"></div>
             <span ref="eMenu"></span>`
      },
      cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
    },
    { headerName: 'Operation', headerTooltip: 'Operation', field: 'operation',editable: true,cellClass: ['editable-cell'],
     cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'plain-select',valueArr:['Add','Subtract']}
     },
     { headerName: 'Weight', headerTooltip: 'Weight', field: 'weight',editable: true,cellClass: ['editable-cell'],},
    { headerName: 'Function', headerTooltip: 'Function', field: 'function',editable: true,cellClass: ['editable-cell'],
     cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'plain-select',valueArr:['Min','Max']}
     },
     { headerName: 'Instrument 1', headerTooltip: 'Instrument 1', field: 'ins1',editable: true,cellClass: ['editable-cell'],},
     { headerName: 'Price Type', headerTooltip: 'Price Type', field: 'pricetype',editable: true,cellClass: ['editable-cell'],},
     { headerName: 'Instrument 2', headerTooltip: 'Instrument 2', field: 'ins2',editable: true,cellClass: ['editable-cell'],},
     { headerName: 'Price Type', headerTooltip: 'Price Type', field: 'pricetype',editable: true,cellClass: ['editable-cell'],},
     { headerName: 'Instrument 3', headerTooltip: 'Instrument 3', field: 'ins3',editable: true,cellClass: ['editable-cell'],},
     { headerName: 'Price Type', headerTooltip: 'Price Type', field: 'pricetype',editable: true,cellClass: ['editable-cell'],},
     { headerName: '+/-', headerTooltip: '+/-', field: '+/-',editable: true,cellClass: ['editable-cell'],},
     { headerName: 'Flat/%', headerTooltip: 'Flat/%', field: 'flat',editable: true,cellClass: ['editable-cell'],},
     { headerName: 'UOM', headerTooltip: 'UOM', field: 'uom',editable: true,cellClass: ['editable-cell'],},
     
  ];
  public rowData1 = [
    {operation:'Add',weight:'100',function:'Min','+/-':'Premium',flat:'Flat',uom:'BBLS',ins1:'ICE Brent',ins2:'ICE Brent',ins3:'ICE Brent',pricetype:'Close'},
    {operation:'Subtract',weight:'100',function:'Min','+/-':'Premium',flat:'Flat',uom:'BBLS',ins1:'ICE Brent',ins2:'ICE Brent',ins3:'ICE Brent',pricetype:'Close'},
  ]
  addNotesEventListener1() {
    let addButtonElement = document.getElementsByClassName('add-row');
    console.log(addButtonElement);
    addButtonElement[0].addEventListener('click', (event) => {
       //alert("");
      this.gridOptions.api.applyTransaction({
        add: [
          {operation:'Add',weight:'100',function:'Min','+/-':'Premium',flat:'Flat',uom:'BBLS',ins1:'ICE Brent',ins2:'ICE Brent',ins3:'ICE Brent',pricetype:'Close'},

      ]
      });
    });

  }
  private columnDef11 = [
    {
      resizable: false,
      width: 50,
      field: 'add',
      suppressMenu: true,
      headerName: "",
      headerClass: ['aggridtextalign-center'],
      headerComponentParams: {
        template: `<span  unselectable="on">
             <div class="add-btn add-btn3 add-row11"></div>
             <span ref="eMenu"></span>`
      },
      cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
    },
    { headerName: 'Quantity Type', headerTooltip: 'Quantity Type', field: 'qtype',editable: true,cellClass: ['editable-cell'],
     cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'plain-select',valueArr:['Per Month','Per Day']}
     },
     { headerName: 'Quantity From', headerTooltip: 'Quantity From', field: 'qfrom',editable: true,cellClass: ['editable-cell'],},
     { headerName: 'Quantity To', headerTooltip: 'Quantity To', field: 'qto',editable: true,cellClass: ['editable-cell'],},
    { headerName: 'UOM', headerTooltip: 'UOM', field: 'uom',editable: true,cellClass: ['editable-cell'],width:100,
     cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'plain-select',valueArr:['MT','GAL']}
     },
     
     { headerName: '+/-', headerTooltip: '+/-', field: '+/-',editable: true,cellClass: ['editable-cell'],},
     { headerName: '$/%', headerTooltip: '$/%', field: '$/%',editable: true,cellClass: ['editable-cell'],},
     { headerName: 'Amount', headerTooltip: 'Amount', field: 'amount',editable: true,cellClass: ['editable-cell'],},
     
  ];
  public rowData11 = [
    {qtype:'Per Month',qfrom:'10000',qto:'20000',uom:'MT','+/-':'Premium','$/%':'Flat',amount:'25.00'},
    {qtype:'Per Day',qfrom:'10000',qto:'20000',uom:'MT','+/-':'Premium','$/%':'Flat',amount:'25.00'},
    
  ]
  private columnDef22 = [
    {
      resizable: false,
      width: 50,
      field: 'add',
      suppressMenu: true,
      headerName: "",
      headerClass: ['aggridtextalign-center'],
      headerComponentParams: {
        template: `<span  unselectable="on">
             <div class="add-btn add-btn3 add-row22"></div>
             <span ref="eMenu"></span>`
      },
      cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
    },
    
     { headerName: 'Product', headerTooltip: 'Product', field: 'qfrom',editable: true,cellClass: ['editable-cell'],},
     { headerName: '+/-', headerTooltip: '+/-', field: '+/-',editable: true,cellClass: ['editable-cell'],},
     { headerName: '$/%', headerTooltip: '$/%', field: '$/%',editable: true,cellClass: ['editable-cell'],},
     { headerName: 'Amount', headerTooltip: 'Amount', field: 'amount',editable: true,cellClass: ['editable-cell'],},
     { headerName: 'UOM', headerTooltip: 'UOM', field: 'uom',editable: true,cellClass: ['editable-cell'],width:100,
     cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'plain-select',valueArr:['MT','GAL']}
     },
    
  ];
  public rowData22 = [
    {qtype:'Per Month',qfrom:'10000',qto:'20000',uom:'MT','+/-':'Premium','$/%':'Flat',amount:'25.00'},
    {qtype:'Per Day',qfrom:'10000',qto:'20000',uom:'MT','+/-':'Premium','$/%':'Flat',amount:'25.00'},
    
  ]
  private columnDef33 = [
    {
      resizable: false,
      width: 50,
      field: 'add',
      suppressMenu: true,
      headerName: "",
      headerClass: ['aggridtextalign-center'],
      headerComponentParams: {
        template: `<span  unselectable="on">
             <div class="add-btn add-btn3 add-row33"></div>
             <span ref="eMenu"></span>`
      },
      cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
    },
    { headerName: 'Vessel Location', headerTooltip: 'Vessel Location', field: 'qfrom',editable: true,cellClass: ['editable-cell'],},
     { headerName: '+/-', headerTooltip: '+/-', field: '+/-',editable: true,cellClass: ['editable-cell'],},
     { headerName: '$/%', headerTooltip: '$/%', field: '$/%',editable: true,cellClass: ['editable-cell'],},
     { headerName: 'Amount', headerTooltip: 'Amount', field: 'amount',editable: true,cellClass: ['editable-cell'],},
     { headerName: 'UOM', headerTooltip: 'UOM', field: 'uom',editable: true,cellClass: ['editable-cell'],width:100,
     cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'plain-select',valueArr:['MT','GAL']}
     },
     
  ];
  public rowData33 = [
    {qtype:'Per Month',qfrom:'10000',qto:'20000',uom:'MT','+/-':'Premium','$/%':'Flat',amount:'25.00'},
    {qtype:'Per Day',qfrom:'10000',qto:'20000',uom:'MT','+/-':'Premium','$/%':'Flat',amount:'25.00'},
    
  ]
  addNotesEventListener11() {
    let addButtonElement = document.getElementsByClassName('add-row11');
    console.log(addButtonElement);
    addButtonElement[0].addEventListener('click', (event) => {
       //alert("");
      this.gridOptions1.api.applyTransaction({
        add: [
          {qtype:'Per Month',qfrom:'10000',qto:'20000',uom:'MT','+/-':'Premium','$/%':'Flat',amount:'25.00'},

      ]
      });
    });

  }
  addNotesEventListener22() {
    let addButtonElement = document.getElementsByClassName('add-row22');
    console.log(addButtonElement);
    addButtonElement[0].addEventListener('click', (event) => {
       //alert("");
      this.gridOptions2.api.applyTransaction({
        add: [
          {operation:'Add',weight:'100',function:'Min','+/-':'Premium',flat:'Flat',uom:'BBLS',ins1:'ICE Brent',ins2:'ICE Brent',ins3:'ICE Brent',pricetype:'Close'},

      ]
      });
    });

  }
  addNotesEventListener33() {
    let addButtonElement = document.getElementsByClassName('add-row33');
    console.log(addButtonElement);
    addButtonElement[0].addEventListener('click', (event) => {
       //alert("");
      this.gridOptions3.api.applyTransaction({
        add: [
          {operation:'Add',weight:'100',function:'Min','+/-':'Premium',flat:'Flat',uom:'BBLS',ins1:'ICE Brent',ins2:'ICE Brent',ins3:'ICE Brent',pricetype:'Close'},

      ]
      });
    });

  }
}
