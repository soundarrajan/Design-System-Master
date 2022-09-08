import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DialogPopupExampleDialog } from '../../designsystem-v2/form-field/form-field.component';

@Component({
  selector: 'app-autocomplete-with-search',
  templateUrl: './autocomplete-with-search.component.html',
  styleUrls: ['./autocomplete-with-search.component.css']
})
export class AutocompleteWithSearchComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  placeholder:string = 'Pick One';
  filteredOptions: Observable<string[]>;
  @Input('switchTheme') switchTheme;//false-Light Theme, true- Dark Theme

  constructor(public dialog: MatDialog){

  }
  
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  openPopup() {
    const dialogRef = this.dialog.open(DialogPopupExampleDialog, {
      width: '480px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
