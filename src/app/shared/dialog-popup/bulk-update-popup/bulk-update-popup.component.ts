import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-bulk-update-popup',
  templateUrl: './bulk-update-popup.component.html',
  styleUrls: ['./bulk-update-popup.component.scss']
})
export class BulkUpdatePopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BulkUpdatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    bookControl = new FormControl();
    strategyControl = new FormControl();
    bookOptions: string[] = ['PDI-Book', 'PDI-Book-2020', 'PDI-Book-2019'];
    strategyOptions: string[] = ['Hedge-strategy', 'Hedge-strategy-2020', 'Hedge-strategy-2019'];
    filteredOptionsBook: Observable<string[]>;
    filteredOptionsStrategy: Observable<string[]>;

  ngOnInit() {
    this.filteredOptionsBook = this.bookControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredOptionsStrategy = this.strategyControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter_strategy(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.bookOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filter_strategy(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.strategyOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
