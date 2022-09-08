import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShipTechHomeScreenComponent } from './ship-tech-home-screen/ship-tech-home-screen.component';
import { RouterModule } from '@angular/router';
import { ShipTechRoutes } from './ship-tech.route';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { CustomComponentsHomeComponent } from './custom-components-home/custom-components-home.component';
import { MaterialModule } from '../material-module';
import { UiComponentsComponent, PopupContent1Component, PopupContent2Component } from './v2-components/ui-components.component';
import { InvoiceScreenComponent } from '../shiptech-invoice/invoice-screen/invoice-screen.component';
import { InvoiceDetailsComponent } from '../shiptech-invoice/invoice-details/invoice-details.component';
import { RelatedInvoicesComponent } from '../shiptech-invoice/related-invoices/related-invoices.component';
import { ShiptechDeliveryComponent } from '../shiptech-delivery/shiptech-delivery.component';
import { ShiptechContractHomeComponent } from './shiptech-contract/shiptech-contract-home/shiptech-contract-home.component';
import { ControlTowerHomeComponent } from '../shiptech-control-tower/control-tower-home/control-tower-home.component';
import { QualityLabsComponent } from '../shiptech-control-tower/quality-labs/quality-labs.component';
import { QualityClaimsComponent } from '../shiptech-control-tower/quality-claims/quality-claims.component';
import { QuantityDifferenceComponent } from '../shiptech-control-tower/quantity-difference/quantity-difference.component';
import { QuantityClaimsComponent } from '../shiptech-control-tower/quantity-claims/quantity-claims.component';
import { ResidueClaimsComponent } from '../shiptech-control-tower/residue-claims/residue-claims.component';
import { ResidueDifferenceComponent } from '../shiptech-control-tower/residue-difference/residue-difference.component';
import { HighlightPipe, MyNotesComponent } from '../shiptech-control-tower/my-notes/my-notes.component';
import { SpotNegotiationHomeComponent } from '../shiptech-spot-negotiation/spot-negotiation-home/spot-negotiation-home.component';
import { SpotNegotiationDetailsComponent } from '../shiptech-spot-negotiation/spot-negotiation-details/spot-negotiation-details.component';
import { SpotNegotiationHeaderComponent } from '../shiptech-spot-negotiation/spot-negotiation-header/spot-negotiation-header.component';
import { ShiptechCustomHeaderGroup } from '../shared/ag-grid/shiptech-custom-header-group';
import { SearchRequestPopupComponent } from '../shiptech-spot-negotiation/spot-negotiation-popups/search-request-popup/search-request-popup.component';
import { EmailPreviewPopupComponent } from '../shiptech-spot-negotiation/spot-negotiation-popups/email-preview-popup/email-preview-popup.component';
import { DocDragDropUploadComponent } from '../shiptech-spot-negotiation/doc-drag-drop-upload/doc-drag-drop-upload.component';
import { SpotnegoemaillogComponent } from '../shiptech-spot-negotiation/spotnegoemaillog/spotnegoemaillog.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SupplierCommentsPopupComponent } from '../shiptech-spot-negotiation/spot-negotiation-popups/supplier-comments-popup/supplier-comments-popup.component';
import { SpotNegotiationNewCommentsComponent } from '../shiptech-spot-negotiation/spot-negotiation-new-comments/spot-negotiation-new-comments.component';
import { ControlTowerHomeNewComponent } from '../shiptech-control-tower/control-tower-home-new/control-tower-home-new.component';
import { PreviewRfqPopupComponent } from '../shiptech-spot-negotiation/spot-negotiation-popups/preview-rfq-popup/preview-rfq-popup.component';
import { SearchFormulaPopupComponent } from '../shiptech-spot-negotiation/spot-negotiation-popups/search-formula-popup/search-formula-popup.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(ShipTechRoutes),
    AgGridModule.withComponents([ShiptechCustomHeaderGroup]),
    Ng2SearchPipeModule,

  ],
  declarations: [HighlightPipe, MyNotesComponent, ResidueDifferenceComponent, ResidueClaimsComponent, QuantityClaimsComponent, ControlTowerHomeComponent, ControlTowerHomeNewComponent, QualityLabsComponent, QualityClaimsComponent, QuantityDifferenceComponent, ShipTechHomeScreenComponent, ShiptechContractHomeComponent, ShiptechDeliveryComponent, InvoiceScreenComponent, InvoiceDetailsComponent, RelatedInvoicesComponent, CustomComponentsHomeComponent, UiComponentsComponent, PopupContent1Component, PopupContent2Component, SpotNegotiationHomeComponent, SpotNegotiationDetailsComponent, SpotNegotiationNewCommentsComponent, SpotNegotiationHeaderComponent, SearchRequestPopupComponent,SearchFormulaPopupComponent, EmailPreviewPopupComponent, PreviewRfqPopupComponent, SpotnegoemaillogComponent, DocDragDropUploadComponent, SupplierCommentsPopupComponent],
  entryComponents: [
    PopupContent1Component, PopupContent2Component ]
})
export class ShipTechModule { }
