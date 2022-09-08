import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';

import { ClosureRoutes } from './closure.route';
import { EomlistComponent } from './eomlist/eomlist.component';
import { EomlistdetailsComponent } from './eomlistdetails/eomlistdetails.component';
import { EomclosureComponent } from './eomclosure/eomclosure.component';
import { EomclosuredetailsComponent } from './eomclosuredetails/eomclosuredetails.component';
import { AccrualComponent } from './accrual/accrual.component';
import { PandlComponent } from './pandl/pandl.component';

import { PandltreeComponent } from './pandltree/pandltree.component';
import { EomListComponent } from './eom-list/eom-list.component';
import { EomClosureComponent } from './eom-closure/eom-closure.component';
import { CancelClosureDialog } from './popup-screens/cancel-closure-dialog.component';
import { PlDetailsComponent } from './pl-details/pl-details.component';

@NgModule({
 
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(ClosureRoutes),
    AgGridModule.withComponents([AGGridCellDataComponent, AGGridCellRendererComponent]),

  ],
  declarations: [EomlistComponent, EomlistdetailsComponent, EomclosureComponent, EomclosuredetailsComponent, AccrualComponent, PandlComponent, PandltreeComponent, EomListComponent, EomClosureComponent, CancelClosureDialog, PlDetailsComponent],
})
export class ClosureModule { }
