import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { AbstractControl, RequiredValidator, Validators } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { JsonSchemaFormService } from '../JSONSchemaForm/json-schema-form.service';
// import { BackendService } from '../services/backend/backend.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { TankPopupComponent } from '../dialog-popup/tank-popup/tank-popup.component';
import { Observable } from 'rxjs';
// import { toQueryString } from '@techoil/core';
import * as _moment from 'moment';
const moment = _moment;
@Component({
  template: `
  <div
	[ngClass]="{'d-flex':options?.formFieldClass && (options.formFieldClass=='with-search-field'|| options.formFieldClass=='with-nav-search-field')}">
	<mat-form-field
		[ngClass]="(options?.formFieldClass)? 'example-full-width '+options.formFieldClass : 'example-full-width'"
		*ngIf="this.visible && this.options.isVisible">
		<input
        type="text"
        [required]="this.visible && (options?.required || this.required)"
        [disabled]="disabled || controlDisabled || options?.readonly"
        placeholder="{{ options?.noPlaceHolder ? '' : options?.title }}"
        aria-label="{{ options?.title }}"
        name="{{ this.controlId }}"
        [id]="this.layoutNode.name"
        [matTooltip]="tooltip"
        (keyup.enter)="updateValuefromEnter($event)"
        (keyup.backspace)="this.backspacePress($event)"
        [matTooltipShowDelay]="500"
        [matTooltipPosition]="'below'"
        [(ngModel)]="this.controlBindValue"
        [value]="this.controlBindValue"
        (blur)="options.showErrors = true"
        matInput
        [matAutocomplete]="auto"
        (input)="checkAutoComplete($event)"
      />
		<div class="navigation-icon"></div>
		<mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn.bind(this)">
			<mat-option *ngFor="let val of selectList" (click)="this.updateValue(val)"
				[value]="val[this.options.controlValue]">
				{{ val[this.options.controlName] }}
			</mat-option>
		</mat-autocomplete>
	</mat-form-field>
	<div *ngIf="options?.formFieldClass && (options.formFieldClass=='with-search-field'|| options.formFieldClass=='with-nav-search-field')" class="search-icon" (click)="searchTankPopup()">
		<div class="img"></div>
	</div>
	<div>
		<mat-error *ngIf="this.visible && options?.showErrors && options?.errorMessage && this.options.isVisible"
			[innerHTML]="options?.errorMessage" style="position:relative; top: 0px;font-size:12px;"></mat-error>
  `,
  selector: 'app-lookup-input',
  styles: [``]
})
/**
 * The Dropdown Component For Configurable UI
 */
export class LookupComponent implements OnInit {
  required = false;
  controlType = 'lookup';
  IncludeParams = false;

