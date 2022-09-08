import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-custom-components-home',
  templateUrl: './custom-components-home.component.html',
  styleUrls: ['./custom-components-home.component.css'],
  //encapsulation: ViewEncapsulation.ShadowDom
})
export class CustomComponentsHomeComponent implements OnInit {
  hideSideNav: boolean;
  itemList;
  itemSelected = "input";
  itemDetails;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getComponentDetails().subscribe(data => {
      this.itemList = data;
      data.forEach((element) => {
        if (this.itemDetails == null) {
          let details = element.list.filter(record => record.key == this.itemSelected);
          this.itemDetails = details.length > 0 ? details[0] : null;
        }
      })

    });
  }
  onSelectionChange(event) {
    this.itemDetails = null;
    this.itemSelected = event.selected[0].value;
    this.getComponentDetails().subscribe(data => {
      data.forEach((element) => {
        if (this.itemDetails == null) {
          let details = element.list.filter(record => record.key == this.itemSelected);
          this.itemDetails = details.length > 0 ? details[0] : null;
        }
      })

    });
  }
  public getComponentDetails(): Observable<any> {
    return this.http.get("./assets/data/v2-component-list.json");
  }
}
