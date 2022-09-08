import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DecimalPipe, KeyValue } from '@angular/common';
import { GridOptions } from 'ag-grid-community';
import { ShiptechContractPricingDetailsPopupComponent } from '../../../shared/dialog-popup/shiptech-contract-pricing-details-popup/shiptech-contract-pricing-details-popup.component';
import { ShiptechContractFormulahistoryPopupComponent } from '../../../shared/dialog-popup/shiptech-contract-formulahistory-popup/shiptech-contract-formulahistory-popup.component';
import * as _ from 'lodash';
import { AGGridCellActionsComponent } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { AGGridCellRendererV2Component } from 'src/app/shared/designsystem-v2/ag-grid/ag-grid-cell-rendererv2.component';
@Component({
  selector: 'app-shiptech-contract-home',
  templateUrl: './shiptech-contract-home.component.html',
  styleUrls: ['./shiptech-contract-home.component.css']
})
export class ShiptechContractHomeComponent implements OnInit {
  public gridOptions: GridOptions;
  public gridOptions1: GridOptions;
  expandLocation: any = false;
  expandProduct: any = false;
  expandAllowedCompanylistPopUp: any = false;
  expandCustomerListPopUp: any = false;
  expandAllowCompanies: any = false;
  expandAllowLocations: any = false;
  expandCustomer: any = false;
  locationMasterSearchList: any[];
  productMasterList: any;
  expandLocationProductPopUp = false;
  searchLocationInput: any;
  expandCompanyPopUp: any;
  searchCompanyModel: any;
  productMasterSearchList: any[];
  generalTenantSettings: any;


  navigationItems: any[];
  menuItems: any[];
  expandAllowCustomer: boolean = false;
  selectedVal = 'dateSpecific';
  selectedVal3 = 'formula';
  public locationSelected: boolean = false;
  public productSelected: boolean = false;
  public selectedLocname;
  public selectedLocindex: number;
  public selectedProindex: number;
  public selectedProname;
  public showFormulaNameField: boolean = true;
  companyListColumns: string[] = ['name', 'blank'];
  companyList = [
    { id: '0', name: 'Company1', isSelected: true },
    { id: '1', name: 'Company2', isSelected: true },
    { id: '2', name: 'Company3', isSelected: false },
    { id: '3', name: 'Company4', isSelected: true },
    { id: '4', name: 'Company5', isSelected: false },
    { id: '5', name: 'Company6', isSelected: true },
    { id: '6', name: 'Company7', isSelected: true },
    { id: '7', name: 'Company8', isSelected: true }
  ];
  // displayedColumns: string[] = ['vessel1'];
  // locationMasterSearchList = [
  //   {vessel1: 'MerinLion'},

