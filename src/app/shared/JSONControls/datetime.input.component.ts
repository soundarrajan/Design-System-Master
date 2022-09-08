import { Component, Input, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../JSONSchemaForm/json-schema-form.service';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'rxjs/add/operator/toPromise';
//import { DateTimeFormatService } from '@techoil/core';
// import { BackendService } from '../services/backend/backend.service';
import * as _moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

const moment = _moment;

//format for material datetimepicker
// export function getMatDateFactory(dateService: DateTimeFormatService): MatDateFormats {
//   return dateService.getMatTenantDateFormat();
// }

// const dateFormat = localStorage.getItem('fedate')? localStorage.getItem('fedate') : 'MM/DD/YYYY';

// const MY_FORMATS = {
//   parse: {
//     dateInput: dateFormat
//   },
//   display: {
//     dateInput: dateFormat,
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY'
//   }
// };

@Component({
  selector: 'app-datetime-input',
  template: `
    <mat-form-field *ngIf="this.visible && this.options.isVisible" 
    [ngClass]="!options?.readonly ? ((options?.formFieldClass)?'json-date-control '+ options.formFieldClass:'json-date-control') : ((options?.formFieldClass)?'date-control'+ options.formFieldClass:'date-control')" 
    [ngStyle]="{'margin-top.px':(options?.formFieldClass)?0:5}">
    <span contenteditable style="outline:none">{{controlValue | date:'MM-dd-yyyy HH:mm'}}</span>
    <input 
    matInput 
    disabled
    [owlDateTime]="dateInputFlde" 
    [placeholder]="options?.title"
    [id]="this.layoutNode.name"    
    [required]="options?.required"     
    [style.width]="'0px'" 
    [style.visibility]="'hidden'"
    [value]="controlValue"
    [name]="controlName"
    (dateTimeInput)="updateValue($event)" />    
    <span *ngIf="!options?.readonly" style="float:right" [owlDateTimeTrigger]="dateInputFlde">
        <i *ngIf="!(options?.customeDateIcon==true)" class="fas fa-calendar-alt"></i>
        <div *ngIf="options?.customeDateIcon==true" class="date-picker-icon"></div>
    </span>
    <owl-date-time #dateInputFlde></owl-date-time>
    
    </mat-form-field>
    <mat-error *ngIf="options?.showErrors && options?.errorMessage && this.options.isVisible" [innerHTML]="options?.errorMessage" style="position:relative; top: 0px;font-size:12px;"></mat-error>
  `,
  styles: [
    `
      ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix {
        width: initial;
      }      
    `
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    // DateTimeFormatService,
    // {
    //   provide: MAT_DATE_FORMATS,
    //   useFactory: getMatDateFactory,
    //   deps: [DateTimeFormatService]
    // }
  ]
})
/**
 * Date Time Component For Configurable UI
 */
export class DateTimeInputComponent implements OnInit, OnChanges {
  tenantDefaultKey = 'DATEFORMAT';
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  dateValue: any;
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
  minDate = new Date(1990, 0, 1);
  triggerTableAfterChanges:boolean =false;

  // constructor(private jsf: JsonSchemaFormService, private dateTimeService: DateTimeFormatService,private objBackedn: BackendService) { }
  constructor(private jsf: JsonSchemaFormService) { }

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    /*if (this.options.FormatSetting !== undefined ) {
      if(this.options.FormatSetting === 'Default'){
        MY_FORMATS.parse.dateInput = this.dateTimeService.getFeDateFormat;
        MY_FORMATS.display.dateInput = this.dateTimeService.getFeDateFormat;
      }
      else{
        MY_FORMATS.parse.dateInput = this.options.FormatSetting;
        MY_FORMATS.display.dateInput = this.options.FormatSetting;
      }
    }*/
    this.jsf.initializeControl(this);
    // this.options.showErrors = true;
    if (this.options.events.length > 0) {
      for (let i = 0; i < this.options.events.length; i++) {
        var currentEvent = this.options.events[i];
        if (currentEvent.EventName === 'Visibilty' && currentEvent.IsReciever) {
          this.visible = false;
          this.registerIsVisible(currentEvent);
          this.jsf.hideParentNode({ layoutIndex: this.layoutIndex });
        } else if (currentEvent.EventName === 'SetData' && currentEvent.IsReciever) {
          this.registerOnDataChange(currentEvent);
        } else if (currentEvent.EventName === 'SetProperty' && currentEvent.IsReciever) {
          this.registerOnDataChangeSetProperty(currentEvent);
        } else if (currentEvent.EventName === 'TriggerOnChanges' && currentEvent.IsSender) {
          this.triggerTableAfterChanges = true;
        }else {
          this.triggerAfterChanges = true;
          this.afterChangeEvents.push({ eventInitiatorName: currentEvent.EventHandlerOrInitiator });
        }
      }
    }
    if (!this.options.notitle && !this.options.description && this.options.placeholder) {
      this.options.description = this.options.placeholder;
    }
    setTimeout(() => {
      this.setControlDate(this.controlValue);
    }, 100);
  }

  registerOnDataChange(event) {
    this.jsf.receive(event.EventHandlerOrInitiator).subscribe(res => {
      if (event.DependentKeyConditionalValue !== '' && res['data'] !== undefined) {
        this.jsf.updateValue(this, res['data']);
      }
    });
  }
  registerOnDataChangeSetProperty(event) {
    this.jsf.receive(event.EventHandlerOrInitiator).subscribe(res => {
      if (event.DependentKeyConditionalValue !== '') {
        this[event.DependentKeyConditionalValue] = res.data;

        if (this.dateValue < res.data) {
          this.updateValue({ value: res.data });
        }
      }
    });
  }

  registerIsVisible(event) {
    this.jsf.receive(event.EventHandlerOrInitiator).subscribe(res => {
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
      } else if (event.DependentKeyConditionalValue.indexOf('eq ') > -1) {
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

        this.jsf.hideParentNode({ layoutIndex: this.layoutIndex });
      }
    });
  }

  /** change event called when the date is picked */
  ngOnChanges() {
    this.setControlDate(this.controlValue);
  }

  /**
   * sets the dateValue property based on the datestring recieved
   * @param dateString
   */
  setControlDate(dateString: string) {
    if (dateString !== '') {
      this.dateValue = dateString;
    } else {
      this.dateValue = moment().format("DD-MM-YYYY HH:mm");
    }
    this.updateValue({ value: this.dateValue });
  }
  /**
   * Update the Value to the model
   * @param event
   */
  updateValue(event) {
    this.options.showErrors = true;
    const stringDate = moment(event.value).format();
    this.jsf.updateValue(this,stringDate);
    if(this.triggerTableAfterChanges){
      this.updateValueOnResponse(event.value);
    }else if (this.triggerAfterChanges) {
      for (let i = 0; i < this.afterChangeEvents.length; i++) {
        this.jsf.send(this.afterChangeEvents[i].eventInitiatorName, event.value);
      }
    }
  }
  updateValueOnResponse(eventValue){    
    if (this.options.events.length > 0) {
      for (let i = 0; i < this.options.events.length; i++) {
        if(this.options.events[i].EventName === 'TriggerOnChanges' && this.options.events[i].IsSender && this.options.events[i].DependentKeyType == 'multiple'){
          let params:any={};let triggerApi = true;let recursiveParams:any={};
          if (this.options.events[i].IsNonInitialCalls !== undefined && this.options.events[i].IsNonInitialCalls) {
            this.options.events[i].IsNonInitialCalls = false;
            triggerApi = false;
          }else if(this.options.events[i].IsNonInitialCallsEdit !== undefined && this.options.events[i].IsNonInitialCallsEdit) {
            this.options.events[i].IsNonInitialCallsEdit = false;
            triggerApi = false;
          }
          this.options.events[i].DependentKeyConditionalValue.forEach(element => {
            if(element.indexOf(':') > -1){
              var splits = element.split(':');
              var key = splits[0];
              var value = splits.length > 1 ? splits[1] : '';
              if(this.jsf.getFormGroupControlValue(value) !== undefined && this.jsf.getFormGroupControlValue(value).value !== null){
                var modelValue = this.jsf.getFormGroupControlValue(value).value !== null ? this.jsf.getFormGroupControlValue(value).value : '0';
                var paramvalue = key === 'movementDate' ? moment(this.jsf.getData().MovementDate).format('YYYY-MM-DD'): modelValue;
         
                params[key] = paramvalue; 
              }
              else{
                triggerApi = false;
                return;
              }
            }else if(element.indexOf('=') > -1){
              var splits = element.split('=');
              var key = splits[0];
              
              var value = splits.length > 1 ? splits[1] : '';
              params[key] = value; 
            }           
          });
          
          // //Below one i used for post method UOM conversion - FA 
          // if(triggerApi){
          //   this.objBackedn.performHTTPOperation(this.options.events[i].anotherTable, this.options.TenantId, params).subscribe((res: any) => {
          //     if (res !== undefined) {
          //       this.jsf.setModelValuesFromResponse(res);
          //       if (this.triggerAfterChanges) {
          //         for (let i = 0; i < this.afterChangeEvents.length; i++) {
          //           this.jsf.send(this.afterChangeEvents[i].eventInitiatorName, eventValue);
          //         }
          //       }
          //     }
          //   });
          // } 
        }
      }
    } 
  }
}
