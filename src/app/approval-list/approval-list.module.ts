import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalListComponent } from './approval-list/approval-list.component';
import { ApprovalListScreenComponent } from './approval-list-screen/approval-list-screen.component';
import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { ApprovalListRoutes } from './approval-list.route';
import { AgGridModule } from 'ag-grid-angular';
import { AggridStatusChipComponent } from '../shared/ag-grid/ag-grid-status-chip.component';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(ApprovalListRoutes),
    AgGridModule.withComponents([AggridStatusChipComponent , AGGridCellDataComponent, AGGridCellRendererComponent ])
  ],
  declarations: [ApprovalListComponent, ApprovalListScreenComponent]
})
export class ApprovalListModule { }
