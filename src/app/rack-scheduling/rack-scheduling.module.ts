import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { RackSchedulingHomeComponent } from './rack-scheduling-home/rack-scheduling-home.component';
import { RouterModule } from '@angular/router';
import { RackSchedulingRoutes } from './rack-scheduling.route';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { RackSchedulingComponent } from './rack-scheduling/rack-scheduling.component';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AGGridDateTimePickerComponent } from '../shared/ag-grid/ag-grid-datetimePicker.component';
import { AgGridModule } from 'ag-grid-angular';
import { RackMatchedListComponent } from './rack-matched-list/rack-matched-list.component';
import { CustomHeaderGroup } from '../shared/ag-grid/custom-header-group.component';
import { CustomHeaderGroupNotify } from 'src/app/shared/ag-grid/custom-header-group-notification.component';
import {DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forChild(RackSchedulingRoutes),
    AgGridModule.withComponents([AGGridCellDataComponent, AGGridDateTimePickerComponent, CustomHeaderGroup, CustomHeaderGroup,CustomHeaderGroupNotify])
  ],
  declarations: [RackSchedulingHomeComponent, RackSchedulingComponent, RackMatchedListComponent]
})
export class RackSchedulingModule { }
