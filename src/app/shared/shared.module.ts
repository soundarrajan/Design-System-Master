import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '../material-module';
import { AccordionAnchorDirective } from './accordion/accordionanchor.directive';
import { AccordionLinkDirective } from './accordion/accordionlink.directive';
import { AccordionDirective } from './accordion/accordion.directive';
import { ToggleFullscreenDirective } from './fullscreen/toggle-fullscreen.directive';
import { ParentRemoveDirective } from './elements/parent-remove.directive';
import { ScrollModule } from '../shared/scroll/scroll.module';
import { ToastyModule } from 'ng2-toasty';
import { ToastrModule } from 'ngx-toastr';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ClickOutsideModule } from 'ng-click-outside';
import 'hammerjs';
import { PipelineFilterComponent } from './dialog-popup/pipeline-filter/pipeline-filter.component';
import { BadgeComponent } from './badge/badge.component';
import { SearchComponent } from './search/search.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TradePopupComponent } from './dialog-popup/trade-popup/trade-popup.component';
import { TradelistFilterComponent } from './dialog-popup/tradelist-filter/tradelist-filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SavefilterprefComponent } from './dialog-popup/savefilterpref/savefilterpref.component';
import { WarningPopupComponent } from './dialog-popup/warning-popup/warning-popup.component';
import { AvailableColumnsComponent } from './dialog-popup/available-columns/available-columns.component';
import { MoreFiltersComponent } from './dialog-popup/more-filters/more-filters.component';
import { FilterChipsComponent } from './filter-chips/filter-chips.component';
import { DesignSystemComponent } from '../flat_nav/design-system.component';
import { RouterModule } from '@angular/router';
import { SetpricePublishComponent } from './dialog-popup/setprice-publish/setprice-publish.component';
import { AvailableFiltersComponent } from './dialog-popup/available-filters/available-filters.component';
import { SetpriceRepublishComponent } from './dialog-popup/setprice-republish/setprice-republish.component';
import { ShipSaveprefComponent } from './dialog-popup/ship-savepref/ship-savepref.component';
import { ShipDeleteprefComponent } from './dialog-popup/ship-deletepref/ship-deletepref.component';
import { RemoveTerminalComponent } from './dialog-popup/remove-terminal/remove-terminal.component';
import { TechAvailableFiltersComponent } from './dialog-popup/tech-available-filters/tech-available-filters.component';
import { AggridStatusChipComponent } from './ag-grid/ag-grid-status-chip.component';
import { AGGridCellDataComponent } from './ag-grid/ag-grid-celldata.component';
import { AggridChipComponent } from './ag-grid/ag-grid-chip.component';
import { AggridLinkComponent } from './ag-grid/ag-grid-link.component';
import { AGGridCellRendererComponent } from './ag-grid/ag-grid-cell-renderer.component';
import { CreateInvoiceComponent } from './dialog-popup/create-invoice/create-invoice.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './dialog-popup/product-details/product-details.component';
import { RemoveExternalRefComponent } from './dialog-popup/remove-external-ref/remove-external-ref.component';
import { CustomHeaderGroup } from './ag-grid/custom-header-group.component';
import { CustomHeaderGroupNotify } from './ag-grid/custom-header-group-notification.component';
import { AggridCustomFilter } from './ag-grid/ag-grid-custom-filter.component';
import { AGGridEditorComponent } from './ag-grid/ag-grid-editor.component';
import { AGGridDateTimePickerComponent } from './ag-grid/ag-grid-datetimePicker.component';
import { AgGridLookupEditor } from './ag-grid/ag-grid-lookup.component';
import { LocalService } from '../services/local-service.service';
//import { SearchVesselComponent } from './search-vessel/search-vessel.component';
import { VesselFilterComponent } from '../planning-dashboard/vessel-filter/vessel-filter.component';
import { InvoiceSummaryPopupComponent } from './dialog-popup/invoice-summary-popup/invoice-summary-popup.component';
import { BulkActualisePopupComponent } from './dialog-popup/bulk-actualise-popup/bulk-actualise-popup.component';
import { reconciliationPopupComponent } from './dialog-popup/reconciliation-pop/reconciliation-popup.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BulkImportTransactionComponent } from './dialog-popup/bulk-import-transaction/bulk-import-transaction.component';
import { BulkImportStatusComponent } from './dialog-popup/bulk-import-status/bulk-import-status.component';
import { BulkImportSuccessComponent } from './dialog-popup/bulk-import-success/bulk-import-success.component';
import { BulkImportErrorComponent } from './dialog-popup/bulk-import-error/bulk-import-error.component';
import { InvoiceSummaryNestedComponent } from './dialog-popup/invoice-summary-nested/invoice-summary-nested.component';
import { CellHoverDetailsComponent } from './dialog-popup/cell-hover-details/cell-hover-details.component';
import { AgGridHoverPopupComponent } from './ag-grid/ag-grid-hover-popup.component';
import { TransactionSummaryComponent } from './dialog-popup/transaction-summary/transaction-summary.component';
import { OperationSummaryPopComponent } from './dialog-popup/operation-summary-pop/operation-summary-pop.component';
import { EmailPreviewComponent } from './dialog-popup/email-preview/email-preview.component';
import { VessellocationpopupComponent } from './vessellocationpopup/vessellocationpopup.component';
import { VesseldetailspopupComponent } from './vesseldetailspopup/vesseldetailspopup.component';
import { EompopupComponent } from './dialog-popup/eompopup/eompopup.component';
import { WarningDeletePopupComponent } from './dialog-popup/warning-delete-popup/warning-delete-popup.component';
import { OperationSummaryWithoutaddnewComponent } from './dialog-popup/operation-summary-withoutaddnew/operation-summary-withoutaddnew.component';
import { AddMovementComponent } from './dialog-popup/add-movement/add-movement.component';
import { HeaderchipComponent } from './headerchip/headerchip.component';
import { MorefilterchipComponent } from './morefilterchip/morefilterchip.component';
import { OperationSummaryWithStatusComponent } from './dialog-popup/operation-summary-with-status/operation-summary-with-status.component';
import { NewAddMovementComponent } from './dialog-popup/new-add-movement/new-add-movement.component';
import { AgGridDatetimePickerNewComponent } from './ag-grid/ag-grid-datetime-picker-new.component';
import { SaveMovementComponent } from './dialog-popup/save-movement/save-movement.component';
import { SaveMovementActionsButtonsComponent } from './dialog-popup/save-movement-actions-buttons/save-movement-actions-buttons.component';
import { SaveMovementClubbedComponent } from './dialog-popup/save-movement-clubbed/save-movement-clubbed.component';
import { SaveMovementClubbedActionsButtonsComponent } from './dialog-popup/save-movement-clubbed-actions-buttons/save-movement-clubbed-actions-buttons.component';
import { PipelineTariffComponent } from './dialog-popup/pipeline-tariff/pipeline-tariff.component';
import { DeliveryConfirmationComponent } from './dialog-popup/delivery-confirmation/delivery-confirmation.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { BulkUpdatePopupComponent } from './dialog-popup/bulk-update-popup/bulk-update-popup.component';
import { AgGridCellStyleComponent } from './ag-grid/ag-grid-cell-style.component';
import { FormFieldComponent } from './designsystem-v2/form-field/form-field.component';
import { ChipsComponent } from './designsystem-v2/chips/chips.component';
import { ButtonToggleComponent } from './designsystem-v2/button-toggle/button-toggle.component';
import { TabsComponent } from './designsystem-v2/tabs/tabs.component';
import { PricingForecastComponent } from './designsystem-v2/pricing-forecast/pricing-forecast.component';
import { GridPopupComponent } from './dialog-popup/grid-popup/grid-popup.component';
import { DragDropUploadComponent } from './designsystem-v2/drag-drop-upload/drag-drop-upload.component';
import { DragNDropDirective } from './drag-n-drop/drag-n-drop.directive';
import { AgGridCustomRadiobuttonComponent } from './ag-grid/ag-grid-custom-radiobutton.component';
import { LabelsComponent } from './designsystem-v2/labels/labels.component';
import { EditableGridComponent } from './designsystem-v2/editable-grid/editable-grid.component';
import { TraderSearchPopupComponent } from './designsystem-v2/trader-search-popup/trader-search-popup.component';
import { AgGridModule } from 'ag-grid-angular';
import { AGGridCellEditableComponent } from './designsystem-v2/ag-grid/ag-grid-cell-editable.component';
import { AGGridCellActionsComponent } from './designsystem-v2/ag-grid/ag-grid-cell-actions.component';
import { AGGridCellRendererV2Component } from './designsystem-v2/ag-grid/ag-grid-cell-rendererv2.component';
import { AGGridCellMenuPopupComponent } from './designsystem-v2/ag-grid/ag-grid-cell-menu.component';
import { AgGridDatetimePickerV2Component } from './designsystem-v2/ag-grid/ag-grid-datetime-picker.component';
import { UpDownloadGridComponent } from './designsystem-v2/up-download-grid/up-download-grid.component';
import { HelpComponent } from './designsystem-v2/help/help.component';
import { CogsCalculationComponent } from './dialog-popup/cogs-calculation/cogs-calculation.component';
import { TankPopupComponent } from './dialog-popup/tank-popup/tank-popup.component';
import { MoreOptionsPopupComponent } from './more-options-popup/more-options-popup.component';
import { DateFilterPipe } from '../shared/designsystem-v2/date-filter.pipe';
import { ProgressStepperComponent } from './designsystem-v2/progress-stepper/progress-stepper.component';
import { SmartFilterComponent } from './designsystem-v2/smart-filter/smart-filter.component';
import { BadgeComponentV2 } from './designsystem-v2/badge/badge.component';
import { TabsHeaderComponent } from './designsystem-v2/tabs-header/tabs-header.component';
import { HeaderFilterChipComponent } from './designsystem-v2/header-filter-chip/header-filter-chip.component';
import { MoreFilterChipComponent } from './designsystem-v2/more-filter-chip/more-filter-chip.component';
import { FilterListComponent } from './designsystem-v2/filter-list/filter-list.component';
import { FooterV2Component } from './designsystem-v2/footer-v2/footer-v2.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AvailableFiltersPreferencesComponent } from './designsystem-v2/dialog-popup/available-filters-preferences/available-filters-preferences.component';
import { ButtonComponent } from './designsystem-v2/button/button.component';
import { ChangeLogPopupComponent } from './dialog-popup/change-log-popup/change-log-popup.component';
import { ChipsGroupComponent } from './shiptech-ui-components/chips-group/chips-group.component';
import { AutocompleteWithSearchComponent } from './shiptech-ui-components/autocomplete-with-search/autocomplete-with-search.component';
import { MoreButtonToggleComponent } from './shiptech-ui-components/more-button-toggle/more-button-toggle.component';
import { ExpansionPopupComponent } from './shiptech-ui-components/expansion-popup/expansion-popup.component';
import { AddDeleteInfoComponent } from './shiptech-ui-components/add-delete-info/add-delete-info.component';
import { SearchLookupCommonComponent } from './designsystem-v2/search-lookup-common/search-lookup-common.component';
import { RowstatusOnchangePopupComponent } from './designsystem-v2/rowstatus-onchange-popup/rowstatus-onchange-popup.component';
import { SelectRadioComponent } from './shiptech-ui-components/select-radio/select-radio.component';
import { ShiptechCustomHeaderGroup } from './ag-grid/shiptech-custom-header-group';
import { AgGridDatetimePickerToggleComponent } from './ag-grid/ag-grid-datetimePicker-Toggle';

