import { Component, OnInit,Directive, ElementRef, HostListener,HostBinding,Input, Renderer2 } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { MatDialog } from '@angular/material/dialog';
import { AGGridCellRendererComponent } from 'src/app/shared/ag-grid/ag-grid-cell-renderer.component';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';


@Component({
  selector: 'app-supplier-info',
  templateUrl: './supplier-info.component.html',
  styleUrls: ['./supplier-info.component.scss']
})
export class SupplierInfoComponent implements OnInit {
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
    
    
    {headerName: 'Supplier',headerTooltip:'Supplier', field: 'supplier', cellClass: ['aggridlink dark-bg'], headerClass:['border-bottom-none'], width: 130 },
    {headerName: 'Rating', field: 'rating', cellClass: ['aggridtextalign-center dark-bg ml0'],headerClass:['border-bottom-none'], headerTooltip : 'Rating', width: 110,cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'rating-star'}},
    {headerName: 'Product', headerTooltip:'Product', field: 'product', cellClass: ['text-ellipsis dark-shadow-left'],headerClass:['text-ellipsis'], width: 110},
    {headerName: 'Market', field: 'market', cellClass: ['aggridtextalign-center text-ellipsis dark-shadow dark-bg-black'], headerClass:[' text-ellipsis aggrid-text-align-c'], headerTooltip : 'Market', width: 130 ,
    cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'mp-provider'}},
    {headerName: 'Spot', field: 'spot', cellClass: ['aggridtextalign-center text-ellipsis dark-shadow-box'], headerClass:[' text-ellipsis aggrid-text-align-c'], headerTooltip : 'Spot', width: 110 ,
    cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'notify-popup'}
  
  },
    {headerName: 'Contract', field: 'contract',headerClass:['aggrid-text-align-c text-ellipsis'],cellClass: ['aggridtextalign-center text-ellipsis dark-shadow-box-left'],  headerTooltip : 'Contract', width: 110 ,
    cellRendererParams: function(params) { 
      var classArray:string[] =[]; 
        classArray.push('aggridtextalign-center text-ellipsis dark');
        // let newClass= params.data.status==='Active'?'cell-chip light':
        //               params.data.status==='Inactive'?'cell-chip dark':
        //               'cell-chip light';
        //               classArray.push(newClass);
        return {cellClass: classArray.length>0?classArray:null} },
        cellRendererFramework:AGGridCellRendererComponent,

        //cellRendererFramework:AGGridCellDataComponent, cellRendererParams: {type:'box-chip'}
        
    //     cellClass: function(params) { 
    //       var classArray:string[] =[];
    //       classArray.push('aggridtextalign-center text-ellipsis'); 
    //         let newClass= params.data.status==='Active'?'cell-chip dark':
    //                       'cell-chip light';
    //                       classArray.push(newClass);
    //         return classArray.length>0?classArray:null },
  
     },
    {headerName: '+/- Market', field: 'marketDiff', cellClass: ['aggridtextalign-center text-center text-ellipsis dark-red-text'], headerClass:['aggridtextalign-center text-ellipsis small-text'], headerTooltip : 'Market', width: 100 },
    {headerName: '+/- Spot', field: 'spotDiff',cellClass: ['green-text2 text-center aggridtextalign-center text-ellipsis dark-shadow-box-right'],  headerClass:['aggrid-text-align-c text-ellipsis small-text'], headerTooltip : 'Spot', width: 115}
  ];

  private bottomrowData = [
    {
      supplier: '',product: '', rating: '',spot: '',market:' '
    },

  ];

private rowData = [
  {
    supplier: 'Cepsa Panama', rating: '4', product: 'IFO 180', market: '$484.95', spot: '$484.95', 	contract:'$484.95', marketDiff: '$1.50',spotDiff: '$1.50', status:'Active'
  },
  {
    supplier: 'Toyota America',  rating: '3', product: 'IFO 380', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50', status:'InActive'
  },
  {
    supplier: 'Stem Fuels S.A',  rating: '2', product: 'IFO 180', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Shell New York',  rating: '1', product: 'IFO 380', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Cepsa Panama', rating: '4', product: 'IFO 180', market: '$484.95', spot: '-', 	contract:'-',marketDiff: '-',spotDiff: '-',status:'InActive'
  },
  {
    supplier: 'Toyota America',  rating: '3', product: '500 CST', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Stem Fuels S.A',  rating: '2', product: '500 CST', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Shell New York',  rating: '1', product: 'IMO 0.5% SULPHUR', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Cepsa Panama', rating: '4', product: '500 CST', market: '$484.95', spot: '-', 	contract:'-',marketDiff: '-',spotDiff: '-',status:'InActive'
  },
  {
    supplier: 'Toyota America',  rating: '3', product: 'IMO 0.5% SULPHUR', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Stem Fuels S.A',  rating: '2', product: 'MGO', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Shell New York',  rating: '1', product: 'IMO 0.5% SULPHUR', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Cepsa Panama', rating: '4', product: 'IFO 180', market: '$484.95', spot: '-', 	contract:'-',marketDiff: '-',spotDiff: '-',status:'InActive'
  },
  {
    supplier: 'Toyota America',  rating: '3', product: 'ULSFO 0.1%', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Stem Fuels S.A',  rating: '2', product: 'MGO', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Shell New York',  rating: '1', product: 'ULSFO 0.1%', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Toyota America',  rating: '3', product: 'IMO 0.5% SULPHUR', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Stem Fuels S.A',  rating: '2', product: 'MGO', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Shell New York',  rating: '1', product: 'IMO 0.5% SULPHUR', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Cepsa Panama', rating: '4', product: 'IFO 180', market: '$484.95', spot: '-', 	contract:'-',marketDiff: '-',spotDiff: '-',status:'InActive'
  },
  {
    supplier: 'Toyota America',  rating: '3', product: 'ULSFO 0.1%', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Stem Fuels S.A',  rating: '2', product: 'MGO', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
  },
  {
    supplier: 'Shell New York',  rating: '1', product: 'ULSFO 0.1%', market: '$484.95', spot: '$484.95', 	contract:'$484.95',marketDiff: '$1.50',spotDiff: '$1.50',status:'InActive'
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

/*

@Directive({
  selector: '[activeClick]'
})
export class elementSelectDirective{
  
  @Input() activeClick;
  constructor(public el: ElementRef) { }
  // ngOnInit() {
  // }

  @HostBinding('class.active') isActive = false;
  // toggle() {
  //   this.isActive = !this.isActive;
  // }

  @HostListener('click', ['$event'])
  onClick(e){
    // let parent = this.elm.nativeElement.parentNode;
    // for (var i = 0; i < parent.children.length; i++) {
    //   parent.children[i].classList.remove('red');
    // }
    //this.elm.nativeElement.classList.add('red');
    // console.log("ssss");
    // alert("sss");
    this.isActive = !this.isActive;
  }
}

*/
