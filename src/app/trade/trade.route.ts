import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';
import { PhysicalTradeComponent } from './physical-trade/physical-trade.component';
import { TradeListComponent } from './trade-list/trade-list.component';
import { FilterChipsComponent } from './filter-chips/filter-chips.component';
import { TradeBadgesComponent } from './badges/badges.component';
import { TradeCompsComponent } from './trade-comps/trade-comps.component';
import { TradeListHomeComponent } from './trade-list-home/trade-list-home.component';
import { RiskSimulatorComponent } from './risk-simulator/risk-simulator.component';
import { NewOptionsTradeComponent } from './new-options-trade/new-options-trade.component';
import { Newheaderv2Component } from './newheaderv2/newheaderv2.component';

export const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

export const TradeRoutes: Routes = [
    {
        path: 'physicalTrade',
        component: PhysicalTradeComponent,
    },
    {
        path: 'externalRedirect',
        resolve: {
            url: externalUrlProvider,
        }
    },
    {
        path: 'tradelist',
        component: TradeListHomeComponent,
        data : {breadCrumb1 : 'Trade',breadCrumb2 : 'Trade List'}
    },
    {
        path: 'filterchips',
        component: FilterChipsComponent,
    },
    {
        path: 'tradebadges',
        component: TradeBadgesComponent,
    },
    {
        path: 'tradecomps',
        component: TradeCompsComponent,
    },
    {
        path: 'risksimulator',
        component: RiskSimulatorComponent,
        data : {breadCrumb1 : 'Trade',breadCrumb2 : 'Risk Simulator'}
    },
    {
        path: 'newoptionstrade',
        component: NewOptionsTradeComponent,
    },
    {
        path: 'newheaderv2',
        component: Newheaderv2Component,
    }
]