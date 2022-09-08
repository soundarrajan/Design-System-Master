import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AgGridCellStyleComponent } from 'src/app/shared/ag-grid/ag-grid-cell-style.component';
import { AggridHeaderRendererPopupComponent } from 'src/app/shared/ag-grid/ag-grid-header-renderer-popup';
import { AGGridCellActionsComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { AGGridCellRendererV2Component } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-rendererv2.component';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  public gridOptions_rollover: GridOptions;
  public gridOptions_addCost: GridOptions;
  public gridOptions_notes: GridOptions;
  public gridOptions_rel_invoice: GridOptions;
  public rollover_grid_container_width = 0;
  public detailCellRendererParams;
  invoiceNotes: any = [''];
  expandRelatedInvoice: boolean = true;
  expandInvoiceNotes: boolean = true;
  displayTableWithScroll: boolean = false;
  @ViewChild('addBtn', { static: false }) addBtn: ElementRef;
  @ViewChild('rolloverGridContainer', { static: false }) rolloverGridContainer: ElementRef;


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('data-picker-gray',sanitizer.bypassSecurityTrustResourceUrl('../../assets/customicons/calendar-dark.svg'));
    
    this.gridOptions_rollover = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_invDetails,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,
      detailCellRendererParams: {
        refreshStrategy: 'everything',
        detailGridOptions: {
          headerHeight: 25,
          rowHeight: 35,
        //  / domLayout: 'autoHeight',
          animateRows: false,
          suppressHorizontalScroll: true,
          suppressRowClickSelection: true,
          columnDefs: [
            { headerName: 'Pricing event Date', headerTooltip: 'Pricing event Date', field: 'PricingeventDate', cellClass: ['aggrid-editable aggrid-editable-onselect aggridtextalign-left'],},
            { headerName: 'Pricing schedule', headerTooltip: 'Pricing schedule', field: 'Pricingschedule', cellClass: ['aggridtextalign-left']},
            { headerName: 'Confirm Qty', headerTooltip: 'Confirm Qty', field: 'ConfirmQty', cellClass: ['aggridtextalign-left']},
            { headerName: 'Agreement', headerTooltip: 'Agreement', field: 'Agreement', cellClass: ['aggridtextalign-left']},
            { headerName: 'Contract', headerTooltip: 'Contract', field: 'Contract', cellClass: ['aggridtextalign-left']},
            { headerName: 'Inv Amt in order cur.', headerTooltip: 'InvAmt', field: 'InvAmt', cellClass: ['aggridtextalign-left']},
            { headerName: 'Invoice Description', headerTooltip: 'InvoiceDescription', field: 'InvoiceDescription', cellClass: ['aggrid-editable aggrid-editable-onselect aggridtextalign-left']},
          ],
          defaultColDef: {
            flex: 1,
            sortable: true,
            resizable: true,
            filter: true,
            suppressSizeToFit: true
          },
          onFirstDataRendered(params) {
            params.api.sizeColumnsToFit();
          },
          onColumnResized: function (params) {
            if (params.columnApi.getAllDisplayedColumns().length <= 3 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
              params.api.sizeColumnsToFit();
            }
          }
        },
        getDetailRowData: function (params) {
          // setTimeout(function ()
          // {
          // //this.params.api.refreshView();
          // }, 0);
          // alert("")
          // setTimeout(function ()
          // {
          //  console.log(params);
          //  console.log(params.data.sub_data);        
            params.successCallback(params.data.sub_data);
        
          //}, 1000);       
        }
      },
      
      onGridReady: (params) => {
        this.gridOptions_rollover.api = params.api;
        this.gridOptions_rollover.columnApi = params.columnApi;
        this.gridOptions_rollover.api.sizeColumnsToFit();
        this.gridOptions_rollover.api.setRowData(this.rowData_invDetails);
        
          
          this.addRolloverTradeEventListener();

      },
      // getDetailRowData: function (params) {
      //   params.successCallback(params.data.callRecords);
      // },
      onColumnResized: (params) => {
        // this.rollover_grid_container_width = this.rolloverGridContainer.nativeElement.offsetWidth;
        // let gridWidth = (params.columnApi.getColumn("price").getActualWidth() +
        //   params.columnApi.getColumn("company").getActualWidth() +
        //   params.columnApi.getColumn("lots").getActualWidth()) +
        //   params.columnApi.getColumn("book").getActualWidth() +
        //   params.columnApi.getColumn("contract").getActualWidth() +
        //   params.columnApi.getColumn("add").getActualWidth();
        // if (gridWidth < this.rollover_grid_container_width)
        //   if (params.columnApi.getAllDisplayedColumns().length <= 6 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
        //     params.api.sizeColumnsToFit();
        //   }
      },
      onColumnVisible: (params) => {
        if (params.columnApi.getAllDisplayedColumns().length <= 6) {
          params.api.sizeColumnsToFit();

        }
      },
      frameworkComponents: {
        headerRendererPopup: AggridHeaderRendererPopupComponent
      },
    }
    this.gridOptions_addCost = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_addCost,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,
      detailCellRendererParams: {
        refreshStrategy: 'everything',
        detailGridOptions: {
          headerHeight: 25,
          rowHeight: 35,
        //  / domLayout: 'autoHeight',
          animateRows: false,
          suppressHorizontalScroll: true,
          suppressRowClickSelection: true,
          columnDefs: [
            { headerName: 'Pricing event Date', headerTooltip: 'Pricing event Date', field: 'PricingeventDate', cellClass: ['aggrid-editable aggrid-editable-onselect aggridtextalign-left'],},
            { headerName: 'Pricing schedule', headerTooltip: 'Pricing schedule', field: 'Pricingschedule', cellClass: ['aggridtextalign-left']},
            { headerName: 'Confirm Qty', headerTooltip: 'Confirm Qty', field: 'ConfirmQty', cellClass: ['aggridtextalign-left']},
            { headerName: 'Agreement', headerTooltip: 'Agreement', field: 'Agreement', cellClass: ['aggridtextalign-left']},
            { headerName: 'Contract', headerTooltip: 'Contract', field: 'Contract', cellClass: ['aggridtextalign-left']},
            { headerName: 'Inv Amt in order cur.', headerTooltip: 'InvAmt', field: 'InvAmt', cellClass: ['aggridtextalign-left']},
            { headerName: 'Invoice Description', headerTooltip: 'InvoiceDescription', field: 'InvoiceDescription', cellClass: ['aggrid-editable aggrid-editable-onselect aggridtextalign-left']},
          ],
          defaultColDef: {
            flex: 1,
            sortable: true,
            resizable: true,
            filter: true,
            suppressSizeToFit: true
          },
          onFirstDataRendered(params) {
            params.api.sizeColumnsToFit();
          },
          onColumnResized: function (params) {
            if (params.columnApi.getAllDisplayedColumns().length <= 3 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
              params.api.sizeColumnsToFit();
            }
          }
        },
        getDetailRowData: function (params) {
          // setTimeout(function ()
          // {
          // //this.params.api.refreshView();
          // }, 0);
          // alert("")
          // setTimeout(function ()
          // {
          //  console.log(params);
          //  console.log(params.data.sub_data);        
            params.successCallback(params.data.sub_data);
        
          //}, 1000);       
        }
      },
      
      onGridReady: (params) => {
        this.gridOptions_addCost.api = params.api;
        this.gridOptions_addCost.columnApi = params.columnApi;
        this.gridOptions_addCost.api.sizeColumnsToFit();
        this.gridOptions_addCost.api.setRowData(this.rowData_addCost);
        
          
          this.addAdditionalCostEventListener();

      },
      // getDetailRowData: function (params) {
      //   params.successCallback(params.data.callRecords);
      // },
      onColumnResized: (params) => {
        // this.rollover_grid_container_width = this.rolloverGridContainer.nativeElement.offsetWidth;
        // let gridWidth = (params.columnApi.getColumn("price").getActualWidth() +
        //   params.columnApi.getColumn("company").getActualWidth() +
        //   params.columnApi.getColumn("lots").getActualWidth()) +
        //   params.columnApi.getColumn("book").getActualWidth() +
        //   params.columnApi.getColumn("contract").getActualWidth() +
        //   params.columnApi.getColumn("add").getActualWidth();
        // if (gridWidth < this.rollover_grid_container_width)
        //   if (params.columnApi.getAllDisplayedColumns().length <= 6 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
        //     params.api.sizeColumnsToFit();
        //   }
      },
      onColumnVisible: (params) => {
        if (params.columnApi.getAllDisplayedColumns().length <= 6) {
          params.api.sizeColumnsToFit();

        }
      }
    }
    this.gridOptions_rel_invoice = <GridOptions>{
      enableColResize: true,
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_aggrid_rel_invoice,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      getRowClass:(params) => {
        // Make invoice amount text red if the type is Credit Note or Pre-Claim Credit Note
        if(params.node.data.type === "Credit Note" || params.node.data.type === "Pre-claim Credit Note"){
          return ["related-invoice-red-text"]
        }
      },
      animateRows: false,
      onGridReady: (params) => {
        this.gridOptions_rel_invoice.api = params.api;
        this.gridOptions_rel_invoice.columnApi = params.columnApi;
        this.gridOptions_rel_invoice.api.setPinnedBottomRowData(this.totalrowData);
        this.gridOptions_rel_invoice.api.setRowData(this.rowData_rel_invoice);
        this.gridOptions_rel_invoice.api.sizeColumnsToFit();
        // params.api.sizeColumnsToFit();
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8) {
          params.api.sizeColumnsToFit();
        }
      }
    }
    this.gridOptions_notes = <GridOptions>{
      enableColResize: true,
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_notes,
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
        this.gridOptions_notes.api = params.api;
        this.gridOptions_notes.columnApi = params.columnApi;
        //this.gridOptions_rel_invoice.api.setPinnedBottomRowData(this.totalrowData);
        this.gridOptions_notes.api.setRowData(this.rowData_notes);
        this.gridOptions_notes.api.sizeColumnsToFit();
        // params.api.sizeColumnsToFit();
        this.addNotesEventListener();
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8) {
          params.api.sizeColumnsToFit();
        }
      }
    }
  }

  ngOnInit(): void {
  }
  addAdditionalCostEventListener() {
    let addButtonElement = document.getElementsByClassName('add-AdditionalCost');
    if(addButtonElement.length>0){
      addButtonElement[0].addEventListener('click', (event) => {
        //alert("");
              this.gridOptions_addCost.api.applyTransaction({
                add: [
                  {
                    item:'Barging',costtype:'Percent',perOf:'RMG 380',bdnQty:'200.00 MT',estdRate:'20USD/MT',amount:'4,000 USD',extra:'1.00',extraAmt:'1200 USD',
                    total:'4000 USD',invoiceQty:'233 MT',invoiceRate:'1290 USD/MT'
                  },
        
              ]
              });
            });
    }


  }
  addNotesEventListener() {
    let addButtonElement = document.getElementsByClassName('add-Notes');
    addButtonElement[0].addEventListener('click', (event) => {
//alert("");
      this.gridOptions_notes.api.applyTransaction({
        add: [
          {
            notes:'',addedBy:'Alexander James',addedOn:'12/09/2021 12:45'
          },

      ]
      });
    });

  }

  addRolloverTradeEventListener() {
    let addButtonElement = document.getElementsByClassName('add-btn3');
    addButtonElement[0].addEventListener('click', (event) => {

      this.gridOptions_rollover.api.applyTransaction({
        add: [{
          type: 'add',    delNo: '23243', orderProduct:'DMA 0.1 %',delProduct: 'DMA 0.1%', delQty: '1200 MT', estRate: '1290 USD', amount: '1290 USD',
          invProduct: 'RMG 380', invQty: '1200 MT', invRate: '', invAmount: '0.00 USD', reconstatus: 'Matched',sulphercontent:'0.05',physuppier:'British Petroleum',
          sub_data:
          [{
            PricingeventDate: '12/09/2020',
            Pricingschedule: 'Simple event',
            ConfirmQty: '1250 MT',
            Agreement: 'Contract',
            Contract: '123',
            InvAmt: '213738 EUR',
            InvoiceDescription: 'For my reference',
          }]
          
        }]
      });
    });

  }

  tabData = [
    { disabled: false, name: 'Details' },
    { disabled: false, name: 'Related Invoices' },
    { disabled: false, name: 'Documents' },
    { disabled: false, name: 'Email Log' },
    { disabled: false, name: 'Seller Rating' },
    { disabled: false, name: 'Audit Log' }
  ]
  public defaultToggle = 'FinalInvoice';

  invoice_types =[
    {
      displayName:'Final',
      value:'FinalInvoice',
    },
    {
      displayName:'Provisional',
      value:'Provisional',
    },
    {
      displayName:'Credit',
      value:'Credit',
    },
    {
      displayName:'Debit',
      value:'Debit',
    },
  ]
  emptyStringVal = '--';

  public chipData = [
    {Title:'Invoice No', Data:this.emptyStringVal,status:'Draft'},
    {Title:'Status', Data:'Draft',status:'Draft'},
    {Title:'Invoice Total', Data:this.emptyStringVal,status:'Saved'},
    {Title:'Estimated Total', Data:'33,898.00 USD',status:'Saved'},
    {Title:'Total Difference', Data:this.emptyStringVal,status:'Draft'},
    {Title:'Provisional Inv No.', Data:this.emptyStringVal,status:'Draft'},
    {Title:'Provisional Total', Data:this.emptyStringVal,status:'Draft'},
    {Title:'Deductions', Data:this.emptyStringVal,status:'Draft'},
    {Title:'Net Payable', Data:this.emptyStringVal,status:'Draft'}
  ]

  /* toggleTransfer(toggle) {
    this.defaultToggle = toggle.value;
  } */

  private columnDef_invDetails = [
    {
      resizable: false,
      width: 20,
      field: 'add',
      suppressMenu: true,
      headerName: "",
      headerClass: ['aggridtextalign-center'],
      headerComponent: 'headerRendererPopup',
      cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
    },
    {
      headerName: 'Delivery No. / Order Product', headerClass: ['column-separator'], headerTooltip: 'Delivery No. / Order Product', field: 'delNo', width: 220,
      cellClass:'row-separator',cellRendererFramework:AGGridCellRendererV2Component, cellRendererParams: {type: 'border-cell'} 
    },
    {
      headerName: 'Deliv Product', headerTooltip: 'Deliv Product', field: 'delProduct', width: 120,
      cellClass:'grey-opacity-cell pad-lr-0' ,cellStyle: { 'margin-left': '5px'} 
    },
    {
      headerName: 'Deliv. Qty', headerTooltip: 'Deliv. Qty', field: 'delQty', width: 120,cellClass:'grey-opacity-cell pad-lr-0'
    },
    {
      headerName: 'Estd. Rate', headerTooltip: 'Estd. Rate', field: 'estRate', width: 120,cellClass:'grey-opacity-cell pad-lr-0'
    },
    {
      headerName: 'Amount', headerTooltip: 'Amount', field: 'amount', width: 120,headerClass: ['column-separator'],cellClass:'row-separator grey-opacity-cell pad-lr-5'
    },
    {
      headerName: 'Invoice Product', headerTooltip: 'Invoice Product', field: 'invProduct', width: 130,cellClass:'dark-cell pad-lr-0',cellStyle: { 'margin-left':'5px','padding-right': '0px','border-right-width':'0px' },
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'dashed-border-dark-search'}
    },
    {
      headerName: 'Invoice Qty', headerTooltip: 'Invoice Qty', field: 'invQty', width: 120,cellClass:'dark-cell pad-lr-0',
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'dashed-border-darkcell'}
    },
    {
      headerName: 'Invoice Rate', headerTooltip: 'Invoice Rate', field: 'invRate', width: 120,cellClass:'dark-cell pad-lr-0',
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'dashed-border-darkcell'}
    
    },
    {
      headerName: 'Amount', headerTooltip: 'Amount', field: 'invAmount', width: 120,headerClass: ['column-separator'],
      cellClass:'dark-cell pad-lr-0 aggrid-editable-onselect',cellStyle: { 'line-height': '26px' },
    },
    {
      headerName: 'Recon status', headerTooltip: 'Recon status', field: 'reconstatus', width: 120,headerClass: ['column-separator aggrid-text-align-c'], cellClass: ['aggridtextalign-center'],
      cellRendererFramework: AGGridCellRendererComponent,
      cellRendererParams: function(params) { 
        var classArray:string[] =[]; 
          classArray.push('aggridtextalign-center');
          let newClass= params.value==='Matched'?'custom-chip-v2 small medium-green':
                        params.value==='Unmatched'?'custom-chip-v2 small medium-amber':
                        'custom-chip-v2 small medium-green';
                        classArray.push(newClass);
          return {cellClass: classArray.length>0?classArray:null} } 
        },
    {
      headerName: 'Sulpher content', headerTooltip: 'Sulpher content', field: 'sulphercontent', width: 120,
      cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'dashed-border-darkcell'}
    },
    {
      headerName: 'Phy. suppier', headerTooltip: 'Phy. suppier', field: 'physuppier', cellStyle:{'width':'8% !important','overflow':'visible'},
      cellClass: ['aggrid-editable aggrid-editable-onselect'],cellRenderer: 'agGroupCellRenderer',
    },
  ];
  public rowData_invDetails = [

      {
      delNo: '23243', orderProduct:'DMA 0.1 %',delProduct: 'DMA 0.1%', delQty: '1200 MT', estRate: '1290 USD', amount: '120,000 USD',
      invProduct: 'RMG 380', invQty: '1200 MT', invRate: '', invAmount: '0.00 USD', reconstatus: 'Unmatched',sulphercontent:'0.05',physuppier:'British Petroleum',
      sub_data:
        [{
          PricingeventDate: '12/09/2020',
          Pricingschedule: 'Simple event',
          ConfirmQty: '1250 MT',
          Agreement: 'Contract',
          Contract: '123',
          InvAmt: '213738 EUR',
          InvoiceDescription: 'For my reference',
        }]
        
      },
      {
        delNo: '23243', orderProduct:'RMK 380 3.5%',delProduct: 'RMK 380 3.5%', delQty: '1200 MT', estRate: '1290 USD', amount: '120,000 USD',
        invProduct: 'RMG 380', invQty: '1200 MT', invRate: '', invAmount: '0.00 USD', reconstatus: 'Unmatched',sulphercontent:'0.05',physuppier:'British Petroleum',
        sub_data:
          [{
            PricingeventDate: '12/09/2020',
            Pricingschedule: 'Simple event',
            ConfirmQty: '1250 MT',
            Agreement: 'Contract',
            Contract: '123',
            InvAmt: '213738 EUR',
            InvoiceDescription: 'For my reference',
          }]
          
      },
      {
          delNo: '23243', orderProduct:'RMK 380 3.5%',delProduct: 'RMK 380 3.5%', delQty: '1200 MT', estRate: '1290 USD', amount: '120,000 USD',
          invProduct: 'RMG 380', invQty: '1200 MT', invRate: '', invAmount: '0.00 USD', reconstatus: 'Unmatched',sulphercontent:'0.05',physuppier:'British Petroleum',
          sub_data:
            [{
              PricingeventDate: '12/09/2020',
              Pricingschedule: 'Simple event',
              ConfirmQty: '1250 MT',
              Agreement: 'Contract',
              Contract: '123',
              InvAmt: '213738 EUR',
              InvoiceDescription: 'For my reference',
            }]
            
      },
      //   {
      //     delNo: '23243', orderProduct:'DMA 0.1 %',delProduct: 'DMA 0.1%', delQty: '1200 MT', estRate: '1290 USD', amount: '1290 USD',
      //     invProduct: 'RMG 380', invQty: '1200 MT', invRate: '100 USD',reconstatus: 'Matched',sulphercontent:'0.5',physuppier:'British Petroleum',
      //     sub_data:
      //       [{
      //         PricingeventDate: '12/09/2020',
      //         Pricingschedule: 'Simple event',
      //         ConfirmQty: '1250 MT',
      //         Agreement: 'Contract',
      //         Contract: '123',
      //         InvAmt: '213738 EUR',
      //         InvoiceDescription: 'For my reference',
      //       }]
            
      //     }
  ]
  private columnDef_addCost = [
    {
      resizable: false,
      width: 20,
      field: 'add',
      suppressMenu: true,
      headerName: "",
      headerClass: ['aggridtextalign-center'],
      headerComponentParams: {
        template: `<span  unselectable="on">
             <div class="add-btn add-btn3 add-AdditionalCost"></div>
             <span ref="eMenu"></span>`
      },
      cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
    },
    {
      headerName: 'Item',  headerTooltip: 'Item', field: 'item', width: 150,
      cellClass:'row-separator',
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'dark-border-cell'}
    },
    {
      headerName: 'Cost Type', headerTooltip: 'Cost Type', field: 'costtype', width: 140,
      cellClass:' pad-lr-0' ,cellStyle: { 'margin-left': '5px'} ,
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'dashed-border-darkcell'}
    },
    {
      headerName: '% of', headerClass: ['column-separator'],headerTooltip: '% of', field: 'perOf', 
      width: 150,cellClass:'pad-lr-0',
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'dashed-border-with-dropdown'}
    },
    {
      headerName: 'BDN Qty', headerTooltip: 'BDN Qty', field: 'bdnQty', width: 120,cellClass:'grey-opacity-cell pad-lr-0'
    },
    {
      headerName: 'Estd. Rate', headerTooltip: 'Estd. Rate', field: 'estdRate', width: 120,cellClass:'row-separator grey-opacity-cell pad-lr-5'
    },
    {
      headerName: 'Amount', headerTooltip: 'Amount', field: 'amount', width: 120,cellClass:'grey-opacity-cell pad-lr-0',cellStyle: { 'padding-left':'5px','padding-right': '0px','border-right-width':'0px' },
      
    },
    {
      headerName: 'Extra %', headerTooltip: 'Extra %', field: 'extra', width: 120,cellClass:'grey-opacity-cell pad-lr-0',
      
    },
    {
      headerName: 'ExtraAmt', headerTooltip: 'ExtraAmt', field: 'amount', width: 120,cellClass:'grey-opacity-cell pad-lr-0',
      
    },
    {
      headerName: 'Total', headerTooltip: 'Total', field: 'total', width: 120,headerClass: ['column-separator'],cellClass:'grey-opacity-cell row-separator pad-lr-0',cellStyle: { 'line-height': '26px' },
    },
    {
      headerName: 'Invoice Qty', headerTooltip: 'Invoice Qty', field: 'invoiceQty', width: 120,cellClass:'dark-cell',cellStyle: { 'margin-left':'5px',},
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'dashed-border-darkcell'}
    },
    {
      headerName: 'Invoice Rate', headerTooltip: 'Invoice Rate', field: 'invoiceRate', width: 180,cellClass:'dark-cell pad-lr-0',
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'dashed-border-darkcell'}
    },
    {
      headerName: 'Amount', headerTooltip: 'Amount', field: 'amount', width: 120,cellClass:'dark-cell pad-lr-0',cellStyle: {'line-height':'30px', 'padding-left':'5px','padding-right': '0px','border-right-width':'0px' },
      
    },
    {
      headerName: 'Extra %', headerTooltip: 'Extra %', field: 'extra', width: 120,cellClass:'dark-cell pad-lr-0',
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'dashed-border-darkcell'}
    },
    {
      headerName: 'ExtraAmt', headerTooltip: 'ExtraAmt', field: 'amount', width: 120,cellClass:'dark-cell pad-lr-0',cellStyle: {'line-height':'30px'}
      
    },
    {
      headerName: 'Total', headerTooltip: 'Total', field: 'total', width: 120,headerClass: ['column-separator'],cellClass:'dark-cell pad-lr-0',cellStyle: { 'line-height': '26px' },
    },
    {
      headerName: 'Difference', headerTooltip: 'Difference', field: 'total', width: 120,cellClass:'row-separator dark-cell pad-lr-5 m-l-5',cellStyle: {'padding-left':'5px !important','line-height': '26px'},
    },
  ];
  private columnDef_notes = [
    {
      resizable: false,
      width: 50,
      field: 'add',
      suppressMenu: true,
      headerName: "",
      headerClass: ['aggridtextalign-center'],
      headerComponentParams: {
        template: `<span  unselectable="on">
             <div class="add-btn add-btn3 add-Notes"></div>
             <span ref="eMenu"></span>`
      },
      cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
    },
    {
      headerName: 'Notes',  headerTooltip: 'Notes', field: 'notes', width: 900,
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: {type: 'dashed-border-darkcell'}
    },
    {
      headerName: 'Added By', headerTooltip: 'Added By', field: 'addedBy', width: 250,
      
    },
    {
      headerName: 'Added On', headerTooltip: 'Added On', field: 'addedOn', width: 250
    },
    
    
  ];
  // public rowData_addCost = [

  // ]
  private columnDef_aggrid_rel_invoice = [
    { headerName: 'Invoice ID', headerTooltip: 'Invoice ID', field: 'id', width: 100, cellClass: ['aggridlink aggridtextalign-center'], headerClass: ['aggrid-text-align-c'] },
    { headerName: 'Order number', headerTooltip: 'Order number', field: 'order-number', cellClass: ['aggridtextalign-left'] },
    {
      headerName: 'Invoice Type', headerTooltip: 'Invoice Type', field: 'type'
    },
    {
      headerName: 'Invoice Date', headerTooltip: 'Invoice Date', field: 'date', width: 150,
    },
    {
      headerName: 'Invoice Amt', headerTooltip: 'Invoice Amt', field: 'amount', width: 150,
    },
    {
      headerName: 'Deductions', headerTooltip: 'Deductions', field: 'deductions', width: 150,
    },
    {
      headerName: 'Paid Amount', headerTooltip: 'Paid Amount', field: 'paid',  width: 150,
    },
    { headerName: 'Invoice status', headerTooltip: 'Invoice status', field: 'status',width: 150,
    headerClass: ['aggrid-text-align-c'], cellClass: ['aggridtextalign-center'],
        cellRendererFramework:AGGridCellRendererComponent, 
        cellRendererParams: function(params) { 
          var classArray:string[] =[]; 
            classArray.push('aggridtextalign-center');
            if(params.value !== ''){
            let newClass= params.value==='Approved'?'custom-chip-v2 small medium-green':
                          params.value==='Reverted'?'custom-chip-v2 small medium-amber':
                          'custom-chip-v2 small dark';
                          classArray.push(newClass);
                        }
            return {cellClass: classArray.length>0?classArray:null} }  }
  ];
  public rowData_addCost = [
    {
      item:'Barging',costtype:'Percent',perOf:'RMG 380 MAX 0.5%S',bdnQty:'200.00 MT',estdRate:'20USD/MT',amount:'4,000 USD',extra:'1.00',extraAmt:'1200 USD',
      total:'4000 USD',invoiceQty:'233 MT',invoiceRate:'1290 USD/MT'
    },
    {
      item:'Barging',costtype:'Percent',perOf:'DMA MAX 1.5%S',bdnQty:'200.00 MT',estdRate:'20USD/MT',amount:'4,000 USD',extra:'1.00',extraAmt:'1200 USD',
      total:'4000 USD',invoiceQty:'233 MT',invoiceRate:'1290 USD/MT'
    },
  ]
  public rowData_notes = [
    {
      notes:'Percent',addedBy:'Alexander James',addedOn:'12/09/2021 12:45'
    },
    {
      notes:'Percent',addedBy:'Alexander James',addedOn:'12/09/2021 12:45'
    },
  ]
  public rowData_rel_invoice = [
    {
      id: '95164', ordernumber:'9827',type: 'Provisional', date: '12/09/2020', amount: '1280 USD', deductions: '30 USD',
      paid:'30 USD',status:'Approved'
    },
    {
      id: '95164', ordernumber:'9827',type: 'Provisional', date: '12/09/2020', amount: '1280 USD', deductions: '30 USD',
      paid:'30 USD',status:'Reverted'
    },
    {
      id: '95164', ordernumber:'9827',type: 'Provisional', date: '12/09/2020', amount: '1280 USD', deductions: '30 USD',
      paid:'30 USD',status:'New'
    },
    {
      id: '95164', ordernumber:'9827',type: 'Provisional', date: '12/09/2020', amount: '1280 USD', deductions: '30 USD',
      paid:'30 USD',status:'New'
    },
    {
      id: '95164', ordernumber:'9827',type: 'Provisional', date: '12/09/2020', amount: '1280 USD', deductions: '30 USD',
      paid:'30 USD',status:'New'
    },
    {
      id: '95164', ordernumber:'9827',type: 'Provisional', date: '12/09/2020', amount: '1280 USD', deductions: '30 USD',
      paid:'30 USD',status:'New'
    },
    {
      id: '95164', ordernumber:'9827',type: 'Provisional', date: '12/09/2020', amount: '1280 USD', deductions: '30 USD',
      paid:'30 USD',status:'New'
    },
  ];

  public totalrowData = [
    {
      id: 'Net Payable', ordernumber:'',type: '', date: 'Total', amount: '46,500.000', deductions: '0.000',
      paid:'0.000',status:''
    }
  ];

  onCellClicked(e){}

  addNotesLine() {
    this.displayTableWithScroll = !this.displayTableWithScroll;
    if (!this.invoiceNotes) {
      this.invoiceNotes = [];
    }

    let notesLine = {
      'id': 0,
      'note': '',
      'createdBy': 'a',
      'createdAt': '',
      'lastModifiedAt': ''
    }
    this.invoiceNotes.push(notesLine);
    //this.changeDetectorRef.detectChanges();
  }

  detectCurrentUser(noteLine) {}

  deleteNotesLine(key) {
    if (this.invoiceNotes[key].id) {
      this.invoiceNotes[key].isDeleted = true;
      //this.autoSave();
    } else {
      this.invoiceNotes.splice(key, 1);
    }
  }

  onResize(e){
    this.gridOptions_rollover.api.redrawRows();
    setTimeout(() => {
    this.gridOptions_rollover.api.sizeColumnsToFit();
    this.gridOptions_rollover.api.redrawRows();
    this.gridOptions_addCost.api.sizeColumnsToFit();
    this.gridOptions_notes.api.sizeColumnsToFit();
    this.gridOptions_rel_invoice.api.sizeColumnsToFit();
  }, 100);
  }

}
