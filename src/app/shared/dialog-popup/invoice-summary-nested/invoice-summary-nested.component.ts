import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-summary-nested',
  templateUrl: './invoice-summary-nested.component.html',
  styleUrls: ['./invoice-summary-nested.component.scss']
})
export class InvoiceSummaryNestedComponent implements OnInit {

  
  constructor(
    public dialogRef: MatDialogRef<InvoiceSummaryNestedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  selected="option1";

  closeDialog() {
    this.dialogRef.close();
  } 


  ngOnInit() {
  }

}
