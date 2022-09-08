import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-radio',
  templateUrl: './select-radio.component.html',
  styleUrls: ['./select-radio.component.css']
})
export class SelectRadioComponent implements OnInit {

  myFormGroup;

  ngOnInit() {
    this.myFormGroup = new FormGroup({
      frequency: new FormControl('')
    });
  }

  frequencyArr = [
    { key: '$', abbriviation: 'USD' },
    { key: '€', abbriviation: 'EURO' },
    { key: '£', abbriviation: 'GBD' }
  ];

}
