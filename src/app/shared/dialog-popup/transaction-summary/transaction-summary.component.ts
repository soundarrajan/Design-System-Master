import { Component, OnInit, Inject, Renderer2} from '@angular/core';
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
//import {Observable} from 'rxjs';
//import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-transaction-summary',
  templateUrl: './transaction-summary.component.html',
  styleUrls: ['./transaction-summary.component.scss']
})
export class TransactionSummaryComponent implements OnInit {
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

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public dialog: MatDialog,private renderer: Renderer2,
    private elem: ElementRef,
    public dialogRef: MatDialogRef<TransactionSummaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
   }

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
    //this.fruits.push("+Add New");
  }

  // Workaround for angular component issue #13870
  disableAnimation = true;
  ngAfterViewInit(): void {
    // timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(() => this.disableAnimation = false);
    //this.fruitInput.nativeElement.focus();
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
    //console.log(event.target.parentNode.nextSibling);
    // If multiple tabs are opened, show clicked  expanded email content from multiple.
    let elements = this.elem.nativeElement.querySelectorAll('.email-preview');
    //console.log(elements);
    elements.forEach( (element) => {
      element.classList.remove('selectedPreview');
    });
    
  //   for(var i =0;i<=elements.length;i++){
  //   //if(elements[i].classList.contains('selectedPreview')){
  //   elements[i].classList.remove('selectedPreview');
  //  // }
  //   }
  let panels = this.elem.nativeElement.querySelectorAll('.mat-expansion-panel');
  //panels.style.display = 'none';
  //this.renderer.setElementStyle(panels, 'display', 'none');
  for (var i=0;i<panels.length;i+=1){
    panels[i].style.display = 'none';
  }

  panels.forEach( (element) => {
    element.classList.remove('selectedPanel');
  });
  var selectedPanel = event.target.closest('.mat-expansion-panel');
  //for (var i=0;i<selectedPanel.length;i+=1){
    selectedPanel.style.display = 'block';
  //}
  //selectedPanel.style.display = 'none';
  //this.renderer.setElementStyle(selectedPanel.nativeElement, 'display', 'block');
   selectedPanel.classList.add('selectedPanel');
    event.target.parentNode.nextSibling.classList.add('selectedPreview');
    //this.renderer.setElementClass(event.target,"opened",true);
    this.expandedContent = true;
    this.expandedview = false;
    this.minimiseShow = true;
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
}
