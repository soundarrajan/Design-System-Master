import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { externalUrlProvider, DesignSystemCompsRoutingModule} from './v1-comps-routing.module';

import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material-module';
import { SharedModule } from '../../shared/shared.module';

import { AggridStatusChipComponent } from '../../shared/ag-grid/ag-grid-status-chip.component';
import { AGGridCellDataComponent } from '../../shared/ag-grid/ag-grid-celldata.component';
import { AgGridModule } from 'ag-grid-angular';
import { OtherComponentsComponent } from './v1-components/other-components/other-components.component';
import { Newheaderv2Component } from './v1-components/newheaderv2/newheaderv2.component';
import { TradeCompsComponent } from './v1-components/trade-comps/trade-comps.component';
import { ScrollTestComponent } from './v1-components/scroll-test/scroll-test.component';
import { FilterChipsComponent } from './v1-components/filter-chips/filter-chips.component';




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
        FilterChipsComponent,
        TradeCompsComponent,
        Newheaderv2Component,
        ScrollTestComponent,
        OtherComponentsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        RouterModule.forChild(DesignSystemCompsRoutingModule),
        AgGridModule.withComponents([AggridStatusChipComponent , AGGridCellDataComponent ])
       
    ] 
})



export class DesignSystemCompsModule { }
