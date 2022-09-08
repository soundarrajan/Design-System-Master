import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {TechAvailableFiltersComponent} from '../../shared/dialog-popup/tech-available-filters/tech-available-filters.component';

@Component({
  selector: 'app-headerchip',
  templateUrl: './headerchip.component.html',
  styleUrls: ['./headerchip.component.scss']
})
export class HeaderchipComponent implements OnInit {
  
  @Input()heading: string = "Exposure";
  @Input()chipStatus: string = "inactive-chip"; 

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
