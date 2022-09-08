import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bulk-actualise-popup',
  templateUrl: './bulk-actualise-popup.component.html',
  styleUrls: ['./bulk-actualise-popup.component.scss']
})
export class BulkActualisePopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BulkActualisePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  } 

}
