import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { TransactionListRoutes } from './transaction-list.route';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionListScreenComponent } from './transaction-list-screen/transaction-list-screen.component';
import { AgGridModule } from 'ag-grid-angular';
import { AggridStatusChipComponent } from '../shared/ag-grid/ag-grid-status-chip.component';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(TransactionListRoutes),
    AgGridModule.withComponents([AggridStatusChipComponent , AGGridCellDataComponent, AGGridCellRendererComponent ])
  ],
  declarations: [TransactionListComponent, TransactionListScreenComponent]
})
export class TransactionListModule { }
