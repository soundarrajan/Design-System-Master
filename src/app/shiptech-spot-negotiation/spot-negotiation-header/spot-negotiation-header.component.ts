import { Component, ElementRef, OnInit, Output, Renderer2, ViewChild, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { LocalService } from 'src/app/services/local-service.service';
import { SpotNegotiationDetailsComponent } from '../spot-negotiation-details/spot-negotiation-details.component';
import { SearchRequestPopupComponent } from '../spot-negotiation-popups/search-request-popup/search-request-popup.component';
@Component({
  selector: 'app-spot-negotiation-header',
  templateUrl: './spot-negotiation-header.component.html',
  styleUrls: ['./spot-negotiation-header.component.css']
})
export class SpotNegotiationHeaderComponent implements OnInit {
  @ViewChild('headerContainer') container: ElementRef;
  @ViewChild('requestContainer') requestcontainer: ElementRef;
  @ViewChild('inputSearch') inputSearch: ElementRef;
  @ViewChild('inputBox1') _el1: ElementRef;
  @ViewChild('inputBox2') _el2: ElementRef;
  @ViewChild(SpotNegotiationDetailsComponent) child: SpotNegotiationDetailsComponent;
  @ViewChild('ports') ports: ElementRef;
  filterCounterparty: any;
  allRequestDetails = [];
  allRequestComments = [];
  gridDataSets = [];
  selectedReqIndex = 0;
  selectedReqIndexes = [0, 1, 2];
  selectAll: boolean = true;
  availWidth: any;
  enableBestPrice:boolean = false;
  requestOptions = [
    {
      request: '12321', vessel: 'CMA CGM ANTOINE DE SAINT EXUPERY', selected: false, requestId: '01'
    },
    {
      request: '12322', vessel: 'Afif', selected: false, requestId: '02'
    },
    {
      request: '12323', vessel: 'MerinLion ', selected: false, requestId: '03'
    }
  ];
  displayVessel: boolean = false;
  expandedSearch: boolean = false;
  selectedRequest = '';
  expandRequestPopUp: boolean = false;
  displayedColumns: string[] = ['request', 'vessel'];
  counterpartyColumns: string[] = ['counterparty', 'blank'];
  counterpartyList = [
    { 'counterparty': 'Shell North America Division', 'selected': false },
    { 'counterparty': 'Shell North America Division', 'selected': false },
    { 'counterparty': 'Trefoil Oil and Sales', 'selected': false },
    { 'counterparty': 'Shell North America Corporation', 'selected': false },
    { 'counterparty': 'Shell North America Corporation', 'selected': false },
    { 'counterparty': 'Shell North America Corporation', 'selected': false },
    { 'counterparty': 'Shell North America Corporation', 'selected': false },
    { 'counterparty': 'Shell North America Corporation', 'selected': false }
  ];
  requestsAndVessels = [
    { 'request': '100001', 'vessel': 'CMA CGM ANTOINE DE SAINT EXUPERY', 'selected': false },
    { 'request': '100002', 'vessel': 'CMA CGM ANTOINE DE SAINT EXUPERY', 'selected': false },
    { 'request': '100003', 'vessel': 'CMA CGM ANTOINE DE SAINT EXUPERY', 'selected': false },
    { 'request': '100004', 'vessel': 'CMA CGM ANTOINE DE SAINT EXUPERY', 'selected': false },
    { 'request': '100005', 'vessel': 'CMA CGM ANTOINE DE SAINT EXUPERY', 'selected': false },
    { 'request': '100006', 'vessel': 'Afif', 'selected': false },
    { 'request': '100007', 'vessel': 'MerinLion', 'selected': false },
    { 'request': '100008', 'vessel': 'Al Mashrab', 'selected': false }
  ];
  companyCode;
  maxWidth = 250;
  constructor(private renderer: Renderer2, public dialog: MatDialog, private localService: LocalService) { }
  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void {
    //company code = maersk ,for Maersk
    this.companyCode = this.localService.getcompayCode();
    if (this.companyCode == "maersk")
      this.requestOptions = [
        {
          request: 'Req 12321', vessel: 'Merlion', selected: false, requestId: 'maersk'
        }
      ];
    this.getJSONData();
  }
  ngAfterViewInit() {
    this.checkMaxWidth();
  }

  checkMaxWidth() {
    let sum = 0;
    this.requestOptions.forEach((req) => {
      sum += req.vessel.length * 8 + 85;
    });
    if (sum < this.requestcontainer.nativeElement.offsetWidth) {
      this.displayVessel = false;
    }

    else {
      this.maxWidth = (this.requestcontainer.nativeElement.offsetWidth - (this.requestOptions.length * 21)) / this.requestOptions.length;
      this.displayVessel = true;

    }
    console.log(this.displayVessel);
  }
  removeRequest(i) {
    this.requestOptions.splice(i, 1);
    setTimeout(() => {
      this.checkMaxWidth();
      // var headerWidth = this.container.nativeElement.offsetWidth;
      // var reqWidth = this.requestcontainer.nativeElement.offsetWidth;
      // this.availWidth = headerWidth - reqWidth;
      // if (this.availWidth < 485 || this.requestOptions.length > 5) {
      //   this.displayVessel = true;
      // } else {
      //   this.displayVessel = false;
      // }
    }, 0);
  }

  addToCheckboxOptions() {
    var selectedVessel = this.requestsAndVessels.filter(item => item.selected == true);
    for (var val of selectedVessel) {
      this.requestOptions.push({ request: val.request, vessel: val.vessel, selected: true, requestId: "04" });
      this.allRequestDetails.push([{
        "location-name": "ROTTERDAM",
        "location-id": "1234",
        "port-id": "1"
      }]);
      const arrayIndex = this.requestsAndVessels.indexOf(val);
      this.requestsAndVessels.splice(arrayIndex, 1);
    }
    setTimeout(() => {
      this.checkMaxWidth();
      // var headerWidth = this.container.nativeElement.offsetWidth;
      // var reqWidth = this.requestcontainer.nativeElement.offsetWidth;
      // this.availWidth = headerWidth - reqWidth;
      // if (this.availWidth < 150) {
      //   this.displayVessel = true;
      // } else {
      // }
    }, 0);
    this.selectedRequest = '';
  }

  selectedReqBtn = 0;
  selReqIndex = 0;
  selectRequest(event, i, selected) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedReqBtn = i;
    this.selReqIndex = i;
    var checkedItems = this.requestOptions.reduce(function (acc, curr, index) {
      if (curr.selected) {
        acc.push(index);
      }
      return acc;
    }, []);
    var obj = {
      seletedreqIndex: i,
      checkedreqindexes: checkedItems
    }
    this.selectionChange.emit(obj);
  }

  openRequestPopup() {
    const dialogRef = this.dialog.open(SearchRequestPopupComponent, {
      width: '100vw',
      height: '95vh',
      maxWidth: '95vw',
      panelClass: 'search-request-popup'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  reqSelectionChange(evt) {
    if (evt) {
      this.selectedReqIndex = evt.seletedreqIndex;
      this.selectedReqIndexes = evt.checkedreqindexes;
    }
  }

  searchInput() {
   // this.expandedSearch = false;
    //this.child.onClearSearchCounterparty();
  }

  showSearch() {
    setTimeout(() => {
      this.inputSearch.nativeElement.focus();
    }, 0);
  }

  setFocus() {
    this._el1.nativeElement.focus();
    this._el2.nativeElement.focus();
  }

  scrollPort1(index, el, count) {
    //console.log(count);
    let portVal = "port" + el;
    //let ele = document.getElementById(portval);
    let portId = "#" + portVal;
    var ele = this.ports.nativeElement.querySelector(portId);
    ele.scrollIntoView();
    // if(el!=count){
    //   ele.scrollIntoView();
    //   setTimeout(()=>{ 
    //     this.child.scrollExpand(index);
    //     },0);
    // }else{
    //   setTimeout(()=>{ 
    //     this.child.scrollExpand(index);
    //     },0);
    // }
  }

  scrollComments(el: HTMLElement) {
    el.scrollIntoView();
  }

  clearCounterparty(event) {
    if (event.target.value == '') {
      this.child.onClearSearchCounterparty();
    }
  }
  searchCounterparty(e) {
    //console.log(e);
    this.child.onSearchCounterparty(e);
  }

  private getJSONData() {
    this.allRequestDetails = [];
    var allRequestDetailsObservable = [];
    var allRequestCommentsObservable = [];
    var allRequestLocationObservable = [];
    this.requestOptions.forEach(r => {
      allRequestDetailsObservable.push(this.localService.getSpotDataRequestData(r.requestId));
      allRequestCommentsObservable.push(this.localService.getSpotDataCommentsData(r.requestId));
    });
    forkJoin(allRequestDetailsObservable).subscribe(res => {
      this.allRequestDetails = res;
      this.allRequestDetails.forEach(req => req.locations.forEach(loc => {
        allRequestLocationObservable.push(this.localService.getSpotDataJSON(req['request-id'], loc['location-id']));
      }
      ))
      forkJoin(allRequestLocationObservable).subscribe(data => {
        this.gridDataSets = data;
        // console.log(data)
      });
    })
    forkJoin(allRequestCommentsObservable).subscribe(res => {
      this.allRequestComments = res;

    })

  }

  calculateBestOffer(){
    this.enableBestPrice = true;
  }
}
