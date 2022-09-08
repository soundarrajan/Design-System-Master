import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { externalUrlProvider, TradeRoutes} from './trade.route';
import { PhysicalTradeComponent } from './physical-trade/physical-trade.component';
import { TradeListComponent } from './trade-list/trade-list.component';
import { FilterChipsComponent } from './filter-chips/filter-chips.component';
import { TradeBadgesComponent } from './badges/badges.component';
import { TradeCompsComponent } from './trade-comps/trade-comps.component';
import { AggridStatusChipComponent } from '../shared/ag-grid/ag-grid-status-chip.component';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AgGridModule } from 'ag-grid-angular';
import { TradeListHomeComponent } from './trade-list-home/trade-list-home.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';
import { AggridLinkComponent } from '../shared/ag-grid/ag-grid-link.component';
import { RiskSimulatorComponent } from './risk-simulator/risk-simulator.component';
import { NewOptionsTradeComponent } from './new-options-trade/new-options-trade.component';
import { Newheaderv2Component } from './newheaderv2/newheaderv2.component';
import { AllocationsComponent } from './allocations/allocations.component';
import { NewoptionauditlogComponent } from './newoptionauditlog/newoptionauditlog.component';
import { NewoptiondocumentationComponent } from './newoptiondocumentation/newoptiondocumentation.component';
import { NewOptionEmaillogComponent } from './new-option-emaillog/new-option-emaillog.component';
import { ExposureDetailsComponent } from './exposure-details/exposure-details.component';
@NgModule({
    providers:[
        {
            provide: externalUrlProvider,
            useValue: (route: ActivatedRouteSnapshot) => {
                const externalUrl = route.paramMap.get('externalUrl');
                window.open(externalUrl, '_blank');
            },
        }
    ],
    declarations: [
        PhysicalTradeComponent,
        TradeListComponent,
        FilterChipsComponent,
        TradeBadgesComponent,
        TradeCompsComponent,
        TradeListHomeComponent,
        RiskSimulatorComponent,
        NewOptionsTradeComponent,
        Newheaderv2Component,
        AllocationsComponent,
        NewoptionauditlogComponent,
        NewoptiondocumentationComponent,
        NewOptionEmaillogComponent,
        ExposureDetailsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        RouterModule.forChild(TradeRoutes),
        AgGridModule.withComponents([AggridStatusChipComponent , AGGridCellRendererComponent,AggridLinkComponent, AGGridCellDataComponent ])
       
    ] 
})
export class TradeModule{
    
}