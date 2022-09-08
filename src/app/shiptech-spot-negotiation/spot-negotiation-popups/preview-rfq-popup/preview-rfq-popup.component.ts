import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailPreviewPopupComponent } from '../email-preview-popup/email-preview-popup.component';

@Component({
  selector: 'app-preview-rfq-popup',
  templateUrl: './preview-rfq-popup.component.html',
  styleUrls: ['./preview-rfq-popup.component.css']
})
export class PreviewRfqPopupComponent implements OnInit {

  checked = true;
  productList = [
    {id: 1, name: 'RMG 380', mailStatus: 'sent'},
    {id: 2, name: 'RMK 700', mailStatus: 'not-sent'},
    {id: 3, name: 'DMA 0.1%', mailStatus: 'not-sent'}
  ];
  previewPref = 'Consolidated RFQ of all products';
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    //let objIndex = this.productList.findIndex((obj => obj.id == this.data.productId));
    //this.productList[objIndex].mailStatus = "sent"
  }

  openEmailPreview(){
    
      const dialogRef = this.dialog.open(EmailPreviewPopupComponent, {
        width: '80vw',
        height: '90vh',
        panelClass: 'additional-cost-popup'
      });

      dialogRef.afterClosed().subscribe(result => {
      });
      
  }

}
