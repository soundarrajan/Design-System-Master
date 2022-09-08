import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-invoice-summary-popup',
  templateUrl: './invoice-summary-popup.component.html',
  styleUrls: ['./invoice-summary-popup.component.scss']
})
export class InvoiceSummaryPopupComponent implements OnInit {
  public showProgressBar: boolean = true;
  public invoiceGenerated: boolean = false;
  public hideButtons: boolean = false;
  popupTitle: string = 'Invoice Summary - Preview';

  constructor(
    public dialogRef: MatDialogRef<InvoiceSummaryPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  closeDialog() {
    if (this.invoiceGenerated)
      this.close();
    else
      this.dialogRef.close();
  }

  ngOnInit() {
    setInterval(() => {
      this.showProgressBar = false;
    }, 2000);
  }

  generateInvoice() {
    this.invoiceGenerated = true;
    this.popupTitle = (this.invoiceGenerated ? 'Invoice Summary' : 'Invoice Summary - Preview');
    this.showProgressBar = true;
    this.hideButtons = true;
    setInterval(() => {
      this.showProgressBar = false;
    }, 2000);
  }
  close() {
    this.dialogRef.close('generated');
  }
}
