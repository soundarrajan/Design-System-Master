import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { CreditActualisationScreenComponent } from './credit-actualisation-screen/credit-actualisation-screen.component';
import { CreditListComponent } from './credit-list/credit-list.component';
import { ArbReportingComponent } from './arb-reporting/arb-reporting.component';
import { AgGridModule } from 'ag-grid-angular';
import { AggridStatusChipComponent } from '../shared/ag-grid/ag-grid-status-chip.component';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';
import { CreditListRoutes } from './credit-actualisation.route';

@NgModule({
  
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(CreditListRoutes),
    AgGridModule.withComponents([AggridStatusChipComponent , AGGridCellDataComponent, AGGridCellRendererComponent ])
  ],
  declarations: [CreditActualisationScreenComponent, CreditListComponent, ArbReportingComponent],
})
export class CreditActualisationModule { }
