import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-location2-info',
  templateUrl: './location2-info.component.html',
  styleUrls: ['./location2-info.component.scss']
})
export class Location2InfoComponent implements OnInit {

  customCollapsedHeight: string = '50px';
  customExpandedHeight: string = '50px';

  tableData: any = [

    {
      panelHeaders: ['HSFO', '$423.00', '1.00', 'HSFO', '$423.00', '1.00'],
      panelData: [{
        fuelType: 'LSMGO 0.1%',
        price: '423.00',
        diff: '1.00',
        fuelType2: 'LSMGO 0.1%',
        price2: '425.00',
        diff2: '1.50'
      },
      {
        fuelType: 'LSMGO 0.1%',
        price: '423.00',
        diff: '1.00',
        fuelType2: 'LSMGO 0.1%',
        price2: '425.00',
        diff2: '1.50'
      }]
    },
    {
      panelHeaders: ['VLSFO', '$423.00', '1.00', 'HSFO', '$423.00', '1.00'],
      panelData: [{
        fuelType: 'LSMGO 0.1%',
        price: '423.00',
        diff: '1.00',
        fuelType2: 'LSMGO 0.1%',
        price2: '425.00',
        diff2: '1.50'
      },
      {
        fuelType: 'LSMGO 0.1%',
        price: '423.00',
        diff: '1.00',
        fuelType2: 'LSMGO 0.1%',
        price2: '425.00',
        diff2: '1.50'
      }]
    },
    {
      panelHeaders: ['ULSFO', '$423.00', '1.00', 'ULSFO', '$423.00', '1.00'],
      panelData: [{
        fuelType: 'USMGO 0.1%',
        price: '423.00',
        diff: '1.00',
        fuelType2: 'USMGO 0.1%',
        price2: '425.00',
        diff2: '1.50'
      },
      {
        fuelType: 'USMGO 0.1%',
        price: '423.00',
        diff: '1.00',
        fuelType2: 'USMGO 0.1%',
        price2: '425.00',
        diff2: '1.50'
      }]
    },
    {
      panelHeaders: ['DOGO', '$423.00', '1.00', 'DOGO', '$423.00', '1.00'],
      panelData: [{
        fuelType: 'LDGO 0.1%',
        price: '423.00',
        diff: '1.00',
        fuelType2: 'LDGO 0.5%',
        price2: '425.00',
        diff2: '1.50'
      },
      {
        fuelType: 'LDGO 0.5%',
        price: '423.00',
        diff: '1.00',
        fuelType2: 'LDGO 0.1%',
        price2: '425.00',
        diff2: '1.50'
      }]
    }


  ];

  constructor(public dialogRef: MatDialogRef<Location2InfoComponent>) { }

  ngOnInit() {
  }

}
