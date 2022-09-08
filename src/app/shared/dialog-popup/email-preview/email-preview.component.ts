import { Component, OnInit, Inject, Renderer2, ViewChildren, QueryList,} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { startWith, map } from 'rxjs/operators';
//import { MatAutocomplete } from '@angular/material';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';

import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { RemoveTerminalComponent } from '../remove-terminal/remove-terminal.component';

@Component({
  selector: 'app-email-preview',
  templateUrl: './email-preview.component.html',
  styleUrls: ['./email-preview.component.scss']
})
export class EmailPreviewComponent implements OnInit {

  customCollapsedHeight: string = '45px';
  customExpandedHeight: string = '50px';
  public showAddItem:boolean = true;
  public showAutoInput:boolean = false;
  public uploaded:boolean = false;
  public showBccBlock: boolean = false;
  public showBccBtn: boolean = true;
  public expandedContent: boolean = false;
  public expandedview: boolean = true;
  public minimiseShow: boolean = false;
  public selectedFile: any = "";
  public toggleHeader: boolean = true;
  selectedCounterparty = 1;
  public show: boolean = true;
  public emailPreviewList = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChildren('type') type: ElementRef<HTMLInputElement>;

  constructor(public dialog: MatDialog,private renderer: Renderer2,
    private elem: ElementRef,
    public dialogRef: MatDialogRef<EmailPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));

      this.emailPreviewList=[
        {
           "tenantId":1,
           "userId":27,
           "to":[
              {
                 "id":"3",
                 "name":"Alexis Oil Company",
                 "emailAddress":"jamie@alexisoil.com"
              }
           ],
           "from":"rack@petrodiamond.com",
           "cc":[
     
           ],
           "bcc":[
     
           ],
           "subject":"Confirmed deliveries list",
           "emailBody":`<html>  <head> <style> .messageContents {   width:600pt;   }  .headerInfo {   font-family:\"Arial\";   font-size:11.0pt;   }    .bodyText {   font-family:\"Arial\";   font-size:10.0pt; }  .textHighlight {   font-weight:bold;   }    .portLocation {   padding:0px 0px 10px 0px; }  .tableStyle {   margin:0;   padding:2pt;   border-collapse:collapse   }  .rowStyle {   height:15pt;   vertical-align:middle;   margin:0;   padding:0;   }    .itemColumn {   width:150pt;   text-align:left;   margin:0;   padding:2pt;   border-style:solid;   border-width:0.5px;   border-color:#979797;   }  .otherColumn {   width:100pt;   text-align:center;   margin:0;   padding:2pt;   border-style:solid;   border-width:0.5px;   border-color:#979797; }  .creditItem {   width:100pt;   text-align:left;   margin:0;   padding:2pt;   }  .creditDetails {   width:80pt;   text-align:center;   margin:0;   padding:2pt;   font-weight:bold; }  .footerText {   font-family:\"Arial\",sans-serif;   font-size:9.0pt;   font-weight:bold;   font-style:italic; }  p {   margin:0;   padding:2pt;   }    img {   float: right;   }  table {border: 1px solid black; }tr {border: 1px solid black;}td {border: 1px solid black; } .productColumn{ width:250pt;   text-align:left;} .loadLocation{ width:250pt;   text-align:left;}.deliveryLocation { width:250pt;   text-align:left;}.truckingCompany { width:250pt;   text-align:left;}.deliveryWindow { width:250pt;   text-align:left;} </style>   </head>  <body> <div class=\"messageContents\">   <div class=\"headerInfo\">     <div>     <img src=\"data:image/png;base64,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\" alt=\"Logo\">    </div>    
           <p class=\"textHighlight\">PETRO-DIAMOND INC.</p>    <p>1100 MAIN STREET, 2ND FLOOR</p>    <p>IRVINE,  CA  92614</p>    <p>(949) 553-0112</p>   </div>    <br/>   <br/>             <div class=\"bodyText\">    <p>To: <span class=\"textHighlight\">Alexis Oil Company</span></p></div>      <br/>      <div class=\"bodyText portLocation\">    <p>With this email we would like to confirm below deliveries</p>   </div>      <table id=\"pdsList\" class=\"tableStyle bodyText\">    <tr class=\"rowStyle\">     <th class=\"otherColumn textHighlight\" rowspan=\"2\">S.No.</th>     <th class=\"itemColumn textHighlight\" rowspan=\"2\">Delivery ID</th>     <th class=\"itemColumn textHighlight\" rowspan=\"2\">Product</th>   <th class=\"itemColumn textHighlight\" rowspan=\"2\">Volume</th>   <th class=\"itemColumn textHighlight\" rowspan=\"2\">Load Location</th>   <th class=\"itemColumn textHighlight\" rowspan=\"2\">Delivery Location</th>   <th class=\"itemColumn textHighlight\" rowspan=\"2\">Trucking Company</th>   <th class=\"itemColumn textHighlight\" colspan=\"2\">Delivery Window</th>   </tr> <tr><th class=\"otherColumn textHighlight\">From </th><th class=\"otherColumn textHighlight\">To </th></tr><tr class=\"rowStyle\">     <td class=\"otherColumn\">1</td>     <td class=\"itemColumn\">PS1900113-1</td>     <td class=\"productColumn\" >CARB ULS DIESEL W/ 5% BIO RED DYE</td>   <td class=\"itemColumn\">2000.0000000000000000</td>   <td class=\"loadLocation\">Irvine</td>   <td class=\"deliveryLocation\">Irvine</td>                    <td class=\"truckingCompany\"></td> <td class=\"otherColumn\">9/2/2019 12:00:00 AM </td><td class=\"otherColumn\">10/31/2020 12:00:00 AM </td></tr></table>    <br/> <br/><p id=\"ExternalComments\"></p><br/> <br/><div class=\"bodyText\">    <p>Kindly provide a confirmation on receiving this mail by mailing to us at rack@petrodiamond.com or calling us at (949) 553-0112.</p>  </div> <br/>    <div class=\"bodyText\">    <p>Note:This is an auto-generated email. Please reply to rack@petrodiamond.com if required.</p></div>      <br/> <br/>   <br/> <div class=\"footerText\">    <p>Please be aware of the following:</p>    <br />    <p>(1) The license plate number of the truck loading product will be printed on the Bill of Lading to ensure product is being loaded into pre-authorized equipment.</p>    <p>(2) Prior to signing BOL, drivers must write in the Shipping Address (if not already printed).</p>    <p>(3) Prices are subject to change at anytime without notice and subject to applicable federal, suite, and/or local taxes.</p></div>     </div> </body>  </html>\r\n`,
           "applicationModuleCode":null,
           "applicationEntityId":0,
           "matchId":null,
           "matchedEntitiesModel":[
              {
                 "matchId":31,
                 "deliveryFrom":"2019-09-11T12:10:47+05:30",
                 "deliveryTo":"2019-09-11T12:10:47+05:30",
                 "releaseNumber":null,
                 "freight":null
              }
           ],
           "contactList":[
              {
                 "id":"3",
                 "name":"Mailbox",
                 "emailAddress":"jamie@alexisoil.com"
              }
           ],
           "counterparty":"Alexis Oil Company",
           "counterpartyType":"Customer",
           "comment":null
        }
     ];

   }

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
    //this.fruits.push("+Add New");
    var xx = document.getElementById('myframe') as HTMLIFrameElement;
    xx.contentWindow.document.write(this.emailPreviewList[0].emailBody);

  }

  // Workaround for angular component issue #13870
  disableAnimation = true;
  ngAfterViewInit(): void {
    // timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(() => this.disableAnimation = false);
    //this.fruitInput.nativeElement.focus();

    
    let titleelem = document.querySelectorAll('.title');
    let typeelem = document.querySelectorAll('.type');
    let typeDtlelement = document.querySelectorAll('.type-detail');
    typeelem.forEach( (element) => {
    if(element.innerHTML == ""){
        element.parentElement.previousElementSibling.classList.add('fullText');
      }
    });
    
  }

  // myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;
  
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }


  public hideAddItemBtn(){
    this.showAddItem = false;
    this.showAutoInput = true;
  }

  public showAddItemBtn(){
    this.showAddItem = true;
    this.showAutoInput = false;
    
  }

  // public showAddItemBtn(){
  //   console.log("ssssss");
  //   this.showAddItem = false;
  // }

  // public hideAddItemBtn(){
  //   console.log("rrrrrrr");
  //   this.showAddItem = true;
  // }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Bob Kennedy','Bob Kennedy','Bob Kennedy'];
  allFruits: string[] = ['Kennedy Johns', 'Johns Kennedy', 'John Doe', 'Kennedy Jim', 'Bob Kennedy'];

 

  

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  fileEvent(e: Event){
    //alert("");;
    let file = (<HTMLInputElement>e.target).files[0];
    let fileName = file.name;
    this.selectedFile = fileName;
    this.uploaded = true;
    //alert(fileName);
  }

  openPublishDialog() {
    const dialogRef = this.dialog.open(RemoveTerminalComponent, {
      
      width: '368px',
      //height: '240px',
      //position: { top:'25px'},
      //top: '25px',
      panelClass: ['remove-terminal-popup','close-btn-pos']

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }

  
  closeDialog() {
    this.dialogRef.close();
  }

  showBcc(){
    this.showBccBlock = true;
    this.showBccBtn = false;
  }
  expandView(event){
    event.stopPropagation();
    this.show = !this.show;
    this.expandedContent = !this.expandedContent;
    
  }

  minimiseView(){
    this.expandedContent = false;
    this.expandedview = true;
    this.minimiseShow = false;
    let panels = this.elem.nativeElement.querySelectorAll('.mat-expansion-panel');
  //panels.style.display = 'none';
  //this.renderer.setElementStyle(panels, 'display', 'none');
  for (var i=0;i<panels.length;i+=1){
    panels[i].style.display = 'block';
  }
  }

  toggleEmailHeader(){
    this.toggleHeader = !this.toggleHeader;
  }

  selectCounterparty(id: number){
    this.selectedCounterparty = id;
  }

}
