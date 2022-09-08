import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'cancel-closure-dialog',
  template: `<div class="remove-terminal-section cancel-closure-dialog">
  <div class="close-btn" style="position: absolute !important;top: -12px !important;right: -8px;"><img id="close-icon" src="../../../assets/customicons/close.svg" alt="list"></div>
  <div class="warning-title"><img id="warning-icon" src="../../../assets/customicons/warning_o.svg" alt="list"><span class="p-l-10">Attention</span></div>
  <p class="msg">Are you sure you want to cancel the EOM Closure process for <span class="bold-msg">Oct 2020</span>?</p>
  <div class="yes-no">
     
      <button class="red-button" style="float:left;">    
        <span>CANCEL</span>
      </button>
      <button class="blue-button" style="float:right;" (click)="proceed();">    
        <span>PROCEED</span>
      </button>
  </div>
</div>`
})
export class CancelClosureDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CancelClosureDialog>,private toastr: ToastrService) { }

  ngOnInit() {
  }

  proceed(){
    this.dialogRef.close();
    this.toastr.show('<div class="image-placeholder"><span class="image"></span></div><div class="message">Cancelled Successfully!</div>',
    '' , {
            enableHtml: true,
            toastClass: "toast-alert toast-green",
            timeOut: 2000
         });
  }
}
