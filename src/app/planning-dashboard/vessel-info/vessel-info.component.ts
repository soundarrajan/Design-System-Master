import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { VesselDataModel } from '../../shared/models/vessel.data.model';

@Component({
  selector: 'app-vessel-info',
  templateUrl: './vessel-info.component.html',
  styleUrls: ['./vessel-info.component.scss']
})
export class VesselInfoComponent implements OnInit {

  vesselColor='';
  IsCloseClicked=false;
  @Output() expandClicked = new EventEmitter();

  @Output() closeClicked =new EventEmitter();
vesselDetail:VesselDataModel=<VesselDataModel>{};
  constructor() { }

  ngOnInit() {
  }
  formatDate(dateString)
  {
    return new Date(dateString);
  }

  closeClickedEvent(){
    this.IsCloseClicked =true; this.closeClicked.emit();
  }

}
