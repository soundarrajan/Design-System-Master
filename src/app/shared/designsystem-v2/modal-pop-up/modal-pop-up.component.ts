import { Component, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef
} from "@angular/core";
@Component({
  selector: 'app-modal-pop-up',
  templateUrl: './modal-pop-up.component.html',
  styleUrls: ['./modal-pop-up.component.css']
})
export class ModalPopUpComponent implements AfterViewInit, OnDestroy {

  @ViewChild("renderComponentHere", { read: ViewContainerRef })
  vcRef: ViewContainerRef;

  componentRef: ComponentRef<any>;

  constructor(public dialogRef: MatDialogRef<ModalPopUpComponent>,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public properties: any) { }

  ngAfterViewInit(): void {
    console.log(this.properties.component)
    const comp = this.resolver.resolveComponentFactory(this.properties.component);
    this.componentRef = this.vcRef.createComponent(comp);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
