import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { JsonSchemaFormService } from '../JSONSchemaForm/json-schema-form.service';
// import { BackendService } from '../services/backend/backend.service';
import 'rxjs/add/operator/toPromise';

@Component({
  template: `
    <mat-form-field *ngIf="this.visible && this.options.isVisible" [ngClass]="(options?.formFieldClass)? options.formFieldClass : ''">
      <input
        type="number"
        matInput
        [id]="this.layoutNode.name"
        [placeholder]="options?.notitle ? options?.placeholder : options?.title"
        name="{{ this.layoutNode.name }}"
        (change)="updateValue($event)"
        (blur)="options.showErrors = true"
        [required]="this.visible && options?.required"
        (blur)="options.showErrors = true"
        [(ngModel)]="controlValue"
        [value]="controlValue"
        [ngStyle]="{'width':(options?.combinedFieldCount)==2?'70%':(options?.combinedFieldCount)==3?'40%':'100%'}"
      />
    </mat-form-field>

    <mat-error *ngIf="this.visible && options?.showErrors && options?.errorMessage && this.options.isVisible" [innerHTML]="options?.errorMessage" style="position:relative; top: 0px;font-size:12px;"></mat-error>
  `,
  selector: 'app-number-input',
  styles: [
    `
      .fa-pencil:before {
        color: #b2adad;
      }
      .fa-pencil {
        color: #b2adad;
      }
    `
  ]
})
/**
 * Number Input Component For Configurable UI
 */
