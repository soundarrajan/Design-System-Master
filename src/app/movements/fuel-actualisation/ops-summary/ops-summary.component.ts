import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { AGGridCellActionsComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { AGGridCellEditableComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-editable.component';
import { AGGridCellMenuPopupComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-menu.component';

@Component({
  selector: 'app-ops-summary',
  templateUrl: './ops-summary.component.html',
  styleUrls: ['./ops-summary.component.css']
})
export class OpsSummaryComponent implements OnInit {

  public gridOptions_ops: GridOptions;
  @ViewChild('addBtn', { static: false }) addBtn: ElementRef;

  constructor() {
    this.gridOptions_ops = <GridOptions>{
      masterDetail: true,
      defaultColDef: {
        resizable: true,
        filter: true,
        sortable: true
      },
      icons: {
        groupExpanded: '<img src="../../../assets/icon/collapseIcon.svg" style="width: 15px;margin-top:5px;"/>',
        groupContracted: '<img src="../../../assets/icon/expandIcon.svg" style="width: 15px;margin-top:5px;"/>'
      },
      columnDefs: this.columnDef_ops,
      suppressRowClickSelection: true,
      suppressHorizontalScroll: true,
      headerHeight: 35,
      animateRows: true,
      detailCellRendererParams: {
        detailGridOptions: {
          headerHeight: 35,
          rowHeight: 35,
          animateRows: false,
          suppressHorizontalScroll: true,
          suppressRowClickSelection: true,
          columnDefs: [
            {
              resizable: true,
              width: 30,
              suppressMenu: true,
              headerName: "",
              headerClass: ['aggridtextalign-center'],
              headerComponentParams: {
                template: `<span  unselectable="on">
                     <div class="add-btn"></div>
                     <span ref="eMenu"></span>`
              },
              cellClass: ['aggridtextalign-left'],
              cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
            },
            { headerName: 'Source', width: 90, headerTooltip: 'Source', field: 'source' },
            {
              headerName: 'Source Document', editable: true, headerTooltip: 'Source Document', field: 'source_document', cellClass: ['editable-cell'],
              cellRendererFramework: AGGridCellEditableComponent, cellRendererParams: { type: 'cell-edit-dropdown', label: 'source_document', items: ['BL'] }
            },
            { headerName: 'Overwrite Mass/Vol Qty', headerTooltip: 'Overwrite Mass/Vol Qty', field: 'mv_qty', cellClass: ['aggrid-text-align-c'], headerClass: ['aggridtextalign-center'], cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'checkbox-selection' } },
            { headerName: 'Mass Qty and UOM', width: 250, headerTooltip: 'Mass Qty and UOM', field: 'mass_uom', type: "numericColumn", cellRendererFramework: AGGridCellEditableComponent, cellRendererParams: { type: 'cell-edit-value-autocomplete', label: 'uom' } },
            { headerName: 'Volume Qty and UOM', width: 250, headerTooltip: 'Volume Qty and UOM', field: 'volume_uom', type: "numericColumn", cellRendererFramework: AGGridCellEditableComponent, cellRendererParams: { type: 'cell-edit-value-autocomplete', label: 'uom' } },
            {
              headerName: 'Spec', width: 220, headerTooltip: 'Spec', field: 'spec', cellClass: ['aggridtextalign-left editable-cell cell-align product-cell'],
              cellRendererFramework: AGGridCellMenuPopupComponent, cellRendererParams: { type: 'cell-hover-click-menu-popup', labels: [{ name: 'Spec Group' }], align: "left" }
            },
            // {
            //   headerName: 'Spec', width: 220, headerTooltip: 'Spec', field: 'spec', cellClass: ['aggridtextalign-left editable-cell cell-align'],
            //   cellRendererFramework: AGGridCellEditableComponent, cellRendererParams: { type: 'cell-edit-autocomplete-withpopup', label: 'spec-group' }
            // },
            { headerName: 'Binding Qty', width: 90, headerTooltip: 'Binding Qty', field: 'binding_qty', cellClass: ['aggrid-text-align-c'], headerClass: ['aggridtextalign-center'], cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'radio-button-selection' } }

          ],
          defaultColDef: {
            flex: 1,
            sortable: true,
            resizable: true,
            filter: true,
          },
          onFirstDataRendered(params) {
            params.api.sizeColumnsToFit();
          },
          onGridReady: (params) => {
            this.addCustomHeaderEventListener(params);
          },
          onColumnResized: function (params) {
            if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
              params.api.sizeColumnsToFit();
            }
          }
        },
        getDetailRowData: function (params) {
          params.successCallback(params.data.sub_data);
        }
      },
      getRowHeight: function (params) {
        if (params.node && params.node.detail) {
          var detailPanelHeight = (params.data.sub_data.length * 35) + 40;
          if (!(detailPanelHeight > 200))
            detailPanelHeight = 175;
          return detailPanelHeight;
        }
        else return 35;
      },

      onGridReady: (params) => {
        this.gridOptions_ops.api = params.api;
        this.gridOptions_ops.columnApi = params.columnApi;
        this.gridOptions_ops.api.setRowData(this.rowData_ops);
        params.api.sizeColumnsToFit();
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      }
    }
  }

  ngOnInit() {
  }

  addCustomHeaderEventListener(params) {
    let addButtonElement = document.getElementsByClassName('add-btn');
    addButtonElement[0].addEventListener('click', (event) => {
      params.api.applyTransaction({
        add: [{
          source: '4950', source_document: 'BL', mv_qty: '', mass_uom: '1,000.0000', volume_uom: '1,000.0000', spec: 'Default Spec Group', binding_qty: ''
        }]
      });
    });

  }

  private columnDef_ops = [
    { headerName: 'Line ID', headerTooltip: 'Line ID', field: 'line_id', cellRenderer: "agGroupCellRenderer", width: 100 },
    { headerName: 'Order Product', headerTooltip: 'Order Product', field: 'order_product', width: 175 },
    { headerName: 'Executed Qty', headerTooltip: 'Executed Qty', field: 'executed_qty', type: "numericColumn", width: 210 },
    { headerName: 'Document Qty', headerTooltip: 'Document Qty', field: 'document_qty', type: "numericColumn", width: 210 },
    { headerName: 'Per Unit Price', headerTooltip: 'Per Unit Price', field: 'per_unit_price', type: "numericColumn", width: 210 },
    {
      headerName: 'Operational Amount', headerTooltip: 'Operational Amount', field: 'operational_amount', type: "numericColumn", cellClass: ['aggridtextalign-right product-cell'],
      cellRendererFramework: AGGridCellMenuPopupComponent, cellRendererParams: { type: 'cell-hover-click-menu-popup', labels: [{ name: 'Costing Details' }], align: "right" }
    },
    { headerName: 'UOM', headerTooltip: 'UOM', field: 'uom', width: 120 },
    { headerName: 'Currency', headerTooltip: 'Currency', field: 'currency', width: 125 }
  ];

  private rowData_ops = [
    {
      line_id: '4950', order_product: 'Ethanol', executed_qty: '1,000.6200', document_qty: '1,000.6200', per_unit_price: '1,000.0000', operational_amount: '1,000.0000', uom: 'GAL', currency: 'USD', sub_data:
        [{
          source: '4950', source_document: 'BL', mv_qty: '', mass_uom: '1,000.0000', volume_uom: '1,000.0000', spec: 'Default Spec Group', binding_qty: ''
        }]
    },
    {
      line_id: '4950', order_product: 'Ethanol', executed_qty: '1,000.6200', document_qty: '1,000.6200', per_unit_price: '1,000.0000', operational_amount: '1,000.0000', uom: 'GAL', currency: 'USD', sub_data:
        [{
          source: '4950', source_document: 'BL', mv_qty: '', mass_uom: '1,000.0000', volume_uom: '1,000.0000', spec: 'Default Spec Group', binding_qty: ''
        }]
    }

  ]

}
