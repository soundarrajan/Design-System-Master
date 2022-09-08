import { Component, Input, OnInit } from '@angular/core';

import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'section-widget',
  template: `
    <div *ngIf="containerType === 'div'" [class]="options.sectionClass" [class.expandable]="options?.expandable && !expanded" [class.expanded]="options?.expandable && expanded">
      <label *ngIf="options.sectionTitle && !options.NoTitle" [class]="'legend ' + (options?.labelHtmlClass || '')" [innerHTML]="options.sectionTitle" (click)="toggleExpanded()">
        options.sectionTitle
      </label>
      <root-widget
        *ngIf="expanded"
        [layout]="layoutNode.items"
        [dataIndex]="dataIndex"
        [layoutIndex]="layoutIndex"
        [isFlexItem]="getFlexAttribute('is-flex')"
        [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
        [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
        [style.display]="getFlexAttribute('display')"
        [style.flex-direction]="getFlexAttribute('flex-direction')"
        [style.flex-wrap]="getFlexAttribute('flex-wrap')"
        [style.justify-content]="getFlexAttribute('justify-content')"
        [style.align-items]="getFlexAttribute('align-items')"
        [style.align-content]="getFlexAttribute('align-content')"
        [fxLayout]="options?.fxLayout"
        [fxLayoutGap]="(options?.fxLayoutGap)?options.fxLayoutGap:'0px grid'"
        [fxLayoutAlign]="options?.fxLayoutAlign"
        [attr.fxFlexFill]="options?.fxLayoutAlign"
      ></root-widget>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage" [innerHTML]="options?.errorMessage"></mat-error>
    </div>

    <fieldset
      *ngIf="containerType === 'fieldset'"
      [class]="options?.htmlClass || ''"
      [class.expandable]="options?.expandable && !expanded"
      [class.expanded]="options?.expandable && expanded"
      [disabled]="options?.readonly"
    >
      <legend *ngIf="sectionTitle" [class]="'legend ' + (options?.labelHtmlClass || '')" [innerHTML]="sectionTitle" (click)="toggleExpanded()"></legend>
      <root-widget
        *ngIf="expanded"
        [layout]="layoutNode.items"
        [dataIndex]="dataIndex"
        [layoutIndex]="layoutIndex"
        [isFlexItem]="getFlexAttribute('is-flex')"
        [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
        [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
        [style.display]="getFlexAttribute('display')"
        [style.flex-direction]="getFlexAttribute('flex-direction')"
        [style.flex-wrap]="getFlexAttribute('flex-wrap')"
        [style.justify-content]="getFlexAttribute('justify-content')"
        [style.align-items]="getFlexAttribute('align-items')"
        [style.align-content]="getFlexAttribute('align-content')"
        [fxLayout]="options?.fxLayout"
        [fxLayoutGap]="options?.fxLayoutGap"
        [fxLayoutAlign]="options?.fxLayoutAlign"
        [attr.fxFlexFill]="options?.fxLayoutAlign"
      ></root-widget>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage" [innerHTML]="options?.errorMessage"></mat-error>
    </fieldset>

    <mat-card *ngIf="containerType === 'card'" [class]="options?.htmlClass || ''" [class.expandable]="options?.expandable && !expanded" [class.expanded]="options?.expandable && expanded">
      <mat-card-header *ngIf="sectionTitle">
        <legend [class]="'legend ' + (options?.labelHtmlClass || '')" [innerHTML]="sectionTitle" (click)="toggleExpanded()"></legend>
      </mat-card-header>
      <mat-card-content *ngIf="expanded">
        <fieldset [disabled]="options?.readonly">
          <root-widget
            *ngIf="expanded"
            [layout]="layoutNode.items"
            [dataIndex]="dataIndex"
            [layoutIndex]="layoutIndex"
            [isFlexItem]="getFlexAttribute('is-flex')"
            [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
            [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
            [style.display]="getFlexAttribute('display')"
            [style.flex-direction]="getFlexAttribute('flex-direction')"
            [style.flex-wrap]="getFlexAttribute('flex-wrap')"
            [style.justify-content]="getFlexAttribute('justify-content')"
            [style.align-items]="getFlexAttribute('align-items')"
            [style.align-content]="getFlexAttribute('align-content')"
            [fxLayout]="options?.fxLayout"
            [fxLayoutGap]="options?.fxLayoutGap"
            [fxLayoutAlign]="options?.fxLayoutAlign"
            [attr.fxFlexFill]="options?.fxLayoutAlign"
          ></root-widget>
        </fieldset>
      </mat-card-content>
      <mat-card-footer>
        <mat-error *ngIf="options?.showErrors && options?.errorMessage" [innerHTML]="options?.errorMessage"></mat-error>
      </mat-card-footer>
    </mat-card>
    <div [class]="options.sectionClass" *ngIf="containerType === 'expansion-panel'">
      <mat-accordion>
        <mat-expansion-panel class="address-info" [expanded]="expanded" [hideToggle]="!options?.expandable">
          <mat-expansion-panel-header *ngIf="options?.sectionTitle && !options.NoTitle">
            <mat-panel-title>
              <span class="panel-title m-l-9" *ngIf="options?.sectionTitle && !options.NoTitle">{{ options.sectionTitle }}</span
              >&nbsp;
              <div class="open-close-arrow " *ngIf="options?.sectionTitle && !options.NoTitle">
                <!--<i class="fas fa-caret-down"></i>
            <i class="fas fa-caret-up"></i>-->
                <img class="fa-caret-up" src="../../../assets/customicons/caret-up.svg" alt="list" />
                <img class="fa-caret-down" src="../../../assets/customicons/caret-down.svg" alt="list" />
              </div>
            </mat-panel-title>
          </mat-expansion-panel-header>
          <div>
            <flex-layout-root-widget
              *ngIf="expanded"
              [layout]="layoutNode.items"
              [dataIndex]="dataIndex"
              [layoutIndex]="layoutIndex"
              [isFlexItem]="getFlexAttribute('is-flex')"
              [class.form-flex-column]="getFlexAttribute('flex-direction') === 'column'"
              [class.form-flex-row]="getFlexAttribute('flex-direction') === 'row'"
              [style.display]="getFlexAttribute('display')"
              [style.flex-direction]="getFlexAttribute('flex-direction')"
              [style.flex-wrap]="getFlexAttribute('flex-wrap')"
              [style.justify-content]="getFlexAttribute('justify-content')"
              [style.align-items]="getFlexAttribute('align-items')"
              [style.align-content]="getFlexAttribute('align-content')"
              [fxLayout]="options?.fxLayout"
              [fxLayoutGap]="options?.fxLayoutGap"
              [fxLayoutAlign]="options?.fxLayoutAlign"
              [attr.fxFlexFill]="options?.fxLayoutAlign"
            ></flex-layout-root-widget>
          </div>
          <mat-error *ngIf="options?.showErrors && options?.errorMessage" [innerHTML]="options?.errorMessage"></mat-error>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
  styles: [
    `
      .legend {
        font-weight: bold;
      }
      .expandable > legend:before,
      .expandable > label:before {
        content: '▶';
        padding-right: 0.3em;
      }
      .expanded > legend:before,
      .expanded > label:before {
        content: '▼';
        padding-right: 0.2em;
      }
    `
  ]
})
export class SectionComponent implements OnInit {
  options: any;
  expanded = true;
  containerType: string;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(private jsf: JsonSchemaFormService) {}

  get sectionTitle() {
    return this.options.notitle ? null : this.jsf.setItemTitle(this);
  }

  ngOnInit() {
    this.jsf.initializeControl(this);
    this.options = this.layoutNode.options || {};

    //console.log('this.options=' + JSON.stringify(this.options));
    this.expanded = typeof this.options.expanded === 'boolean' ? this.options.expanded : !this.options.expandable;
    switch (this.layoutNode.type) {
      case 'fieldset':
      case 'array':
      case 'tab':
      case 'advancedfieldset':
      case 'authfieldset':
      case 'optionfieldset':
      case 'selectfieldset':
        this.containerType = 'fieldset';
        break;
      case 'expansion-panel':
        this.containerType = 'expansion-panel';
        break;
      default:
        // 'div', 'flex', 'section', 'conditional', 'actions', 'tagsinput'
        this.containerType = 'div';
        break;
    }
  }

  toggleExpanded() {
    if (this.options.expandable) {
      this.expanded = !this.expanded;
    }
  }

  // Set attributes for flexbox container
  // (child attributes are set in root.component)
  getFlexAttribute(attribute: string) {
    const flexActive: boolean = this.layoutNode.type === 'flex' || !!this.options.displayFlex || this.options.display === 'flex';
    //  if (attribute !== 'flex' && !flexActive) { return null; }
    switch (attribute) {
      case 'is-flex':
        return flexActive;
      case 'display':
        return flexActive ? 'flex' : 'initial';
      case 'flex-direction':
      case 'flex-wrap':
        const index = ['flex-direction', 'flex-wrap'].indexOf(attribute);
        return (this.options['flex-flow'] || '').split(/\s+/)[index] || this.options[attribute] || ['column', 'nowrap'][index];
      case 'justify-content':
      case 'align-items':
      case 'align-content':
        return this.options[attribute];
    }
  }
}
