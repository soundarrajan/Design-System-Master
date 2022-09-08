import {Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-setprice-publish',
  templateUrl: './setprice-publish.component.html',
  styleUrls: ['./setprice-publish.component.scss']
})
export class SetpricePublishComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SetpricePublishComponent>) { }

  ngOnInit() {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
