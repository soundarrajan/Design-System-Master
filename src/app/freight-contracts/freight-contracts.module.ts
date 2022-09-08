import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { FreightContractsRoutes } from './freight-contracts.route';
import { FreightContractsMastersComponent } from './freight-contracts-masters/freight-contracts-masters.component';
import { FreightContractsNewComponent } from './freight-contracts-new/freight-contracts-new.component';
import { AgGridModule } from 'ag-grid-angular';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';
import { FreightContractsHomeComponent } from './freight-contracts-home/freight-contracts-home.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(FreightContractsRoutes),
    AgGridModule.withComponents([AGGridCellDataComponent,AGGridCellRendererComponent])
  ],
  declarations: [FreightContractsMastersComponent, FreightContractsNewComponent, FreightContractsHomeComponent],
  
})
export class FreightContractsModule { }
