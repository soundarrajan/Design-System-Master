import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';
import {ShipPopupComponent} from './ship-popup/ship-popup.component';
import {ShipPopupFullComponent} from './ship-popup-full/ship-popup-full.component';
import {LocationHoverComponent} from './location-hover/location-hover.component';
import {FilterChipsComponent} from './filter-chips/filter-chips.component';
import { FilterPopupComponent } from './filter-popup/filter-popup.component';
import {PlanningTableComponent} from './planning-table/planning-table.component';
import { CommentPopupComponent } from './comment-popup/comment-popup.component';
import {OtherComponentsComponent} from './other-components/other-components.component'
import {PortHover2Component} from './port-hover2/port-hover2.component';
import {VesselInfoComponent} from './vessel-info/vessel-info.component';
import {Vessel2TabsComponent} from './vessel2-tabs/vessel2-tabs.component';
import {Location2InfoComponent} from './location2-info/location2-info.component';
import {DarkFilterComponent} from './dark-filter/dark-filter.component';
import {MapPanelComponent} from './map-panel/map-panel.component';
import {SmartTraderComponent} from './smart-trader/smart-trader.component';
import {BunkerNewsComponent} from './bunker-news/bunker-news.component';
import { SmartTraderAppComponent } from './smart-trader-app/smart-trader-app.component';
import { Port2TabsComponent } from './port2-tabs/port2-tabs.component';
import { OpenlayersMapComponent } from './openlayers-map/openlayers-map.component';
import { AiBunkeringRangeComponent } from './ai-bunkering-range/ai-bunkering-range.component';
import {NewvesselLocationPopupComponent}from './newvessel-location-popup/newvessel-location-popup.component';
import { AiQ2DesignComponent } from './ai-q2-design/ai-q2-design.component';

export const PlanningDashboardRoutes: Routes = [
    {
        path: 'shippopup',        
        component: ShipPopupComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Ship Popup'}
    },
    {
        path: 'fullshippopup',        
        component: ShipPopupFullComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Expanded Ship Popup'}
    },
    {
        path: 'locationhover',        
        component: LocationHoverComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Location Popup'}
    },
    {
        path: 'filterchips',        
        component: FilterChipsComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Filter Chips'}
    },
    {
        path: 'filterpopup',        
        component: FilterPopupComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Filter Popup'}
    },
    {
        path: 'darkfilter',        
        component: DarkFilterComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Dark Filter'}
    },
    {
        path: 'tableview',        
        component: PlanningTableComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Table View'}
    },    
    {
        path: 'comments',        
        component: CommentPopupComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Comments'}
    },
    {
        path: 'others',        
        component: OtherComponentsComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Others'}
    },
    {
        path: 'porthover',
        component: PortHover2Component,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Port Hover'}
    },
    {
        path: 'vesselinfo',
        component: VesselInfoComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Vessel Info'}
    },
    {
        path: 'vessel2info',
        component: Vessel2TabsComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Expanded Vessel Info'}
    },
    {
        path: 'location2info',
        component: Location2InfoComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Location Info'}
    },
    {
        path: 'mappanel',
        component: MapPanelComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Map Panel'}
    },
    {
        path: 'smarttrader',
        component: SmartTraderComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Table View'}
    },
    {
        path: 'smarttraderapp',
        component: SmartTraderAppComponent
    },
    {
        path: 'news',
        component: BunkerNewsComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Bunker News'}
    },
    {
        path: 'port2tab',
        component: Port2TabsComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'Port Tab'}
    },
    {
        path: 'olayersmap',
        component: OpenlayersMapComponent
    },
    {
        path: 'ai',
        component: AiBunkeringRangeComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'AI Bunkering'}
    },
    {
        path: 'ai-q2-design',
        component: AiQ2DesignComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'AI Q2'}
    },
    {
        path: 'Vessel&locationpopups-newdesign',
        component: NewvesselLocationPopupComponent,
        data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Map Components',breadCrumb3 : 'New Vessel'}
    }
]