  tooltip = '';
  formControl: AbstractControl;
  controlId: string;
  disabled = false;
  controlName: string;
  controlValue: any;
  controlDisabled = false;
  boundControl = false;
  options: any;
  selectList: any[] = [];
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];
  visible = true;
  triggerAfterChanges = false;
  triggerTableAfterChanges = false;
  afterChangeEvents = [];
  dataSrcBind = true;
  initialBindDone = false;
  afterFirstBindOfAllFields = false;
  dataSrcParams = {};
  defaultPropertyName: any;
  defaultValueOnChange: boolean = false;
  controlBindValue = '';
  includeParamsJson = {};
  initialBindDoneForIncludeParams = false;
  IsFirstBindVisibleDone = false;
  makeValuesEmpty = false;
  // constructor(private toastr: ToastrService, private jsf: JsonSchemaFormService, private objBackedn: BackendService) {}

  constructor(private toastr: ToastrService, private jsf: JsonSchemaFormService,public dialog: MatDialog) {}
  /**
   * The function called when the displayWith attribute is being binded
   * @param valueToBeDisplayed
   */
  displayFn(valueToBeDisplayed: any) {
    var currentItem = this.selectList !== undefined && this.selectList.length > 0 ? this.selectList.find(x => x[this.options.controlValue] == valueToBeDisplayed) : undefined;
    return currentItem ? currentItem[this.options.controlName] : valueToBeDisplayed;
  }
  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.tooltip = this.options?.title;
    this.controlId = this.controlName + '_';
    this.jsf.initializeControl(this, true);

    if (this.options['IncludeIdParams'] !== undefined) this.IncludeParams = this.options.IncludeIdParams;

    if (this.IncludeParams) {
      this.jsf.dataChanges.subscribe(res => {
        if (!this.initialBindDoneForIncludeParams) {
          var IncParams = this.options.IncludeIdParamsKey;
          var apiActionKey = '';
          var dataKey = '';
          if (IncParams.indexOf(':') > -1) {
            var split = IncParams.split(':');
            apiActionKey = split[0];
            dataKey = split.length > 0 ? split[1] : split[0];
            if (res[dataKey] !== undefined) {
              this.includeParamsJson[apiActionKey] = res[dataKey];
              this.InitialDataSourceBind(this.includeParamsJson);
              this.initialBindDoneForIncludeParams = true;
            }
          }
        }
      });
    }
    if (this.options.events.length > 0) {
      for (let i = 0; i < this.options.events.length; i++) {
        var currentEvent = this.options.events[i];
        if (currentEvent.EventName === 'Visibilty' && currentEvent.IsReciever) {
          this.visible = false;
          this.registerIsVisible(currentEvent);
          this.registerIsVisibleFirstBind(currentEvent);
          this.jsf.hideParentNode({ layoutIndex: this.layoutIndex });
        } else if (currentEvent.EventName === 'DataSourceBind' && currentEvent.IsReciever) {
          this.dataSrcBind = false;
          this.registerOnBind(currentEvent);
        } else if (currentEvent.EventName === 'SetData' && currentEvent.IsReciever) {
          this.registerOnDataChange(currentEvent);
        } else if (currentEvent.EventName === 'SetProperty' && currentEvent.IsReciever) {
          this.registerOnDataChangeSetProperty(currentEvent);
        } else if (currentEvent.EventName === 'TriggerOnChanges' && currentEvent.IsSender) {
          this.triggerTableAfterChanges = false;
        } else if (currentEvent.EventName === 'SetParamWithModel' && currentEvent.IsSender) {
          this.setValueBindUsingModel(currentEvent);
        } else if (currentEvent.EventName === 'MakeValuesEmpty' && currentEvent.IsSender) {
          this.makeValuesEmpty = true;
        } else if (currentEvent.EventName === 'DefaultValueOnChange' && currentEvent.DefaultValue !== undefined) {
          this.defaultValueOnChange = !currentEvent.InitialLoadSkip;
          this.defaultPropertyName = currentEvent;
        } else {
          this.triggerAfterChanges = true;
          this.afterChangeEvents.push({ eventInitiatorName: currentEvent.EventHandlerOrInitiator });
        }
      }
    }

    this.jsf.dataChanges.subscribe(res => {
      if (res[this.controlName] !== undefined && res[this.controlName] !== null && res[this.controlName] !== '' && !this.initialBindDone && this.dataSrcBind) {
        this.controlValue = res[this.controlName];
        var params = {};
        if (this.IncludeParams) {
          var Includekeys = Object.keys(this.includeParamsJson);
          for (let k = 0; k < Includekeys.length; k++) {
            params[Includekeys[k]] = this.includeParamsJson[Includekeys[k]];
          }
        }
        if (res[this.controlName] !== undefined && res[this.controlName] !== null) params['BindValue'] = res[this.controlName];
        if(!this.defaultValueOnChange){
          this.InitialDataSourceBind(params);
          this.initialBindDone = true;
          if(this.defaultPropertyName !== undefined && this.defaultPropertyName.InitialLoadSkip !== undefined && this.defaultPropertyName.InitialLoadSkip){
            this.defaultValueOnChange = true;
          }
        }
      }
    });
  }
  registerIsVisibleFirstBind(currentEvent) {
    this.jsf.dataChanges.subscribe(res => {
      if (res[currentEvent.DependentKeyName] !== undefined && res[currentEvent.DependentKeyName] !== null && !this.IsFirstBindVisibleDone) {
        var obj = {};
        obj['data'] = {};
        if (currentEvent.DependentKeyConditionalValue.indexOf('checked') > -1) {
          obj['data']['checked'] = res[currentEvent.DependentKeyName].toString();
        } else obj['data'][currentEvent.DependentKeyName] = res[currentEvent.DependentKeyName].toString();
        this.setVisibility(currentEvent, obj);
        this.IsFirstBindVisibleDone = true;
      }
    });
  }

  setVisibility(event, res) {
    var key = '';
    var value = '';
    if (event.DependentKeyConditionalValue.indexOf(' neq ') > -1) {
      var splits = event.DependentKeyConditionalValue.split(' neq ');
      key = splits[0].trim();
      value = splits.length > 1 ? splits[1].trim() : '';

      if (res.data[key] === value) {
        this.visible = false;
        this.jsf.hideParentNode({ layoutIndex: this.layoutIndex });
      } else {
        this.visible = true;
        this.jsf.showParentNode({ layoutIndex: this.layoutIndex });
      }
    } else if (event.DependentKeyConditionalValue.indexOf(' eq ') > -1) {
      var splits = event.DependentKeyConditionalValue.split(' eq ');
      key = splits[0].trim();
      value = splits.length > 1 ? splits[1].trim() : '';

      if (res.data[key] === value) {
        this.visible = true;
        this.jsf.showParentNode({ layoutIndex: this.layoutIndex });
      } else {
        this.visible = false;

        this.jsf.hideParentNode({ layoutIndex: this.layoutIndex });
      }
    } else if (res.data == event.DependentKeyConditionalValue) {
      this.visible = true;
      this.jsf.showParentNode({ layoutIndex: this.layoutIndex });
    } else {
      this.visible = false;

      this.jsf.showParentNode({ layoutIndex: this.layoutIndex });
    }
  }
  backspacePress(event) {
    this.options.showErrors = true;
    this.jsf.updateValue(this, -1);
  }
  /**
   * The function called when the autocomplete event of the matInput is fired
   * @param event
   */
  public checkAutoComplete(event) {
    this.options.showErrors = true;
    if(event.target.value.length === 0){
      this.jsf.updateValue(this, 0);
      this.selectList=[];
      this.tooltip='';
    }
    this.triggerTableAfterChanges =
      this.options.events.filter(x => {
        return x.EventName === 'TriggerOnChanges';
      }).length > 0
        ? true
        : false;
      if(this.triggerTableAfterChanges){
        this.options.events.forEach(element => {
          if(element.EventName === 'TriggerOnChanges' && (element.IsNonInitialCalls !== undefined || element.IsNonInitialCallsEdit !== undefined)){
            element.IsNonInitialCalls = false;
            if(element.IsNonInitialCallsEdit !== undefined )
              {
                element.IsNonInitialCallsEdit = false;
              }
          }
        });
      }
      if (this.defaultValueOnChange){
        if(event.target.value.length === 0){
            if (this.triggerTableAfterChanges) {
              this.updateValueOnResponse({});
            }
        }
      }
    this.buildSRCForAutoComplete(event.target.value);
  }
  registerOnDataChangeSetProperty(event) {
    this.jsf.receive(event.EventHandlerOrInitiator).subscribe(res => {
      if ((event.DependentKeyType == undefined || event.DependentKeyType == 'single') && event.DependentKeyConditionalValue !== '' && event.DependentKeyConditionalValue.indexOf(':')) {
        var splitsEvent = event.DependentKeyConditionalValue.split(':');
        var property = splitsEvent.length > 1 ? splitsEvent[0].trim() : '';
        var condition = splitsEvent.length > 1 ? splitsEvent[1] : '';
        if (property.toLowerCase() === 'required') {
          var key = '';
          var value = '';
          if (condition.indexOf(' neq ') > -1) {
            var splits = condition.split(' neq ');
            key = splits[0].trim();
            value = splits.length > 1 ? splits[1].trim() : '';

            if (res.data[key] === value) {
              this.required = true;
              this.options.showErrors = true;
              var indexOf = this.jsf.schema.required.findIndex(x => x === this.controlId);
              if (indexOf === -1) {
                var copyArr = this.jsf.schema.required.slice();
                copyArr.push(this.controlId);

                this.jsf.schema.required = [];
                this.jsf.schema.required = copyArr;
              }
            } else {
              this.required = false;
              var indexOf = this.jsf.schema.required.findIndex(x => x === this.controlId);
              if (indexOf > -1) {
                var copyArr = this.jsf.schema.required.slice();
                copyArr.splice(indexOf, 1);

                this.jsf.schema.required = [];
                this.jsf.schema.required = copyArr;
              }
            }
          } else if (condition.indexOf(' eq ') > -1) {
            var splits = condition.split(' eq ');
            key = splits[0].trim();
            value = splits.length > 1 ? splits[1].trim() : '';

            if (res.data[key] === value) {
              this.required = true;
              this.options.required = true;
              this.formControl.setValidators([Validators.required]);
              this.options.showErrors = true;
              var indexOf = this.jsf.schema.required.findIndex(x => x === this.controlId);
              if (indexOf === -1) {
                var copyArr = this.jsf.schema.required.slice();
                copyArr.push(this.controlId);

                this.jsf.schema.required = [];
                this.jsf.schema.required = copyArr;
              }
            } else {
              this.required = false;

              this.options.required = false;
              this.formControl.setValidators([]);

              var indexOf = this.jsf.schema.required.findIndex(x => x === this.controlId);
              if (indexOf > -1) {
                var copyArr = this.jsf.schema.required.slice();
                copyArr.splice(indexOf, 1);

                this.jsf.schema.required = [];
                this.jsf.schema.required = copyArr;
              }
            }
          }
        } else if (property.toLowerCase() === 'disabled') {
          var key = '';
          var value = '';
          if (condition.indexOf(' neq ') > -1) {
            var splits = condition.split(' neq ');
            key = splits[0].trim();
            value = splits.length > 1 ? splits[1].trim() : '';

            if (res.data[key] !== value) {
              this.disabled = true;
              this.controlName = '';
              this.tooltip = '';
              this.controlBindValue = '';
              this.jsf.updateValue(this, -1);
            } else {
              this.disabled = false;
            }
          } else if (condition.indexOf(' eq ') > -1) {
            var splits = condition.split(' eq ');
            key = splits[0].trim();
            value = splits.length > 1 ? splits[1].trim() : '';

            if (res.data[key] === value) {
              this.disabled = true;
              this.controlName = '';
              this.tooltip = '';
              this.controlBindValue = '';
              this.jsf.updateValue(this, -1);
            } else {
              this.disabled = false;
            }
          }
        }
      } else if (event.DependentKeyType == 'multiple') {
        event.DependentKeyConditionalValue.forEach(multielement => {
          var splitsEvent = multielement.split(':');
          var property = splitsEvent.length > 1 ? splitsEvent[0].trim() : '';
          var condition = splitsEvent.length > 1 ? splitsEvent[1] : '';
          if (property.toLowerCase() === 'required') {
            var key = '';
            var value = '';
            if (condition.indexOf(' neq ') > -1) {
              var splits = condition.split(' neq ');
              key = splits[0].trim();
              value = splits.length > 1 ? splits[1].trim() : '';

              if (res.data[key] === value) {
                this.required = true;
                this.options.showErrors = true;
                var indexOf = this.jsf.schema.required.findIndex(x => x === this.controlId);
                if (indexOf === -1) {
                  var copyArr = this.jsf.schema.required.slice();
                  copyArr.push(this.controlId);

                  this.jsf.schema.required = [];
                  this.jsf.schema.required = copyArr;
                }
              } else {
                this.required = false;
                var indexOf = this.jsf.schema.required.findIndex(x => x === this.controlId);
                if (indexOf > -1) {
                  var copyArr = this.jsf.schema.required.slice();
                  copyArr.splice(indexOf, 1);

                  this.jsf.schema.required = [];
                  this.jsf.schema.required = copyArr;
                }
              }
            } else if (condition.indexOf(' eq ') > -1) {
              var splits = condition.split(' eq ');
              key = splits[0].trim();
              value = splits.length > 1 ? splits[1].trim() : '';

              if (res.data[key] === value) {
                this.required = true;
                this.options.required = true;
                this.formControl.setValidators([Validators.required]);
                this.options.showErrors = true;
                var indexOf = this.jsf.schema.required.findIndex(x => x === this.controlId);
                if (indexOf === -1) {
                  var copyArr = this.jsf.schema.required.slice();
                  copyArr.push(this.controlId);

                  this.jsf.schema.required = [];
                  this.jsf.schema.required = copyArr;
                }
              } else {
                this.required = false;

                this.options.required = false;
                this.formControl.setValidators([]);

                var indexOf = this.jsf.schema.required.findIndex(x => x === this.controlId);
                if (indexOf > -1) {
                  var copyArr = this.jsf.schema.required.slice();
                  copyArr.splice(indexOf, 1);

                  this.jsf.schema.required = [];
                  this.jsf.schema.required = copyArr;
                }
              }
            }
          } else if (property.toLowerCase() === 'disabled') {
            var key = '';
            var value = '';
            if (condition.indexOf(' neq ') > -1) {
              var splits = condition.split(' neq ');
              key = splits[0].trim();
              value = splits.length > 1 ? splits[1].trim() : '';

              if (res.data[key] !== value) {
                this.disabled = true;
                this.controlName = '';
                this.tooltip = '';
                this.controlBindValue = '';
                this.jsf.updateValue(this, -1);
              } else {
                this.disabled = false;
              }
            } else if (condition.indexOf(' eq ') > -1) {
              var splits = condition.split(' eq ');
              key = splits[0].trim();
              value = splits.length > 1 ? splits[1].trim() : '';

              if (res.data[key] === value) {
                this.disabled = true;
                this.controlName = '';
                this.tooltip = '';
                this.controlBindValue = '';
                this.jsf.updateValue(this, -1);
              } else {
                this.disabled = false;
              }
            }
          }
        });
      }

    });
  }

  registerOnBindDefaultValueOnChange(event) {

    event.DependentPropertyName.forEach(element => {
      var splits = element.split(':');
      var key = splits[0];
      var value = splits.length > 1 ? splits[1] : '';
      this.dataSrcParams[key] = this.jsf.getData()[value] !== undefined && this.jsf.getData()[value] !== null ? this.jsf.getData()[value] : 0;
    });
  }

  registerOnBind(event) {
    this.jsf.receive(event.EventHandlerOrInitiator).subscribe(res => {
      var key = '';
      var value = '';
      var binding = false;
      var emptyValues = false;

      if ((event.DependentKeyType == undefined || event.DependentKeyType == 'single') && event.DependentKeyConditionalValue.indexOf(':') > -1) {
        var splits = event.DependentKeyConditionalValue.split(':');
        key = splits[0];
        value = splits.length > 1 ? splits[1] : '';

        var paramvalue = res.data[value];
        // var paramsToApi = {};
        this.dataSrcParams[key] = paramvalue;
        binding = true;
      } else if (event.DependentKeyType == 'multiple') {
        binding = true;
        var resultValue;
        event.DependentKeyConditionalValue.forEach(element => {
          var splits = element.split(':');
          key = splits[0];
          value = splits.length > 1 ? splits[1] : '';

          resultValue = res.data[value] === undefined ? this.jsf.getData()[value] : res.data[value];

          var paramvalue = key === 'movementDate' ? moment(this.jsf.getData().MovementDate).format('YYYY-MM-DD') : resultValue;
          // var paramsToApi = {};
          this.dataSrcParams[key] = paramvalue;
        });
      }
      //To make the lookup empty - FA OM add screen
      if (event.EmptyTheValue !== undefined && event.EmptyTheValue) {
        this.controlBindValue = '';
        this.controlValue = '';
        this.selectList = [];
        emptyValues = true;
      }
      if (event.IsNonInitialCalls !== undefined && event.IsNonInitialCalls) {
        this.initialBindDone = true;
      }
      if (binding) {
        if (!this.initialBindDone) {
          var params = {};
          if (this.IncludeParams) {
            var Includekeys = Object.keys(this.includeParamsJson);
            for (let k = 0; k < Includekeys.length; k++) {
              params[Includekeys[k]] = this.includeParamsJson[Includekeys[k]];
            }
          }
          if (this.controlValue !== undefined && this.controlValue !== null) params['BindValue'] = this.controlValue;
          if (!emptyValues) {
            this.InitialDataSourceBind(params);
            this.initialBindDone = true;
          }
          // this.InitialDataSourceBind({ "BindValue": this.controlValue });
        } else {
          var params = {};
          if (event.IsInitialLoadOnly !== undefined) {
            if (event.IsInitialLoadOnly) {
              event.IsInitialLoadOnly = false;
              this.controlValue = this.dataSrcParams['BindValue'];
              this.controlBindValue = this.dataSrcParams['StartsWith'];
              params['BindValue'] = this.dataSrcParams['BindValue'];
              delete this.dataSrcParams['BindValue'];
              this.InitialDataSourceBind(params);
            }else{
              this.dataSrcParams = {};
            }
          } else if (event.ChangeOnlyOnFirstBind !== undefined) {
            this.dataSrcParams = {}; //In the UOMs startswith retain old values
            if(this.selectList.length > 0){
              this.selectList.forEach(item => {
                if(this.controlBindValue === item.Name){
                  this.controlValue = item.Id;
                  this.formControl.setValue(item.Id);
                }
              });
            }
          } //Data binds only on first bind; Refer OtherMovements UOMs
          else if (event.IsNonInitialCalls !== undefined && event.IsNonInitialCalls) {
            event.IsNonInitialCalls = false;
          } else if (!emptyValues && this.dataSrcParams['StartsWith'] !== undefined && this.controlBindValue == '') {
            if (this.controlValue !== undefined && this.controlValue !== null && this.controlValue !== '') {
              params['BindValue'] = this.controlValue > 0 ? this.controlValue : 0;
              this.controlBindValue = '';
              this.InitialDataSourceBind(params);
            } else {
              var valuetosearch = this.dataSrcParams['StartsWith']; //refer FA UOM mass/volume initially loads from deliveryId and then typed word
              this.buildSRCForAutoComplete(valuetosearch);
              delete this.dataSrcParams['StartsWith'];
              this.triggerTableAfterChanges = true; //used to trigger 'TriggerOnchanges' refer FA add popups
            }
          } else if (!emptyValues && this.dataSrcParams['StartsWith'] !== undefined && this.controlBindValue !== '' && this.controlValue !== undefined && this.controlValue !== null) {
            params['BindValue'] = this.controlValue > 0 ? this.controlValue : 0;
            this.controlBindValue = '';
            this.InitialDataSourceBind(params);
          } else {
            this.controlBindValue = '';
            this.tooltip = '';
            this.selectList = [];
            this.jsf.updateValue(this, null);
            if (!emptyValues) {
              this.InitialDataSourceBind({}); //below function not triggering API because always controlBindValue is empty
            }
            // this.buildSRCForAutoComplete(this.controlBindValue);
          }
        }
      }
    });
  }
  registerOnDataChange(event) {
    this.jsf.receive(event.EventHandlerOrInitiator).subscribe(res => {
      var key = '';
      var value = '';

      if (event.DependentKeyConditionalValue.indexOf('then') > -1) {
        var splitByThen = event.DependentKeyConditionalValue.split('then');
        var condition = splitByThen[0];
        var otherHalf = splitByThen[1].split('else');
        var thenValue = otherHalf[0];
        var elseValue = otherHalf.length > 1 ? otherHalf[1] : '';
        var splits = condition.split('eq');
        key = splits[0].trim();
        value = splits.length > 1 ? splits[1].trim() : '';
        if (res.data[key] === value) {
          var splitThen = thenValue.split(':');
          var splitKey = splitThen[0].trim();
          var splitValue = splitThen.length > 1 ? splitThen[1].trim() : '';
          var currentItem = this.selectList.find(x => x[splitKey] == splitValue);
          if (currentItem !== undefined) {
            this.controlValue = currentItem[this.options.controlValue];
            // this.controlName = this.controlValue;
            this.updateValue(currentItem);
          }
        } else {
          var splitElse = elseValue.split(':');
          var splitKey = splitElse[0].trim();
          var splitValue = splitElse.length > 1 ? splitElse[1].trim() : '';
          var currentItem = this.selectList.find(x => x[splitKey] == splitValue);
          if (currentItem !== undefined) {
            this.controlValue = currentItem[this.options.controlValue];
            // this.controlName = this.controlValue;

            this.updateValue(currentItem);
          }
        }
      } else if (event.DependentKeyConditionalValue !== '' && res['data'] !== undefined) {
        this.jsf.updateValue(this, res['data'][event.DependentKeyConditionalValue]);
      }
    });
  }

  registerIsVisible(event) {
    this.jsf.receive(event.EventHandlerOrInitiator).subscribe(res => {
      this.setVisibility(event, res);
    });
  }

  InitialDataSourceBind(params = {}) {
    var keys = Object.keys(this.dataSrcParams);
    for (let k = 0; k < keys.length; k++) {
      if (keys[k] !== 'BindValue') params[keys[k]] = this.dataSrcParams[keys[k]];
    }
    if (this.dataSrcParams['StartsWith'] !== undefined) {
      delete this.dataSrcParams['StartsWith'];
    }
    if (this.options.counterpartTypeForSite !== undefined && this.options.counterpartTypeForSite === true) {
      params['IsCustomer'] = this.jsf.getData()['CounterpartyTypeName'] === 'Trucking Company' ? false : true;
    }
    // this.objBackedn.performHTTPOperation(this.options.tableName, this.options.TenantId, params).subscribe((res: any) => {
    //   if (res !== undefined) {
    //     setTimeout(() => {
    //       // var items=<any>res.Items;
    //       if (res['Items'] !== undefined) {
    //         var items = <any>res.Items;

    //         this.selectList = items;
    //       } else {
    //         this.selectList = res;
    //       }
    //       if (this.controlValue !== undefined && this.controlValue !== null) {
    //         var currentItem = this.selectList.find(x => x[this.options.controlValue] == this.controlValue);
    //         if (currentItem === undefined) {
    //           if(this.options.selectFirstOption !== undefined && this.options.selectFirstOption){
    //             this.options.selectFirstOption = false;//FA transfer edit - Second time calling UOM on change
    //             this.updateValue({Id:this.controlValue,Name:this.controlBindValue});
    //           }else if (this.options.defaultSelect !== undefined && this.options.defaultSelect){
    //             this.controlBindValue = this.selectList.length > 0 ? this.selectList[0][this.options.controlName] : '';
    //             this.updateValue(this.selectList[0]);
    //           }else{
    //             this.controlName = '';
    //             this.tooltip = '';
    //             this.controlValue = '';
    //           }
    //         } else {
    //           this.controlBindValue = currentItem[this.options.controlName];
    //           this.updateValue(currentItem);
    //         }
    //       }
    //     },400);
    //   }
    // });
  }

  /**Builds the Dropdown Source based on the TableName given in the configurable UI Schema */
  buildSRCForAutoComplete(valuetosearch, params = {}): any {
    if (this.IncludeParams) {
      params[this.options.IncludeIdParamsKey] = this.controlValue;
      var Includekeys = Object.keys(this.includeParamsJson);
      for (let k = 0; k < Includekeys.length; k++) {
        params[Includekeys[k]] = this.includeParamsJson[Includekeys[k]];
      }
    }
    if (this.options.tableName !== undefined && this.options.tableName !== '' && valuetosearch !== '' && valuetosearch.length > 1) {
      params['Skip'] = 0;
      // valuetosearch = toQueryString({StartsWith: valuetosearch}).split('=')[1];
      params['StartsWith'] = valuetosearch;
      // this.jsf.updateValue(this, 0);
      // console.log(Object.keys(this.dataSrcParams).length);
      if (this.defaultValueOnChange){
        if(valuetosearch.length > 0){
          this.registerOnBindDefaultValueOnChange(this.defaultPropertyName);
        }
      }

      var keys = Object.keys(this.dataSrcParams);
      for (let k = 0; k < keys.length; k++) {
        params[keys[k]] = keys[k] === 'movementDate' ? moment(this.jsf.getData().MovementDate).format('YYYY-MM-DD') : this.dataSrcParams[keys[k]];
      }

      // this.dataSrcParams[key] = paramvalue;

      if (this.options.counterpartTypeForSite !== undefined && this.options.counterpartTypeForSite === true) {
        params['IsCustomer'] = this.jsf.getData()['CounterpartyTypeName'] === 'Trucking Company' ? false : true;
      }

      // this.objBackedn.performHTTPOperation(this.options.tableName, this.options.TenantId, params).subscribe((res: any) => {
      //   if (res !== undefined) {
      //     // var items=<any>res.Items;
      //     if (res['Items'] !== undefined) {
      //       var items = <any>res.Items;

      //       this.selectList = items;
      //       if (this.selectList.length === 0) {
      //         this.selectList = [];

      //         this.controlBindValue = '';
      //         //this.toastr.warning('', 'Entered Value is not available');
      //         this.tooltip = '';
      //         this.jsf.updateValue(this, null);
      //       }
      //     } else {
      //       this.selectList = res;
      //     }
      //   }
      // });
    }
  }
  /**Updates the Value to the Model */
  updateValue(event) {
    this.jsf.setModelValuesFromResponse(event);
    this.tooltip = event[this.options.controlName];
    this.controlBindValue = event[this.options.controlName];
    this.options.showErrors = true;
    this.jsf.updateValue(this, event[this.options.controlValue]);
    this.triggerTableAfterChanges =
      this.options.events.filter(x => {
        return x.EventName === 'TriggerOnChanges';
      }).length > 0
        ? true
        : false;
    if(this.options.removeSelectList !== undefined && this.options.removeSelectList ){
      this.selectList = []; //FA transfer movements, avoid duplicate tanks in in&out
    }
    if (this.triggerTableAfterChanges) {
      this.updateValueOnResponse(event);
    } else if (this.triggerAfterChanges) {
      for (let i = 0; i < this.afterChangeEvents.length; i++) {
        this.jsf.send(this.afterChangeEvents[i].eventInitiatorName, event);
      }
    }
    if (this.afterFirstBindOfAllFields) {
      //Not using IntitalBindDone coz it becomes true even before updateValue() is called
      if (this.makeValuesEmpty) {
        this.emptyTheValues();
      }
    }
    this.afterFirstBindOfAllFields = true;
  }

  updateValuefromEnter(obj) {
    var event = this.selectList.find(x => x[this.options.controlValue] == obj.currentTarget.value);
    if (event !== undefined && event !== null) {
      this.updateValue(event);
    }
  }
  updateValueOnResponse(trigEvent) {
    if (this.options.events.length > 0) {
      var count = 0; var apicount = 0;
      for (let i = 0; i < this.options.events.length; i++) {
        if (this.options.events[i].EventName === 'TriggerOnChanges' && this.options.events[i].IsSender && this.options.events[i].DependentKeyType == 'multiple') {
          count = count+1;
          let params: any = {};
          let triggerApi = true;
          if (this.options.events[i].IsNonInitialCalls !== undefined && this.options.events[i].IsNonInitialCalls) {
            this.options.events[i].IsNonInitialCalls = false;
            triggerApi = false;
          }else if(this.options.events[i].IsNonInitialCallsEdit !== undefined && this.options.events[i].IsNonInitialCallsEdit) {
            this.options.events[i].IsNonInitialCallsEdit = false;
            triggerApi = false;
          }
          this.options.events[i].DependentKeyConditionalValue.forEach(element => {
            if (element.indexOf(':') > -1) {
              var splits = element.split(':');
              var key = splits[0];
              var value = splits.length > 1 ? splits[1] : '';
              if (this.jsf.getFormGroupControlValue(value) !== undefined && this.jsf.getFormGroupControlValue(value).value !== null) {
                var modelValue = this.jsf.getFormGroupControlValue(value).value !== null ? this.jsf.getFormGroupControlValue(value).value : '0';
                var paramvalue = key === 'movementDate' ? moment(this.jsf.getData().MovementDate).format('YYYY-MM-DD') : modelValue;

                params[key] = paramvalue;
              } else {
                triggerApi = false;
                return;
              }
              // params[key] = this.jsf.getData()[value];
            } else if (element.indexOf('=') > -1) {
              var splits = element.split('=');
              var key = splits[0];
              var value = splits.length > 1 ? splits[1] : '';
              params[key] = value;
            }
          });
          //Below one i used for post method UOM conversion - FA
          if (triggerApi) {
            // this.objBackedn.performHTTPOperation(this.options.events[i].anotherTable, this.options.TenantId, params).subscribe((res: any) => {
            //   if (res !== undefined) {
            //     this.jsf.setModelValuesFromResponse(res);
            //     apicount = apicount+1;
            //     if(count === apicount){
            //       this.afterTriggerChanges(trigEvent);
            //     }
            //   }
            // });
          }else{
            apicount = apicount+1;
            if(count === apicount){
              this.afterTriggerChanges(trigEvent);
            }
          }
        }
      }
    }
  }
  afterTriggerChanges(trigEvent){
    if (this.triggerAfterChanges) {
      for (let i = 0; i < this.afterChangeEvents.length; i++) {
        this.jsf.send(this.afterChangeEvents[i].eventInitiatorName, trigEvent);
      }
    }
  }
  setValueBindUsingModel(event) {
    var key = '';
    var value = '';
    var binding = false;
    var modelDatas = this.jsf.getData();
    if ((event.DependentKeyType == undefined || event.DependentKeyType == 'single') && event.DependentKeyConditionalValue.indexOf(':') > -1) {
      var splits = event.DependentKeyConditionalValue.split(':');
      key = splits[0];
      value = splits.length > 1 ? splits[1] : '';

      var paramvalue = this.jsf.getData()[value];
      // var paramsToApi = {};
      this.dataSrcParams[key] = paramvalue;
      binding = true;
    } else if (event.DependentKeyType == 'multiple') {
      binding = true;
      event.DependentKeyConditionalValue.forEach(element => {
        var splits = element.split(':');
        key = splits[0];
        value = splits.length > 1 ? splits[1] : '';
        var modelValue = this.jsf.getData()[value] !== undefined && this.jsf.getData()[value] !== null ? this.jsf.getData()[value] : '0';
        var paramvalue = key === 'movementDate' ? moment(this.jsf.getData().MovementDate).format('YYYY-MM-DD') : modelValue;
        // var paramsToApi = {};
        this.dataSrcParams[key] = paramvalue;
      });
    }
    if (binding) {
      this.InitialDataSourceBind({});
    }
  }
  emptyTheValues() {
    if (this.options.events.length > 0) {
      for (let i = 0; i < this.options.events.length; i++) {
        if (this.options.events[i].EventName === 'MakeValuesEmpty' && this.options.events[i].IsSender && this.options.events[i].DependentKeyType == 'multiple') {
          let params: any = {};
          let triggerApi = true;
          this.options.events[i].DependentKeyConditionalValue.forEach(element => {
            var key = element.key;
            var value = element.value;
            params[key] = value;
          });
          // console.log("emptyValues",params);
          this.jsf.setModelValuesFromResponse(params);
        }
      }
    }
  }

  searchTankPopup() {
    const dialogRef = this.dialog.open(TankPopupComponent, {
      width: '926px',
      minHeight: '360px',
      maxHeight: '500px'
    });

    dialogRef.afterClosed().subscribe(result => { 
      console.log(`Dialog result: ${result}`);
    });
  }
}
