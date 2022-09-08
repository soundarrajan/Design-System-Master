import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'smart-trader-map-panel',
  templateUrl: './smart-trader-map-panel.component.html',
  styleUrls: ['./smart-trader-map-panel.component.scss']
})
export class SmartTraderMapPanelComponent implements OnInit {
  @Output() zoomInEvent = new EventEmitter();
  @Output() zoomOutEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  @Input() isShowPanel: boolean;
  
  toggleDisplay() {
    this.isShowPanel=!this.isShowPanel;
    var mapPanel = document.getElementById('map-panel');
    mapPanel.classList.toggle("d-none");
  }

}
