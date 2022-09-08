import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dark-filter',
  templateUrl: './dark-filter.component.html',
  styleUrls: ['./dark-filter.component.scss']
})
export class DarkFilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ChangeFLColor(event)
  {
    var colorChange=document.getElementById('filter-popup')

    if(event.checked)
    {
      colorChange.className="filter-popup-wrapper"
    }
    else
    {
      colorChange.className="dark-filter-popup-wrapper"
    }
  }

}
