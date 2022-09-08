import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { BLReconRoutes } from './blrecon-list.route';
import { BlreconHomeComponent } from './blrecon-home/blrecon-home.component';
import { BlreconMatchedListComponent } from './blrecon-matched-list/blrecon-matched-list.component';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { BlreconUnmatchedListComponent } from './blrecon-unmatched-list/blrecon-unmatched-list.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';
import { AggridCustomFilter } from '../shared/ag-grid/ag-grid-custom-filter.component';
import { AGGridEditorComponent } from '../shared/ag-grid/ag-grid-editor.component';
import { CustomHeaderGroup } from '../shared/ag-grid/custom-header-group.component';
import { AgGridLookupEditor } from '../shared/ag-grid/ag-grid-lookup.component';
import { reconciliationHomeComponent } from './reconciliation-home/reconciliation-home.component';
import { CostReconciliationComponent } from './cost-reconciliation/cost-reconciliation.component';
import { AggridLinkComponent } from '../shared/ag-grid/ag-grid-link.component';
import { BlListComponent } from './bl-list/bl-list.component';
import { BlListHomeComponent } from './bl-list-home/bl-list-home.component';
import { AgGridDatetimePickerNewComponent } from '../shared/ag-grid/ag-grid-datetime-picker-new.component';
import { JournalDetailComponent } from './journal-detail/journal-detail.component';
import { RelatedJournalsComponent } from './related-journals/related-journals.component';
import { DetailsJournalsComponent } from './details-journals/details-journals.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(BLReconRoutes),
    AgGridModule.withComponents([AGGridCellDataComponent, AGGridCellRendererComponent, AggridCustomFilter, AGGridEditorComponent, CustomHeaderGroup, AgGridLookupEditor,AggridLinkComponent,AgGridDatetimePickerNewComponent ])
  ],
  declarations: [BlreconHomeComponent,
     BlreconMatchedListComponent,
      BlreconUnmatchedListComponent, 
      reconciliationHomeComponent,
       CostReconciliationComponent,
       BlListComponent,
       BlListHomeComponent,
       JournalDetailComponent,
       RelatedJournalsComponent,
       DetailsJournalsComponent]
})
export class BlreconModule { }