import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvoiceSummaryPopupComponent } from '../popup-screens/invoice-summary-popup/invoice-summary-popup.component';

@Component({
    selector: 'specificatin-popup-dialog',
    template:
        `        
            <h2 mat-dialog-title class="dialog-title">Enter your specifications
                    <mat-icon id="dialogCloseButton" matSuffix class="float-right" [mat-dialog-close]="true">close</mat-icon>
            </h2>
            <hr>
            
            <div class="popup-container">
                <div class="row label" style="height:40px;align-items: center;">
                    <div class="col-4 pd-0">
                        <label>Group By:</label>
                    </div>
                    <div class="col-8 pd-0">
                      <mat-form-field class="col-sm pd-0">
                          <mat-select [disableOptionCentering]="true" #groupvalue matNativeControl value="individual" panelClass="dropDownMargin">
                              <mat-option value="individual">Individual</mat-option>
                              <mat-option value="counterparty">Counterparty</mat-option>
                            </mat-select>
                        </mat-form-field>
                    </div>
                </div>
                <div class="row label" style="height:40px;align-items: center;">
                    <div class="col-4 pd-0">
                        <label>Currency:</label>
                    </div>
                    <div class="col-8 pd-0">
                      <mat-form-field class="col-sm pd-0">
                          <mat-select [disableOptionCentering]="true" matNativeControl value="usd" panelClass="dropDownMargin">
                              <mat-option value="usd">USD</mat-option>
                            </mat-select>
                        </mat-form-field>
                    </div>
                  </div>
            </div>
        
          <mat-dialog-actions class="float-right">
                <button mat-button [mat-dialog-close]="true">Cancel</button>
                <button class="blue-button" mat-button (click)="openInvoiceSummary(groupvalue.value)">Preview</button>
        </mat-dialog-actions>
          
    `,
})
export class SpecificationPopupDialog {

    ngOnInit() {
    }
    constructor(
        public dialogRef: MatDialogRef<SpecificationPopupDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    }

    closeDialog() {
        this.dialogRef.close();
    }
    openInvoiceSummary(item) {
        const dialogRef1 = this.dialog.open(InvoiceSummaryPopupComponent, {
            width: '96vw',
            maxWidth: '96vw',
            height: '85vh',
            panelClass: 'invoice-summary-popup',
            data: { groupBy: item }
        });
        dialogRef1.afterClosed().subscribe(result => {
            if (result == 'generated')
                this.dialogRef.close('generated');
            else
                this.dialogRef.close();
        });
    }


}