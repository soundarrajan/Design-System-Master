import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { InvoiceScreenComponent } from './invoice-screen/invoice-screen.component';
import { AgGridModule } from 'ag-grid-angular';
import { AggridStatusChipComponent } from '../shared/ag-grid/ag-grid-status-chip.component';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';
import { InvoiceListRoutes } from './shiptech-invoice.route';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { RelatedInvoicesComponent } from './related-invoices/related-invoices.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(InvoiceListRoutes),
    AgGridModule.withComponents([AggridStatusChipComponent , AGGridCellDataComponent, AGGridCellRendererComponent ])
  ],
 
})
export class ShiptechInvoiceModule { }
