import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellActionsComponent } from '../../shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rollover-details',
  templateUrl: './rollover-details.component.html',
  styleUrls: ['./rollover-details.component.css']
})
export class RolloverDetailsComponent implements OnInit {

  public gridOptions_buy: GridOptions;
  public gridOptions_sell: GridOptions;
  public gridOptions_rollover: GridOptions;
  public sell_grid_container_width = 0;
  public buy_grid_container_width = 0;
  public rollover_grid_container_width = 0;
  public totalLots:number = 10;
  public sumLots:number;
  public showAdd:boolean;
  @ViewChild('addBtn', { static: false }) addBtn: ElementRef;
  @ViewChild('sellGridContainer', { static: false }) sellGridContainer: ElementRef;
  @ViewChild('buyGridContainer', { static: false }) buyGridContainer: ElementRef;
  @ViewChild('rolloverGridContainer', { static: false }) rolloverGridContainer: ElementRef;
  @Output() returnToList = new EventEmitter();
  constructor(private toastr: ToastrService) {
    this.gridOptions_buy = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_buy,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,

      onGridReady: (params) => {
        this.gridOptions_buy.api = params.api;
        this.gridOptions_buy.columnApi = params.columnApi;
        this.gridOptions_buy.api.sizeColumnsToFit();
        this.gridOptions_buy.api.setRowData(this.rowData_buy);
        this.lotsChange();
        this.addBuyTradeEventListener();
        
      },
      onColumnResized: (params) => {
        this.buy_grid_container_width = this.buyGridContainer.nativeElement.offsetWidth;
        let gridWidth = (params.columnApi.getColumn("price").getActualWidth() +
          params.columnApi.getColumn("company").getActualWidth() +
          params.columnApi.getColumn("lots").getActualWidth()) +
          params.columnApi.getColumn("book").getActualWidth() +
          params.columnApi.getColumn("contract").getActualWidth() +
          params.columnApi.getColumn("add").getActualWidth();
        if (gridWidth < this.buy_grid_container_width)
          if (params.columnApi.getAllDisplayedColumns().length <= 6 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
            params.api.sizeColumnsToFit();
          }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 6) {
          params.api.sizeColumnsToFit();

        }
      }
    }
    this.gridOptions_sell = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_sell,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,

      onGridReady: (params) => {
        this.gridOptions_sell.api = params.api;
        this.gridOptions_sell.columnApi = params.columnApi;
        this.gridOptions_sell.api.sizeColumnsToFit();
        this.gridOptions_sell.api.setRowData(this.rowData_sell);
        this.addSellTradeEventListener();
      },
      onColumnResized: (params) => {
        this.sell_grid_container_width = this.sellGridContainer.nativeElement.offsetWidth;
        let gridWidth = (params.columnApi.getColumn("price").getActualWidth() +
          params.columnApi.getColumn("company").getActualWidth() +
          params.columnApi.getColumn("lots").getActualWidth()) +
          params.columnApi.getColumn("book").getActualWidth() +
          params.columnApi.getColumn("contract").getActualWidth() +
          params.columnApi.getColumn("add").getActualWidth();
        if (gridWidth < this.sell_grid_container_width)
          if (params.columnApi.getAllDisplayedColumns().length <= 6 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
            params.api.sizeColumnsToFit();
          }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 9) {
          params.api.sizeColumnsToFit();

        }
      }
    }
    this.gridOptions_rollover = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_rollover,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,

      onGridReady: (params) => {
        this.gridOptions_rollover.api = params.api;
        this.gridOptions_rollover.columnApi = params.columnApi;
        this.gridOptions_rollover.api.sizeColumnsToFit();
        this.gridOptions_rollover.api.setRowData(this.rowData_rollover);
        this.addRolloverTradeEventListener();

      },
      onColumnResized: (params) => {
        this.rollover_grid_container_width = this.rolloverGridContainer.nativeElement.offsetWidth;
        let gridWidth = (params.columnApi.getColumn("price").getActualWidth() +
          params.columnApi.getColumn("company").getActualWidth() +
          params.columnApi.getColumn("lots").getActualWidth()) +
          params.columnApi.getColumn("book").getActualWidth() +
          params.columnApi.getColumn("contract").getActualWidth() +
          params.columnApi.getColumn("add").getActualWidth();
        if (gridWidth < this.rollover_grid_container_width)
          if (params.columnApi.getAllDisplayedColumns().length <= 6 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
            params.api.sizeColumnsToFit();
          }
      },
      onColumnVisible: (params) => {
        if (params.columnApi.getAllDisplayedColumns().length <= 6) {
          params.api.sizeColumnsToFit();

        }
      }
    }
  }

  ngOnInit(): void {   
  }

  addBuyTradeEventListener() {
    var addButtonElement = document.getElementsByClassName('add-btn1');
    addButtonElement[0].addEventListener('click', (event) => {
      this.gridOptions_buy.api.applyTransaction({
        add: [{
          type: 'add', price: '1.2', company: 'Testcomp', lots: '3', contract: 'Sept-20contract', book: 'T-Book'
        }]
      });
      
        this.lotsChange();
        
    });
     
  }
  addSellTradeEventListener() {
    let addButtonElement = document.getElementsByClassName('add-btn2');
    addButtonElement[0].addEventListener('click', (event) => {
      this.gridOptions_sell.api.applyTransaction({
        add: [{
          type: 'add', price: '', company: 'Testcomp', lots: '3', contract: 'Sept-20contract', book: 'T-Book'
        }]
      });
    });

  }
  addRolloverTradeEventListener() {
    let addButtonElement = document.getElementsByClassName('add-btn3');
    addButtonElement[0].addEventListener('click', (event) => {

      this.gridOptions_rollover.api.applyTransaction({
        add: [{
          type: 'add', price: '', company: 'Testcomp', lots: '7', contract: '', book: 'T-Book'
        }]
      });
    });

  }
  goBack() {
    this.returnToList.emit(false);
  }
  rolloverAction() {
    this.toastr.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">Trade rolled over successfully</div>',
      '', {
      enableHtml: true,
      toastClass: "toast-alert toast-light-green",
      timeOut: 2000
    });
    setTimeout(() => { this.returnToList.emit(true); }, 2000);

  }
  lotsChange(){
    let rowData = [];
    this.gridOptions_buy.api.forEachNode(node => rowData.push(node.data));
    const lotsArray = rowData.map(row => row['lots']);
    this.sumLots = lotsArray.reduce((acc, cur) => acc + Number(cur), 0)
    var addButtonElement = document.getElementsByClassName('add-btn1')[0] as HTMLElement;
    console.log(this.sumLots,this.totalLots);
    if(this.sumLots > this.totalLots){
       addButtonElement.style.display = "none";
     }else{
      addButtonElement.style.display = "block";
     }
    }
  private columnDef_buy = [
    {
      resizable: false,
      width: 30,
      field: 'add',
      suppressMenu: true,
      headerName: "",
      headerClass: ['aggridtextalign-center'],
      headerComponentParams: {
       template: `<span  unselectable="on">
             <div class="add-btn add-btn1"></div>
             <span ref="eMenu"></span>`
        },
      cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon',action : this.lotsChange.bind(this) }
    },
    {
      headerName: 'Contract', headerTooltip: 'Contract', field: 'contract', width: 130
    },
    {
      headerName: 'Lots', headerTooltip: 'Lots', field: 'lots', type: "numericColumn", width: 80
    },
    {
      headerName: 'Price', headerTooltip: 'Price', field: 'price', type: "numericColumn", width: 80
    },
    {
      headerName: 'Book', headerTooltip: 'Book', field: 'book', width: 120
    },
    { headerName: 'Company', headerTooltip: 'Company', field: 'company' }
  ];
  private columnDef_sell = [
    {
      resizable: false,
      width: 30,
      field: 'add',
      suppressMenu: true,
      headerName: "",
      headerClass: ['aggridtextalign-center'],
      headerComponentParams: {
        template: `<span  unselectable="on">
             <div class="add-btn add-btn2"></div>
             <span ref="eMenu"></span>`
      },
      cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
    },
    {
      headerName: 'Contract', headerTooltip: 'Contract', field: 'contract', width: 130
    },
    {
      headerName: 'Lots', headerTooltip: 'Lots', field: 'lots', type: "numericColumn", editable: true, width: 80,
      cellClass: params => {
        let classArray: string[] = ["aggridtextalign-right editable-cell cell-align"]
        if (params.data.type && params.data.type === 'add') {
          classArray.push('add-row-editable-cell')
        }
        return classArray.length > 0 ? classArray : null;
      }
    },
    {
      headerName: 'Price', headerTooltip: 'Price', field: 'price', type: "numericColumn", editable: true, width: 80,
      cellClass: params => {
        let classArray: string[] = ["aggridtextalign-right editable-cell cell-align"]
        if (params.data.type && params.data.type === 'add') {
          classArray.push('add-row-editable-cell')
        }
        return classArray.length > 0 ? classArray : null;
      }
    },
    {
      headerName: 'Book', headerTooltip: 'Book', field: 'book', width: 120
    },
    { headerName: 'Company', headerTooltip: 'Company', field: 'company' }
  ];
  private columnDef_rollover = [
    {
      resizable: false,
      width: 30,
      field: 'add',
      suppressMenu: true,
      headerName: "",
      headerClass: ['aggridtextalign-center'],
      headerComponentParams: {
        template: `<span  unselectable="on">
             <div class="add-btn add-btn3"></div>
             <span ref="eMenu"></span>`
      },
      cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
    },
    {
      headerName: 'Contract', headerTooltip: 'Contract', field: 'contract', editable: true, width: 130,
      cellClass: params => {
        let classArray: string[] = ["editable-cell"]
        if (params.data.type && params.data.type === 'add') {
          classArray.push('add-row-editable-cell')
        }
        return classArray.length > 0 ? classArray : null;
      }
    },
    {
      headerName: 'Lots', headerTooltip: 'Lots', field: 'lots', type: "numericColumn", editable: true, width: 80,
      cellClass: params => {
        let classArray: string[] = ["aggridtextalign-right editable-cell cell-align"]
        if (params.data.type && params.data.type === 'add') {
          classArray.push('add-row-editable-cell')
        }
        return classArray.length > 0 ? classArray : null;
      }
    },
    {
      headerName: 'Price', headerTooltip: 'Price', field: 'price', type: "numericColumn", editable: true, width: 80,
      cellClass: params => {
        let classArray: string[] = ["aggridtextalign-right editable-cell cell-align"]
        if (params.data.type && params.data.type === 'add') {
          classArray.push('add-row-editable-cell')
        }
        return classArray.length > 0 ? classArray : null;
      }
    },
    {
      headerName: 'Book', headerTooltip: 'Book', field: 'book', width: 120
    },
    { headerName: 'Company', headerTooltip: 'Company', field: 'company' }
  ];
  private rowData_buy = [

    {
      price: '1.2', company: 'Testcomp', lots: '3', contract: 'Sept-20contract', book: 'T-Book'
    },
    {
      price: '1.2', company: 'Testcomp', lots: '3', contract: 'Sept-20contract', book: 'T-Book'
    },
    {
      price: '1.2', company: 'Testcomp', lots: '3', contract: 'Sept-20contract', book: 'T-Book'
    }
  ]
  private rowData_sell = [

    {
      price: '1.2', company: 'Testcomp', lots: '2', contract: 'Sept-20contract', book: 'T-Book'
    },
    {
      price: '1.2', company: 'Testcomp', lots: '7', contract: 'Sept-20contract', book: 'T-Book'
    }
  ]
  private rowData_rollover = [

    {
      price: '1.4', company: 'Testcomp', lots: '7', contract: 'Sept-20contract', book: 'T-Book'
    }
  ]

}
