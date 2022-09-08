import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exposure-details',
  templateUrl: './exposure-details.component.html',
  styleUrls: ['./exposure-details.component.scss']
})
export class ExposureDetailsComponent implements OnInit {

  public items = [
    {
    date: "10/12/2020",
    status: "Unpriced",
    exposure: "42,000 GAL"
  }
]
  constructor() { }

  ngOnInit() {
  }

}
