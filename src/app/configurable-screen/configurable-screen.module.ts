import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material-module';
import { RouterModule } from '@angular/router';
import { ConfigurableScreenRoutes } from './configurable-screen.route';
import { ConfigurableScreenHomeComponent } from './configurable-screen-home/configurable-screen-home.component';
import { HelpersModule } from '../shared/helper.module';
import { AgGridModule } from 'ag-grid-angular';
import { AGGridCellDataComponent } from 'src/app/shared/ag-grid/ag-grid-celldata.component';
import { ConfigurableListingComponent } from './configurable-listing/configurable-listing.component';

@NgModule({
  declarations: [ConfigurableScreenHomeComponent, ConfigurableListingComponent],
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule,
    HelpersModule,
    RouterModule.forChild(ConfigurableScreenRoutes),
    AgGridModule.withComponents([AGGridCellDataComponent])
  ]
})
export class ConfigurableScreenModule { }
