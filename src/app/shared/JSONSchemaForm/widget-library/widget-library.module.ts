import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderableDirective } from '../shared/orderable.directive';

import { JsonSchemaFormService } from '../json-schema-form.service';
import { AddReferenceComponent } from './add-reference.component';
import { OneOfComponent } from './one-of.component';
import { ButtonComponent } from './button.component';
import { CheckboxComponent } from './checkbox.component';
import { CheckboxesComponent } from './checkboxes.component';
import { FileComponent } from './file.component';
import { HiddenComponent } from './hidden.component';
import { InputComponent } from './input.component';
import { MessageComponent } from './message.component';
import { NoneComponent } from './none.component';
import { NumberComponent } from './number.component';
import { RadiosComponent } from './radios.component';
import { RootComponent, FlexLayoutRootComponent } from './root.component';
import { SectionComponent } from './section.component';
import { SelectComponent } from './select.component';
import { SelectFrameworkComponent } from './select-framework.component';
import { SelectWidgetComponent } from './select-widget.component';
import { SubmitComponent } from './submit.component';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';
import { TemplateComponent } from './template.component';
import { TextareaComponent } from './textarea.component';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { MaterialUiModule } from '../../control-modules/material-ui.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  declarations: [
    AddReferenceComponent,
    OneOfComponent,
    ButtonComponent,
    CheckboxComponent,
    FlexLayoutRootComponent,
    CheckboxesComponent,
    FileComponent,
    HiddenComponent,
    InputComponent,
    MessageComponent,
    NoneComponent,
    NumberComponent,
    RadiosComponent,
    RootComponent,
    SectionComponent,
    SelectComponent,
    SelectFrameworkComponent,
    SelectWidgetComponent,
    SubmitComponent,
    TabComponent,
    TabsComponent,
    TemplateComponent,
    TextareaComponent,
    OrderableDirective
  ],
  exports: [
    AddReferenceComponent,
    OneOfComponent,
    ButtonComponent,
    CheckboxComponent,
    FlexLayoutRootComponent,
    CheckboxesComponent,
    FileComponent,
    HiddenComponent,
    InputComponent,
    MessageComponent,
    NoneComponent,
    NumberComponent,
    RadiosComponent,
    RootComponent,
    SectionComponent,
    SelectComponent,
    SelectFrameworkComponent,
    SelectWidgetComponent,
    SubmitComponent,
    TabComponent,
    TabsComponent,
    TemplateComponent,
    TextareaComponent,
    OrderableDirective
  ],
  entryComponents: [
    AddReferenceComponent,
    OneOfComponent,
    ButtonComponent,
    CheckboxComponent,
    FlexLayoutRootComponent,
    CheckboxesComponent,
    FileComponent,
    HiddenComponent,
    InputComponent,
    MessageComponent,
    NoneComponent,
    NumberComponent,
    RadiosComponent,
    RootComponent,
    SectionComponent,
    SelectComponent,
    SelectFrameworkComponent,
    SelectWidgetComponent,
    SubmitComponent,
    TabComponent,
    TabsComponent,
    TemplateComponent,
    TextareaComponent
  ],
  providers: [JsonSchemaFormService]
})
export class WidgetLibraryModule {
  static forRoot(): ModuleWithProviders<WidgetLibraryModule> {
    return {
      ngModule: WidgetLibraryModule,
      providers: [JsonSchemaFormService]
    };
  }
}
