import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { SetPriceComponent } from './set-price/set-price.component';
import { RackMarketingRoutes } from './rack-marketing.route';
import { RackMarketingHomeComponent } from './rack-marketing-home/rack-marketing-home.component';
import { PriceListComponent } from './price-list/price-list.component';
import { OtherComponentsComponent } from './other-components/other-components.component';
import { AgGridModule } from 'ag-grid-angular';
import { AggridStatusChipComponent } from '../shared/ag-grid/ag-grid-status-chip.component';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AggridChipComponent } from '../shared/ag-grid/ag-grid-chip.component';
import { AggridLinkComponent } from '../shared/ag-grid/ag-grid-link.component';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';
import {DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MomentDateTimeAdapter} from 'ng-pick-datetime-moment';
//import {CUSTOM_MOMENT_FORMATS, MATDATEPICKER_FORMATS} from '../../core/utils/dateTime.utils';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forChild(RackMarketingRoutes),
    AgGridModule.withComponents([AggridStatusChipComponent,AggridChipComponent, AGGridCellDataComponent, AGGridCellDataComponent, AggridLinkComponent, AGGridCellRendererComponent ]),
  ],
  
  // providers: [
  //   {provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE, MAT_DATE_LOCALE]},
  //   {provide: OWL_DATE_TIME_FORMATS, useValue: CUSTOM_MOMENT_FORMATS},
  //   {provide: MAT_DATE_FORMATS, useValue: MATDATEPICKER_FORMATS},
  // ],
  declarations: [SetPriceComponent, RackMarketingHomeComponent, PriceListComponent, OtherComponentsComponent]
})
export class RackMarketingModule { }
