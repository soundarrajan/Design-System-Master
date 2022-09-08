import { Component, OnInit, ViewChild } from '@angular/core';
import * as _loadashC from 'lodash';
const loadashC = _loadashC;

import {
  CheckBoxInputComponent
} from '../../../shared/JSONControls/checkbox.input.component';
import {
  GroupedDropdownComponent
} from '../../../shared/JSONControls/grouped.dropdown.component';
import {
  LookupComponent
} from '../../../shared/JSONControls/lookup.component';
import {
  InputTextBoxComponent
} from '../../../shared/JSONControls/input.textbox';
import {
  ContentInputComponent
} from '../../../shared/JSONControls/content.input.component';
import {
  DateTimeInputComponent
} from '../../../shared/JSONControls/datetime.input.component';
import {
  RadioInputComponent
} from '../../../shared/JSONControls/radios.input.component';
import {
  NumberInputComponent
} from '../../../shared/JSONControls/number.input.component';
import {
  TextBoxInputComponent
} from '../../../shared/JSONControls/textbox.input.component';
import {
  DropdownComponent
} from '../../../shared/JSONControls/dropdown.component';

import { Location } from '@angular/common';
import { LocalService } from 'src/app/services/local-service.service';
import { MovementsManualMatchComponent } from '../../movements-manual-match/movements-manual-match.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-delivery-movement',
  templateUrl: './add-delivery-movement.component.html',
  styleUrls: ['./add-delivery-movement.component.css']
})
export class AddDeliveryMovementComponent implements OnInit {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  menuOptions = [{ name: "Delete Movement", icon: "../../../assets/customicons/delete-red.svg" }, { name: "Revert Movement", icon: "../../../assets/customicons/revert.svg" }]
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
    TradeId: '1218928',
    BuyTradeId: '1218928',
    DeliveryNumber: 'PMG tank 1',
    OutMovementId: 'MV2100002781',
    OutMovementStatus: 'Verified',
    SellMovementId: '',
    SellMovementStatus: '-',
    InMovementId: '17263',
    InMovementStatus: 'Planned',
    BuyMovementId: '',
    BuyMovementStatus: '-',
    MovementTypeId1: 'Intercompany Out',
    TankId1: 'PMG tank 1',
    CnCode1: '123892565',
    CustomStatus1: 'Test data',
    Vcf1: '',
    Wcf1: '',
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
    MassQty: '',
    MassUomId: 0,
    MassUom: 'MT',
    VolumeQty: '',
    VolumeUomId: 0,
    VolumeUom: 'GAL',
    GrossQty: '',
    GrossUom: 'GAL',
    TankMTBefore: '',
    TankMTAfter: '',
    CustomField1: '',
    CustomField2: '',
    CustomField3: '',
    CustomField4: '',
    CustomField5: '',
    CustomField6: '',
    CustomField7: '',
    CustomField8: '',
    CustomField9: '',
    CustomField10: '',
    TransferPriceType: 'Cost Plus',
    CostPlusValue: '100',
    CostPlusValueCurrency: 'USD',
    CostPlusValueUOM: 'GAL',
    PremiumDiscount: 'Premium',
    IntankProduct: '5000.00 MT',
    InTankProductAvlQty: '1000.00 MT',
    PlannedQty: '1000.62 GAL',
    UtilisedQty: '1000.62 GAL',
    CalculatedDensity: '-',
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
  public defaultToggle = 'Inventory';
  public toggleBtnData = { names: ['Inventory', 'B2B'] }
  @ViewChild(MovementsManualMatchComponent) saveMovements: MovementsManualMatchComponent;
  constructor(private _location: Location, private service: LocalService, private toaster: ToastrService) {
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
  }

  ngOnInit(): void {
    this.pageName = 'AddDeliveryMovementsPopup';
    this.setUpScreen();
    this.pageType = "Add Movement";
    this.bindData = undefined;
    this.bindData = this.newModel;
    this.resetData = loadashC.cloneDeep(this.newModel);
  }

  setUpScreen() {
    this.service.getDeliveryInventoryScreenJSON().subscribe(
      res => {
      this.testform = res[0].sections;
    });
    this.schematest = [
      {
        "Page": "AddDeliveryMovementsPopup"
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
    if (value.indexOf('B2B') > -1) {
      this.service.getDeliveryB2bScreenJSON().subscribe(res => {
        this.testform = res[0].sections;
      });
    }
    else {
      this.service.getDeliveryInventoryScreenJSON().subscribe(res => {
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

  enableSave() {
    this.active_save = true;
  }
  saveClicked() {
    this.saveMovements?.saveMovements();
    this.showDocumentsTab = true;
    this.active_save = false;
    this.toaster.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">Changes Saved Successfully!</div>',
      '', {
      enableHtml: true,
      toastClass: "toast-alert toast-green",
      timeOut: 2000
    });
  }
  
  changeSelectedTab($tab) {
    switch ($tab) {
      case 'manual-match': this.selected = 1;
    }
  }
}
