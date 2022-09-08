import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/local-service.service';

@Component({
  selector: 'app-control-tower-home-new',
  templateUrl: './control-tower-home-new.component.html',
  styleUrls: ['./control-tower-home-new.component.css']
})
export class ControlTowerHomeNewComponent implements OnInit {

  public showQuality:boolean = true;
  public showQuantity:boolean = false;
  public showResidue:boolean = false;
  public theme = true;
  public newScreen = true;
  selected = 'quality';

  constructor(private localService: LocalService) { }

  ngOnInit(): void {
    this.localService.themeChange.subscribe(data => {
      this.theme  = data;
    })
  }

  selectedVal: string = 'labs';
  selectedVal2: string = 'differences';
  selectedVal3: string = 'differences';

  public onValChange(val: string) {
    if(this.selected === 'quality'){
      this.selectedVal = val;
    }else{
      this.selectedVal2 = val;
      this.selectedVal3 = val;
    }
  }

  viewChange($event){
    if($event.value == "quality"){
      this.showQuality = true;
      this.showQuantity = false;
      this.showResidue = false;
    }
    else if($event.value == "quantity"){
      this.showQuality = false;
      this.showQuantity = true;
      this.showResidue = false;
    }
    else if($event.value == "residue"){
      this.showQuality = false;
      this.showQuantity = false;
      this.showResidue = true;
    }
    else{
      this.showQuality = true;
      this.showQuantity = false;
      this.showResidue = false;
    } 
  }

}
