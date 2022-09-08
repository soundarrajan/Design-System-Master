import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { Location } from '@angular/common';

@Component({
  selector: 'app-pl-details',
  templateUrl: './pl-details.component.html',
  styleUrls: ['./pl-details.component.css']
})
export class PlDetailsComponent implements OnInit {
  public gridOptions_pandl: GridOptions;
  public groupDefaultExpanded;
  constructor(private _location: Location) {
    this.groupDefaultExpanded = 1;
    this.gridOptions_pandl = <GridOptions>{
      masterDetail: true,
      //detailRowAutoHeight: true,
      defaultColDef: {
        resizable: true,
        filter: true,
        sortable: true
      },
      icons: {
        groupExpanded: '<img src="../../../assets/icon/collapse-dark.svg" style="width: 15px;margin-top:5px;margin-right:-15px;"/>',
        groupContracted: '<img src="../../../assets/icon/expand-dark.svg" style="width: 15px;margin-top:5px;margin-right:-15px;"/>'
      },
      columnDefs: this.columnDef_pandl,
      suppressRowClickSelection: true,
      suppressHorizontalScroll: true,
      headerHeight: 35,
      //rowHeight: 25,
      //detailRowHeight: 100,
      animateRows: true,
      detailCellRendererParams: {
        detailGridOptions: {
          headerHeight: 0,
          rowHeight: 25,
        //  / domLayout: 'autoHeight',
          animateRows: false,
          suppressHorizontalScroll: true,
          suppressRowClickSelection: true,
          columnDefs: [
            { headerName: '', headerTooltip: '', field: 'sales', cellClass: ['aggridtextalign-left']},
            { headerName: '', headerTooltip: '', field: 'amount', cellClass: ['aggridtextalign-right']},
            { headerName: '', headerTooltip: '', field: 'total', cellClass: ['aggridtextalign-right']},
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
          params.successCallback(params.data.sub_data);
        }
      },
      getRowClass: params => {
          var classArray:string[] =[];
          classArray.push('aggrid-evenrow-border-dark');
          let newClass= params.data.description==='Gross P&L'?'aggrid-left-ribbon dark':
                          'aggrid-left-ribbon-lightblue';
                          classArray.push(newClass);
          return classArray.length>0?classArray:null;
      }, 
      getRowHeight: function (params) {
        if (params.node && params.node.detail) {
          //add header height + an extra 5 for margin to the total calculated detail height
          var detailPanelHeight = (params.data.sub_data.length * 30);
          if(!(detailPanelHeight>200))
          //detailPanelHeight = 120;
          // if (params.data.sub_data.length > 5)
          //   var detailPanelHeight = (params.data.sub_data.length * 25) + 40;
          // else
          //   var detailPanelHeight = (params.data.sub_data.length * 25) + 200;
          return detailPanelHeight;
        }
        else return 25;
      },

      onGridReady: (params) => {
        this.gridOptions_pandl.api = params.api;
        this.gridOptions_pandl.columnApi = params.columnApi;
        this.gridOptions_pandl.api.setRowData(this.rowData_pandl);
        params.api.sizeColumnsToFit();
        params.api.setPinnedBottomRowData([
          { description: 'Gross P&L', valueamount: '', subtotal: '216,000 USD' }
        ]);
      },
    
      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 3 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          params.api.sizeColumnsToFit();
        }
      }
    }
  }

  ngOnInit() {
  }
  goBack() {
    this._location.back();
  }

  private columnDef_pandl = [
    { headerName: 'Description', headerTooltip: 'Description', field: 'description', cellRenderer: "agGroupCellRenderer", headerClass:['aggrid-text-align-l'] , width:475,suppressSizeToFit: true},
    { headerName: 'Value Amount', headerTooltip: 'Value Amount', field: 'valueamount', headerClass:['aggrid-text-align-r'], cellClass: ['aggridtextalign-right'], suppressSizeToFit: true ,width:475},
    { headerName: 'Sub Total', headerTooltip: 'Sub Total', field: 'subtotal', headerClass:['aggrid-text-align-r'], cellClass: ['aggridtextalign-right'] }
  ];

  private rowData_pandl = [
    {
      description: 'Physical Sales', valueamount: '', subtotal: '', sub_data:
        [{
          sales: 'Sales',
          amount: '112,000 USD',
          total: '',
        },
        {
          sales: 'Sales Accruals',
          amount: '12,000 USD',
          total: '',
        },
        {
          sales: 'Physical Sales Total',
          amount: '',
          total: '124,000 USD',
        }]
    },
    {
      description: 'Physical Purchase', valueamount: '', subtotal: '', sub_data:
      [{
        sales: 'Purchases',
        amount: '(12,000 USD)',
        total: '',
      },
      {
        sales: 'Purchase Accruals',
        amount: '(12,000 USD)',
        total: '',
      },
      {
        sales: 'Physical Purchase Total',
        amount: '',
        total: '(24,000 USD)',
      }]
    },
    {
      description: 'Direct Cost', valueamount: '', subtotal: '', sub_data:
        [{
          sales: 'Cost of Goods Sold',
          amount: '',
          total: '',
        },
        {
          sales: 'Direct Cost',
          amount: '(12,000 USD)',
          total: '',
        },
        {
          sales: 'Cost Accruals',
          amount: '(12,000 USD)',
          total: '',
        },
        {
          sales: 'Physical Purchase Total ',
          amount: '',
          total: '(24,000 USD)',
        }]
    },
    {
      description: 'Inventory MTM', valueamount: '', subtotal: '84,000 USD', sub_data: []
    },
    {
      description: 'Derivative Realised', valueamount: '', subtotal: '(76,000 USD)', sub_data: []
    },
    {
      description: 'Derivative MTM', valueamount: '', subtotal: '132,000 USD', sub_data: []
    }
  ]
}
