import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JSONControlModules } from './JSONControls/JSON.controls.modules'; 
import { WidgetLibraryModule } from './JSONSchemaForm/widget-library/widget-library.module';
import { JsonSchemaFormComponent } from './JSONSchemaForm/json-schema-form.component';
import { Framework } from './JSONSchemaForm/framework-library/framework';
import { WidgetLibraryService } from './JSONSchemaForm/widget-library/widget-library.service';
import { JsonSchemaFormService } from './JSONSchemaForm/json-schema-form.service';
import { NoFrameworkModule } from './JSONSchemaForm/framework-library/no-framework/no-framework.module';
import { FrameworkLibraryService } from './JSONSchemaForm/framework-library/framework-library.service';
import { NoFramework } from './JSONSchemaForm/framework-library/no-framework/no.framework';

@NgModule({
  declarations: [
    JsonSchemaFormComponent,
  ],
  imports: [
    WidgetLibraryModule,
    NoFrameworkModule,
    JSONControlModules,
    CommonModule
  ],
  exports: [
    JsonSchemaFormComponent
  ],
  providers: [
    JsonSchemaFormService,
    FrameworkLibraryService,
    WidgetLibraryService,
    { provide: Framework, useClass: NoFramework, multi: true }
  ],
  entryComponents: [
  ]
})
export class HelpersModule {
}