import { RowstatusOnchangeQualitylabPopupComponent } from './designsystem-v2/rowstatus-onchange-qualitylab-popup/rowstatus-onchange-qualitylab-popup.component';
import { RowstatusOnchangeQuantityrobdiffPopupComponent } from './designsystem-v2/rowstatus-onchange-quantityrobdiff-popup/rowstatus-onchange-quantityrobdiff-popup.component';
import { RowstatusOnchangeResiduePopupComponent } from './designsystem-v2/rowstatus-onchange-residue-popup/rowstatus-onchange-residue-popup.component';
import { RowstatusOnchangeQuantityclaimPopupComponent } from './designsystem-v2/rowstatus-onchange-quantityclaim-popup/rowstatus-onchange-quantityclaim-popup.component';
import { LocPanDataComponent } from './shiptech-ui-components/loc-pan-data/loc-pan-data.component';
import { ShiptechContractPricingDetailsPopupComponent } from './dialog-popup/shiptech-contract-pricing-details-popup/shiptech-contract-pricing-details-popup.component';
import { ShiptechContractFormulahistoryPopupComponent } from './dialog-popup/shiptech-contract-formulahistory-popup/shiptech-contract-formulahistory-popup.component';
import { ResizableModule } from './designsystem-v2/inatech-grid/resize/resizable.module';
import { InatechGridComponent } from './designsystem-v2/inatech-grid/inatech-grid.component';
import { DynamicBadgeComponent } from './shiptech-ui-components/dynamic-badge/dynamic-badge.component';
import { ModalPopUpComponent } from './designsystem-v2/modal-pop-up/modal-pop-up.component';
import { MatCheckboxHeaderComponent } from './ag-grid/mat-checkbox-header.component';
import { AggridHeaderRendererPopupComponent } from './ag-grid/ag-grid-header-renderer-popup';
import { DynamicPopupComponent } from './dialog-popup/dynamic-popup/dynamic-popup.component';
import { SpotnegoPricingDetailsComponent } from '../shiptech-spot-negotiation/spot-negotiation-popups/spotnego-pricing-details/spotnego-pricing-details.component';
import { DarkSelectionMenuComponent } from './shiptech-ui-components/dark-selection-menu/dark-selection-menu.component';

