import { Component, OnInit, Inject } from '@angular/core';

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

@Component({
  selector: 'app-add-other-movement',
  templateUrl: './add-other-movement.component.html',
  styleUrls: ['./add-other-movement.component.css']
})
export class AddOtherMovementComponent implements OnInit {

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
  showDocumentsTab = false;
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
    MovementId: 'MOV1918',
    MovementStatus: 'Not Verified',
    MovementTypeId: 'Gain',
    OutMovementId : '',
    TankId: 'Ethanol RIN 2021',
    CnCode: '123892565',
    CustomStatus: 'Test data',
    IntankProduct: 'Ethanol RIN',
    InTankProductAvlQty: '1000.0000 MT',
    CalculatedDensity: '-',
    Vcf: '',
    Wcf: '', 
    OverwriteVcf: true,
    OverwriteWcf: true,
    DeliveryID: '',
    SourceDocument: 'BL',
    DocumentNo: '',
    MovementDate: new Date(),
    Product: 'Ethanol',
    Spec: 'ICE Brent Crude',
    DeliveryMode: '',
    Carrier: '',
    BlendReferenceNo: '',
    TicketNumber: '',
    Notes: '',
    MassQty: '1000.0000',
    MassUom: 'MT',
    VolumeQty: '1000.0000',
    VolumeUom: 'GAL',
    CustomField1: '',
    CustomField2: '',
    CustomField3: '',
    CustomField4: '',
    ManualConversion: false
  };
  resetData: any;

  // Add Movements
  selected = 0;
  isCollapsed: boolean = false;
  active_cancel: boolean = true;
  active_save: boolean = true;
  tab_label = "New Movement";
  public defaultToggle = 'Transfer';
  public toggleBtnData = { names: ['Transfer', 'Inter-Transfer'] }

  constructor(private _location: Location, private service: LocalService) {
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
    this.pageName = 'AddTransferMovementsPopup';
    this.setUpScreen();
    this.pageType = "Add Movement";
    this.bindData = undefined;
    this.bindData = this.newModel;
    this.resetData = loadashC.cloneDeep(this.newModel);
  }

  setUpScreen() {
    this.service.getOtherMovScreenJSON().subscribe(res => {
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
  /* toggleTransfer(toggle) {
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
  } */

}





