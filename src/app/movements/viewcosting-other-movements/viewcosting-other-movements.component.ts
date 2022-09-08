import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellActionsComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { AGGridCellMenuPopupComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-menu.component';

@Component({
  selector: 'app-viewcosting-other-movements',
  templateUrl: './viewcosting-other-movements.component.html',
  styleUrls: ['./viewcosting-other-movements.component.css']
})
export class ViewcostingOtherMovementsComponent implements OnInit {
  public gridOptions_transOut: GridOptions;
  public gridOptions_transIn: GridOptions;
  public isTransOutCollapsed: boolean = true;
  public isTransInCollapsed: boolean = false;
  public displayGridListIn = [];
  public displayGridListOut = [];

  toggleTransOutCollapse() {
    this.isTransOutCollapsed = !this.isTransOutCollapsed;
  }

  toggleTransInCollapse() {
    this.isTransInCollapsed = !this.isTransInCollapsed;
  }

  constructor() {
    this.gridOptions_transOut = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      suppressHorizontalScroll: true,
      scrollbarWidth: 0,
      columnDefs: this.columnDef_aggrid_transOut,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,

      onGridReady: (params) => {
        this.gridOptions_transOut.api = params.api;
        this.gridOptions_transOut.columnApi = params.columnApi;
        this.gridOptions_transOut.api.sizeColumnsToFit();
        this.gridOptions_transOut.api.setRowData(this.rowData_aggrid_transOut);
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 13 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      }
    }

    this.gridOptions_transIn = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      suppressHorizontalScroll: true,
      scrollbarWidth: 0,
      columnDefs: this.columnDef_aggrid_transIn,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,

      onGridReady: (params) => {
        this.gridOptions_transIn.api = params.api;
        this.gridOptions_transIn.columnApi = params.columnApi;
        this.gridOptions_transIn.api.sizeColumnsToFit();
        this.gridOptions_transIn.api.setRowData(this.rowData_aggrid_transIn);
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 13 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 13) {
          params.api.sizeColumnsToFit();

        }
      }
    }
  }

  ngOnInit(): void {
  }

  showMasterJournalIn(e) {
    let key = "show-master-journalIN" + e.node.rowIndex;

    if ((this.displayGridListIn.length <= 0) || this.displayGridListIn.filter(item => item.key == key).length <= 0) {
      let entry = {
        key: key,
        data: e.node.data
      }
      this.displayGridListIn.unshift(entry);
    }
    else if (this.displayGridListIn.length > 0) {
      this.displayGridListIn = this.displayGridListIn.filter(item => item.key != key)
    }
  }
  showAlocationDetailsIn(e) {
    let key = "show-alloc-detailsIN" + e.node.rowIndex;

    if ((this.displayGridListIn.length <= 0) || this.displayGridListIn.filter(item => item.key == key).length <= 0) {
      let entry = {
        key: key,
        data: e.node.data
      }
      this.displayGridListIn.unshift(entry);
    }
    else if (this.displayGridListIn.length > 0) {
      this.displayGridListIn = this.displayGridListIn.filter(item => item.key != key)
    }
  }
  showMasterJournalOut(e) {
    let key = "show-master-journalOUT" + e.node.rowIndex;

    if ((this.displayGridListOut.length <= 0) || this.displayGridListOut.filter(item => item.key == key).length <= 0) {
      let entry = {
        key: key,
        data: e.node.data
      }
      this.displayGridListOut.unshift(entry);
    }
    else if (this.displayGridListOut.length > 0) {
      this.displayGridListOut = this.displayGridListOut.filter(item => item.key != key)
    }
  }
  showAlocationDetailsOut(e) {
    let key = "show-alloc-detailsOUT" + e.node.rowIndex;

    if ((this.displayGridListOut.length <= 0) || this.displayGridListOut.filter(item => item.key == key).length <= 0) {
      let entry = {
        key: key,
        data: e.node.data
      }
      this.displayGridListOut.unshift(entry);
    }
    else if (this.displayGridListOut.length > 0) {
      this.displayGridListOut = this.displayGridListOut.filter(item => item.key != key)
    }
  }
  private columnDef_aggrid_transOut = [
    { headerName: 'Delivery No.', headerTooltip: 'Delivery No', field: 'delivery_no', width: 200 },
    { headerName: 'Movement ID', headerTooltip: 'Movement ID', field: 'mov_id', cellClass: ['aggridlink'] },
    { headerName: 'COGS Tkt ID', headerTooltip: 'COGS Tkt ID', field: 'cogs_id', cellClass: ['aggridlink'] },
    { headerName: 'Mov Type', headerTooltip: 'Mov Type', field: 'mov_type' },
    { headerName: 'Category', headerTooltip: 'Category', field: 'category' },
    { headerName: 'COGS Grp/B2B Deal ID', headerTooltip: 'COGS Grp/B2B Deal ID', field: 'cogs_deal_id' },
    {
      headerName: 'Sort Order / Deliv#', headerTooltip: 'Sort Order / Deliv#', field: 'sort_del', cellClass: ['product-cell'],
      cellRendererFramework: AGGridCellMenuPopupComponent, cellRendererParams: { type: 'cell-hover-click-menu-popup', labels: [{ name: 'Sort Order', iconClass: 'edit-pen-icon' }], align: "left" }
    },
    { headerName: 'Quantity', headerTooltip: 'Quantity', field: 'quantity', type: "numericColumn" },
    { headerName: 'UOM', headerTooltip: 'UOM', field: 'uom' },
    { headerName: 'Per Unit COGS', headerTooltip: 'Per Unit COGS', field: 'per_unit' },
    { headerName: 'Amount', headerTooltip: 'Amount', field: 'amount', type: "numericColumn" },
    {
      headerName: 'Show Journal', headerTooltip: 'Show Journal', field: 'show_journal', suppressMenu: true, resizable: false, headerClass: ['aggridtextalign-center'],
      cellClass: ['aggridtextalign-center'], cellStyle: { 'align-items': 'center' },
      cellRenderer: (params) => {
        if (params.data.show_journal == "") {
          let eDiv = document.createElement('div');
          let className = 'show-master-journalOUT' + params.node.rowIndex;
          eDiv.innerHTML = '<div id= ' + className + ' class=" toggle-grid-arrow" ></div>';
          var eButton = eDiv.querySelectorAll('#' + className).length > 0 ? eDiv.querySelectorAll('#' + className)[0] : null;
          if (eButton != null) {
            eButton.addEventListener('click', function (e) {
              if (eButton.classList.contains('rotate180'))
                eButton.classList.remove('rotate180');
              else
                eButton.classList.add('rotate180');
              params.onClick(params);
            });
          }
          return eDiv;
        }
      },
      cellRendererParams: {
        onClick: this.showMasterJournalOut.bind(this)
      }
    },
    {
      headerName: 'Show Calc.', headerTooltip: 'Show Calc.', field: 'show_calc', suppressMenu: true, resizable: false, headerClass: ['aggridtextalign-center'],
      cellClass: ['aggridtextalign-center'], cellStyle: { 'align-items': 'center' },
      cellRenderer: (params) => {
        if (params.data.show_calc == "") {
          let eDiv = document.createElement('div');
          let className = 'show-alloc-detailsOUT' + params.node.rowIndex;
          eDiv.innerHTML = '<div id= ' + className + ' class=" toggle-grid-arrow" ></div>';
          var eButton = eDiv.querySelectorAll('#' + className).length > 0 ? eDiv.querySelectorAll('#' + className)[0] : null;
          if (eButton != null) {
            eButton.addEventListener('click', function (e) {
              if (eButton.classList.contains('rotate180'))
                eButton.classList.remove('rotate180');
              else
                eButton.classList.add('rotate180');
              params.onClick(params);
            });
          }
          return eDiv;
        }
      },
      cellRendererParams: {
        onClick: this.showAlocationDetailsOut.bind(this)
      }
    },
  ];

  private columnDef_aggrid_transIn = [
    { headerName: 'Delivery No.', headerTooltip: 'Delivery No', field: 'delivery_no' },
    { headerName: 'Movement ID', headerTooltip: 'Movement ID', field: 'mov_id', cellClass: ['aggridlink'] },
    { headerName: 'COGS Tkt ID', headerTooltip: 'COGS Tkt ID', field: 'cogs_id', cellClass: ['aggridlink'] },
    { headerName: 'Mov Type', headerTooltip: 'Mov Type', field: 'mov_type' },
    { headerName: 'Category', headerTooltip: 'Category', field: 'category' },
    { headerName: 'COGS Grp/B2B Deal ID', headerTooltip: 'COGS Grp/B2B Deal ID', field: 'cogs_deal_id' },
    {
      headerName: 'Sort Order / Deliv#', headerTooltip: 'Sort Order / Deliv#', field: 'sort_del', cellClass: ['product-cell'],
      cellRendererFramework: AGGridCellMenuPopupComponent, cellRendererParams: { type: 'cell-hover-click-menu-popup', labels: [{ name: 'Sort Order', iconClass: 'edit-pen-icon' }], align: "left" }
    },
    { headerName: 'Quantity', headerTooltip: 'Quantity', field: 'quantity', type: "numericColumn" },
    { headerName: 'UOM', headerTooltip: 'UOM', field: 'uom' },
    { headerName: 'Per Unit COGS', headerTooltip: 'Per Unit COGS', field: 'per_unit' },
    { headerName: 'Amount', headerTooltip: 'Amount', field: 'amount', type: "numericColumn" },
    {
      headerName: 'Show Journal', headerTooltip: 'Show Journal', field: 'show_journal', suppressMenu: true, resizable: false, headerClass: ['aggridtextalign-center'],
      cellClass: ['aggridtextalign-center'], cellStyle: { 'align-items': 'center' },
      cellRenderer: (params) => {
        if (params.data.show_journal == "") {
          let eDiv = document.createElement('div');
          let className = 'show-master-journalIN' + params.node.rowIndex;
          eDiv.innerHTML = '<div id= ' + className + ' class=" toggle-grid-arrow" ></div>';
          var eButton = eDiv.querySelectorAll('#' + className).length > 0 ? eDiv.querySelectorAll('#' + className)[0] : null;
          if (eButton != null) {
            eButton.addEventListener('click', function (e) {
              if (eButton.classList.contains('rotate180'))
                eButton.classList.remove('rotate180');
              else
                eButton.classList.add('rotate180');
              params.onClick(params);
            });
          }
          return eDiv;
        }
      },
      cellRendererParams: {
        onClick: this.showMasterJournalIn.bind(this)
      }
    },
    {
      headerName: 'Show Calc.', headerTooltip: 'Show Calc.', field: 'show_calc', suppressMenu: true, resizable: false, headerClass: ['aggridtextalign-center'],
      cellClass: ['aggridtextalign-center'], cellStyle: { 'align-items': 'center' },
      cellRenderer: (params) => {
        if (params.data.show_calc == "") {
          let eDiv = document.createElement('div');
          let className = 'show-alloc-detailsIN' + params.node.rowIndex;
          eDiv.innerHTML = '<div id= ' + className + ' class=" toggle-grid-arrow" ></div>';
          var eButton = eDiv.querySelectorAll('#' + className).length > 0 ? eDiv.querySelectorAll('#' + className)[0] : null;
          if (eButton != null) {
            eButton.addEventListener('click', function (e) {
              if (eButton.classList.contains('rotate180'))
                eButton.classList.remove('rotate180');
              else
                eButton.classList.add('rotate180');
              params.onClick(params);
            });
          }
          return eDiv;
        }
      },
      cellRendererParams: {
        onClick: this.showAlocationDetailsIn.bind(this)
      }
    },

  ];

  private rowData_aggrid_transOut = [

    {
      delivery_no: '', mov_id: 'MV0001318', cogs_id: 'CG0091827', mov_type: 'INV OUT', category: '',
      cogs_deal_id: 'Math COGS FIFO', sort_del: '00001', quantity: '1000.0000', uom: 'GAL', per_unit: '1000.0000',
      amount: '-1000.0000', show_journal: '', show_calc: '', journalData: [
        {
          date: "05-Nov-2020",
          journalId: "JR0001",
          description: "",
          glAccount: "",
          debit: 1000.0000,
          credit: 0.00
        },
        {
          date: "05-Nov-2020",
          journalId: "JR0001",
          description: "",
          glAccount: "",
          debit: 0.00,
          credit: 1000.0000
        }
      ],
      allocationData: [
        {
          delivery_no: 'DEL0001319', mov_id: 'MV0001318', cogs_id: 'CG0091827', tkt_type: 'INV IN', category: '',
          cogs_deal_id: 'Math COGS FIFO', sort_del: '00001', quantity: '1000.0000', uom: 'GAL', per_unit: '1000.0000',
          amount: '-1000.0000', show_journal: '', show_calc: '', detailJournalData: [
            {
              date: "05-Nov-2020",
              journalId: "JR0001",
              description: "Ethanol",
              glAccount: "1829381",
              debit: 1000.0000,
              credit: 0.00
            },
            {
              date: "05-Nov-2020",
              journalId: "JR0001",
              description: "Purchase Contra",
              glAccount: "1829381",
              debit: 0.00,
              credit: 1000.0000
            }
          ],
          tradedetailsData: [
            {
              description: "Delivery Price",
              glAccount: "",
              quantity: 1000.0000,
              price: 1000.0000,
              amount: -1000.0000
            },
            {
              description: "Amount",
              glAccount: "",
              quantity: 1000.0000,
              price: 1000.0000,
              amount: -1000.0000
            }
          ]
        }
      ]
    }
  ];

  private rowData_aggrid_transIn = [

    {
      delivery_no: '', mov_id: 'MV0001318', cogs_id: 'CG0091827', mov_type: 'INV OUT', category: '',
      cogs_deal_id: 'Math COGS FIFO', sort_del: '00001', quantity: '1000.0000', uom: 'GAL', per_unit: '1000.0000',
      amount: '-1000.0000', show_journal: '', show_calc: '', journalData: [
        {
          date: "05-Nov-2020",
          journalId: "JR0001",
          description: "",
          glAccount: "",
          debit: 1000.0000,
          credit: 0.00
        },
        {
          date: "05-Nov-2020",
          journalId: "JR0001",
          description: "",
          glAccount: "",
          debit: 0.00,
          credit: 1000.0000
        }
      ],
      allocationData: [
        {
          delivery_no: 'DEL0001319', mov_id: 'MV0001318', cogs_id: 'CG0091827', tkt_type: 'INV IN', category: '',
          cogs_deal_id: 'Math COGS FIFO', sort_del: '00001', quantity: '1000.0000', uom: 'GAL', per_unit: '1000.0000',
          amount: '-1000.0000', show_journal: '', show_calc: '', detailJournalData: [
            {
              date: "05-Nov-2020",
              journalId: "JR0001",
              description: "Ethanol",
              glAccount: "1829381",
              debit: 1000.0000,
              credit: 0.00
            },
            {
              date: "05-Nov-2020",
              journalId: "JR0001",
              description: "Purchase Contra",
              glAccount: "1829381",
              debit: 0.00,
              credit: 1000.0000
            }
          ],
          tradedetailsData: [
            {
              description: "Delivery Price",
              glAccount: "",
              quantity: 1000.0000,
              price: 1000.0000,
              amount: -1000.0000
            },
            {
              description: "Amount",
              glAccount: "",
              quantity: 1000.0000,
              price: 1000.0000,
              amount: -1000.0000
            }
          ]
        }
      ]
    }
  ];

}
