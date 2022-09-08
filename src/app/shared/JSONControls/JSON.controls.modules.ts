import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { InputTextBoxComponent } from './input.textbox';
import { ContentInputComponent } from './content.input.component';
import { DateTimeInputComponent } from './datetime.input.component';
import { CheckBoxInputComponent } from './checkbox.input.component';
import { RadioInputComponent } from './radios.input.component';
import { TextBoxInputComponent } from './textbox.input.component';
import { NumberInputComponent } from './number.input.component';
import { MaterialModule } from '../../material-module';
import { DropdownComponent } from './dropdown.component';
import { LookupComponent } from './lookup.component';
import { GroupedDropdownComponent } from './grouped.dropdown.component';
import { JSONSchemaFormBuilder } from '../../services/jsonschemaform/json.schema.form.builder.service';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
@NgModule({
  entryComponents: [
    InputTextBoxComponent,
    ContentInputComponent,
    DateTimeInputComponent,
    DropdownComponent,
    GroupedDropdownComponent,
    LookupComponent,
    CheckBoxInputComponent,
    RadioInputComponent,
    TextBoxInputComponent,
    NumberInputComponent
  ],
  declarations: [
    InputTextBoxComponent,
    ContentInputComponent,
    DateTimeInputComponent,
    DropdownComponent,
    GroupedDropdownComponent,
    LookupComponent,
    CheckBoxInputComponent,
    RadioInputComponent,
    TextBoxInputComponent,
    NumberInputComponent
  ],
  imports: [CommonModule, FormsModule, MaterialModule,OwlDateTimeModule,OwlMomentDateTimeModule],
  exports: [
    InputTextBoxComponent,
    ContentInputComponent,
    DateTimeInputComponent,
    DropdownComponent,
    GroupedDropdownComponent,
    LookupComponent,
    CheckBoxInputComponent,
    RadioInputComponent,
    TextBoxInputComponent,
    NumberInputComponent
  ],
  providers: [JSONSchemaFormBuilder],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class JSONControlModules {}
