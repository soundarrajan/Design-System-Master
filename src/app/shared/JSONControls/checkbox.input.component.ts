import { Component, Input, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'rxjs/add/operator/toPromise';
import { FormControl, Validators } from '@angular/forms';
import { JsonSchemaFormService } from '../JSONSchemaForm/json-schema-form.service';

@Component({
  template: `
    <mat-checkbox *ngIf="this.options.isVisible" [ngClass]="(options?.formFieldClass)?options.formFieldClass:''" 
      align="left"
      [color]="options?.color || 'primary'"
      [disabled]="controlDisabled || options?.readonly"
      [id]="'control' + layoutNode?._id"
      labelPosition="after"
      [name]="controlName"
      [checked]="controlValue"
      (blur)="options.showErrors = true"
      (change)="updateValue($event)"
    >
      <span *ngIf="options?.title" class="checkbox-name" [style.display]="options?.notitle ? 'none' : ''" [innerHTML]="options?.title"></span>
    </mat-checkbox>
    <mat-error *ngIf="options?.showErrors && options?.errorMessage && this.options.isVisible" [innerHTML]="options?.errorMessage" style="position:absolute; top: 45px;font-size:12px;"></mat-error>
  `,
  selector: 'app-checkbox-input',
  styles: [
    `
      .checkbox-name {
        white-space: nowrap;
      }
      mat-error {
        font-size: 75%;
      }
    `
  ]
})

/**
 * The  CheckBox component which is used by Configurable UI
 */
export class CheckBoxInputComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue : boolean;
  controlDisabled = false;
  boundControl = false;
  options: any;
  trueValue: any = true;
  falseValue: any = false;
  showSlideToggle = false;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];
  triggerAfterChanges = false;
  afterChangeEvents = [];
  initialBind = false;
  constructor(private jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this);
    // this.options.showErrors = true;
    if (this.options.events.length > 0) {
      for (let i = 0; i < this.options.events.length; i++) {
        var currentEvent = this.options.events[i];
        if (currentEvent.EventName === 'Visibilty' && currentEvent.IsReciever) {
          // this.visible = false;
          // this.registerIsVisible(currentEvent);
        } else if (currentEvent.EventName === 'DataSourceBind' && currentEvent.IsReciever) {
          // this.dataSrcBind = false;
          // this.registerOnBind(currentEvent);
        } else if (currentEvent.EventName === 'SetData' && currentEvent.IsReciever) {
          // this.registerOnDataChange(currentEvent);
        } else if (currentEvent.EventName === 'Autopopulate' && currentEvent.IsReciever) {
          // this.registerOnBind(currentEvent, true);
        } else {
          this.triggerAfterChanges = true;
          this.afterChangeEvents.push({ eventInitiatorName: currentEvent.EventHandlerOrInitiator });
        }
      }
    }
    if (this.controlValue === null || this.controlValue === undefined) {
      this.controlValue = false;
      this.jsf.updateValue(this, this.falseValue);
    }
    if (typeof this.controlValue === 'string') {
      this.controlValue = this.controlValue === 'true' ? true : false;
      this.jsf.updateValue(this, this.falseValue);
    }
    if (this.layoutNode.type === 'slide-toggle' || this.layoutNode.format === 'slide-toggle') {
      this.showSlideToggle = true;
    }
  }
  ngAfterViewInit() {
    this.updateValue({ checked: this.controlValue }); //this.isChecked
  }

  /**
   * Event Fired to update the value to model
   * @param event
   */
  updateValue(event) {
    //if (event.checked === this.controlValue) {
      this.options.showErrors = true;
      this.jsf.updateValue(this, event.checked ? this.trueValue : this.falseValue);
      if (this.triggerAfterChanges) {
        for (let i = 0; i < this.afterChangeEvents.length; i++) {
          this.jsf.send(this.afterChangeEvents[i].eventInitiatorName, { checked: event.checked.toString() });
        }
      }
    //}
  }
  /**
   * Event Fired when checkbox is checked
   */
  get isChecked() {
    return this.jsf.getFormControlValue(this) === this.trueValue;
  }
}
