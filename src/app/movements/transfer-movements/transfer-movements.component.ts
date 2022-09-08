import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PlannedTransferMovementsComponent } from '../planned-transfer-movements/planned-transfer-movements.component';

@Component({
  selector: 'app-transfer-movements',
  templateUrl: './transfer-movements.component.html',
  styleUrls: ['./transfer-movements.component.scss']
})
export class TransferMovementsComponent implements OnInit {

  @ViewChild(PlannedTransferMovementsComponent)
  private plannedMovComp: PlannedTransferMovementsComponent;
  public showActionBtns: boolean = true;
  public headerCollapse: boolean = false;
  public enableSave: boolean = true;
  public enableVerify: boolean = true;

  constructor(public elem: ElementRef, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let elements = this.elem.nativeElement.querySelectorAll('.mat-tab-label');
    elements.forEach((element, index) => {
      element.style.zIndex = 1000 - index;
    });

  }
  tabClick(event) {
    if (event.index == 1 || event.index == 2) {
      this.showActionBtns = false;
    } else {
      this.showActionBtns = true;
    }
  }

  addMovement() {
    this.router.navigate(['techoil/movements/transfer/addMovement'], { state: { type: 'add' } });
  }
}
