import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {TradePopupComponent} from '../../../../shared/dialog-popup/trade-popup/trade-popup.component';
import {SavefilterprefComponent} from '../../../../shared/dialog-popup/savefilterpref/savefilterpref.component';
import {WarningPopupComponent} from '../../../../shared/dialog-popup/warning-popup/warning-popup.component';
import {TechAvailableFiltersComponent} from '../../../../shared/dialog-popup/tech-available-filters/tech-available-filters.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-trade-comps',
  templateUrl: './trade-comps.component.html',
  styleUrls: ['./trade-comps.component.scss']
})
export class TradeCompsComponent implements OnInit {
  public sec = 20;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.progressbar();
  }

  openNewTradeDialog() {
    const dialogRef = this.dialog.open(TradePopupComponent, {      
      width: '400px',      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSaveFilterPref() {
    const dialogRef = this.dialog.open(SavefilterprefComponent, {      
      width: '400px',      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openDeleteFilter() {
    const dialogRef = this.dialog.open(WarningPopupComponent, {      
      width: '450px',      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAvailableFilter() {
    const dialogRef = this.dialog.open(TechAvailableFiltersComponent, {      
      width: '500px',      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });    
  }

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public progressbar(){
    setInterval(() => {
      if(this.sec < 100){
             this.sec+=20;
      }
         }, 2000);
         
  }
  
}
