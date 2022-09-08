import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material-module';
import { AgGridModule } from 'ag-grid-angular';
import { AggridStatusChipComponent } from '../shared/ag-grid/ag-grid-status-chip.component';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';
import { AggridLinkComponent } from '../shared/ag-grid/ag-grid-link.component';
import { DerivativeSettlementRoutingModule } from './derivative-settlement-routing.module';
import { SettlementScreenComponent } from './settlement-screen/settlement-screen.component';
import { OtcSwapsComponent } from './otc-swaps/otc-swaps.component';
import { ExchangeSwapsComponent } from './exchange-swaps/exchange-swaps.component';
import { ExchangeSettleDialog } from './popup-screens/exchange-settle-popup.component';
import { SpecificationPopupDialog } from './popup-screens/specification-popup.component';
import { InvoiceSummaryPopupComponent } from './popup-screens/invoice-summary-popup/invoice-summary-popup.component';


@NgModule({
  declarations: [
    SettlementScreenComponent,
    OtcSwapsComponent,
    ExchangeSwapsComponent,
    ExchangeSettleDialog,
    SpecificationPopupDialog,
    InvoiceSummaryPopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    DerivativeSettlementRoutingModule,
    AgGridModule.withComponents([AggridStatusChipComponent , AGGridCellDataComponent, AGGridCellRendererComponent, AggridLinkComponent ])
  ]
})
export class DerivativeSettlementModule { }
