import { Component, Input, OnInit, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '../JSONSchemaForm/json-schema-form.service';
import { MatDialog } from '@angular/material/dialog';
import { VolumeQuantityDialog } from '../../movements/popup-screens/volume-quantity.component';
import { SpecParameterDialog } from '../../movements/popup-screens/spec-parameter.component';
import { TankHistoryDialog } from '../../movements/popup-screens/tank-history.component';
// import { BackendService } from '../services/backend/backend.service'; 
import 'rxjs/add/operator/toPromise';

@Component({
  template: `
    <div [ngClass]="options?.formFieldClass">
      <div *ngFor="let content of this.options.contentMap;let i = index" [ngClass]="i !== (this.options.contentMap.length - 1) ? 'border_line ' + content?.titleClass : content?.titleClass" >{{content.title}}
        <div [ngClass]="content?.dataKeyClass">{{this.jsf.getFormGroupControlValue(content.dataKey).value}}</div>
        
        </div>
          <div *ngIf="options?.popupMap && (options.popupMap.type=='spec_parameter'||options.popupMap.type=='tank_history' ||options.popupMap.type=='volume_quantity')" class="popup-holder"
          [ngClass]="(this.options.contentMap.length>0) ? 'border_line_left ':''">
              <div class="popup-icon" [ngClass]="popupOpen==true?'popup-icon-active':''" (click)="openPopup(options.popupMap.type);"></div>
              <div class="popup-label">{{options.popupMap.name}}</div>
          </div>
    </div>
  `,
  selector: 'app-input-content',
  styles: [
    `
    `
  ]
})

/**
 * Input Component For configurable UI
 */
export class ContentInputComponent implements OnInit, OnChanges, AfterViewInit {
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
  triggerTableAfterChanges: boolean = false;
  tenantId: string = localStorage.getItem('TenantId');
  public popupOpen: boolean;
  // constructor(private jsf: JsonSchemaFormService,private objBackedn: BackendService) {}
  constructor(private jsf: JsonSchemaFormService, public dialog: MatDialog) { }
  ngOnChanges(changes: SimpleChanges) { }
  ngOnInit() {
    this.options = this.layoutNode.options || {};
  }
  ngAfterViewInit() {

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
      if (res.data[key] !== undefined) {
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
    if (this.triggerTableAfterChanges) {
      this.updateValueOnResponse();
    }
  }

  updateValueOnResponse() {
    if (this.options.events.length > 0) {
      for (let i = 0; i < this.options.events.length; i++) {
        if (this.options.events[i].EventName === 'TriggerOnChanges' && this.options.events[i].IsSender && this.options.events[i].DependentKeyType == 'multiple') {
          let params: any = {};
          this.options.events[i].DependentKeyConditionalValue.forEach(element => {
            if (element.indexOf(':') > -1) {
              var splits = element.split(':');
              var key = splits[0];
              var value = splits.length > 1 ? splits[1] : '';
              params[key] = this.jsf.getFormGroupControlValue(value) !== undefined && this.jsf.getFormGroupControlValue(value) !== null ? this.jsf.getFormGroupControlValue(value).value : '0';
            } else if (element.indexOf('=') > -1) {
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

  openPopup(type) {
    this.popupOpen = true;
    let dialogRef;
    if (type == 'volume_quantity') {
      dialogRef = this.dialog.open(VolumeQuantityDialog, {
        width: '956px',
        maxHeight: '480px',
        panelClass: 'movements-popup-grid'
      });
    }
    else if (type == 'tank_history') {
      dialogRef = this.dialog.open(TankHistoryDialog, {
        width: '1360px',
        maxWidth: '1360px',
        maxHeight: '480px',
        panelClass: 'movements-popup-grid'
      });
    }
    else if (type == 'spec_parameter') {
      dialogRef = this.dialog.open(SpecParameterDialog, {
        width: '956px',
        maxHeight: '480px',
        panelClass: 'movements-popup-grid'
      });
    }
    dialogRef.afterClosed().subscribe(result => {
      this.popupOpen = false;
      console.log(type);
      console.log(document.querySelector('.popup-icon').classList)
      document.querySelector('.popup-icon').classList.remove('popup-icon-active');
    });
  }
}
