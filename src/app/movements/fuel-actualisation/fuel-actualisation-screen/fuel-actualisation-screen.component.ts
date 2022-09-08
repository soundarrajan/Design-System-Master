import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlannedMovementsComponent } from '../planned-movements/planned-movements.component';

@Component({
  selector: 'app-fuel-actualisation-screen',
  templateUrl: './fuel-actualisation-screen.component.html',
  styleUrls: ['./fuel-actualisation-screen.component.scss']
})
export class FuelActualisationScreenComponent implements OnInit {

  @ViewChild(PlannedMovementsComponent)
  private plannedMovComp: PlannedMovementsComponent;
  public showActionBtns: boolean = true;
  public headerCollapse: boolean = false;
  public enableSave: boolean = true;
  public enableVerify: boolean = true;

  constructor(public elem: ElementRef, public dialog: MatDialog, private router: Router) { }

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

  public openNewAddMovement() {

    this.router.navigate(['techoil/movements/delivery/addMovement'], { state: { type: 'add' } });

  }


}
