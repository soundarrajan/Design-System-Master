import { Component, OnInit, ViewChild } from '@angular/core';

import * as _loadashC from 'lodash';
const loadashC = _loadashC;

import {
  CheckBoxInputComponent
} from '../../shared/JSONControls/checkbox.input.component';
import {
  GroupedDropdownComponent
} from '../../shared/JSONControls/grouped.dropdown.component';
import {
  LookupComponent
} from '../../shared/JSONControls/lookup.component';
import {
  InputTextBoxComponent
} from '../../shared/JSONControls/input.textbox';
import {
  ContentInputComponent
} from '../../shared/JSONControls/content.input.component';
import {
  DateTimeInputComponent
} from '../../shared/JSONControls/datetime.input.component';
import {
  RadioInputComponent
} from '../../shared/JSONControls/radios.input.component';
import {
  NumberInputComponent
} from '../../shared/JSONControls/number.input.component';
import {
  TextBoxInputComponent
} from '../../shared/JSONControls/textbox.input.component';
import {
  DropdownComponent
} from '../../shared/JSONControls/dropdown.component';

import { Location } from '@angular/common';
import { LocalService } from 'src/app/services/local-service.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { GridOptions } from "ag-grid-community";
import { AGGridCellEditableComponent } from '../../shared/designsystem-v2/ag-grid/ag-grid-cell-editable.component';
import { AGGridCellActionsComponent } from '../../shared/designsystem-v2/ag-grid/ag-grid-cell-actions.component';

@Component({
  selector: 'app-add-transfer-movement',
  templateUrl: './add-transfer-movement.component.html',
  styleUrls: ['./add-transfer-movement.component.css']
})
export class AddTransferMovementComponent implements OnInit {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  pageType: string;
  pageName: any;
  schematest: any;
  testform: any;
  isLoading: boolean = true;
  formIsValid = false;
  bindData: any;
  yourNewWidgets: any;
  formValidationErrors: any;
  resetForm = false;
  jsonFormOptions: any = {
    addSubmit: false,
    debug: false,
    loadExternalAssets: true,
    returnEmptyFields: false,
    setSchemaDefaults: false,
    defautWidgetOptions: { feedback: true }
  };
  validationErrors(data: any): void {
    this.formValidationErrors = data;
  }
  validCheck(isValid: boolean) {
    this.formIsValid = isValid;
  }

  newModel: any = {
    MovementID: 0,
    OutMovementId: '17263',
    OutMovementStatus: 'Planned',
    InMovementId: '17263',
    InMovementStatus: 'Planned',
    MovementTypeId1: 'Intercompany Out',
    TankId1: 'PMG tank 1',
    CnCode1: '123892565',
    CustomStatus1: 'Test data',
    Vcf1: '1',
    Wcf1: '1',
    OverwriteVcf1: true,
    OverwriteWcf1: true,
    MovementTypeId2: 'Intercompany Out',
    TankId2: 'PMG tank 1',
    CnCode2: '123892565',
    CustomStatus2: 'Test data',
    Vcf2: '1',
    Wcf2: '1',
    OverwriteVcf2: true,
    OverwriteWcf2: true,
    DeliveryModeId: 'Pipeline',
    ProductId: 'Ethanol',
    TicketNumber: '',
    Spec: 'ICE Brent Crude',
    ProductName: '-',
    MovementDate: new Date(),
    InTankProductId: 0,
    InTankProductName: '-',
    SourceDocument: '',
    SourceDocumentId: 0,
    DeliveryMode: '',
    Carrier: '',
    CarrierId: 'Kinder Morgan',
    ReferenceNo: '',
    BlendReferenceNo: '',
    Notes: '',
    MassQty: '100.00',
    MassUomId: 0,
    MassUom: 'MT',
    VolumeQty: '246400.00',
    VolumeUomId: 0,
    VolumeUom: 'GAL',
    TankMTBefore: '1',
    TankMTAfter: '1',
    TankMTBefore1:'',
    TankMTBefore2:'',
    TankMTAfter1:'',
    TankMTAfter2:'',
    CustomField11: '',
    CustomField12: '',
    CustomField13: '',
    CustomField14: '',
    CustomField15: '',
    CustomField21: '',
    CustomField22: '',
    CustomField23: '',
    CustomField24: '',
    CustomField25: '',
    TransferPriceType: 'Cost Plus',
    CostPlusValue: '100',
    CostPlusValueCurrency: 'USD',
    CostPlusValueUOM: 'GAL',
    PremiumDiscount: 'Premium',
    IntankProduct: 'Gasoil DPNMUR',
    InTankProductAvlQty: '1000.62 GAL',
    CalculatedDensity: '0.15177 MT/BBLS',
    ManualConversion: false
  };
  resetData: any;

  // Add Movements
  selected = 0;
  isCollapsed: boolean = false;
  active_cancel: boolean = true;
  active_save: boolean = false;
  showDocumentsTab: boolean = false;
  tab_label = "New Movement";
  menuOptions = [{ name: "Delete Movement", icon: "../../../assets/customicons/delete-red.svg" }, { name: "Revert Movement", icon: "../../../assets/customicons/revert.svg" }]
  public defaultToggle = 'Transfer';
  public toggleBtnData = { names: ['Transfer', 'Inter-Transfer'] };
  public gridOptions_addcost: GridOptions;

