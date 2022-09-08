import { Component, OnInit, Inject } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'warning-dialog',
    template:
        `
        <div class="header-container">
            <div class="title"><span class="warning-icon"></span>Warning</div>
            <div class="popup-close-icon"  [mat-dialog-close]="true"></div>
        </div>
        <div  style="padding: 30px;">
            <div>
                <span class="warning-text">Quality balance for this tank will become negative after this change. </span>
            </div>
            <div style="text-align: center;">
                <span class="warning-bold-text">Mass Qty:-</span> <span class="warning-text">1000 GAL&nbsp;&nbsp;&nbsp;</span> <span class="warning-bold-text">Volume Qty:-</span> <span class="warning-text">1000 GAL</span> 
            </div>
            <div style="text-align: center;">
                <span class="warning-text">Do you wish to proceed?</span>
            </div>
        </div>    
      <div>
        <mat-dialog-actions align="end">
            <button class="revert-action-btn" [mat-dialog-close]="true">
                <span>REVERT</span>
            </button>
            <button class="proceed-action-btn" [mat-dialog-close]="true"> 
                <span>PROCEED</span>
            </button>
        </mat-dialog-actions>
      </div>
    `,
})
export class WarningDialog {

    ngOnInit() {
    }
    constructor(
        public dialogRef: MatDialogRef<WarningDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { };


}
