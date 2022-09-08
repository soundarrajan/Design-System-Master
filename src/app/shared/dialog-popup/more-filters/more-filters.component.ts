import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-more-filters',
  templateUrl: './more-filters.component.html',
  styleUrls: ['./more-filters.component.scss']
})
export class MoreFiltersComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MoreFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
