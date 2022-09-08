import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {TechAvailableFiltersComponent} from '../../shared/dialog-popup/tech-available-filters/tech-available-filters.component';

@Component({
  selector: 'app-morefilterchip',
  templateUrl: './morefilterchip.component.html',
  styleUrls: ['./morefilterchip.component.scss']
})
export class MorefilterchipComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openAvailableFilter() {
    const dialogRef = this.dialog.open(TechAvailableFiltersComponent, {      
      width: '500px',      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
