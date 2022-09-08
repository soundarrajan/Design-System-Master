import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../JSONSchemaForm/json-schema-form.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-textbox-input',
  template: `
    <mat-form-field *ngIf="this.options.isVisible" [class]="options?.htmlClass || ''" [floatPlaceholder]="options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')" [style.width]="'100%'">
      <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft" [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
      <textarea
        matInput
        *ngIf="boundControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [required]="options?.required"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [placeholder]="options?.notitle ? options?.placeholder : options?.title"
        [readonly]="options?.readonly ? 'readonly' : null"
        [style.width]="'100%'"
        (blur)="options.showErrors = true"
        [value]="controlValue"
        (input)="updateValue($event)"
      ></textarea>
      <textarea
        matInput
        *ngIf="!boundControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [required]="options?.required"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [placeholder]="options?.notitle ? options?.placeholder : options?.title"
        [readonly]="options?.readonly ? 'readonly' : null"
        [style.width]="'100%'"
        [value]="controlValue"
        (input)="updateValue($event)"
        (blur)="options.showErrors = true"
      ></textarea>
      <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight" [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
      <mat-hint *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)" align="end" [innerHTML]="options?.description"></mat-hint>
    </mat-form-field>
    <mat-error *ngIf="options?.showErrors && options?.errorMessage && this.options.isVisible" [innerHTML]="options?.errorMessage"></mat-error>
  `,
  styles: [
    `
      mat-error {
        font-size: 75%;
        margin-top: -1rem;
        margin-bottom: 0.5rem;
      }
      ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix {
        width: initial;
      }
    `
  ]
})
/**
 * Text Area Component For Configurable UI
 */
export class TextBoxInputComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled = false;
  boundControl = false;
  options: any;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(private jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this);
    // this.options.showErrors=true;
    if (!this.options.notitle && !this.options.description && this.options.placeholder) {
      this.options.description = this.options.placeholder;
    }
  }
  /**
   * Updates the Value to Model
   * @param event
   */
  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
