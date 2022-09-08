import { Component, Input, OnInit, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core'; 
import { AbstractControl } from '@angular/forms';  
import { JsonSchemaFormService } from '../JSONSchemaForm/json-schema-form.service';
// import { BackendService } from '../services/backend/backend.service'; 
import 'rxjs/add/operator/toPromise';

@Component({ 
  template: `
    <mat-form-field *ngIf="this.visible && !this.options.softWarning && this.options.isVisible"  [ngClass]="(options?.formFieldClass)?options.formFieldClass:''">
      <input
        type="text"
        matInput
        [id]="this.layoutNode.name"
        [placeholder]="options?.notitle ? options?.placeholder : options?.title"
        name="{{ this.layoutNode.name }}"
        (change)="updateValue($event)"
        [required]="this.visible && options?.required"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [matTooltip]="controlValue"
        [matTooltipShowDelay]="500"
        [matTooltipPosition]="'below'"
        [disabled]="controlDisabled || options?.readonly"
        (blur)="options.showErrors = true"
        [value]="options?.isPrecision ? (controlValue | number: precision) : controlValue"
      />
    </mat-form-field>

    <mat-form-field *ngIf="this.visible && this.options.softWarning && this.options.isVisible" [ngClass]="(options?.formFieldClass)?options.formFieldClass:''">
      <input
        type="text"
        matInput
        [placeholder]="options?.notitle ? options?.placeholder : options?.title"
        name="{{ this.layoutNode.name }}"
        (change)="updateValue($event)"
        [required]="this.visible && options?.required"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [matTooltip]="controlValue"
        [matTooltipShowDelay]="500"
        [matTooltipPosition]="'below'"
        [disabled]="controlDisabled || options?.readonly"
        (blur)="options.showErrors = true"
        [value]="options?.isPrecision ? (controlValue | number: precision) : controlValue"
      />
      <mat-icon matSuffix [matTooltip]="this.options.softWarningMessage" [matTooltipShowDelay]="500" [matTooltipPosition]="'below'">error_outline</mat-icon>
    </mat-form-field>
    <mat-error *ngIf="this.visible && options?.showErrors && options?.errorMessage && this.options.isVisible" [innerHTML]="options?.errorMessage" style="position:relative; top: 0px;font-size:12px;"></mat-error>
  `,
  selector: 'app-input-textbox',
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
 * Input Component For configurable UI
 */
export class InputTextBoxComponent implements OnInit, OnChanges, AfterViewInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: string;
  controlDisabled = false;
  precision: string;
  qtyPrecision: any;
  boundControl = false;
  options: any;
  autoCompleteList: string[] = [];
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];
  visible = true;
  triggerAfterChanges = false;
  afterChangeEvents = [];
  IsFirstBindVisibleDone = false;
  triggerTableAfterChanges:boolean =false;
  tenantId:string=localStorage.getItem('TenantId');
  // constructor(private jsf: JsonSchemaFormService,private objBackedn: BackendService) {}
  constructor(private jsf: JsonSchemaFormService) {}

  ngOnChanges(changes: SimpleChanges) {}
  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this);
    // this.options.showErrors = true;
    if (this.options.events.length > 0) {
      for (let i = 0; i < this.options.events.length; i++) {
        var currentEvent = this.options.events[i];
        if (currentEvent.EventName === 'Visibilty' && currentEvent.IsReciever) {
          this.visible = false;
          this.registerIsVisible(currentEvent);
          this.registerIsVisibleFirstBind(currentEvent);
          this.jsf.hideParentNode({ layoutIndex: this.layoutIndex });
        } else if (currentEvent.EventName === 'SetData' && currentEvent.IsReciever) {
          this.registerOnDataChange(currentEvent);
        } else if (currentEvent.EventName === 'TriggerOnChanges' && currentEvent.IsSender) {
          this.triggerTableAfterChanges = true;
        }else {
          this.triggerAfterChanges = true;
          this.afterChangeEvents.push({ eventInitiatorName: currentEvent.EventHandlerOrInitiator });
        }
      }
    }
  }
  ngAfterViewInit(){
    if(localStorage.getItem('generalSettings') === null){
      // this.objBackedn.performHTTPOperation('Get_TenantSettings', this.tenantId, { Module: "General" }).subscribe(res => {
      //   if (res) {
      //     this.qtyPrecision = res.settings.quantityPrecision;
      //     this.precision = `1.${this.qtyPrecision}`;
      //   }
      // });
    }else{
      this.qtyPrecision =  JSON.parse(localStorage.getItem('generalSettings')).settings.quantityPrecision;    
      this.precision = `1.${this.qtyPrecision}`;
    }
    
  }
  registerOnDataChange(event) {
    this.jsf.receive(event.EventHandlerOrInitiator).subscribe(res => {
      if (event.DependentKeyConditionalValue !== '' && res['data'] !== undefined) {
        this.jsf.updateValue(this, res['data'][event.DependentKeyConditionalValue]);
      }
    });
  }
  registerIsVisibleFirstBind(currentEvent) {
    this.jsf.dataChanges.subscribe(res => {
      if (res[currentEvent.DependentKeyName] !== undefined && res[currentEvent.DependentKeyName] !== null && res[currentEvent.DependentKeyName] && !this.IsFirstBindVisibleDone) {
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
  /**
   * updates the value to the model
   * @param event
   */
  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
    if (this.triggerAfterChanges) {
      for (let i = 0; i < this.afterChangeEvents.length; i++) {
        this.jsf.send(this.afterChangeEvents[i].eventInitiatorName, event.target.value);
      }
    }
    if(this.triggerTableAfterChanges){
      this.updateValueOnResponse();
    }
  }

  updateValueOnResponse(){    
    if (this.options.events.length > 0) {
      for (let i = 0; i < this.options.events.length; i++) {
        if(this.options.events[i].EventName === 'TriggerOnChanges' && this.options.events[i].IsSender && this.options.events[i].DependentKeyType == 'multiple'){
          let params:any={};
          this.options.events[i].DependentKeyConditionalValue.forEach(element => {
            if(element.indexOf(':') > -1){
              var splits = element.split(':');
              var key = splits[0];
              var value = splits.length > 1 ? splits[1] : '';
              params[key] = this.jsf.getFormGroupControlValue(value) !== undefined && this.jsf.getFormGroupControlValue(value) !== null  ? this.jsf.getFormGroupControlValue(value).value : '0';
            }else if(element.indexOf('=') > -1){
              var splits = element.split('=');
              var key = splits[0];
              
              var value = splits.length > 1 ? splits[1] : '';
              params[key] = value; 
            }           
          });
        // //Below one i used for post method UOM conversion - FA 
        //   this.objBackedn.performHTTPOperation(this.options.events[i].anotherTable, this.options.TenantId,params).subscribe((res: any) => {
        //     if (res !== undefined) {
        //       this.jsf.setModelValuesFromResponse(res);              
        //     }
        //   });
        }
      }
    } 
  }
}
