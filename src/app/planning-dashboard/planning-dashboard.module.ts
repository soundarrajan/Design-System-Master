import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { PlanningDashboardRoutes } from './planning-dashboard.route';
import { ShipPopupComponent } from './ship-popup/ship-popup.component';
import { ShipPopupFullComponent } from './ship-popup-full/ship-popup-full.component';
import { VesselDetailsComponent } from './vessel-details/vessel-details.component';
import { VesselDestinationComponent } from './vessel-destination/vessel-destination.component';
import { VesselScheduleComponent } from './vessel-schedule/vessel-schedule.component';
import { LocationHoverComponent } from './location-hover/location-hover.component';
import { FilterChipsComponent } from './filter-chips/filter-chips.component';
import { FilterPopupComponent } from './filter-popup/filter-popup.component';
import { PlanningTableComponent } from './planning-table/planning-table.component';
import { CommentPopupComponent } from './comment-popup/comment-popup.component';
import { OtherComponentsComponent } from './other-components/other-components.component';
import { PortHover2Component } from './port-hover2/port-hover2.component';
import { VesselInfoComponent } from './vessel-info/vessel-info.component';
import { Vessel2TabsComponent } from './vessel2-tabs/vessel2-tabs.component';
import { Vessel2InfoComponent } from './vessel2-info/vessel2-info.component';
import { Vessel2DestinationComponent } from './vessel2-destination/vessel2-destination.component';
import { Vessel2ScheduleComponent } from './vessel2-schedule/vessel2-schedule.component';
//import { VesselFilterComponent } from './vessel-filter/vessel-filter.component';
import { Location2InfoComponent } from './location2-info/location2-info.component';
import { DarkFilterComponent } from './dark-filter/dark-filter.component';
import { MapPanelComponent } from './map-panel/map-panel.component';
import { SmartTraderComponent } from './smart-trader/smart-trader.component';
import { AgGridModule } from 'ag-grid-angular';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';
import { BunkerNewsComponent } from './bunker-news/bunker-news.component';
import { SmartTraderAppComponent } from './smart-trader-app/smart-trader-app.component';
import { MapComponent } from './map/map.component';
import { SmartTraderMapPanelComponent } from './smart-trader-map-panel/smart-trader-map-panel.component';
import { SearchVesselComponent} from '../shared/search-vessel/search-vessel.component';
import { PlanningDashboardService } from './services/planning-dashboard.service';
import { HttpHelperService } from './services/util-functions/http-helper';
import { Broadcaster } from './services/broadcaster';
// import { MongodbService } from 'inatech-shared-infrastructure';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppSettings } from '../shared/models/api-settings';
import {  BackendServices } from './services/backend.service';
import { LocalService } from '../services/local-service.service';
import { VesselAlertsComponent } from './vessel-alerts/vessel-alerts.component';
import { Port2TabsComponent } from './port2-tabs/port2-tabs.component';
import { Port2InfoComponent } from './port2-info/port2-info.component';
import { SupplierInfoComponent } from './supplier-info/supplier-info.component';
import { SupplierListComponent } from './supplier-info/supplier-list/supplier-list.component';
import { ContractsBenchmarkComponent } from './contracts-benchmark/contracts-benchmark.component';
import { AgGridHoverPopupComponent } from '../shared/ag-grid/ag-grid-hover-popup.component';
import { OpenlayersMapComponent } from './openlayers-map/openlayers-map.component';
import { AiBunkeringRangeComponent } from './ai-bunkering-range/ai-bunkering-range.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NewvesselLocationPopupComponent } from './newvessel-location-popup/newvessel-location-popup.component';
import { AiQ2DesignComponent } from './ai-q2-design/ai-q2-design.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    DragDropModule,
    RouterModule.forChild(PlanningDashboardRoutes),
    AgGridModule.withComponents([AGGridCellDataComponent, AGGridCellRendererComponent, AgGridHoverPopupComponent]),
    HttpModule, HttpClientModule
  ],
  declarations: [
    ShipPopupComponent, 
    ShipPopupFullComponent, 
    VesselDetailsComponent, 
    VesselDestinationComponent, 
    VesselScheduleComponent,
    LocationHoverComponent, 
    FilterChipsComponent, 
    FilterPopupComponent, 
    PlanningTableComponent, 
    CommentPopupComponent,
    OtherComponentsComponent,
    PortHover2Component,
    VesselInfoComponent,
    Vessel2TabsComponent,
    Vessel2InfoComponent,
    Vessel2DestinationComponent,
    Vessel2ScheduleComponent,
    Location2InfoComponent,
    DarkFilterComponent,
    MapPanelComponent,
    SmartTraderComponent,
    BunkerNewsComponent,
    SmartTraderAppComponent,
    MapComponent,
    SmartTraderMapPanelComponent,
    SearchVesselComponent,
    VesselAlertsComponent,
    Port2TabsComponent,
    Port2InfoComponent,
    SupplierInfoComponent,
    SupplierListComponent,
    ContractsBenchmarkComponent,
    OpenlayersMapComponent,
    AiBunkeringRangeComponent,
    NewvesselLocationPopupComponent,
    AiQ2DesignComponent,
    //AgGridHoverPopupComponent
    //VesselFilterComponent
  ],
  exports: [HttpModule, HttpClientModule],
  providers:[BackendServices, Broadcaster, HttpHelperService, PlanningDashboardService, AppSettings,LocalService]
})
export class PlanningDashboardModule { }
