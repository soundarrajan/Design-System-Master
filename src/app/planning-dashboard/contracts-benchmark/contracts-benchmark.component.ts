import { Component, OnInit,Directive, ElementRef, HostListener,HostBinding,Input, Renderer2 } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { MatDialog } from '@angular/material/dialog';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';

@Component({
  selector: 'app-contracts-benchmark',
  templateUrl: './contracts-benchmark.component.html',
  styleUrls: ['./contracts-benchmark.component.scss']
})
export class ContractsBenchmarkComponent implements OnInit {
index = 0;
public allProduct: boolean = false;
public showAll: boolean = true;
public isdisplaydensityhigh:boolean = false;
public expandable: boolean = false;
public checked: boolean = true;
public allchecked: boolean = true;
//public BunkerName: string;
productFilters:any;
checkedList:any;
checkedList1:any;
masterSelected:boolean;

ngOnInit() {
}

// AG GRID
private gridApi;
public gridOptions: GridOptions;
private paginationPageSize:number;
public rowCount:Number;
constructor(public dialog: MatDialog,public renderer: Renderer2) { 
  this.gridOptions = <GridOptions>{      
    columnDefs: this.columnDefs,
    enableColResize: true,
    enableSorting: true,
    filter: true,
    // pagination: false,
    // paginationPageSize: this.paginationPageSize,
    animateRows:true,
    getRowHeight:(params) => {
      return this.isdisplaydensityhigh? 48:25
    },
    headerHeight:this.isdisplaydensityhigh? 60:35,
    groupHeaderHeight:this.isdisplaydensityhigh? 60:35,
    rowSelection: 'multiple',
    rowMultiSelectWithClick:true,
    //floatingFilter: true,
    defaultColDef: {
      filter: true,
      enableSorting: true,
  },
  //  onFirstDataRendered(params) {
  //   params.api.sizeColumnsToFit();
  //   //params.columnApi.autoSizeColumns();
  //   },
   
    onGridReady: (params) => {
      this.gridApi = params.api;
        this.gridOptions.api = params.api;
        this.gridOptions.columnApi = params.columnApi;
        // this.gridOptions.api.sizeColumnsToFit();
        //this.gridOptions.api.autoSizeColumns();
        this.gridOptions.enableColResize = true;
        this.gridOptions.api.setRowData(this.rowData);        
        this.rowCount = this.gridOptions.api.getDisplayedRowCount();  
        this.gridOptions.api.setPinnedBottomRowData(this.bottomrowData);
    },
    getRowClass:(params)=> {      
      var classArray:string[] =[]; 
      let newClass= params.data.status==='Active'?'aggrid-left-ribbon denim':
                        params.data.status==='InActive'?'aggrid-left-ribbon dark3':
                    'aggrid-left-ribbon dark4';
                    classArray.push(newClass);

        if (params.node.rowIndex % 2 === 0) {
          classArray.push('aggrid-evenrow-bg');
          classArray.push('aggrid-evenrow-border-dark');
        }
        else{
          classArray.push('aggrid-oddrow-bg');
          classArray.push('aggrid-evenrow-border-dark');
        }
            
      return classArray.length>0?classArray:null
    },
    // getRowStyle:(params)=> {
    //   if (params.node.rowIndex == 0) {
    //       return { 'border-top': '1px solid red' }
    //   }
    // },    
        onColumnResized: function(params) {
      if (params.columnApi.getAllDisplayedColumns().length <= 10 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged' ) {
          //params.api.sizeColumnsToFit();
      }
    },
    onColumnVisible: function(params) {
      if(params.columnApi.getAllDisplayedColumns().length <= 10)
        params.api.sizeColumnsToFit();
    },
  //   ongridSizeChanged: function(params) {
  //     console.log("grid resizedddddddddddd");
  //    params.api.sizeColumnsToFit();
  //    //params.columnApi.autoSizeColumns();
  //     this.gridOptions.api.sizeColumnsToFit();
  //  }
  };
  
  this.masterSelected = true;
  this.productFilters = [
    {
      BunkerName:"HSFO Bunkers",
      product: [
        { name:"IFO 180", isSelected: true},
        { name:"IFO 380", isSelected: true},
        { name:"500 CST", isSelected: true},
      ]
    },
    {
      BunkerName:"VLSFO Bunkers",
      product: [
        { name:"IMO 0.5% SULPHUR", isSelected: true},
      ]
    },
    {
      BunkerName:"ULSFO Bunkers",
      product: [
        { name:"ULSFO 0.1%", isSelected: true},
      ]
    },
    {
      BunkerName:"DOGO Bunkers",
      product: [
        { name:"MGO", isSelected: true},
        
        
      ]
    }
    
    ];
}

private columnDefs = [
  
  
  {headerName: 'Contract',headerTooltip:'Contract', field: 'supplier', cellClass: ['aggridlink dark-bg'], headerClass:['border-bottom-none'], width: 100 },
  {headerName: 'Supplier', field: 'supplier', cellClass: ['text-ellipsis dark-bg ml0'],headerClass:['text-ellipsis border-bottom-none'], headerTooltip : 'Supplier', width: 90},
  {headerName: 'Expiry Date', headerTooltip:'Expiry Date', field: 'date', cellClass: ['aggridtextalign-center text-ellipsis dark-bg ml0'],headerClass:['border-bottom-none text-ellipsis'], width: 130,
  cellRendererFramework:AGGridCellRendererComponent, cellRendererParams: {cellClass: ['custom-chip']}},
  {headerName: 'Type', field: 'type', cellClass: ['text-ellipsis dark-bg ml0'], headerClass:['border-bottom-none text-ellipsis'], headerTooltip : 'Type', width: 90,
  cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'type-popup'} 
  },
  {headerName: 'Product', headerTooltip:'Product', field: 'product', cellClass: ['text-ellipsis dark-shadow-left'],headerClass:['text-ellipsis'], width: 80},
  {headerName: 'Price', headerTooltip:'Price', field: 'price', cellClass: ['dark-shadow-box-left text-ellipsis'],headerClass:['text-ellipsis'], width: 95,
  cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'click-popup'} 
  },
  {headerName: '+/- Market', field: 'marketDiff', cellClass: ['dark-shadow-box-right  aggridtextalign-center text-ellipsis dark-red-text text-center'], headerClass:['aggrid-text-align-c text-ellipsis small-text'], headerTooltip : 'Market', width: 100 },
  {headerName: 'Contract Qty', headerTooltip:'Contract Qty', field: 'qty', cellClass: ['dark-shadow-box-left text-ellipsis'],headerClass:['text-ellipsis'], width: 102},
  {headerName: 'Available Qty', headerTooltip:'Available Qty', field: 'qty', cellClass: ['dark-shadow-box-right text-ellipsis'],headerClass:['text-ellipsis'], width: 120,
  cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'avail-qty-popup'}
}
  
  
];

