import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-more-options-popup',
  templateUrl: './more-options-popup.component.html',
  styleUrls: ['./more-options-popup.component.scss']
})
export class MoreOptionsPopupComponent implements OnInit {
  @Input('optionsList') optionsList;
  constructor() { }

  ngOnInit() {
  }

}
