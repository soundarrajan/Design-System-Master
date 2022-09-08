import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RelatedInvoicesComponent } from '../related-invoices/related-invoices.component';
import { ActivatedRoute, ParamMap,Router } from '@angular/router'
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-invoice-screen',
  templateUrl: './invoice-screen.component.html',
  styleUrls: ['./invoice-screen.component.scss']
})
export class InvoiceScreenComponent implements OnInit {
  @ViewChild(RelatedInvoicesComponent) child:RelatedInvoicesComponent;
  constructor(public elem: ElementRef, private route: ActivatedRoute, public router: Router) { }
  isConfirm : boolean = true;
  saveDisabled : boolean = true;
  navScreen : String = '';
  selectedTab = 7;
  headerTabData = [
    { disabled: false, name: 'Request' },
    { disabled: false, name: 'Contract' },
    { disabled: false, name: 'RFQ' },
    { disabled: false, name: 'Order' },
    { disabled: false, name: 'Delivery' },
    { disabled: false, name: 'Labs' },
    { disabled: false, name: 'Claims' },
    { disabled: false, name: 'Invoices' },
    { disabled: false, name: 'Recon' },
  ]
  tabData = [
    { disabled: false, name: 'Details', count:0 },
    { disabled: false, name: 'Related Invoices', count:6 },
    { disabled: false, name: 'Documents', count:3 },
    { disabled: false, name: 'Email Log', count:0 },
    { disabled: false, name: 'Seller Rating', count:0 },
    { disabled: false, name: 'Audit Log', count:0 }
  ]

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.navScreen = params.get('name');
      switch(this.navScreen){
        case 'invoice': {
          this.selectedTab  =7; 
          break;
        }
        case 'delivery': {
          this.selectedTab  =4; 
          break;
        }
        case 'contract': {
          this.selectedTab  =1; 
          break;
        }
      }
    })
  }

  ngAfterViewInit() {

    let elements = this.elem.nativeElement.querySelectorAll('.mat-tab-label');
    elements.forEach((element, index) => {
      // element.style.left = 138 * index + 'px';
      element.style.zIndex = 1000 - index;
    });

  }
  selectedTabChange(e){
    this.child.tabChange();
  }
  selectedParentTabChange(e: MatTabChangeEvent){
    switch(e.index){
      case 7: {
        this.router.navigate(['/shiptech/' + 'invoice']);
        break;
      }
      case 4: {
        this.router.navigate(['/shiptech/' + 'delivery']);
        break;
      }
      case 1: {
        this.router.navigate(['/shiptech/' + 'contract']);
        break;
      }
    }
  }

}
