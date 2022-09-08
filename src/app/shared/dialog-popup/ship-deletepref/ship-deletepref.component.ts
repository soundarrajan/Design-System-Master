import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ship-deletepref',
  templateUrl: './ship-deletepref.component.html',
  styleUrls: ['./ship-deletepref.component.scss']
})
export class ShipDeleteprefComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShipDeleteprefComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
