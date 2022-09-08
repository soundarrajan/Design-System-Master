import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-savefilterpref',
  templateUrl: './savefilterpref.component.html',
  styleUrls: ['./savefilterpref.component.scss']
})

export class SavefilterprefComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SavefilterprefComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
