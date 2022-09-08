import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {SavefilterprefComponent} from '../savefilterpref/savefilterpref.component';

export class User {
  constructor(public name: string) { }
}

@Component({
  selector: 'app-tradelist-filter',
  templateUrl: './tradelist-filter.component.html',
  styleUrls: ['./tradelist-filter.component.scss']
})

export class TradelistFilterComponent implements OnInit {
  value='';
  constructor(
    public dialogRef: MatDialogRef<TradelistFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }


  openSaveDialog() {
    const dialogRef = this.dialog.open(SavefilterprefComponent, {
      // height: '400px',
       width: '450px'      
      //position: { left: '15px',top:'150px'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //myControl = new FormControl();
  myControl: FormControl = new FormControl();

  options = [
    new User('All Values'),
    new User('Value 1'),
    new User('Value 2'),
    new User('Value 3'),
    new User('Value 4'),
    new User('Value 5')
  ];

  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | User>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.options.slice())
      );
  }

  filter(name: string): User[] {
    return this.options.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

}
