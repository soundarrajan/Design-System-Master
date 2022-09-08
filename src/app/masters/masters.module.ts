import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteMasterHomeComponent } from './site-master-home/site-master-home.component';
import { RouterModule } from '@angular/router';
import { MastersRoutes } from './masters.route';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material-module';
import { SiteListComponent } from './site-list/site-list.component';
import { NewSiteComponent,InputFocusedDirective } from './new-site/new-site.component';
import { AgGridModule } from 'ag-grid-angular';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';
import { NewVesselComponent } from './new-vessel/new-vessel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(MastersRoutes),
    AgGridModule.withComponents([AGGridCellDataComponent,AGGridCellRendererComponent])
  ],
  declarations: [SiteMasterHomeComponent, SiteListComponent, NewSiteComponent,InputFocusedDirective, NewVesselComponent]
})
export class MastersModule { }
