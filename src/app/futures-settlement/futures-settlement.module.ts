import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { FuturesSettlementRoute } from './futures-settlement.route';
import { FuturesSettlementHomeComponent } from './futures-settlement-home/futures-settlement-home.component';
import { FuturesListComponent } from './futures-list/futures-list.component';
import { MatchedListComponent } from './matched-list/matched-list.component';
import { AggridStatusChipComponent } from '../shared/ag-grid/ag-grid-status-chip.component';
import { AgGridModule } from 'ag-grid-angular';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';
import { AggridLinkComponent } from '../shared/ag-grid/ag-grid-link.component';
import { RolloverDetailsComponent } from './rollover-details/rollover-details.component';
@NgModule({
  declarations: [
    FuturesSettlementHomeComponent,
    FuturesListComponent,
    MatchedListComponent,
    RolloverDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(FuturesSettlementRoute),
    AgGridModule.withComponents([AggridStatusChipComponent, AGGridCellDataComponent, AGGridCellRendererComponent, AggridLinkComponent])
  ]
})
export class FuturesSettlementModule { }
