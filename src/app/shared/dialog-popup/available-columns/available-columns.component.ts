import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-available-columns',
  templateUrl: './available-columns.component.html',
  styleUrls: ['./available-columns.component.scss']
})
export class AvailableColumnsComponent implements OnInit {
  indeterminate=false;
  checked=false;
  constructor(
    public dialogRef: MatDialogRef<AvailableColumnsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
