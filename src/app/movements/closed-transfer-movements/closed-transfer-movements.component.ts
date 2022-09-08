import { Component, OnInit, Input } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { TechAvailableFiltersComponent } from 'src/app/shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-closed-transfer-movements',
  templateUrl: './closed-transfer-movements.component.html',
  styleUrls: ['./closed-transfer-movements.component.scss']
})
export class ClosedTransferMovementsComponent implements OnInit {

  @Input('headerCollapse') headerCollapse: boolean = false;
  public isdisplaydensityhigh: boolean = false;
  public disableBtn11: boolean = true;
  public saveBtn: boolean = true;
  ngOnInit() {

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
      rowMultiSelectWithClick: true,
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
        this.rowCount = this.gridOptions.api.getDisplayedRowCount();
      },
      getRowClass: (params) => {

        var classArray: string[] = [];
        classArray.push('aggrid-evenrow-border-dark');
        let newClass = params.data.invoice === 'Yes' ? 'aggrid-left-ribbon dark2' :
          params.data.invoice === 'No' ? 'aggrid-left-ribbon dark2' :
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
      onColumnPinned: function (params) {
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
      headerName: 'Movement ID', headerTooltip: 'Movement ID',
      field: 'movementid',
      cellRendererFramework: AGGridCellDataComponent,
      headerClass: 'p-l-0',
      cellClass: ['text-ellipsis product-cell'],
      pinned: 'left',
      width: 120,
      cellRendererParams: { type: 'cell-hover-click-menu-2av' }
    },

    { headerName: 'Opp.Mov.ID', headerTooltip: 'Opp.Mov.ID', field: 'oppmovid', cellClass: [], headerClass: 'p-l-0' },

    { headerName: 'Mov Type', headerTooltip: 'Mov Type', field: 'movtype', cellClass: ['', 'aggridtextalign-left'], headerClass: 'p-l-0' },
    { headerName: 'Product', field: 'product', headerClass: [' text-ellipsis', 'p-l-0'], headerTooltip: 'Product', cellClass: [''] },
    { headerName: 'Movement Date', headerTooltip: 'Movement Date', field: 'movementdate', headerClass: ['aggrid-text-align-c'], cellClass: [' aggridtextalign-center'] },
    { headerName: 'Tank', headerTooltip: 'Tank', field: 'tank', headerClass: 'p-l-0', cellClass: ['', 'aggridtextalign-left'] },
    { headerName: 'In-Tank Product', headerTooltip: 'In-Tank Product', headerClass: 'p-l-0', field: 'intankproduct', cellClass: [''] },
    { headerName: 'Mass Qty', headerTooltip: 'Mass Qty', field: 'massqty', type: "numericColumn", cellClass: [' aggridtextalign-right'] },
    { headerName: 'Mass UOM', headerTooltip: 'Mass UOM', field: 'massuom', headerClass: 'p-l-0', cellClass: [' aggridtextalign-left'] },
    { headerName: 'Volume Qty', headerTooltip: 'Volume Qty', field: 'volumeqty', type: "numericColumn", cellClass: [' aggridtextalign-right'] },
    { headerName: 'Volume UOM', headerTooltip: 'Volume UOM', field: 'volumeuom', headerClass: 'p-l-0', cellClass: [' aggridtextalign-left'] },
    { headerName: 'Gross Qty', headerTooltip: 'Gross Qty', field: 'volumeqty', type: "numericColumn", cellClass: [' aggridtextalign-right'] },
    { headerName: 'Gross UOM', headerTooltip: 'Gross UOM', field: 'volumeuom', headerClass: 'p-l-0', cellClass: [' aggridtextalign-left'] },
    { headerName: 'Reference No', headerTooltip: 'Reference No', field: 'referenceno', headerClass: 'p-l-0', cellClass: [' aggridtextalign-left'] },
    { headerName: 'Cl', headerTooltip: 'Cl', field: 'cl', cellClass: [' aggridtextalign-right'], type: "numericColumn" },
    { headerName: 'Blend.Ref.no', headerTooltip: 'Blend.Ref.No', field: 'blendrefno', headerClass: 'p-l-0', cellClass: [' aggridtextalign-left'] },
    { headerName: 'Source Document', headerTooltip: 'Source Document', field: 'sourcedocument', headerClass: 'p-l-0', cellClass: [' aggridtextalign-left'] },

  ];

  private rowData = [
    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },
    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },
    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },
    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },
    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },

    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
    },
    {
      movementid: 'MOV7264826', oppmovid: 'MOV7264826', movtype: 'Transfer In', product: 'Diesel Fuel', movementdate: '29 - Jan - 2020 17:32', tank: 'Tank1', intankproduct: 'Disel Fuel', massqty: '10000', massuom: 'BBlS', volumeqty: '10000', volumeuom: 'BBLS', referenceno: 'REF1123820876', cl: '01.00', blendrefno: 'BL683910', sourcedocument: 'BL'
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