  // ];
  minQuantity = "0.00";
  maxQuantity = "-";
  tolerance = "-";
  customerListColumns: string[] = ['name', 'blank'];
  customerList = [
    { id: '0', name: 'Customer1', isSelected: true },
    { id: '1', name: 'Customer2', isSelected: false },
    { id: '2', name: 'Customer3', isSelected: false },
    { id: '3', name: 'Customer4', isSelected: true },
    { id: '4', name: 'Customer5', isSelected: false },
    { id: '5', name: 'Customer6', isSelected: false },
    { id: '6', name: 'Customer7', isSelected: false },
    { id: '7', name: 'Customer8', isSelected: false }
  ];
  tradeBookList = [
    { name: 'Arabian Gulf' },
    { name: 'Bahamas Fuel Oil' },
    { name: 'Barge PA' },
    { name: 'China' },
    { name: 'Durban' },
    { name: 'Global Arbitrage' },
    { name: 'Hong Kong' }
  ];
  agreementTypeList = [
    { name: 'Contract' },
    { name: 'Contract-Fixed' },
    { name: 'Contract-Formula' },
    { name: 'Tarrif local regulation' }
  ];
  paymentTermList = [
    { name: 'D30' },
    { name: 'ROI30' },
    { name: 'RO115' },
    { name: 'DD21' },
    { name: 'DD22' },
    { name: 'ROI22' },
    { name: 'ROI27' },
  ];
  incotermList = [
    { name: 'FOB' },
    { name: 'FOB-Free on board' },
    { name: 'CIF' },
    { name: 'CIP' },
    { name: 'CFR' },
    { name: 'DAT' }
  ];
  applyToList = [
    { name: 'Order Date' },
    { name: 'Delivery Date' },
  ];
  uomList = [
    { name: 'MT' },
    { name: 'GAL' },
    { name: 'CBM' },
    { name: 'LBS' },
    { name: 'KG' },
  ];
  uoms = ['BBL', 'GAL', 'MT'];
  @ViewChild('mySelect') mySelect: MatSelect;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog) {
    iconRegistry.addSvgIcon('data-picker-gray', sanitizer.bypassSecurityTrustResourceUrl('../../assets/customicons/calendar-dark.svg'));

    this.gridOptions = <GridOptions>{
      enableColResize: true,
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef,
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
        this.gridOptions.api = params.api;
        this.gridOptions.columnApi = params.columnApi;
        //this.gridOptions_rel_invoice.api.setPinnedBottomRowData(this.totalrowData);
        this.gridOptions.api.setRowData(this.rowData_notes);
        this.gridOptions.api.sizeColumnsToFit();
        // params.api.sizeColumnsToFit();
        this.addNotesEventListener();
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          //params.api.sizeColumnsToFit();
        }
      },
      onColumnVisible: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8) {
          params.api.sizeColumnsToFit();
        }
      }
    }
    this.gridOptions1 = <GridOptions>{
      enableColResize: true,
      defaultColDef: {
        resizable: true,
        filtering: false,
        sortable: false
      },
      columnDefs: this.columnDef1,
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
        this.gridOptions.api = params.api;
        this.gridOptions.columnApi = params.columnApi;
        //this.gridOptions_rel_invoice.api.setPinnedBottomRowData(this.totalrowData);
        this.gridOptions.api.setRowData(this.rowData1);
        this.gridOptions.api.sizeColumnsToFit();
        // params.api.sizeColumnsToFit();
        this.addNotesEventListener1();
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },

      onColumnResized: function (params) {
        if (params.columnApi.getAllDisplayedColumns().length <= 8 && params.type === 'columnResized' && params.finished === true && params.source === 'uiColumnDragged') {
          //params.api.sizeColumnsToFit();
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
        displayName: 'RFQ',
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
        id: 'contract',
        displayName: 'Contract',
        url: '',
        entityId: '',
        indexStatus: 'navigationBar-active',
        hidden: false
      },

      {
        id: 'delivery',
        displayName: 'Delivery',
        url: '',
        entityId: '',
        indexStatus: 'navigationBar-next',
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
        label: 'Preview Contract',
        url: '',
        status: '',
        styleClass: 'tab'
      },
      {
        label: 'Preview Email',
        url: '',
        status: '',
        styleClass: 'tab'
      },
      {
        label: 'Deliveries',
        url: '',
        status: '',
        styleClass: 'tab'
      },
      {
        label: 'Documents',
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
      },
      {
        label: 'Terms & Conditions',
        url: '',
        status: '',
        styleClass: 'tab'
      }
    ];
  }
  public chipData = [
    { Title: 'Delivery No', Data: ['--'], },
    { Title: 'Status', Data: ['Status'] },
    { Title: 'Related Deliveries', Data: ['123', '456', '888'] },
  ]
  public contractproducts = [{ location: '', product: '' }];
  originalOrder = (
    a: KeyValue<number, any>,
    b: KeyValue<number, any>
  ): number => 0;
  formValues: any;
  @Input('model') set _setFormValues(formValues) {
    if (!formValues) {
      return;
    }
  }
  public allowedCompanies = [
    { id: '0', name: 'Company1', isSelected: true },
    { id: '1', name: 'Company2', isSelected: true },
    { id: '2', name: 'Company3', isSelected: false },
    { id: '3', name: 'Company4', isSelected: true },
    { id: '4', name: 'Company5', isSelected: false },
    { id: '5', name: 'Company6', isSelected: true },
    { id: '6', name: 'Company7', isSelected: true },
    { id: '7', name: 'Company8', isSelected: true }
  ];
  openAddProductSelect() {
    // this.mySelect.close();
    alert();
    this.mySelect.open();
  }
  //value change

  selectedVal2: boolean;

  public onValChange(val: string) {
    this.selectedVal = val;
    if (val == 'evergreen') {
      this.selectedVal2 = true;
    } else {
      this.selectedVal2 = false;
    }
  }

  selectedVal4: boolean = true;

  public onValChange1(val: string) {
    this.selectedVal3 = val;
    if (val == 'formula') {
      this.selectedVal4 = true;
    } else {
      this.selectedVal4 = false;
    }
  }

  selectedContractQty = 'TotalContractualQuantity';
  selectedUom = 'MT';
  selectedContractualQuantity = 'TotalContractualQuantity';
  contractualQuantityOptionList = [
    { name: 'TotalContractualQuantity' },
    { name: 'PerMonth' },
    { name: 'PerWeek' },
    { name: 'PerDay' },
    { name: 'PerLift' }
  ];
  displayedColumns: string[] = ['name'];
  displayedColumns2: string[] = ['name', 'type'];
  locationMasterSearchListOptions = [
    { 'name': 'Aalesund', 'country': 'Aalesund' },
    { 'name': 'Aarhus', 'country': 'Aarhus' },
    { 'name': 'Aalborg', 'country': 'Aalborg' },
    { 'name': 'Abidjan', 'country': 'Abidjan' },
    { 'name': 'Aalesund', 'country': 'Aalesund' },
    { 'name': 'Aarhus', 'country': 'Aarhus' },
    { 'name': 'Aalborg', 'country': 'Aalborg' },
    { 'name': 'Abidjan', 'country': 'Abidjan' },
    { 'name': 'Aalesund', 'country': 'Aalesund' },
    { 'name': 'Aarhus', 'country': 'Aarhus' },
    { 'name': 'Aalborg', 'country': 'Aalborg' },
    { 'name': 'Abidjan', 'country': 'Abidjan' },
  ];
  productMasterSearchListOptions = [
    { 'pname': 'DMB MAX 0.1 %S', 'type': 'LSFO' },
    { 'pname': 'DMA MAX 1%', 'type': 'DOGO' },
    { 'pname': 'SDMB MAX 0.1 %S', 'type': 'LSFO' },
    { 'pname': 'XDMA MAX 1%', 'type': 'DOGO' },
    { 'pname': 'DMB MAX 0.1 %S', 'type': 'LSFO' },
    { 'pname': 'DMB MAX 0.1 %S', 'type': 'LSFO' },
    { 'pname': 'DMA MAX 1%', 'type': 'DOGO' },
    { 'pname': 'SDMB MAX 0.1 %S', 'type': 'LSFO' },
    { 'pname': 'XDMA MAX 1%', 'type': 'DOGO' },
    { 'pname': 'DMB MAX 0.1 %S', 'type': 'LSFO' },
    { 'pname': 'DMB MAX 0.1 %S', 'type': 'LSFO' },
    { 'pname': 'DMA MAX 1%', 'type': 'DOGO' },
    { 'pname': 'SDMB MAX 0.1 %S', 'type': 'LSFO' },
    { 'pname': 'XDMA MAX 1%', 'type': 'DOGO' },
    { 'pname': 'DMB MAX 0.1 %S', 'type': 'LSFO' },
  ];
  public details = [{
    id: 0,
    minContractQuantity: 0.00,
    contractualQuantityOption: {
      code: null,
      databaseValue: 0,
      description: null,
      displayName: null,
      id: 1,
      internalName: null,
      name: 'TotalContractualQuantity',
      productTypeId: 0,
      transactionTypeId: 0
    },
    uom: {
      clientIpAddress: null,
      code: '',
      collectionName: null,
      customNonMandatoryAttribute1: 'TON',
      displayName: '',
      id: 5,
      internalName: '',
      isDeleted: false,
      modulePathUrl: null,
      name: 'MT',
      userAction: null
    }
  }];
  //Quantity Section
  addContractQuantityDetail() {
    this.details.push({
      id: 0,
      minContractQuantity: 0.00,
      contractualQuantityOption: {
        code: null,
        databaseValue: 0,
        description: null,
        displayName: null,
        id: 1,
        internalName: null,
        name: 'TotalContractualQuantity',
        productTypeId: 0,
        transactionTypeId: 0
      },
      uom: {
        clientIpAddress: null,
        code: '',
        collectionName: null,
        customNonMandatoryAttribute1: 'TON',
        displayName: '',
        id: 5,
        internalName: '',
        isDeleted: false,
        modulePathUrl: null,
        name: 'MT',
        userAction: null
      }
    });
    // this.changeDetectorRef.detectChanges();
  }

  removeContractQuantityDetail(key) {
    this.details.splice(key, 1);
  }

  createRange(min, max) {
    min = parseInt(min);
    max = parseInt(max);
    var input = [];
    for (let i = min; i <= max; i++) {
      input.push(i);
    }
    return input;
  }

  removeAdditionalCostLine(key) {
    this.products.splice(key, 1
    );
  }

  public products = [];

  addNewAdditionalCostLine() {
    this.products.push({
      id: 0,
      currency: ''
    });
  }
  recomputeProductPricePrecision() {

  }
  customers: any = [];
  saveCustomer() {
    let customersList = [];
    let customerList = this.customerList;
    for (let i = 0; i < customerList.length; i++) {
      if (customerList[i].isSelected) {
        let customer = {
          id: customerList[i].id,
          name: customerList[i].name
        };
        customersList.push(customer);
      }
    }
    this.customers = _.cloneDeep(customersList);
  }

  searchLocations() {

  }
  saveAllowedCompanies() {
    let allowedCompanyList = [];
    let companyList = this.companyList;
    for (let i = 0; i < companyList.length; i++) {
      if (companyList[i].isSelected) {
        let allowedCompany = {
          id: companyList[i].id,
          name: companyList[i].name
        };
        allowedCompanyList.push(allowedCompany);
      }
    }
    this.allowedCompanies = _.cloneDeep(allowedCompanyList);
  }
  addProductToContract() {
    this.contractproducts.push({ location: '', product: '' });
    this.locationSelected = false;
    this.productSelected = false;
    this.selectedLocname = "";
    this.selectedProname = "";
    this.selectedLocindex = 999;
    this.selectedProindex = 999;
  }
  removeProductToContract(key) {
    this.contractproducts.splice(key, 1);
  }
  createNewFormulaPopup() {
    const dialogRef = this.dialog.open(ShiptechContractPricingDetailsPopupComponent, {
      panelClass: 'popup-modal-component',
      width: '1480px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.showFormulaNameField = false;
    });
  }
  RemoveFormula() {
    this.showFormulaNameField = true;
  }
  openFormulaHistory() {
    const dialogRef = this.dialog.open(ShiptechContractFormulahistoryPopupComponent, {
      //width: '500px',      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  search(type: string, value: string): void {
    //alert(type);
    if (type == "location") {
      let filterSummaryProducts = this.locationMasterSearchListOptions.filter((summaryProd) => summaryProd.name.toLowerCase().includes(value));
      this.locationMasterSearchListOptions = [...filterSummaryProducts];
    } else {
      let filterSummaryProducts = this.productMasterSearchListOptions.filter((summaryProd) => summaryProd.pname.toLowerCase().includes(value));
      this.productMasterSearchListOptions = [...filterSummaryProducts];
    }

    // this.deliverySummaryProducts = [
    //   {'product': 'RMG 380 MAX 050', 'productType': 'VLSFO'},
    //   {'product': 'RMG 380 MAX 0502', 'productType': 'VLSFO2'},
    // ];
  }
  setLocationChange(test, value, index) {
    this.selectedLocname = value.name;
    this.locationSelected = true;
    this.selectedLocindex = index;
  }
  setProductChange(value, index) {
    //console.log(value);
    this.selectedProname = value.pname;
    this.productSelected = true;
    this.selectedProindex = index;
  }
  setAllowedLocations(value, i) {
    // alert(i);
    console.log(value);
    if (value?.name?.name) {
      this.selectedLocname = value.name.name; 
      this.locationSelected = true;
      // this.productSelected = true;
    }
    else{
      this.locationSelected = false;
    }
    if(value?.pname?.pname){
      this.selectedProname = value.pname.pname;
      // this.locationSelected = true;
      this.productSelected = true;
    }
    else{
      this.productSelected = false;
    }
      
      this.selectedLocindex = i;
      this.selectedProindex = i;

  }
  setAllowedProducts(i) {

  }

  focus(e, type) {
    //console.log(type)
    if (type == 'min') {
      e.target.parentElement
        .closest('.minInputFocus')
        .classList.add('mininputFocussed');
      e.target.parentElement.lastChild.classList.remove('add-label');
      e.target.parentElement.lastChild.classList.add('remove-label');
    }

    if (type == 'max') {
      e.target.parentElement
        .closest('.maxInputFocus')
        .classList.add('maxinputFocussed');
      e.target.parentElement.lastChild.classList.remove('add-label');
      e.target.parentElement.lastChild.classList.add('remove-label');
    }

    if (type == 'tol') {
      e.target.parentElement
        .closest('.tolInputFocus')
        .classList.add('tolinputFocussed');
      e.target.parentElement.lastChild.classList.remove('add-label');
      e.target.parentElement.lastChild.classList.add('remove-label');
    }
  }
  private columnDef = [
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
      headerName: 'Item name', headerTooltip: 'Item name', field: 'name', editable: true, cellClass: ['editable-cell'],
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { type: 'plain-select', valueArr: ['option 1', 'option 2', 'option 3'] }
    },
    {
      headerName: 'Type', headerTooltip: 'Type', field: 'type', editable: true, cellClass: ['editable-cell'],
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { type: 'plain-select', valueArr: ['option 1', 'option 2', 'option 3'] }
    },
    { headerName: 'Amount', headerTooltip: 'Amount', field: 'amount', editable: true, cellClass: ['editable-cell'], },
    {
      headerName: 'Price UON', headerTooltip: 'Price', field: 'price', editable: true, cellClass: ['editable-cell'],
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { type: 'plain-select', valueArr: ['option 1', 'option 2', 'option 3'] }
    },
    { headerName: 'Extra %', headerTooltip: 'Extra %', field: 'extra', editable: true, cellClass: ['editable-cell'], },
    {
      headerName: 'Currency', headerTooltip: 'Currency', field: 'currency',
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { type: 'plain-select', valueArr: ['option 1', 'option 2', 'option 3'] }
    },
    { headerName: 'Comment', headerTooltip: 'Comment', field: 'comment', editable: true, cellClass: ['editable-cell'], },

  ];
  public rowData_notes = [
    { name: 'option 1', type: 'option 1', amount: '500', price: 'option 1', extra: '100', currency: 'option 1', comment: '' },
    { name: 'option 2', type: 'option 2', amount: '500', price: 'option 2', extra: '100', currency: 'option 2', comment: '' },
  ]
  private columnDef1 = [
    {
      resizable: false,
      width: 50,
      field: 'add',
      suppressMenu: true,
      headerName: "",
      headerClass: ['aggridtextalign-center'],
      headerComponentParams: {
        template: `<span  unselectable="on">
             <div class="add-btn add-btn3 add-Notes1"></div>
             <span ref="eMenu"></span>`
      },
      cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
    },
    {
      headerName: 'Product', headerTooltip: 'Type', field: 'Product', editable: true, cellClass: ['editable-cell'],
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { type: 'plain-select', valueArr: ['RMK 500 MAX 3,5000%', 'DMA MAX 1%', 'RMD 80 MAX 0.1 %S'] }
    },
    {
      headerName: 'Mass UOM', headerTooltip: 'Amount', field: 'mass', cellStyle: { 'max-width': '100px' }, editable: true, cellClass: ['editable-cell'],
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { type: 'plain-select', valueArr: ['option 1', 'option 2', 'option 3'] }
    },
    {
      headerName: 'Volumw UON', headerTooltip: 'Price', field: 'volume', cellStyle: { 'max-width': '100px' }, editable: true, cellClass: ['editable-cell'],
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { type: 'plain-select', valueArr: ['option 1', 'option 2', 'option 3'] }
    },
    {
      headerName: 'Conversion factor', headerTooltip: 'Extra %', field: 'factor', cellStyle: { 'max-width': '100px' }, editable: true, cellClass: ['editable-cell'],
      cellRendererFramework: AGGridCellRendererV2Component, cellRendererParams: { type: 'plain-select', valueArr: ['option 1', 'option 2', 'option 3'] }
    },
    { headerName: 'Conversion value', headerTooltip: 'Currency', field: 'value', editable: true, cellClass: ['editable-cell'], },


  ];
  public rowData1 = [
    { name: '', Product: 'RMK 500 MAX 3,5000%', mass: 'option 1', volume: 'option 1', factor: 'option 1', value: '7.46' },
    { name: '', Product: 'DMA MAX 1%', mass: 'option 2', volume: 'option 2', factor: 'option 2', value: '7.46' },
  ]

  addNotesEventListener() {
    let addButtonElement = document.getElementsByClassName('add-Notes');
    addButtonElement[0].addEventListener('click', (event) => {
      //alert("");
      this.gridOptions.api.applyTransaction({
        add: [
          { name: '', type: '', amount: '5', price: '', extra: '', currency: '', comment: '' },

        ]
      });
    });

  }
  addNotesEventListener1() {
    let addButtonElement = document.getElementsByClassName('add-Notes1');
    if (addButtonElement.length > 0) {
      addButtonElement[0].addEventListener('click', (event) => {
        //alert("");
        this.gridOptions1.api.applyTransaction({
          add: [
            { name: '', Product: '', mass: '', volume: '', factor: '', value: '7.46' },

          ]
        });
      });
    }


  }
  onResize(event) {
    this.gridOptions.api.sizeColumnsToFit();
    this.gridOptions1.api.sizeColumnsToFit();
  }
}
