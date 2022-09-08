import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';

import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { externalUrlProvider } from '../trade/trade.route';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';
import { OpsInventoryRoute } from './ops-inventory.route';
import { InventoryReconComponent } from './inventory-recon/inventory-recon.component';
import { BulkImportComponent } from './bulk-import/bulk-import.component';
import { InventoryReportPopupComponent } from './popup-screens/inventory-report-popup/inventory-report-popup.component';
import { TankSummaryComponent } from './tank-summary/tank-summary.component';
import { MovDetailsComponent } from './popup-screens/mov-details/mov-details.component';



@NgModule({
  
  declarations: [InventoryDetailsComponent, InventoryReconComponent, BulkImportComponent, InventoryReportPopupComponent, TankSummaryComponent, MovDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(OpsInventoryRoute),
    AgGridModule.withComponents([AGGridCellDataComponent, AGGridCellRendererComponent])
]
})
export class OpsInventoryModule { }