@NgModule({
  imports: [
    DragDropModule,
    CommonModule,
    ScrollModule,
    MaterialModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ClickOutsideModule,
    MatIconModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxPaginationModule,
    ResizableModule,
    ToastrModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullscreenDirective,
    ParentRemoveDirective,
    PipelineFilterComponent,
    BadgeComponent,
    DynamicBadgeComponent,
    SearchComponent,
    TradePopupComponent,
    TradelistFilterComponent,
    SavefilterprefComponent,
    WarningPopupComponent,
    AvailableColumnsComponent,
    MoreFiltersComponent,
    FilterChipsComponent,
    DesignSystemComponent,
    SetpricePublishComponent,
    AvailableFiltersComponent,
    SetpriceRepublishComponent,
    ShipSaveprefComponent,
    ShipDeleteprefComponent,
    SetpriceRepublishComponent,
    RemoveTerminalComponent,
    TechAvailableFiltersComponent,
    ProductDetailsComponent,
    AggridStatusChipComponent,
    AGGridCellDataComponent,
    AGGridCellDataComponent,
    AggridChipComponent,
    AggridLinkComponent,
    AGGridCellRendererComponent,
    CreateInvoiceComponent,
    RemoveExternalRefComponent,
    CustomHeaderGroup,
    CustomHeaderGroupNotify,
    AggridCustomFilter,
    AGGridEditorComponent,
    AGGridDateTimePickerComponent,
    AgGridLookupEditor,
    //SearchVesselComponent
    VesselFilterComponent,
    reconciliationPopupComponent,
    InvoiceSummaryPopupComponent,
    BulkActualisePopupComponent,
    BulkImportTransactionComponent,
    BulkImportStatusComponent,
    BulkImportSuccessComponent,
    BulkImportErrorComponent,
    BulkUpdatePopupComponent,
    InvoiceSummaryNestedComponent,
    CellHoverDetailsComponent,
    AgGridHoverPopupComponent,
    TransactionSummaryComponent,
    OperationSummaryPopComponent,
    EmailPreviewComponent,
    VessellocationpopupComponent,
    VesseldetailspopupComponent,
    EompopupComponent,
    WarningDeletePopupComponent,
    OperationSummaryWithoutaddnewComponent,
    AddMovementComponent,
    HeaderchipComponent,
    MorefilterchipComponent,
    OperationSummaryWithStatusComponent,
    NewAddMovementComponent,
    AgGridDatetimePickerNewComponent,
    AgGridDatetimePickerToggleComponent,
    SaveMovementComponent,
    SaveMovementActionsButtonsComponent,
    SaveMovementClubbedComponent,
    SaveMovementClubbedActionsButtonsComponent,
    PipelineTariffComponent,
    DeliveryConfirmationComponent,
    BulkUpdatePopupComponent,
    AgGridCellStyleComponent,
    FormFieldComponent,
    ChipsComponent,
    ButtonToggleComponent,
    TabsComponent,
    PricingForecastComponent,
    GridPopupComponent,
    DragDropUploadComponent,
    DragNDropDirective,
    AgGridCustomRadiobuttonComponent,
    LabelsComponent,
    EditableGridComponent,
    TraderSearchPopupComponent,
    AGGridCellEditableComponent,
    AGGridCellActionsComponent,
    AGGridCellRendererV2Component,
    AGGridCellMenuPopupComponent,
    AgGridDatetimePickerV2Component,
    UpDownloadGridComponent,
    HelpComponent,
    CogsCalculationComponent,
    TankPopupComponent,
    MoreOptionsPopupComponent,
    DateFilterPipe,
    ProgressStepperComponent,
    SmartFilterComponent,
    BadgeComponentV2,
    TabsHeaderComponent,
    HeaderFilterChipComponent,
    MoreFilterChipComponent,
    FilterListComponent,
    FooterV2Component,
    AvailableFiltersPreferencesComponent,
    ButtonComponent,
    ChangeLogPopupComponent,
    ChipsGroupComponent,
    AutocompleteWithSearchComponent,
    MoreButtonToggleComponent,
    ExpansionPopupComponent,
    AddDeleteInfoComponent,
    SearchLookupCommonComponent,
    RowstatusOnchangePopupComponent,
    SelectRadioComponent,
    ShiptechCustomHeaderGroup,
    InatechGridComponent,
    RowstatusOnchangeQualitylabPopupComponent,
    RowstatusOnchangeQuantityrobdiffPopupComponent,
    RowstatusOnchangeResiduePopupComponent,
    RowstatusOnchangeQuantityclaimPopupComponent,
    LocPanDataComponent,
    ShiptechContractPricingDetailsPopupComponent,
    ShiptechContractFormulahistoryPopupComponent,
    ModalPopUpComponent,
    MatCheckboxHeaderComponent,
    AggridHeaderRendererPopupComponent,
    DynamicPopupComponent,
    SpotnegoPricingDetailsComponent,
    DarkSelectionMenuComponent
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullscreenDirective,
    ParentRemoveDirective,
    DragNDropDirective,
    ScrollModule,
    ToastyModule,
    ToastrModule,
    ClickOutsideModule,
    BadgeComponent,
    DynamicBadgeComponent,
    SearchComponent,
    NgxDatatableModule,
    FilterChipsComponent,
    DesignSystemComponent,
    ReactiveFormsModule,
    FormsModule,
    VessellocationpopupComponent,
    VesseldetailspopupComponent,
    HeaderchipComponent,
    MorefilterchipComponent,
    DragDropModule,
    FormFieldComponent,
    ChipsComponent,
    ButtonToggleComponent,
    TabsComponent,
    PricingForecastComponent,
    GridPopupComponent,
    DragDropUploadComponent,
    LabelsComponent,
    EditableGridComponent,
    UpDownloadGridComponent,
    MoreOptionsPopupComponent,
    DateFilterPipe,
    ProgressStepperComponent,
    SmartFilterComponent,
    BadgeComponentV2,
    TabsHeaderComponent,
    HeaderFilterChipComponent,
    MoreFilterChipComponent,
    FilterListComponent,
    FooterV2Component,
    NgxPaginationModule,
    ButtonComponent,
    ChipsGroupComponent,
    AutocompleteWithSearchComponent,
    MoreButtonToggleComponent,
    ExpansionPopupComponent,
    AddDeleteInfoComponent,
    SearchLookupCommonComponent,
    RowstatusOnchangePopupComponent,
    SelectRadioComponent,
    AgGridDatetimePickerNewComponent,
    AgGridDatetimePickerToggleComponent,
    LocPanDataComponent,
    InatechGridComponent,
    ModalPopUpComponent,
    DarkSelectionMenuComponent
  ],
  entryComponents: [
    PipelineFilterComponent,
    TradelistFilterComponent,
    SavefilterprefComponent,
    WarningPopupComponent,
    TradePopupComponent,
    AvailableColumnsComponent,
    MoreFiltersComponent,
    SetpricePublishComponent,
    AvailableFiltersComponent,
    SetpriceRepublishComponent,
    ShipSaveprefComponent,
    ShipDeleteprefComponent,
    SetpriceRepublishComponent,
    RemoveTerminalComponent,
    TechAvailableFiltersComponent,
    ProductDetailsComponent,
    CreateInvoiceComponent,
    RemoveExternalRefComponent,
    VesselFilterComponent,
    reconciliationPopupComponent,
    InvoiceSummaryPopupComponent,
    BulkActualisePopupComponent,
    BulkImportTransactionComponent,
    BulkImportStatusComponent,
    BulkImportSuccessComponent,
    BulkImportErrorComponent,
    BulkUpdatePopupComponent,
    InvoiceSummaryNestedComponent,
    CellHoverDetailsComponent,
    TransactionSummaryComponent,
    OperationSummaryPopComponent,
    EmailPreviewComponent,
    EompopupComponent,
    WarningDeletePopupComponent,
    OperationSummaryWithoutaddnewComponent,
    AddMovementComponent,
    NewAddMovementComponent,
    OperationSummaryWithStatusComponent,
    SaveMovementComponent,
    SaveMovementActionsButtonsComponent,
    SaveMovementClubbedComponent,
    SaveMovementClubbedActionsButtonsComponent,
    PipelineTariffComponent,
    DeliveryConfirmationComponent,
    GridPopupComponent,
    CogsCalculationComponent,
    TankPopupComponent,
    AvailableFiltersPreferencesComponent,
    SelectRadioComponent
  ],
  providers: [
    DatePipe
  ]

})
export class SharedModule {

  static forRoot(): ModuleWithProviders[] {
    return [
      { ngModule: SimpleNotificationsModule },
      { ngModule: ToastyModule },
    ];
  }

}