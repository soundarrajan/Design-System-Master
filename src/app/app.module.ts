import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PlanningDashboardModule } from './planning-dashboard/planning-dashboard.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material-module';
import { SharedModule } from './shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import {LicenseManager} from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('INATECH_EUROPE_LIMITED__MultiApp_1Devs1_SaaS_14_November_2022__MTY3MTUzMDkzODQxNQ==d429630a4af81735003a345c0cd1c941');
import 'ag-grid-enterprise';
import { AppSettings } from '../app/shared/models/api-settings';
import { HttpModule } from '@angular/http';
import { Broadcaster } from '../app/planning-dashboard/services/broadcaster';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { ShiptechDeliveryComponent } from './shiptech-delivery/shiptech-delivery.component';
import { SpotnegoPricingDetailsComponent } from './shiptech-spot-negotiation/spot-negotiation-popups/spotnego-pricing-details/spotnego-pricing-details.component';
import { SpotnegoAdditionalcostComponent } from './shiptech-spot-negotiation/spot-negotiation-popups/spotnego-additionalcost/spotnego-additionalcost.component';
import { SpotnegoOfferpricehistoryComponent } from './shiptech-spot-negotiation/spot-negotiation-popups/spotnego-offerpricehistory/spotnego-offerpricehistory.component';
import { SpotnegoConfirmorderComponent } from './shiptech-spot-negotiation/spot-negotiation-popups/spotnego-confirmorder/spotnego-confirmorder.component';
import { RfqspopupComponent } from './shiptech-spot-negotiation/spot-negotiation-popups/rfqspopup/rfqspopup.component';
import { AvailabletermcontractspopupComponent } from './shiptech-spot-negotiation/spot-negotiation-popups/availabletermcontractspopup/availabletermcontractspopup.component';
import { SellerratingpopupComponent } from './shiptech-spot-negotiation/spot-negotiation-popups/sellerratingpopup/sellerratingpopup.component';
import { ContactinformationpopupComponent } from './shiptech-spot-negotiation/spot-negotiation-popups/contactinformationpopup/contactinformationpopup.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MarketpricehistorypopupComponent } from './shiptech-spot-negotiation/spot-negotiation-popups/marketpricehistorypopup/marketpricehistorypopup.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MyNotesComponent } from './shiptech-control-tower/my-notes/my-notes.component';
import { ApplicablecostpopupComponent } from './shiptech-spot-negotiation/spot-negotiation-popups/applicablecostpopup/applicablecostpopup.component';
import { SpotnegoSendRfqComponent } from './shiptech-spot-negotiation/spot-negotiation-popups/spotnego-send-rfq/spotnego-send-rfq.component';
import { LocalService } from './services/local-service.service';
import { SpotnegoRequestChangesComponent } from './shiptech-spot-negotiation/spot-negotiation-popups/spotnego-request-changes/spotnego-request-changes.component';
import { SupplierCommentsNewPopupComponent } from './shiptech-spot-negotiation/spot-negotiation-popups/supplier-comments-new-popup/supplier-comments-new-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    //SpotnegoPricingDetailsComponent,
    SpotnegoAdditionalcostComponent,
    SpotnegoOfferpricehistoryComponent,
    SpotnegoConfirmorderComponent,
    RfqspopupComponent,
    AvailabletermcontractspopupComponent,
    SellerratingpopupComponent,
    ContactinformationpopupComponent,
    MarketpricehistorypopupComponent,
    ApplicablecostpopupComponent,
    SpotnegoSendRfqComponent,
    SpotnegoRequestChangesComponent,
    SupplierCommentsNewPopupComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    NgbModule,
    RouterModule.forRoot(AppRoutes),
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    NgxDatatableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    HttpModule,
    PlanningDashboardModule,
    Ng2SearchPipeModule
  ],
  providers: [AppSettings,Broadcaster,LocalService],
  bootstrap: [AppComponent],
  entryComponents:[
    SpotnegoAdditionalcostComponent,
    SpotnegoOfferpricehistoryComponent,
    SpotnegoConfirmorderComponent,
    SpotnegoRequestChangesComponent]

})
export class AppModule { }
