import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalService } from 'src/app/services/local-service.service';
import { Router } from '@angular/router';
import { FuturesListComponent } from '../futures-list/futures-list.component';

@Component({
  selector: 'app-futures-settlement-home',
  templateUrl: './futures-settlement-home.component.html',
  styleUrls: ['./futures-settlement-home.component.css']
})
export class FuturesSettlementHomeComponent implements OnInit {
  @ViewChild(FuturesListComponent)
  private futuresListComp: FuturesListComponent;
  public toggleSmartFilter: boolean = false;
  public headerCollapse: boolean = false;
  public enableOffsetBtn: boolean = false;
  public enableRollOverBtn: boolean = false;
  public rolloverAction: boolean = false;
  public selectedTab = 0;
  public smartFilterArray = [];
  private issplKeyPressed;

  //Smart key for smart filtering "ALT + s"
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.altKey && event.keyCode === 18 && this.router.url == "/futures-settlement/list") {
      this.issplKeyPressed = true;
    }
  }
  @HostListener('window:keyup', ['$event'])
  keyEventUp(event: KeyboardEvent) {
    if (this.issplKeyPressed && event.key == 's' && this.router.url == "/futures-settlement/list") {
      this.toggleSmartFilter = !this.toggleSmartFilter;
      this.service.setSmartFilterStatus(this.toggleSmartFilter);
    }
    if (event.key == 'Alt' || event.metaKey) {
      this.issplKeyPressed = false;
    }
  }
  constructor(public elem: ElementRef, private toastr: ToastrService, private service: LocalService, private router: Router,) { }

  ngOnInit(): void {
    this.service.getSmartFilterStatus().subscribe((status) => { this.toggleSmartFilter = status; });

    this.smartFilterArray = [{ name: "Conract Name", checked: true, field: 'contractName' }, { name: "Company", checked: true, field: 'company' },
    { name: "Book", checked: false, field: 'book' }]
    this.service.setSmartFilterData(this.smartFilterArray);

  }
  ngAfterViewInit() {

    let elements = this.elem.nativeElement.querySelectorAll('.mat-tab-label');
    elements.forEach((element, index) => {
      // element.style.left = 138 * index + 'px';
      element.style.zIndex = 1000 - index;
    });

  }
  offsetAction() {
    this.toastr.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">Trade offset successfully</div>',
      '', {
      enableHtml: true,
      toastClass: "toast-alert toast-light-green",
      timeOut: 2000
    });
    this.enableOffsetBtn = !this.enableOffsetBtn;
  }
  toggleSmartFilterAction() {
    this.toggleSmartFilter = !this.toggleSmartFilter;
    this.service.setSmartFilterStatus(this.toggleSmartFilter);

  }
  updateSmartFilter(newFilterList) {
    this.smartFilterArray = newFilterList.slice();
    this.service.setSmartFilterData(this.smartFilterArray);
  }
  updateRollover(event) {
    this.enableRollOverBtn = !event;
  }
  refreshGrid() {
    this.futuresListComp.refreshGrids();
  }
  updateOffsetButton(event) {
    this.enableOffsetBtn = event;
  }
  onTabChange(index) {
    if (this.selectedTab != index) {
      this.selectedTab = index;
      this.service.setFutureSettlementTabChange(this.selectedTab);
    }
  }
}
