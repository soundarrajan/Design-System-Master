import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualisationHomeComponent } from './actualisation-home/actualisation-home.component';
import { RouterModule } from '@angular/router';
import { ActualisationRoutes } from './actualisation.route';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material-module';
import { AgGridModule } from 'ag-grid-angular';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';

@NgModule({
  declarations: [ActualisationHomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(ActualisationRoutes),
    AgGridModule.withComponents([AGGridCellDataComponent,AGGridCellRendererComponent])
  ]
})
export class ActualisationModule { }
