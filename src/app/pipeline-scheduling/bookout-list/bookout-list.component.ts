import { Component, OnInit } from '@angular/core';
import { PipelineFilterComponent } from '../../shared/dialog-popup/pipeline-filter/pipeline-filter.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bookout-list',
  templateUrl: './bookout-list.component.html',
  styleUrls: ['./bookout-list.component.scss']
})
export class BookoutListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(PipelineFilterComponent, {
      // height: '400px',
      // width: '900px'      
      position: { left: '15px',top:'150px'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