  constructor(private route: ActivatedRoute,private router: Router,private _location: Location, private service: LocalService) {
    this.yourNewWidgets = {
      lookup: LookupComponent,
      selectmd: DropdownComponent,
      inputmd: InputTextBoxComponent,
      contentmd: ContentInputComponent,
      date: DateTimeInputComponent,
      numbermd: NumberInputComponent,
      checkbox: CheckBoxInputComponent,
      radios: RadioInputComponent,
      'radios-inline': RadioInputComponent,
      textarea: TextBoxInputComponent,
      groupedselectmd: GroupedDropdownComponent
    };
    
    var movType = history.state.type;
    if(movType == 'add'){
      this.tab_label = this.tab_label
    } else {
      this.tab_label = history.state.movId?history.state.movId:this.tab_label;
    }
    

    this.gridOptions_addcost = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: true,
        sortable: false
      },
      suppressHorizontalScroll: true,
      scrollbarWidth: 0,
      columnDefs: this.columnDef_addcosts,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,

      onGridReady: (params) => {
        this.gridOptions_addcost.api = params.api;
        this.gridOptions_addcost.columnApi = params.columnApi;
        this.gridOptions_addcost.api.sizeColumnsToFit();
        this.gridOptions_addcost.api.setRowData(this.rowData_addcosts);
        this.addCustomHeaderEventListener();
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
    this.pageName = 'AddTransferMovementsPopup';
    this.setUpScreen();
    this.pageType = "Add Movement";
    this.bindData = undefined;
    this.bindData = this.newModel;
    this.resetData = loadashC.cloneDeep(this.newModel);
}

  setUpScreen() {
    this.service.getTransferScreenJSON().subscribe(res => {
      this.testform = res[0].sections;
    });
    this.schematest = [
      {
        "Page": "AddTransferMovementsPopup"
      }
    ];

    this.isLoading = false;
  }
  jsonFormcontrolValues(event) {
  }
  goBack() {
    this._location.back();
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleTransfer(toggle) {
    this.defaultToggle = toggle.value;
    this.testform = undefined;
    let value = toggle.value;
    if (value.indexOf('Inter') > -1) {
      this.service.getInterTransferScreenJSON().subscribe(res => {
        this.testform = res[0].sections;
      });
    }
    else {
      this.service.getTransferScreenJSON().subscribe(res => {
        this.testform = res[0].sections;
      });
    }
    this.bindData = undefined;
    this.bindData = this.newModel;
  }
  openMoreOptions($event) {
    $event.stopPropagation();
    this.menuTrigger.openMenu();
  }

  addCustomHeaderEventListener() {
    let addButtonElement = document.getElementsByClassName('add-btn');
    addButtonElement[0].addEventListener('click', (event) => {
      this.gridOptions_addcost.api.applyTransaction({
        add: [{
          type: 'Flat', provider: 'Kinder Morgan', currency: 'USD', rate: '100', cost: 'Pay', name: 'Barging', id: "", uom: "GAL"
        }]
      });
    });

  }
  private columnDef_addcosts = [
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
      cellClass: ['aggridtextalign-left'],
      cellRendererFramework: AGGridCellActionsComponent, cellRendererParams: { type: 'row-remove-icon' }
    },
    {
      headerName: 'Pay/Receive', editable: true, headerTooltip: 'Pay/Receive', field: 'cost', cellClass: ['editable-cell'],
      cellRendererFramework: AGGridCellEditableComponent, cellRendererParams: { type: 'cell-edit-dropdown', label: 'cost-type', items: ['Pay', 'Receive'] }
    },
    {
      headerName: 'Cost/Revenue name', headerTooltip: 'Cost/Revenue name', field: 'name', cellClass: ['editable-cell'],
      cellRendererFramework: AGGridCellEditableComponent, cellRendererParams: { type: 'cell-edit-autocomplete', label: 'cost-name' }
    },
    {
      headerName: 'Service Provider', headerTooltip: 'Service Provider', field: 'provider', cellClass: ['editable-cell'],
      cellRendererFramework: AGGridCellEditableComponent, cellRendererParams: { type: 'cell-edit-autocomplete', label: 'service-provider' }
    },
    {
      headerName: 'Cost/revenue type', editable: true, headerTooltip: 'Cost/revenue type', field: 'type', cellClass: ['editable-cell'],
      cellRendererFramework: AGGridCellEditableComponent, cellRendererParams: { type: 'cell-edit-dropdown', label: 'rate-type', items: ['Flat', 'Option 2'] }
    },
    { headerName: 'Cost/Revenue', editable: true, singleClickEdit: true, headerTooltip: 'Cost/Revenue', field: 'rate', type: "numericColumn", cellClass: ['aggridtextalign-right editable-cell cell-align'] },
    { headerName: 'Currency', headerTooltip: 'Currency', field: 'currency' },
    { headerName: 'UOM', headerTooltip: 'UOM', field: 'uom' },
    { headerName: 'Invoice ID', headerTooltip: 'Invoice ID', field: 'id', cellClass: ['aggridlink'] }
  ];

  private rowData_addcosts = [

    {
      type: 'Flat', provider: 'Kinder Morgan', currency: 'USD', rate: '100', cost: 'Pay', name: 'Barging', id: "INV00001", uom: "GAL"
    }
  ]
}