private bottomrowData = [
  {
    supplier: '',product: '', rating: '',price: '',market:' ',qty:'',type:'',
  },

];

private rowData = [
{
  supplier: 'Cepsa Panama', date:'12/05/2019', type:'Fixed', product: 'IFO 180', market: '$484.95', price: '$484.95', 	contract:'$484.95', marketDiff: '$1.50',qty:'200,000 MT', status:'Active'
},
{
  supplier: 'Toyota America',  date:'12/05/2019', type:'Formula', product: 'IFO 380', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT', status:'InActive'
},
{
  supplier: 'Stem Fuels S.A',  date:'12/05/2019', type:'Fixed', product: 'IFO 180', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Shell New York',  date:'12/05/2019', type:'Formula', product: 'IFO 380', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Cepsa Panama', date:'12/05/2019', type:'Fixed', product: 'IFO 180', market: '$484.95', qty:'200,000 MT',price: '$484.95', 	contract:'-',marketDiff: '-',priceDiff: '-',status:'InActive'
},
{
  supplier: 'Toyota America',  date:'12/05/2019', type:'Formula', product: '500 CST', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Stem Fuels S.A',  date:'12/05/2019', type:'Fixed', product: '500 CST', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Shell New York',  date:'12/05/2019', type:'Formula', product: 'IMO 0.5% SULPHUR', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Cepsa Panama', date:'12/05/2019', type:'Fixed', product: '500 CST', market: '$484.95', qty:'200,000 MT',price: '$484.95', 	contract:'-',marketDiff: '-',priceDiff: '-',status:'InActive'
},
{
  supplier: 'Toyota America',  date:'12/05/2019', type:'Formula', product: 'IMO 0.5% SULPHUR', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Stem Fuels S.A',  date:'12/05/2019', type:'Fixed', product: 'MGO', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Shell New York',  date:'12/05/2019', type:'Formula', product: 'IMO 0.5% SULPHUR', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Cepsa Panama', date:'12/05/2019', type:'Fixed', product: 'IFO 180', market: '$484.95', qty:'200,000 MT', 	price: '$484.95', contract:'-',marketDiff: '-',priceDiff: '-',status:'InActive'
},
{
  supplier: 'Toyota America',  date:'12/05/2019', type:'Formula', product: 'ULSFO 0.1%', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Stem Fuels S.A',  date:'12/05/2019', type:'Fixed', product: 'MGO', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Shell New York',  date:'12/05/2019', type:'Formula', product: 'ULSFO 0.1%', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Toyota America',  date:'12/05/2019', type:'Fixed', product: 'IMO 0.5% SULPHUR', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Stem Fuels S.A',  date:'12/05/2019', type:'Formula', product: 'MGO', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Shell New York',  date:'12/05/2019', type:'Fixed', product: 'IMO 0.5% SULPHUR', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Cepsa Panama', date:'12/05/2019', type:'Formula', product: 'IFO 180', market: '$484.95', qty:'200,000 MT',price: '$484.95', 	contract:'-',marketDiff: '-',priceDiff: '-',status:'InActive'
},
{
  supplier: 'Toyota America',  date:'12/05/2019', type:'Fixed', product: 'ULSFO 0.1%', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Stem Fuels S.A',  date:'12/05/2019', type:'Formula', product: 'MGO', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Shell New York',  date:'12/05/2019', type:'Fixed', product: 'ULSFO 0.1%', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Cepsa Panama', date:'12/05/2019', type:'Fixed', product: 'IFO 180', market: '$484.95', price: '$484.95', 	contract:'$484.95', marketDiff: '$1.50',qty:'200,000 MT', status:'Active'
},
{
  supplier: 'Toyota America',  date:'12/05/2019', type:'Formula', product: 'IFO 380', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT', status:'InActive'
},
{
  supplier: 'Stem Fuels S.A',  date:'12/05/2019', type:'Fixed', product: 'IFO 180', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Shell New York',  date:'12/05/2019', type:'Formula', product: 'IFO 380', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Cepsa Panama', date:'12/05/2019', type:'Fixed', product: 'IFO 180', market: '$484.95', qty:'200,000 MT',price: '$484.95', 	contract:'-',marketDiff: '-',priceDiff: '-',status:'InActive'
},
{
  supplier: 'Toyota America',  date:'12/05/2019', type:'Formula', product: '500 CST', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Stem Fuels S.A',  date:'12/05/2019', type:'Fixed', product: '500 CST', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Shell New York',  date:'12/05/2019', type:'Formula', product: 'IMO 0.5% SULPHUR', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Cepsa Panama', date:'12/05/2019', type:'Fixed', product: '500 CST', market: '$484.95', qty:'200,000 MT',price: '$484.95', 	contract:'-',marketDiff: '-',priceDiff: '-',status:'InActive'
},
{
  supplier: 'Toyota America',  date:'12/05/2019', type:'Formula', product: 'IMO 0.5% SULPHUR', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Stem Fuels S.A',  date:'12/05/2019', type:'Fixed', product: 'MGO', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Shell New York',  date:'12/05/2019', type:'Formula', product: 'IMO 0.5% SULPHUR', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Cepsa Panama', date:'12/05/2019', type:'Fixed', product: 'IFO 180', market: '$484.95', qty:'200,000 MT', 	price: '$484.95', contract:'-',marketDiff: '-',priceDiff: '-',status:'InActive'
},
{
  supplier: 'Toyota America',  date:'12/05/2019', type:'Formula', product: 'ULSFO 0.1%', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Stem Fuels S.A',  date:'12/05/2019', type:'Fixed', product: 'MGO', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Shell New York',  date:'12/05/2019', type:'Formula', product: 'ULSFO 0.1%', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Toyota America',  date:'12/05/2019', type:'Fixed', product: 'IMO 0.5% SULPHUR', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Stem Fuels S.A',  date:'12/05/2019', type:'Formula', product: 'MGO', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Shell New York',  date:'12/05/2019', type:'Fixed', product: 'IMO 0.5% SULPHUR', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Cepsa Panama', date:'12/05/2019', type:'Formula', product: 'IFO 180', market: '$484.95', qty:'200,000 MT',price: '$484.95', 	contract:'-',marketDiff: '-',priceDiff: '-',status:'InActive'
},
{
  supplier: 'Toyota America',  date:'12/05/2019', type:'Fixed', product: 'ULSFO 0.1%', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Stem Fuels S.A',  date:'12/05/2019', type:'Formula', product: 'MGO', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},
{
  supplier: 'Shell New York',  date:'12/05/2019', type:'Fixed', product: 'ULSFO 0.1%', market: '$484.95', price: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',qty:'200,000 MT',status:'InActive'
},


];


public checkUncheckAll() {
this.masterSelected=!this.masterSelected;
this.productFilters.forEach( (element) => {
    element.product.forEach((product)=>{        
    product.isSelected =this.masterSelected;
  })
})
if(this.masterSelected){
  var clearFilterComponent = this.gridApi.getFilterInstance("product");
  clearFilterComponent.setModel(null);
  this.gridApi.onFilterChanged();
}
else{
  let emptyProduct = [];
  var productFilterComponent = this.gridApi.getFilterInstance("product");
  productFilterComponent.selectNothing();
  var model = emptyProduct;
  productFilterComponent.setModel(model);
  this.gridApi.onFilterChanged();
}
}

public clickAllCheckbox(event){
  this.checkUncheckAll();
  event.stopPropagation();
}


public isAllSelected(productList) {
productList.isSelected=!productList.isSelected;
// this.masterSelected =productList.isSelected;
  let isSelectedgroups = [];
   this.productFilters.forEach( (element) => {
    isSelectedgroups.push(element.product.every(function(item:any) {
      return item.isSelected == true;
    }));
  });
  this.masterSelected = isSelectedgroups.every(function(item:any) {
    return item == true;
  });
  
// grid filter
let selectedProducts = [];  
this.productFilters.forEach( (element) => {
  element.product.forEach((product)=>{  
    if(product.isSelected){
    selectedProducts.push(product.name);
    }
  })    
});

//console.log(selectedProducts);

var productFilterComponent = this.gridApi.getFilterInstance("product");
productFilterComponent.selectNothing();
var model = selectedProducts;
productFilterComponent.setModel(model);
this.gridApi.onFilterChanged();



}

public clickCheckbox(event,productList){
  this.isAllSelected(productList);
  event.stopPropagation();
}

public expand(){
this.expandable = !this.expandable;
}

}