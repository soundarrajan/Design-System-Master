
import { Component, OnInit, Input, Output, EventEmitter,  ElementRef,Renderer2, } from "@angular/core";

@Component({
  selector: 'app-newheaderv2',
  templateUrl: './newheaderv2.component.html',
  styleUrls: ['./newheaderv2.component.scss']
})
export class Newheaderv2Component implements OnInit {


  public isCollapsed: boolean = false;
 
 
  constructor() {}
  

  ngOnInit() {}
  
  public headerToggle() {
    if (
      document.querySelector(".pcoded-header").classList.contains("header-navbar-v2")
    ) {
      //alert("sss");
      this.isCollapsed = false;
      document.querySelector(".pcoded-header").classList.remove("header-navbar-v2");
      document.querySelector(".pcoded-main-container").classList.remove("pcoded-main-container-v2");
      document.querySelector(".ds-logo").classList.remove("designsystem-logo-v2");
      } else {
      this.isCollapsed = true;
      document.querySelector(".pcoded-header").classList.add("header-navbar-v2");
      document.querySelector(".pcoded-main-container").classList.add("pcoded-main-container-v2");
      document.querySelector(".ds-logo").classList.add("designsystem-logo-v2");
      
    }
  }
  
  
  
 

}
