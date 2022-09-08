import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../JSONSchemaForm/json-schema-form.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-radio-input',
  template: `
    <div>
      <div *ngIf="options?.title">
        <label [attr.for]="'control' + layoutNode?._id" [class]="options?.labelHtmlClass || ''" [style.display]="options?.notitle ? 'none' : ''" [innerHTML]="options?.title"></label>
      </div>
      <mat-radio-group
        *ngIf="boundControl && this.options.isVisible"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [style.flex-direction]="flexDirection"
        [name]="controlName"
        (blur)="options.showErrors = true"
      >
        <mat-radio-button *ngFor="let radioItem of radiosList" [id]="'control' + layoutNode?._id + '/' + radioItem?.name" [value]="radioItem?.value">
          <span [innerHTML]="radioItem?.name"></span>
        </mat-radio-button>
      </mat-radio-group>
      <mat-radio-group
        *ngIf="!boundControl && this.options.isVisible"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [attr.required]="options?.required"
        [style.flex-direction]="flexDirection"
        [disabled]="controlDisabled || options?.readonly"
        [name]="controlName"
        [value]="controlValue"
      >
        <mat-radio-button *ngFor="let radioItem of radiosList" [id]="'control' + layoutNode?._id + '/' + radioItem?.name" [value]="radioItem?.value" (click)="updateValue(radioItem?.value)">
          <span [innerHTML]="radioItem?.name"></span>
        </mat-radio-button>
      </mat-radio-group>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage && this.options.isVisible" [innerHTML]="options?.errorMessage" style="position:absolute; top: 45px;font-size:12px;"></mat-error>
    </div>
  `,
  styles: [
    `
      mat-radio-group {
        display: inline-flex;
      }
      mat-radio-button {
        margin: 2px;
      }
      mat-error {
        font-size: 75%;
      }
    `
  ]
})
/**
 * Radio Button Component For Configurable UI
 */
export class RadioInputComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled = false;
  boundControl = false;
  options: any;
  flexDirection = 'column';
  radiosList: any[] = [];
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(private jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    if (this.layoutNode.type === 'radios-inline') {
      this.flexDirection = 'row';
    }
    this.radiosList = this.options.titleMap;
    this.jsf.initializeControl(this, !this.options.readonly);
    // this.options.showErrors = true;
  }
  /**
   * Updates the value to model
   * @param value
   */
  updateValue(value) {
    this.jsf.updateValue(this, value);
  }
}
