import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { PipelineRoutes } from './pipeline-scheduling.route';
import { PipelineComponent } from './pipeline-scheduling.component';
import { DropshipListComponent } from './dropship-list/dropship-list.component';
import { PipelineHomeComponent } from './pipeline-home/pipeline-home.component';
import { BookoutListComponent } from './bookout-list/bookout-list.component';
import { NetoutListComponent } from './netout-list/netout-list.component';
import { PipelineScheduleComponent } from './pipeline-schedule/pipeline-schedule.component';
import { ScrollTestComponent } from './scroll-test/scroll-test.component';
import { AGGridCellDataComponent } from '../shared/ag-grid/ag-grid-celldata.component';
import { AgGridModule } from 'ag-grid-angular';
import { AGGridCellRendererComponent } from '../shared/ag-grid/ag-grid-cell-renderer.component';
import { CustomHeaderGroup } from '../shared/ag-grid/custom-header-group.component';
import { CustomHeaderGroupNotify } from '../shared/ag-grid/custom-header-group-notification.component';
import { ResizableDirective } from '../shared/element-resizing-horizontal/resizable.directive';

@NgModule({
    declarations: [
        PipelineComponent,
        DropshipListComponent,
        PipelineHomeComponent,
        BookoutListComponent,
        NetoutListComponent,
        PipelineScheduleComponent,
        ScrollTestComponent,
        ResizableDirective
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        RouterModule.forChild(PipelineRoutes),
        AgGridModule.withComponents([AGGridCellDataComponent, AGGridCellRendererComponent, CustomHeaderGroup, CustomHeaderGroupNotify ])
    ]
})

export class PipelineModule {

}
