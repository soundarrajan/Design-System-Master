import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  JSONSchemaFormBuilder,
} from '../../../app/services/jsonschemaform/json.schema.form.builder.service';

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

import { GridOptions } from "ag-grid-community";
import { Location } from '@angular/common';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';

@Component({
  selector: 'app-configurable-screen-home',
  templateUrl: './configurable-screen-home.component.html',
  styleUrls: ['./configurable-screen-home.component.css']
})
export class ConfigurableScreenHomeComponent implements OnInit {

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
    MovementTypeId: 'Intercompany Out',
    ProductId: 'Ethanol',
    ProductName: '-',
    MovementDate: new Date(),
    TankId: 'PMG tank 1',
    InTankProductId: 0,
    InTankProductName: '-',
    MassQty: 0,
    MassUomId: 0,
    MassUom: 'GAL',
    VolumeQty: 0,
    VolumeUomId: 0,
    VolumeUom: 'MT',
    SourceDocument: '',
    SourceDocumentId: 0,
    DeliveryModeId: 'Pipeline',
    DeliveryMode: '',
    Carrier: '',
    CarrierId: 'Kinder Morgan',
    ReferenceNo: '',
    BlendReferenceNo: '',
    Notes: '',
    ConvertQty: true,
    MovementHeaderId: 0,
    TransferMovementID: '',
    TransferTankId: 0,
    TransferMovementTypeId: 0,
    TransferInTankProductId: 0,
    TransferInTankProductName: '-',
    Price: 0,
    ShowPrice: false,
    IsNegativeQty: false,
    LastModifiedOn: new Date(),
    anotherTankId: 0,
    OutMovementId: '17263',
    OutMovementStatus: 'Not Verified',
    InMovementId: '17263',
    InMovementStatus: 'Not Verified',
    IsNoCosting: false,
    IsNoCostingIn: false,
    CostList: "",
    LocationId: 0,
    LoadLocationId: 0,
    CogsOverwriteOption: -1,
    DiscountOrPremium: -1,
    OverwriteValue: 0,
    PriceCurrency: '',
    PriceUom: '',
    QuantityImpact: '',
    QuantityImpactIn: '',
    ShowDiscountOrPremium: true,
    ManualConversion: false,
    OutMovementInTankProductId: 'Ethanol',
    OutMovemenInTankProductQty: '1000 GAL',
    InMovementInTankProductId: 'Ethanol',
    InMovemenInTankProductQty: '1000 GAL',
    PremiumDiscount: 'Premium',
    TransferPriceType:'Cost Plus',
    CostPlusValue:0,
    CostPlusValueCurrency:'USD',
    CostPlusValueUOM:'GAL'

  };
  resetData: any;

  // Add Movements
  selected = 0;
  isCollapsed: boolean = false;
  active_cancel: boolean = true;
  active_save: boolean = false;
  tab_label = "EDIT-MOV276486";
  public defaultToggle = 'transfer';
  public gridOptions_addcost: GridOptions;

  constructor(private objJSONSchemaFormBuilder: JSONSchemaFormBuilder, private http: HttpClient, private _location: Location) {
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


    this.gridOptions_addcost = <GridOptions>{
      defaultColDef: {
        resizable: true,
        filtering: true,
        sortable: false
      },
      columnDefs: this.columnDef_addcosts,
      suppressRowClickSelection: true,
      suppressCellSelection: true,
      headerHeight: 35,
      rowHeight: 35,
      animateRows: false,
      onCellValueChanged: ($event) => {
        console.log($event);
      },

      onGridReady: (params) => {
        this.gridOptions_addcost.api = params.api;
        this.gridOptions_addcost.columnApi = params.columnApi;
        this.gridOptions_addcost.api.sizeColumnsToFit();
        this.gridOptions_addcost.api.setRowData(this.rowData_addcosts);


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
    this.getTransferScreenJSON().subscribe(res => {
      this.testform = res[0].sections;
    });
    this.getSchemaJSON().subscribe(res => {
      this.schematest = this.objJSONSchemaFormBuilder.buildSchema(res);
    });
    
    this.isLoading = false;
  }
  jsonFormcontrolValues(event) {
  }

  public getTransferScreenJSON(): Observable<any> {
    return this.http.get("./assets/data/config-ui-json/add-movements-transfer.json");
  }
  public getInterTransferScreenJSON(): Observable<any> {
    return this.http.get("./assets/data/config-ui-json/add-movements-intertransfer.json");
  }
  public getSchemaJSON(): Observable<any> {
    return this.http.get("./assets/data/config-ui-json/add-movements-schema.json");
  }

  goBack() {
    this._location.back();
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleTransfer(toggle) {
    this.testform = undefined;
    let value = toggle.value;
    if (value.indexOf('inter') > -1) {
      this.getInterTransferScreenJSON().subscribe(res => {
        this.testform = res[0].sections;
      });
    }
    else {
      this.getTransferScreenJSON().subscribe(res => {
        this.testform = res[0].sections;
      });
    }
    this.bindData = undefined;
    this.bindData = this.newModel;
  }
  private columnDef_addcosts = [
    {
      field: "add",
      resizable: false,
      width: 30,
      headerComponentParams: { template: '<div class="add-btn"></div>' },
      headerClass: ['aggridtextalign-center', 'align-c'],
      cellClass: ['aggridtextalign-center', 'align-c'],
      cellRenderer: function (params) {
        let deleteicon =
          `<div class="remove-icon"></div>`;
        return deleteicon;
      }
    },
    {
      headerName: 'Cost Type', headerTooltip: 'Cost Type', field: 'cost',
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    {
      headerName: 'Cost Name', headerTooltip: 'Cost Name', field: 'name',
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    {
      headerName: 'Service Provider', headerTooltip: 'Service Provider', field: 'provider',
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    {
      headerName: 'Rate Type', headerTooltip: 'Rate Type', field: 'type',
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    {
      headerName: 'Currency', headerTooltip: 'Currency', field: 'currency',
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    {
      headerName: 'Rate', headerTooltip: 'Rate', field: 'rate',
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    {
      headerName: 'UOM', headerTooltip: 'UOM', field: 'uom',
      cellRendererFramework: AGGridCellDataComponent, cellRendererParams: { type: 'grid-cell-edit' }
    },
    { headerName: 'Invoice ID', headerTooltip: 'Invoice ID', field: 'id', },
  ];

  private rowData_addcosts = [

    {
      type: 'Flat', provider: 'Kinder Morgan', currency: 'USD', rate: '100', cost: 'Pay', name: 'Barging', id: "", uom: "GAL"
    }
  ]
}
