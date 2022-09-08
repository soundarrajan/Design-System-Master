import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PlannedOtherMovementsComponent } from '../planned-other-movements/planned-other-movements.component';
@Component({
  selector: 'app-other-movements',
  templateUrl: './other-movements.component.html',
  styleUrls: ['./other-movements.component.scss']
})
export class OtherMovementsComponent implements OnInit {

  @ViewChild(PlannedOtherMovementsComponent)
  private plannedMovComp: PlannedOtherMovementsComponent;
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
    this.router.navigate(['techoil/movements/other/addMovement'], { state: { type: 'add' } });
  }

}
