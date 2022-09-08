import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { JsonSchemaFormService } from '../JSONSchemaForm/json-schema-form.service';
// import { BackendService } from '../services/backend/backend.service';

@Component({
  template: `
    <mat-form-field *ngIf="this.visible && this.options.isVisible">
      <mat-select
        disableOptionCentering="true"
        [matTooltip]="tooltip"
        [placeholder]="options?.notitle ? options?.placeholder : options?.title"
        [matTooltipShowDelay]="500"
        [matTooltipPosition]="'below'"
        [required]="this.visible && (options?.required || required)"
        name="this.layoutNode.name"
        [id]="this.layoutNode.name"
        [(ngModel)]="controlValue"
        (blur)="options.showErrors = true"
        [disabled]="controlDisabled || options?.readonly || disabled"
      >
        <mat-optgroup *ngFor="let group of selectList; let k = index" [label]="group.GroupName" [disabled]="group.disabled">
          <mat-option (click)="updateValue(groupItem.Id, k)" *ngFor="let groupItem of group.GroupedItems" [value]="groupItem.Id">
            {{ groupItem.Name }}
          </mat-option>
        </mat-optgroup>
      </mat-select>
    </mat-form-field>

    <mat-error *ngIf="this.visible && options?.showErrors && options?.errorMessage && this.options.isVisible" [innerHTML]="options?.errorMessage" style="position:relative; top: 0px;font-size:12px;"></mat-error>
  `,
  selector: 'app-grouped-select',
  styles: [``]
})

// (selectionChange)="updateValue($event)"
/**
 * The Dropdown Component For Configurable UI
 */
