import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-invoice-summary-popup',
  templateUrl: './invoice-summary-popup.component.html',
  styleUrls: ['./invoice-summary-popup.component.scss']
})
export class InvoiceSummaryPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InvoiceSummaryPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    closeDialog() {
      this.dialogRef.close();
    } 

  ngOnInit() {
  }

}
