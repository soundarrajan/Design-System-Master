import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { TraderSearchPopupComponent } from '../shared/designsystem-v2/trader-search-popup/trader-search-popup.component';
import { SearchLookupCommonComponent } from '../shared/designsystem-v2/search-lookup-common/search-lookup-common.component';
import { GridOptions } from 'ag-grid-community';
import { AGGridCellActionsComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { AGGridCellRendererV2Component } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-rendererv2.component';
import { I } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-shiptech-delivery',
  templateUrl: './shiptech-delivery.component.html',
  styleUrls: ['./shiptech-delivery.component.css']
})
export class ShiptechDeliveryComponent implements OnInit {
  navigationItems: any[];
  public gridOptions_prd_qty_details: GridOptions;
  public gridOptions_notes: GridOptions;
  expandInvoiceNotes: boolean = true;
  hideDropdown: boolean = false;
  dataSource = [
    { product: 'RMG 380 3.5%', type: 'HSFO 3.5%' },
    { product: 'DMA 3.5%"', type: 'DOGO' }
  ];
  quantityCategory = [
    { name: 'Confirm' },
    { name: 'Vessel' },
    { name: 'BDN' }
  ];
  uoms = ['BBL', 'GAL', 'MT'];
  Uom = "MT";
  products = ['RMG 180 3.5%', 'RMG 380 3.5%'];
  productDelivered = 'RMG 180 3.5%';
  qualityParameter = [
    { name: 'Density at 15°C', min: '-', max: '380', uom: 'Kg/M3' },
    { name: 'Density at 15°C', min: '-', max: '380', uom: 'Kg/M3' },
    { name: 'Density at 15°C', min: '-', max: '380', uom: 'Kg/M3' },
    { name: 'Density at 15°C', min: '-', max: '380', uom: 'Kg/M3' },
    { name: 'Density at 15°C', min: '-', max: '380', uom: 'Kg/M3' }

  ];
  quantityParameters = [
    { name: 'Volume @15 Deg C', uom: 'm^3' },
    { name: 'Density @15 Deg C', uom: 'Kg/l' },
    { name: 'Volume @15 Deg C', uom: 'm^3' },
  ];
  deliveryFeedback = [
    { name: 'Yes' },
    { name: 'No' },
    { name: 'N/A' },
  ];
  satisfactionLevel = [
    { name: 'Excellent' },
    { name: 'Good' },
  ];
  simpleSource = ['Manifold', 'Unknown'];
  public contractualQuantityOption = 'Confirm';
  public source = 'Manifold';
  public productName:any[] = [];
  public sampleSources: any[] = [''];
  displayedColumns: string[] = ['product', 'type'];
  selectedProductToAddInDelivery: any;
  menuItems: any[];
  index = 0;
  statusData =  ['Draft','Verified','Not verified'];
  @ViewChild('mySelect') mySelect: MatSelect;
  constructor(public dialog: MatDialog, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('data-picker-gray', sanitizer.bypassSecurityTrustResourceUrl('../../assets/customicons/calendar-dark.svg'));

    this.gridOptions_prd_qty_details = <GridOptions>{
      enableColResize: true,
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef_prd_qty_details,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      getRowClass: (params) => {
        // Make invoice amount text red if the type is Credit Note or Pre-Claim Credit Note
        if (params.node.data.type === "Credit Note" || params.node.data.type === "Pre-claim Credit Note") {
          return ["related-invoice-red-text"]
        }
      },
      animateRows: false,
      onGridReady: (params) => {
        this.gridOptions_prd_qty_details.api = params.api;
        this.gridOptions_prd_qty_details.columnApi = params.columnApi;
        this.gridOptions_prd_qty_details.api.setRowData(this.rowData_prd_qty_details);
        this.gridOptions_prd_qty_details.api.sizeColumnsToFit();
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

    this.navigationItems = [
      {
        id: 'request',
        displayName: 'Request',
        url: '',
        entityId: '',
        indexStatus: 'navigationBar-previous',
        hidden: false
      },
      {
        id: 'rfq',
        displayName: 'Offer',
        url: '',
        entityId: '',
        indexStatus: 'navigationBar-previous',
        hidden: false
      },
      {
        id: 'order',
        displayName: 'Order',
        url: '',
        entityId: '',
        indexStatus: 'navigationBar-previous',
        hidden: false
      },

      {
        id: 'delivery',
        displayName: 'Delivery',
        url: '',
        entityId: '',
        indexStatus: 'navigationBar-active',
        hidden: false
      },
      {
        id: 'labs',
        displayName: 'Labs',
        url: '',
        entityId: '',
        indexStatus: 'navigationBar-next',
        hidden: false
      },
      {
        id: 'claims',
        displayName: 'Claims',
        url: '',
        entityId: '',
        indexStatus: 'navigationBar-next',
        hidden: false
      },
      {
        id: 'invoices',
        displayName: 'Invoices',
        url: '',
        entityId: '',
        indexStatus: 'navigationBar-next',
        hidden: false
      },
      {
        id: 'recon',
        displayName: 'Recon',
        url: '',
        entityId: '',
        indexStatus: 'navigationBar-next',
        hidden: false
      },
    ];
    this.menuItems = [
      {
        label: 'Main Page',
        url: '',
        status: 'active',
        styleClass: 'details-tab'
      },
      {
        label: 'Documents',
        url: '',
        status: '',
        styleClass: 'tab'
      },
      {
        label: 'Audit Log',
        url: '',
        status: '',
        styleClass: 'tab'
      },
      {
        label: 'Email Log',
        url: '',
        status: '',
        styleClass: 'tab'
      },
      {
        label: 'Seller Rating',
        url: '',
        status: '',
        styleClass: 'tab'
      }
    ];
  }
  public chipData = [
    { Title: 'Delivery No', Data: ['--'],status:'Draft' },
    { Title: 'Status', Data: ['Draft'],status:'Draft',clickable:true },
    { Title: 'Related Deliveries', Data: ['12345', '45454', '78794'] },
  ]
  openAddProductSelect() {
    // this.mySelect.close();
    //alert();
    this.mySelect.open();
  }
  addNewProduct() {
    this.hideDropdown = false;
    this.selectedProductToAddInDelivery = '';
  }
  addSelectedProductInDelivery(selectedProductToAddInDelivery) {
    this.hideDropdown = true;
    //alert(selectedProductToAddInDelivery);
    this.productName.push(
      {
        product:selectedProductToAddInDelivery,
        selected:false
      }
      );
    // console.log("ffffffffffff");
    // console.log(this.productName);
  }
  deleteDeliveryProduct(index) {
    this.productName.splice(index, 1);
  }
  addSampleSources() {
    this.sampleSources.push('');
  }
  removeSampleSources(index) {
    this.sampleSources.splice(index, 1);
  }
  selectOrder() {
    const dialogRef = this.dialog.open(SearchLookupCommonComponent, {
      width: '925px',
      height: '470px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

  onClick(selectedProd){

    this.productName.forEach((element)=>{
      if(element.product==selectedProd)
        element.selected = true;
      else
        element.selected = false;
    })
  }

  statusDataChange(){
    this.index = this.index == 2? 0: this.index+1;
    this.chipData[1].Data = [];
    this.chipData[1].Data.push(this.statusData[this.index]);
  }
  
  private columnDef_prd_qty_details = [
    { headerName: 'Parameter', headerTooltip: 'Parameter', field: 'parameter' },
    { headerName: 'Min', headerTooltip: 'Min', field: 'min', valueGetter: function (params) {
      if (params.data.min == '') return '-'
      else
        return params.data.min
    }},
    {
      headerName: 'Max', headerTooltip: 'Max', field: 'max', valueGetter: function (params) {
        if (params.data.min == '') return '-'
        else
          return params.data.max
      }
    },
    {
      headerName: 'UOM', headerTooltip: 'UOM', field: 'uom', width: 150,valueGetter: function (params) {
        if (params.data.min == '') return '-'
        else
          return params.data.uom
      }
    },
    {
      headerName: 'BDN', headerTooltip: 'BDN', field: 'bdn', width: 150, editable: true,cellClass: ['editable-cell']
    },
    {
      headerName: 'Survey Analysis', headerTooltip: 'Survey Analysis', field: 'survey', width: 150, editable: true,cellClass: ['editable-cell']
    },
    {
      headerName: 'Variance', headerTooltip: 'Variance', field: 'variance', width: 150,valueGetter: function (params) {
        if (params.data.min == '') return '-'
        else
          return params.data.variance
      }
    },
    {
      headerName: 'Status', headerTooltip: 'Status', field: 'status', width: 150,valueGetter: function (params) {
        if (params.data.min == '') return '-'
        else
          return params.data.status
      }
    },
    {
      headerName: 'Claim', headerTooltip: 'Claim', field: 'claim', width: 150,valueGetter: function (params) {
        if (params.data.min == '') return '-'
        else
          return params.data.claim
      }
    },
  ]
  public rowData_prd_qty_details = [
    {
      parameter: 'Density at 15°C', min: '', max: '1010', uom: 'Kg/M3', bdn: '-',
      survey: '', status: '-', variance: '-', claim: '-'
    },
    {
      parameter: 'Water(H2O)', min: '', max: '0.5', uom: 'Volume%', bdn: '0.4',
      survey: '', status: '-', variance: '-0.4', claim: '-'
    },
    {
      parameter: 'Sulpher(S)', min: '', max: '60', uom: 'Mg/Kg', bdn: '-',
      survey: '', status: '-', variance: '-', claim: '-'
    },
    {
      parameter: 'Aluminium(Al)', min: '', max: '1010', uom: 'Kg/M3', bdn: '30 USD',
      survey: '', status: '-', variance: '-', claim: '-'
    }


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
      headerName: 'Notes',  headerTooltip: 'Notes', field: 'notes', width: 900, editable: true,cellClass: ['editable-cell']
    },
    {
      headerName: 'Added By', headerTooltip: 'Added By', field: 'addedBy', width: 250,
      
    },
    {
      headerName: 'Added On', headerTooltip: 'Added On', field: 'addedOn', width: 250
    },
    
    
  ];
  public rowData_notes = [
    {
      notes:'Percent',addedBy:'Alexander James',addedOn:'12/09/2021 12:45'
    },
    {
      notes:'Percent',addedBy:'Alexander James',addedOn:'12/09/2021 12:45'
    },
  ]
}