export class GroupedDropdownComponent implements OnInit {
  required = false;
  disabled = false;
  IncludeParams = false;
  tooltip = '';
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  disable = false;
  controlDisabled = false;
  boundControl = false;
  options: any;
  selectList: any[] = [];
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];
  visible = true;
  triggerAfterChanges = false;
  afterChangeEvents = [];
  dataSrcBind = true;
  controlType = 'dropdown';
  includeParamsJson = {};
  initialBindDoneForIncludeParams = false;
  IsFirstBindVisibleDone = false;
  // constructor(private jsf: JsonSchemaFormService, private objBackedn: BackendService) {}
  constructor(private jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};

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
              this.buildSRCForDropdown();
              this.initialBindDoneForIncludeParams = true;
            }
          }
        }
      });
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
        } else if (currentEvent.EventName === 'SetProperty' && currentEvent.IsReciever) {
          this.registerOnDataChangeSetProperty(currentEvent);
        } else if (currentEvent.EventName === 'DataSourceBind' && currentEvent.IsReciever) {
          this.dataSrcBind = false;
          this.registerOnBind(currentEvent);
        } else if (currentEvent.EventName === 'SetData' && currentEvent.IsReciever) {
          this.registerOnDataChange(currentEvent);
        } else if (currentEvent.EventName === 'Autopopulate' && currentEvent.IsReciever) {
          this.dataSrcBind = false;

          this.registerOnBind(currentEvent, true);
        } else {
          this.triggerAfterChanges = true;
          this.afterChangeEvents.push({ eventInitiatorName: currentEvent.EventHandlerOrInitiator });
        }
      }
    }
    this.buildSRCForDropdown();
  }

  registerOnDataChangeSetProperty(event) {
    this.jsf.receive(event.EventHandlerOrInitiator).subscribe(res => {
      if (event.DependentKeyConditionalValue !== '' && event.DependentKeyConditionalValue.indexOf(':')) {
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
            } else {
              this.required = false;
            }
          } else if (condition.indexOf(' eq ') > -1) {
            var splits = condition.split(' eq ');
            key = splits[0].trim();
            value = splits.length > 1 ? splits[1].trim() : '';

            if (res.data[key] === value) {
              this.required = true;
              this.options.required = true;
              this.options.showErrors = true;
            } else {
              this.required = false;

              this.options.required = false;
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
              this.tooltip = '';
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
              this.jsf.updateValue(this, -1);
            } else {
              this.disabled = false;
            }
          }
        }
      }
      // this[event.DependentKeyConditionalValue] = res.data;

      // if (this.dateValue < res.data) {
      //   this.updateValue({ target: { Id: res.data } });
      // }
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
          for (let i = 0; i < this.selectList.length; i++) {
            var currentItem = this.selectList[i].GroupedItems.find(x => x[splitKey] == splitValue);

            if (currentItem !== undefined) {
              this.controlValue = currentItem[this.options.controlValue];
              // this.controlName=this.controlValue;
              this.updateValue(currentItem[this.options.controlValue], i);
            }
          }
        } else {
          var splitElse = elseValue.split(':');
          var splitKey = splitElse[0].trim();
          var splitValue = splitElse.length > 1 ? splitElse[1].trim() : '';
          for (let i = 0; i < this.selectList.length; i++) {
            var currentItem = this.selectList[i].GroupedItems.find(x => x[splitKey] == splitValue);

            if (currentItem !== undefined) {
              this.controlValue = currentItem[this.options.controlValue];
              // this.controlName=this.controlValue;
              this.updateValue(currentItem[this.options.controlValue], i);
            }
          }
        }
      }
    });
  }

  registerOnBind(event, autoPopulate = false) {
    this.jsf.receive(event.EventHandlerOrInitiator).subscribe(res => {
      var key = '';
      var value = '';
      if (event.DependentKeyConditionalValue.indexOf(':') > -1) {
        var splits = event.DependentKeyConditionalValue.split(':');
        key = splits[0];
        value = splits.length > 1 ? splits[1] : '';

        var paramvalue = res.data[value];
        var paramsToApi = {};

        paramsToApi[key] = paramvalue;
        this.buildSRCForDropdown(true, paramsToApi, autoPopulate);
      }
    });
  }

  registerIsVisible(event) {
    this.jsf.receive(event.EventHandlerOrInitiator).subscribe(res => {
      this.setVisibility(event, res);
    });
  }

  /**Builds the Dropdown Source based on the TableName given in the configurable UI Schema */
  buildSRCForDropdown(paramBind = false, params = {}, autoPopulate = false): any {
    if (this.dataSrcBind || paramBind) {
      if (this.IncludeParams) {
        var keys = Object.keys(this.includeParamsJson);
        if (keys.length === 0) return;
        for (let i = 0; i < keys.length; i++) {
          params[keys[i]] = this.includeParamsJson[keys[i]];
        }
      }
      if (this.options.tableName !== undefined && this.options.tableName !== '') {
        // this.objBackedn.performHTTPOperation(this.options.tableName, this.options.TenantId, params).subscribe((res: any) => {
        //   if (res !== undefined) {
        //     this.selectList = res;

        //     if (this.controlValue !== undefined) {
        //       for (let i = 0; i < this.selectList.length; i++) {
        //         var currentItem = this.selectList[i].GroupedItems.find(x => x[this.options.controlValue] == this.controlValue);

        //         if (currentItem !== undefined) {
        //           this.updateValue(currentItem[this.options.controlValue], i);

        //           this.disable = this.options.disabled;

        //           if (autoPopulate) {
        //             var currentItem = this.selectList[i].GroupedItems[0];
        //             this.updateValue(currentItem[this.options.controlValue], i);
        //           }
        //         }
        //       }
        //     }
        //   }
        // });
      } else {
        this.options.controlName = 'name';
        this.options.controlValue = 'value';
        ///Get Back here
        this.selectList = this.options.titleMap;
        if (this.controlValue !== undefined) {
          var currentItem = this.selectList.find(x => x[this.options.controlValue] == this.controlValue);
          if (currentItem !== undefined) {
            this.tooltip = currentItem[this.options.controlName];
          }
          // this.controlName = this.controlValue;
        }
      }
    }
  }
  /**Updates the Value to the Model */
  updateValue(event, parentIndex) {
    var currentItem = this.selectList[parentIndex].GroupedItems.find(x => x[this.options.controlValue] === event);
    this.tooltip = currentItem[this.options.controlName];
    this.options.showErrors = true;
    this.jsf.updateValue(this, currentItem[this.options.controlValue]);
    if (this.triggerAfterChanges) {
      for (let i = 0; i < this.afterChangeEvents.length; i++) {
        this.jsf.send(this.afterChangeEvents[i].eventInitiatorName, currentItem);
      }
    }
  }
}
