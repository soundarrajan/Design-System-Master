import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'available-filters',
  templateUrl: './available-filters.component.html',
  styleUrls: ['./available-filters.component.scss']
})
export class AvailableFiltersComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AvailableFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
