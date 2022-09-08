import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss']
})
export class MapPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isPanelActive: boolean = true;
  isInfoActive: boolean = false;
  // panelStatus: string = 'Hide Info';

  // togglePanel() {
  //   this.isPanelActive = !this.isPanelActive;
  //   // if (this.isPanelActive) {
  //   //   this.panelStatus = 'Hide Info'
  //   // }     
  //   //  else {
  //   //   this.panelStatus = 'More Info'
  //   //  }
  // }

  // toggleDisplay() {
  //   var mapPanel = document.getElementById('map-panel');
  //   mapPanel.classList.toggle("d-none");
  // }

}