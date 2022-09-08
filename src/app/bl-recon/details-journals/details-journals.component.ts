import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AggridLinkComponent } from 'src/app/shared/ag-grid/ag-grid-link.component';

@Component({
  selector: 'app-details-journals',
  templateUrl: './details-journals.component.html',
  styleUrls: ['./details-journals.component.css']
})
export class DetailsJournalsComponent implements OnInit {
  showProgress: boolean = false;
  ngOnInit(): void {
    
  }
  cellChange(action){
    this.gridOptions_data.api.setRowData(this.rowData_aggrid3);
    //alert("");
    // this.columns.forEach((column, index) => {
    //   console.log(column,index);
    //   column.cellStyle = (index % 2 === 0 ? ' background: "red"' : ' background: "green"');
    //this.params.api.refreshCells();
  //   if(action == 'click'){
  //     return 'testt';
  // } else {
  //     return 'false';
  // }
  //console.log(this.gridOptions_data.columnDefs[3]);

  //this.params.api.refreshCells();

  //});
  }
  progress(): void {
    this.showProgress = true;
    setTimeout(() => {
      this.showProgress = false;
    },1000)
    setTimeout(() => {
      this.gridOptions_data.api.setRowData(this.rowData_aggrid4);
    },1000)

    //this.showProgress = false;
  }

  public gridOptions_data: GridOptions;
  public gridOptions_data2: GridOptions;
  
  constructor() {
    this.gridOptions_data = <GridOptions>{
      defaultColDef: {
        resizable: true
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
        this.gridOptions_data.api.setRowData(this.rowData_aggrid);
        // setTimeout(function() {
        this.gridOptions_data.api.sizeColumnsToFit();
        // window.addEventListener('resize', function () {
        //   setTimeout(function () {
        //     this.gridOptions_data.api.sizeColumnsToFit();
        //   });
        // });
         //}, 500);
        //alert("");
       // this.addCustomHeaderEventListener();
       

      },
      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 9 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          //params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 9) {
         params.api.sizeColumnsToFit();

        }
      }
    }
    this.gridOptions_data2 = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_aggrid2,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,

      onGridReady: (params) => {
        this.gridOptions_data2.api = params.api;
        this.gridOptions_data2.columnApi = params.columnApi;
        this.gridOptions_data2.api.setRowData(this.rowData_aggrid2);
        // setTimeout(function() {
        this.gridOptions_data2.api.sizeColumnsToFit();
        // window.addEventListener('resize', function () {
        //   setTimeout(function () {
        //     this.gridOptions_data.api.sizeColumnsToFit();
        //   });
        // });
         //}, 500);
        //alert("");
       // this.addCustomHeaderEventListener();
       

      },
      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 9 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          //params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 9) {
         params.api.sizeColumnsToFit();

        }
      }
    }
  }

  

  // addCustomHeaderEventListener() {
  //   let addButtonElement = document.getElementsByClassName('add-btn');
  //   addButtonElement[0].addEventListener('click', (event) => {
  //     this.gridOptions_data.api.applyTransaction({
  //       add: [{
  //         type: 'Flat', provider: 'Kinder Morgan', Row Number: 'USD', rate: '100', cost: 'Pay', name: 'Barging', id: "", uom: "GAL"
  //       }]
  //     });
  //   });

  // }

  private columnDef_aggrid = [
    
   
    { headerName: 'Journal ID', headerTooltip: 'Journal Id', type: "numericColumn", field: 'JournalId', suppressMenu: true},
    { headerName: 'Journal Date', headerTooltip: 'Journal Date', field: 'JournalDate', suppressMenu: true},
    { headerName: 'Company', headerTooltip: 'Company', field: 'Company', suppressMenu: true},
    { headerName: 'Status', headerTooltip: 'Status', field: 'Status', suppressMenu: true,
    cellRendererFramework:AGGridCellRendererComponent, headerClass:['aggrid-text-align-c'], cellClass: ['aggridtextalign-center'],
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center');
        let newClass= params.value==='Drafted'?'custom-chip medium-amber':
                      params.value==='Posted'?'custom-chip medium-green':
                      'custom-chip dark';
                      classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} }},
    { headerName: 'Journal Type', headerTooltip: 'Journal Type', field: 'JournalType', suppressMenu: true},
    { headerName: 'Is Integrated', headerTooltip: 'Is Integrated', field: 'IsIntegrated', suppressMenu: true},
    { headerName: 'Reversal Journal ID', headerTooltip: 'Reversal Journal ID', field: 'ReversalJournalID', suppressMenu: true,type: "numericColumn",cellClass:'aggridlink aggridtextalign-right'},
    
  ];
  private columnDef_aggrid2 = [
    
   
    { headerName: 'Journal Detail ID', headerTooltip: 'Journal Detail Id', type: "numericColumn", field: 'JournalDetailId'},
    { headerName: 'Trade ID', headerTooltip: 'Trade ID', type: "numericColumn",field: 'TradeID', cellClass:'aggridlink aggridtextalign-right'},
    { headerName: 'Delivery ID', headerTooltip: 'Delivery ID', type: "numericColumn",field: 'DeliveryId', cellClass:'aggridlink aggridtextalign-right'},
    { headerName: 'Movement ID', headerTooltip: 'Movement ID', type: "numericColumn",field: 'MovementId'},
    { headerName: 'Book', headerTooltip: 'Book', field: 'Book'},
    { headerName: 'Counterparty', headerTooltip: 'Counterparty', field: 'Counterparty'},
    { headerName: 'Product/Cost Name', headerTooltip: 'Product/Cost Name', field: 'ProductCostName'},
    { headerName: 'GL Code', headerTooltip: 'GL Code', type: "numericColumn",field: 'GLCode'},
    { headerName: 'Credit', headerTooltip: 'Credit', type: "numericColumn",field: 'Credit'},
    { headerName: 'Debit', headerTooltip: 'Debit', type: "numericColumn",field: 'Debit'},
    
  ];

  private rowData_aggrid = [

    {
      JournalId: '12345',  JournalDate:'10/03/2021', Company:'PDI North America', Status: 'Drafted', JournalType: 'Cost', IsIntegrated: 'Yes',ReversalJournalID:''
    },
    
    
  ]
  private rowData_aggrid3 = [

    {
      JournalId: '12345',  JournalDate:'10/03/2021', Company:'PDI North America', Status: 'Posted', JournalType: 'Cost', IsIntegrated: 'Yes',ReversalJournalID:''
    },
    
    
  ]

  private rowData_aggrid4 = [

    {
      JournalId: '12345',  JournalDate:'10/03/2021', Company:'PDI North America', Status: 'Posted', JournalType: 'Cost', IsIntegrated: 'Yes',ReversalJournalID:'123456'
    },
    
    
  ]

  private rowData_aggrid2 = [

    {
      JournalDetailId: '986546',  TradeID:'PB2100045', DeliveryId:'PB2100045', MovementId: 'NA', Book: 'ABCD', Counterparty: 'Chevron Products Company',ProductCostName:'Broker Fees',
      GLCode:'11002',Credit:'1000',Debit:''
    },
    {
      JournalDetailId: '986546',  TradeID:'PB2100045', DeliveryId:'PB2100045', MovementId: 'NA', Book: 'ABCD', Counterparty: 'Chevron Products Company',ProductCostName:'Broker Fees',
      GLCode:'11002',Credit:'',Debit:'1000'
    },
    
    
  ]

  
}

