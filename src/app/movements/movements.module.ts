import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material-module';
import { AgGridModule } from 'ag-grid-angular';
import { AggridStatusChipComponent } from '../shared/ag-grid/ag-grid-status-chip.component';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';
import { AggridLinkComponent } from '../shared/ag-grid/ag-grid-link.component';
import { MovementsRouteModule } from './movements-route.module';
import { FuelActualisationScreenComponent } from './fuel-actualisation/fuel-actualisation-screen/fuel-actualisation-screen.component';
import { TransferMovementsComponent } from './transfer-movements/transfer-movements.component'; 
import { ClosedMovementsComponent } from './fuel-actualisation/closed-movements/closed-movements.component';
import { PlannedMovementsComponent } from './fuel-actualisation/planned-movements/planned-movements.component';
import { VerifiedMovementsComponent } from './fuel-actualisation/verified-movements/verified-movements.component';
import { OtherMovementsComponent } from './other-movements/other-movements.component';
import { PlannedOtherMovementsComponent } from './planned-other-movements/planned-other-movements.component';
import { VerifiedOtherMovementsComponent } from './verified-other-movements/verified-other-movements.component';
import { ClosedOtherMovementsComponent } from './closed-other-movements/closed-other-movements.component';
import { ClosedTransferMovementsComponent } from './closed-transfer-movements/closed-transfer-movements.component';
import { VerifiedTransferMovementsComponent } from './verified-transfer-movements/verified-transfer-movements.component';
import { PlannedTransferMovementsComponent } from './planned-transfer-movements/planned-transfer-movements.component';
import { AddMovementComponent } from './add-movement/add-movement.component';
import { MovementsAuditlogComponent } from './movements-auditlog/movements-auditlog.component';
import { AddDeliveryMovementComponent } from './fuel-actualisation/add-delivery-movement/add-delivery-movement.component';
import { MovementsManualMatchComponent } from './movements-manual-match/movements-manual-match.component';
import { OpsSummaryComponent } from './fuel-actualisation/ops-summary/ops-summary.component';
import { AddTransferMovementComponent } from './add-transfer-movement/add-transfer-movement.component';
import { VolumeQuantityDialog } from './popup-screens/volume-quantity.component';
import { SpecParameterDialog } from './popup-screens/spec-parameter.component'; 
import { TankHistoryDialog } from './popup-screens/tank-history.component'; 
import { HelpersModule } from '../shared/helper.module';
import { OperationalAmountDialog } from './popup-screens/operational-amount.component';
import { AllocationDetailsComponent } from './fuel-actualisation/allocation-details/allocation-details/allocation-details.component';
import { OpsSpecParameterDialog } from './popup-screens/ops-spec-parameter.component';
import { ViewcostingTransferMovementsComponent } from './viewcosting-transfer-movements/viewcosting-transfer-movements.component';
import { EditSortOrderDialog } from './popup-screens/edit-sort-order.component';
import { WarningDialog } from './popup-screens/warning.component';
import { JournalComponent } from './view-costing-grids/journal.component';
import { AllocationPriceDetailsComponent } from './view-costing-grids/allocation-price-details.component';
import { TradeDetailsComponent } from './view-costing-grids/trade-details.component';
import { AddOtherMovementComponent } from './add-other-movement/add-other-movement.component';
import { ViewcostingOtherMovementsComponent } from './viewcosting-other-movements/viewcosting-other-movements.component';

@NgModule({
  declarations: [
    FuelActualisationScreenComponent,
    TransferMovementsComponent,
    ClosedMovementsComponent,
    FuelActualisationScreenComponent,
    PlannedMovementsComponent,
    VerifiedMovementsComponent,
    OtherMovementsComponent,
    PlannedOtherMovementsComponent,
    VerifiedOtherMovementsComponent,
    ClosedOtherMovementsComponent,
    ClosedTransferMovementsComponent,
    VerifiedTransferMovementsComponent,
    PlannedTransferMovementsComponent,
    AddMovementComponent,
    MovementsAuditlogComponent,
    AddDeliveryMovementComponent,
    MovementsManualMatchComponent,
    OpsSummaryComponent,
    AddTransferMovementComponent,
    VolumeQuantityDialog,
    SpecParameterDialog,
    OperationalAmountDialog,
    TankHistoryDialog,
    AllocationDetailsComponent,
    OpsSpecParameterDialog,
    ViewcostingTransferMovementsComponent,
    EditSortOrderDialog,
    JournalComponent,
    AllocationPriceDetailsComponent,
    TradeDetailsComponent,
    WarningDialog,
    AddOtherMovementComponent,
    ViewcostingOtherMovementsComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule,
    MovementsRouteModule,
    HelpersModule,
    AgGridModule.withComponents([AggridStatusChipComponent , AGGridCellDataComponent, AGGridCellRendererComponent, AggridLinkComponent ])
  ]
})
export class MovementsModule { }
