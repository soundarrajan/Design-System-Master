import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eompopup',
  templateUrl: './eompopup.component.html',
  styleUrls: ['./eompopup.component.scss']
})
export class EompopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EompopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  closeDialog() {
    this.dialogRef.close();
  } 

}
