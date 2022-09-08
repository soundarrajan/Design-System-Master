import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AvailableFiltersComponent} from '../../shared/dialog-popup/available-filters/available-filters.component';
import {ShipSaveprefComponent} from '../../shared/dialog-popup/ship-savepref/ship-savepref.component';
import {ShipDeleteprefComponent} from '../../shared/dialog-popup/ship-deletepref/ship-deletepref.component';


@Component({
  selector: 'app-other-components',
  templateUrl: './other-components.component.html',
  styleUrls: ['./other-components.component.scss']
})
export class OtherComponentsComponent implements OnInit {

  advancedSearchToggle: boolean = false;

  toggleAdvancedSearch() { 
    this.advancedSearchToggle = !this.advancedSearchToggle;
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openAvailableFilters() {
    const dialogRef = this.dialog.open(AvailableFiltersComponent, {
      id: 'available-filters',
      maxHeight: '400px',
      width: '500px',
      //position: { left: '15px',top:'110px'}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSaveFilter() {
    const dialogRef = this.dialog.open(ShipSaveprefComponent, {            
      width: '450px',      
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDeleteFilter() {
    const dialogRef = this.dialog.open(ShipDeleteprefComponent, {            
      width: '450px',      
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  customVessels: string[] = ['Adastra', 'Altair', 'Amapola', 'Arkadia', 'Captain Parissdssddscdscs123456', 'Cooper River', 'Elder', 'Miranda', 'St. Francis'];

}
