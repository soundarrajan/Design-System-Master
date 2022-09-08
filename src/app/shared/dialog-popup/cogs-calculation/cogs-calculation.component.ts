import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '../../../../../node_modules/@angular/material/dialog';

@Component({
  selector: 'app-cogs-calculation',
  templateUrl: './cogs-calculation.component.html',
  styleUrls: ['./cogs-calculation.component.css']
})
export class CogsCalculationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CogsCalculationComponent>, ) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close();
  } 

}
