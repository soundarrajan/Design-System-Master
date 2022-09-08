import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tech-available-filters',
  templateUrl: './tech-available-filters.component.html',
  styleUrls: ['./tech-available-filters.component.scss']
})
export class TechAvailableFiltersComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TechAvailableFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
  
}
