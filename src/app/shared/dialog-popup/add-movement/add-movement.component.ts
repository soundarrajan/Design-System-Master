import { Component, OnInit, Inject, ViewChild, ElementRef,  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-movement',
  templateUrl: './add-movement.component.html',
  styleUrls: ['./add-movement.component.scss']
})
export class AddMovementComponent implements OnInit {
  showinvetory : boolean = true;
  showb2b:boolean = false;
  showInventry(){
    this.showinvetory= true;
    this.showb2b=false;
  }
  shoowB2B(){
    this.showb2b=true;
    this.showinvetory=false;
  }
  constructor(public dialogRef: MatDialogRef<AddMovementComponent>,  iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,  @Inject(MAT_DIALOG_DATA) public data: any) {  
    iconRegistry.addSvgIcon(
    'data-picker',
    sanitizer.bypassSecurityTrustResourceUrl('../assets/customicons/datepicker.svg'));
    iconRegistry.addSvgIcon(
      'time-picker',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/customicons/timepicker.svg'));
}
 
  public dateTime;
  closeDialog() {
    this.dialogRef.close();  
  } 
  ngOnInit() {
  }

}
