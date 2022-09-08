import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
@Component({
  selector: 'app-eomlist',
  templateUrl: './eomlist.component.html',
  styleUrls: ['./eomlist.component.scss']
})
export class EomlistComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  public openNewTab() {
   
    this.router.navigate([]).then(result => {  window.open('./techoil/closure/eomclosure', '_blank'); });

}
}
