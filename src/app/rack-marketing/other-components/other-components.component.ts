import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RemoveTerminalComponent } from '../../shared/dialog-popup/remove-terminal/remove-terminal.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-other-components',
  templateUrl: './other-components.component.html',
  styleUrls: ['./other-components.component.scss']
})
export class OtherComponentsComponent implements OnInit {

  constructor(public dialog: MatDialog,private toastr: ToastrService) { }

  ngOnInit() {
  }

  toastGreen() {
    //this.current_state='confirm';
    this.toastr.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">Trade created successfully!</div>',
               '' , {
                        enableHtml: true,
                        //closeButton: true,
                        // disableTimeOut:true,
                        toastClass: "toast-alert toast-green", // toast-green, toast-amber, toast-red, toast-grey
                        timeOut: 2000
                    });
  }

  toastAmber() {
    //this.current_state='confirm';
    this.toastr.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">Same type is already mapped for all products! Please add a new type or change the existing type.</div>',
               '' , {
                        enableHtml: true,
                        //closeButton: true,
                        // disableTimeOut:true,
                        toastClass: "toast-alert toast-amber", // toast-green, toast-amber, toast-red, toast-grey
                        timeOut: 2000
                    });
  }

  toastRed() {
    //this.current_state='confirm';
    this.toastr.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">Fatal Error occurred! Please refresh the application.</div>',
               '' , {
                        enableHtml: true,
                        //closeButton: true,
                        // disableTimeOut:true,
                        toastClass: "toast-alert toast-red", // toast-green, toast-amber, toast-red, toast-grey
                        timeOut: 2000
                    });
  }

  toastGrey() {
    //this.current_state='confirm';
    this.toastr.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">Default Notification</div>',
               '' , {
                        enableHtml: true,
                        //closeButton: true,
                        // disableTimeOut:true,
                        toastClass: "toast-alert toast-grey", // toast-green, toast-amber, toast-red, toast-grey
                        timeOut: 2000
                    });
  }

  openPublishDialog() {
    const dialogRef = this.dialog.open(RemoveTerminalComponent, {
      
      width: '368px',
      //height: '240px',
      //position: { top:'25px'},
      //top: '25px',
      panelClass: 'remove-terminal-popup'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }

}
