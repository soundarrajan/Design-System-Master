import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-location-hover',
  templateUrl: './location-hover.component.html',
  styleUrls: ['./location-hover.component.scss']
})
export class LocationHoverComponent implements OnInit {

  IsBestLocation = false;
  LocationDetails: any;
  today = new Date();
  IsCloseClicked = false;
  @Output() closeClicked = new EventEmitter();
  @Output() expandClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closeClickedEvent(){
    this.IsCloseClicked =true; this.closeClicked.emit();
  }
  checkDate(inputDateStr: string): string {

    const today = new Date();
    const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
    var inputDate = new Date(inputDateStr)
    if (inputDate.toLocaleDateString() == today.toLocaleDateString()) {
      return 'Today'
    } else if (inputDate.toLocaleDateString() == yesterday.toLocaleDateString()) {
      return 'Yesterday'
    }
    else {
      return '';
    }
  }
  formatNumber(input) {
    if (input !== null && input!==0 && !isNaN(input)) {


      return parseFloat(input);

    }
    else if (input === null || input === '-' || input==0 ) {
      return '-';
    }
    else
      return input;
  }
  getDateFromString(inputDateStr: string) {
    var inputDate = new Date(inputDateStr);
    return inputDate.toLocaleDateString();

  }

}
