import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellEditableComponent } from '../../shared/designsystem-v2/ag-grid/ag-grid-cell-editable.component';
import { AGGridCellActionsComponent } from '../../shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { AGGridCellDataComponent } from '../../shared/ag-grid/ag-grid-celldata.component';
//import { EventEmitter } from '../../../../node_modules/protractor';


@Component({
  selector: 'app-movements-manual-match',
  templateUrl: './movements-manual-match.component.html',
  styleUrls: ['./movements-manual-match.component.css']
})
export class MovementsManualMatchComponent implements OnInit {

  public gridOptions_data: GridOptions;
  public gridOptions_add_movements: GridOptions;
  public isCollapsed: boolean = false;
  public isChecked:boolean = false;
  public isOpen: boolean = true;
  public isSaved: boolean = true;

  @ViewChild('addBtn', { static: false }) addBtn: ElementRef;
  @Output() onAddMovemntClick = new EventEmitter();
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.isOpen = !this.isOpen;
    this.isSaved = true;
  }

  saveMovements() {
    //alert("");
    this.isCollapsed = false;
    this.isOpen = true;
  }

  onRowSelected(event) {
    if(event.node.selected){
      this.isChecked = true;
    }else{
      this.isChecked = false;
    }
  }

  constructor() {
    this.gridOptions_data = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_aggrid,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,

      onGridReady: (params) => {
        this.gridOptions_data.api = params.api;
        this.gridOptions_data.columnApi = params.columnApi;
        this.gridOptions_data.api.sizeColumnsToFit();
        this.gridOptions_data.api.setRowData(this.rowData_aggrid);
        this.gridOptions_data.api.setPinnedBottomRowData(this.totalrowData);
        this.addCustomHeaderEventListener();
        //console.log("ssssssssss");
        //console.log(this.gridOptions_data.api.getLastDisplayedRow());

      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 11 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 11) {
          params.api.sizeColumnsToFit();

        }
      }
    }
    this.gridOptions_add_movements = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_aggrid_add_mov,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,
      rowSelection: 'multiple',
      onGridReady: (params) => {
        this.gridOptions_add_movements.api = params.api;
        this.gridOptions_add_movements.columnApi = params.columnApi;
        this.gridOptions_add_movements.api.sizeColumnsToFit();
        this.gridOptions_add_movements.api.setRowData(this.rowData_aggrid_add_mov);
        //this.gridOptions_data.api.setPinnedBottomRowData(this.totalrowData);
        //this.addCustomHeaderEventListener();
        //console.log("ssssssssss");
        //console.log(this.gridOptions_data.api.getLastDisplayedRow());

      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 9 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 9) {
          params.api.sizeColumnsToFit();

        }
      }
    }
  }

  ngOnInit(): void {
  }

  addCustomHeaderEventListener() {
    let addButtonElement = document.getElementsByClassName('add-btn');
    addButtonElement[0].addEventListener('click', (event) => {
      this.gridOptions_data.api.applyTransaction({
        add: [{
          del_no: 'PHB200251-3988', mov_id: 'MOV0001521', cogs_id: 'CG00141521', ref_no: '', mov_date: '12-01-2021    13:00', mov_qty: '1,000.0000 GAL', allocate_qty: "1,000.0000 GAL", allocate_qty_cogs: "1,000.0000 GAL", cogs_unit: "4.0", cogs_value: "800.0000"
        }]
      });
    });

  }

  onAddSelected() {
    //alert("");
    var selectedData = this.gridOptions_add_movements.api.getSelectedRows();
    //console.log("eeeeeeeeeeee");
    console.log(selectedData);
    this.gridOptions_add_movements.api.applyTransaction({ remove: selectedData });
    // this.gridOptions_data.api.applyTransaction({
    //   add: [{
    //     del_no: selectedData[0].del_no , mov_id: selectedData[0].mov_id, cogs_id: selectedData[0].cogs_id, 
    //     ref_no: selectedData[0].ref_no, mov_date: selectedData[0].mov_date, mov_qty: selectedData[0].mov_qty, 
    //     allocate_qty: selectedData[0].allocate_qty, allocate_qty_cogs: selectedData[0].allocate_qty_cogs,cogs_unit: selectedData[0].cogs_unit,
    //     cogs_value: selectedData[0].cogs_value
    //   }]
    // });
    this.gridOptions_data.api.applyTransaction({ add: selectedData });
    this.onAddMovemntClick.emit();
  }

  private columnDef_aggrid = [
    {
      resizable: false,
      width: 30,
      suppressMenu: true,
      headerName: "",
      headerClass: ['aggridtextalign-center'],
      headerComponentParams: {
        template: `<span  unselectable="on">
             <div class="add-btn"></div>
             <span ref="eMenu"></span>`
      },
      cellClass: ['aggridtextalign-left', 'custom-last-row'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
    },
    { headerName: 'Delivery Sch No', headerTooltip: 'Delivery Sch No', field: 'del_no', cellClass: ['aggridlink', 'custom-last-row'], },
    { headerName: 'Movement ID', headerTooltip: 'Movement ID', field: 'mov_id', cellClass: ['aggridlink'] },
    { headerName: 'COGS Tkt ID', headerTooltip: 'COGS Tkt ID', field: 'cogs_id', cellClass: [''] },
    { headerName: 'Reference No.', headerTooltip: 'Reference No.', field: 'ref_no', cellClass: [''] },
    { headerName: 'Counterparty', hide: true, headerTooltip: 'Counterparty', field: 'counterparty', cellClass: ['', 'aggridlink'] },
    { headerName: 'Movement Date', headerTooltip: 'Movement Date', field: 'mov_date', cellClass: [''] },
    { headerName: 'Movement Qty (GAL)', headerTooltip: 'Movement Qty (GAL)', field: 'mov_qty', type: "numericColumn",cellClass: ['custom-cell'] },
    { headerName: 'Allocated Qty (GAL)', headerTooltip: 'Allocated Qty (GAL)', field: 'allocate_qty', cellClass: [' editable-cell', 'custom-last-row', 'ag-right-aligned-cell'], type: "numericColumn" },
    { headerName: 'Allocated Qty in COGS UOM (GAL)', headerTooltip: 'Allocated Qty in COGS UOM (GAL', field: 'allocate_qty_cogs', type: "numericColumn", cellClass: ['custom-last-row ag-right-aligned-cell'] },
    { headerName: 'COGS Per Unit (USD)', headerTooltip: 'COGS Per Unit (USD)', field: 'cogs_unit', type: "numericColumn" },
    {
      headerName: 'COGS Value (USD)', headerTooltip: 'COGS Value (USD)', field: 'cogs_value', cellClass: ['product-cell', 'custom-last-row'], type: "numericColumn",
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'cell-hover-click-menu-popup' }
    },
  ];

  private rowData_aggrid = [

    {
      del_no: 'PHB200251-3986', mov_id: 'MOV0001521', counterparty: 'Shell Trading', cogs_id: 'CG00141521', ref_no: '', mov_date: '12-01-2021    13:00', mov_qty: '1,000.0000 GAL', allocate_qty: "1,000.0000 GAL", allocate_qty_cogs: "1,000.0000 GAL", cogs_unit: "4.0", cogs_value: "800.0000"
    },
    {
      del_no: 'PHB200251-3987', mov_id: 'MOV0001521', counterparty: 'Shell Trading', cogs_id: 'CG00141521', ref_no: '', mov_date: '12-01-2021    13:00', mov_qty: '1,000.0000 GAL', allocate_qty: "1,000.0000 GAL", allocate_qty_cogs: "1,000.0000 GAL", cogs_unit: "4.0", cogs_value: "800.0000"
    }
  ]

  private columnDef_aggrid_add_mov = [
    {
      resizable: false,
      width: 30,
      suppressMenu: true,
      headerName: "",
      headerClass: ['aggridtextalign-center'],
      checkboxSelection: true,
      cellClass: ['aggridtextalign-center', 'small-checkbox'],
      //cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
    },
    { headerName: 'Delivery Sch No', headerTooltip: 'Delivery Sch No', field: 'del_no', cellClass: ['aggridlink', 'custom-last-row'], },
    { headerName: 'Movement ID', headerTooltip: 'Movement ID', field: 'mov_id', cellClass: ['aggridlink'] },
    { headerName: 'COGS Tkt ID', headerTooltip: 'COGS Tkt ID', field: 'cogs_id' },
    { headerName: 'Ref No.', headerTooltip: 'Ref No.', field: 'ref_no' },
    { headerName: 'Counterparty', headerTooltip: 'Counterparty', field: 'counterparty', cellClass: ['', 'aggridlink'] },
    { headerName: 'Movement Date', headerTooltip: 'Movement Date', field: 'mov_date' },
    { headerName: 'Available Qty (GAL)', headerTooltip: 'Available Qty (GAL)', field: 'mov_qty', type: "numericColumn" },
    { headerName: 'Allocated Qty (GAL)', headerTooltip: 'Allocated Qty (GAL)', field: 'allocate_qty', type: "numericColumn" },
    { headerName: 'Allocated Qty in COGS UOM (GAL)', headerTooltip: 'Allocated Qty in COGS UOM (GAL', field: 'allocate_qty_cogs', type: "numericColumn" },
    { headerName: 'Pur/Mov Cost (USD)', headerTooltip: 'Pur/Mov Cost (USD)', field: 'cogs_unit', type: "numericColumn" },
    { headerName: 'COGS Value (USD)', headerTooltip: 'COGS Value (USD)', field: 'cogs_value', type: "numericColumn" },
  ];

  private rowData_aggrid_add_mov = [

    {
      del_no: 'PHB200251-3986', mov_id: 'MOV0001521', counterparty: 'Shell Trading', cogs_id: 'CG00141521', ref_no: '', mov_date: '12-01-2021    13:00', mov_qty: '1,000.0000 GAL', allocate_qty: "1,000.0000 GAL", allocate_qty_cogs: "1,000.0000 GAL", cogs_unit: "4.0", cogs_value: "800.0000"
    },
    {
      del_no: 'PHB200251-3986', mov_id: 'MOV0001521', counterparty: 'Shell Trading', cogs_id: 'CG00141522', ref_no: '', mov_date: '12-01-2021    13:00', mov_qty: '1,000.0000 GAL', allocate_qty: "1,000.0000 GAL", allocate_qty_cogs: "1,000.0000 GAL", cogs_unit: "4.0", cogs_value: "800.0000"
    },
  ]

  private totalrowData = [
    {
      del_no: '', mov_id: '', cogs_id: '', ref_no: '', mov_date: '', mov_qty: 'Total', allocate_qty: "2,000.0000 GAL", allocate_qty_cogs: "2,000.0000 GAL", cogs_unit: "", cogs_value: ""
    },
    {
      del_no: '', mov_id: '', cogs_id: '', ref_no: '', mov_date: '', mov_qty: 'Difference Qty', allocate_qty: "0.0098 GAL", allocate_qty_cogs: "", cogs_unit: "", cogs_value: ""
    },

  ];
}
