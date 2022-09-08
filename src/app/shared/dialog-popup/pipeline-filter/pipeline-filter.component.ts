import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pipeline-filter',
  templateUrl: './pipeline-filter.component.html',
  styleUrls: ['./pipeline-filter.component.scss']
})


export class PipelineFilterComponent {
  constructor(
    public dialogRef: MatDialogRef<PipelineFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    value: string;
  viewValue: string;

  minDate = new Date(2016, 0, 1);
  maxDate = new Date(2020, 0, 1);

  delMonth = [
    { value: 'all', viewValue: 'All Months' },
    { value: 'jan-18', viewValue: 'Jan 18' },
    { value: 'feb-18', viewValue: 'Feb 18' },
    { value: 'mar-18', viewValue: 'Mar 18' },
    { value: 'apr-18', viewValue: 'Apr 18' },
    { value: 'may-18', viewValue: 'May 18' },
  ];

}
