import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InjectionToken } from '@angular/core';
import { CustomComponentsHomeComponent } from '../../custom-components/custom-components-home/custom-components-home.component';
import { UiComponentsComponent } from '../../custom-components/v2-components/ui-components.component';
import { OtherComponentsComponent } from './v1-components/other-components/other-components.component';
import { Newheaderv2Component } from './v1-components/newheaderv2/newheaderv2.component';
import { TradeCompsComponent } from './v1-components/trade-comps/trade-comps.component';
import { ScrollTestComponent } from './v1-components/scroll-test/scroll-test.component';
import { FilterChipsComponent } from './v1-components/filter-chips/filter-chips.component';








export const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

export const DesignSystemCompsRoutingModule: Routes = [
  {
    path: 'externalRedirect',
    resolve: {
        url: externalUrlProvider,
    }
  },
  {
    path: 'tradecomps',
    component: TradeCompsComponent,
    data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Components.V1',breadCrumb3 : 'Others'}
},
{
  path: 'filterchips',
  component: FilterChipsComponent,
  data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Components.V1',breadCrumb3 : 'Filter Chips'}
},
{
  path: 'newheaderv2',
  component: Newheaderv2Component,
  data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Components.V1',breadCrumb3 : 'New Header'}
},
{
    path: 'scrolltest',
    component: ScrollTestComponent,
    data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Components.V1',breadCrumb3 : 'Scrolltest'}
},
{
    path: 'rackothercomponents',        
    component: OtherComponentsComponent,
    data : {breadCrumb1 : 'Design System Components',breadCrumb2 : 'Components.V1',breadCrumb3 : 'Rack Components'}
},
];