export class NumberInputComponent implements OnInit {
  tenantDefaultKey = 'PRICEPRECISION';
  precision = 3;
  formControl: AbstractControl;
  controlName: string;
  controlValue: string;
  controlDisabled = false;
  boundControl = false;
  options: any;
  autoCompleteList: string[] = [];
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];
  visible = true;
  triggerAfterChanges = false;
  afterChangeEvents = [];
  controlType = 'numberinput';
  IsFirstBindVisibleDone = false;
  isNegativeCheck:boolean = false;
  isPositiveCheck:boolean = false;
  isNegativeCheckField:string = '';
  triggerTableAfterChanges:boolean =false;

  // constructor(private jsf: JsonSchemaFormService,private objBackedn: BackendService) {}
  constructor(private jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this);
    // this.formControl.setValidators([Validators.min(this.options.minimum), Validators.max(this.options.maximum)]);
    this.isPositiveCheck = this.options.isPositiveCheck !== undefined ? this.options.isPositiveCheck : false;    
    this.isNegativeCheck = this.options.isNegativeCheck !== undefined ? this.options.isNegativeCheck : false;    
    if(this.isNegativeCheck){
      this.isNegativeCheckField = this.options.isNegativeCheckField;
    }
    // this.options.showErrors = true;
    if (this.options.events.length > 0) {
      for (let i = 0; i < this.options.events.length; i++) {
        var currentEvent = this.options.events[i];
        if (currentEvent.EventName === 'Visibilty' && currentEvent.IsReciever) {
          this.visible = false;
          this.registerIsVisible(currentEvent);
          this.registerIsVisibleFirstBind(currentEvent);
          this.jsf.hideParentNode({ layoutIndex: this.layoutIndex });
        }else if (currentEvent.EventName === 'SetData' && currentEvent.IsReciever) {
          this.registerOnDataChange(currentEvent);
        }else if (currentEvent.EventName === 'TriggerOnChanges' && currentEvent.IsSender) {
          this.triggerTableAfterChanges = true;
        }else {
          this.triggerAfterChanges = true;
          this.afterChangeEvents.push({ eventInitiatorName: currentEvent.EventHandlerOrInitiator });
        }
      }
    }
  }

  registerOnDataChange(event) {
    this.jsf.receive(event.EventHandlerOrInitiator).subscribe(res => {
      if (event.DependentKeyConditionalValue !== '' && res['data'] !== undefined) {
        if(this.isPositiveCheck && res['data'] < 0)
          this.jsf.updateValue(this, res['data']*-1);
        else
        this.jsf.updateValue(this, res['data']);
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
      if(res.data[key] !== undefined) {
        if (res.data[key].toString() === value) {
          this.visible = true;

          this.jsf.showParentNode({ layoutIndex: this.layoutIndex });
        } else {
          this.visible = false;
          this.jsf.hideParentNode({ layoutIndex: this.layoutIndex });
        }
      }
    } else if (res.data == event.DependentKeyConditionalValue) {
      this.visible = true;
      this.jsf.showParentNode({ layoutIndex: this.layoutIndex });
    } else {
      this.visible = false;

      this.jsf.hideParentNode({ layoutIndex: this.layoutIndex });
    }
  }

  registerIsVisible(event) {
    this.jsf.receive(event.EventHandlerOrInitiator).subscribe(res => {
      this.setVisibility(event, res);
    });
  }
  /**Updates the value to Model */
  updateValue(event) {
    if(event.target.value == ""){
      event.target.value = "0";//Retain 0 for empty values
    }
    if(this.isNegativeCheck && this.jsf.getData()[this.isNegativeCheckField] !== undefined){      
      if((this.jsf.getData()[this.isNegativeCheckField] == 'S' || this.jsf.getData()[this.isNegativeCheckField] === true) && event.target.value > 0){
        this.jsf.updateValue(this, event.target.value*-1);//FA screen add/edit movements
      }else  if((this.jsf.getData()[this.isNegativeCheckField] == 'B' || this.jsf.getData()[this.isNegativeCheckField] === false) && event.target.value < 0){
        this.jsf.updateValue(this, event.target.value*-1);//FA screen add/edit movements
      }else{
        this.jsf.updateValue(this, event.target.value);
      }
    }else if(this.isPositiveCheck && event.target.value < 0){
      this.jsf.updateValue(this, event.target.value*-1);
    }else{
      this.jsf.updateValue(this, event.target.value);
    }
    /**Events Triggering */
    if(this.triggerTableAfterChanges){
      this.updateValueOnResponse(this.controlValue);
    }else if (this.triggerAfterChanges) {
      for (let i = 0; i < this.afterChangeEvents.length; i++) {
        this.jsf.send(this.afterChangeEvents[i].eventInitiatorName, this.controlValue);
      }
    }
  }
  updateValueOnResponse(trigEvent){    
    if (this.options.events.length > 0) {
      for (let i = 0; i < this.options.events.length; i++) {
        if(this.options.events[i].EventName === 'TriggerOnChanges' && this.options.events[i].IsSender && this.options.events[i].DependentKeyType == 'multiple'){
          let params:any={};let triggerApi = true;          
          this.options.events[i].DependentKeyConditionalValue.forEach(element => {
            if(element.indexOf(':') > -1){
              var splits = element.split(':');
              var key = splits[0];
              var value = splits.length > 1 ? splits[1] : '';
              // console.log("new - ",value,'+',this.jsf.getFormGroupControlValue(value));
              var modelValue = this.jsf.getFormGroupControlValue(value) !== undefined && this.jsf.getFormGroupControlValue(value) !== null && this.jsf.getFormGroupControlValue(value).value !== null ? this.jsf.getFormGroupControlValue(value).value : '0';
              params[key] = modelValue;
            }else if(element.indexOf('=') > -1){
              var splits = element.split('=');
              var key = splits[0];
              
              var value = splits.length > 1 ? splits[1] : '';
              params[key] = value; 
            }           
          });
        //Below one i used for post method UOM conversion - FA 
        if(triggerApi){
          // this.objBackedn.performHTTPOperation(this.options.events[i].anotherTable, this.options.TenantId,params).subscribe((res: any) => {
          //   if (res !== undefined) {
          //     this.jsf.setModelValuesFromResponse(res);
          //     if (this.triggerAfterChanges) {
          //       for (let i = 0; i < this.afterChangeEvents.length; i++) {
          //         this.jsf.send(this.afterChangeEvents[i].eventInitiatorName, trigEvent);
          //       }
          //     }
          //   }
          // });
        }
          
        }
      }
    } 
  }
}
