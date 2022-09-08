import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalService } from 'src/app/services/local-service.service';

@Component({
  selector: 'app-dynamic-popup',
  templateUrl: './dynamic-popup.component.html',
  styleUrls: ['./dynamic-popup.component.css']
})
export class DynamicPopupComponent implements OnInit {
  public disableBtn: boolean = true;


  constructor(
    public dialogRef: MatDialogRef<DynamicPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private localService: LocalService) { }

  ngOnInit(): void {
   //console.log(this.data)
  }
  enterComments(e){
    //alert(status);
    this.disableBtn = false;
  }
  statusChanged(status){
    //alert("");
  this.dialogRef.close({data:status});
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
