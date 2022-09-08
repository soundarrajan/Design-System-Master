import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TraderSearchPopupComponent } from 'src/app/shared/designsystem-v2/trader-search-popup/trader-search-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-ui-components',
  templateUrl: './ui-components.component.html',
  styleUrls: ['./ui-components.component.scss']
})
export class UiComponentsComponent implements OnInit {
  public showCode: boolean = false;
  copyHTMLContent;
  copyTSContent;
  copyCSSContent;

  @Input('componentSelected') componentSelectedKey;
  @Input('componentDetails') componentDetails;
  types = [
    { value: 'input', viewValue: 'Input' },
    { value: 'select', viewValue: 'Select' },
    { value: 'datepicker', viewValue: 'Datepicker' },
    { value: 'inputwithselect', viewValue: 'Input with dropdown' },
    { value: 'inputwithautocomplete', viewValue: 'Input with Auto Completehgshhgsfasagfh' },
    { value: 'inputwithlabels', viewValue: 'Input with Labels' },
    { value: 'inputwithnavigationandsearch', viewValue: 'Input with Navigation and Search Popup' },
    { value: 'button', viewValue: 'Button' },
    { value: 'moleculebutton', viewValue: 'Molecule Button' }
  ];
  customTabData = [
    { disabled: false, name: 'First' },
    { disabled: false, name: 'Second' },
    { disabled: true, name: 'Third Disabled Tab' }
  ]
  customTabHeaderData = [
    { disabled: false, name: 'First' },
    { disabled: false, name: 'Second' },
    { disabled: false, name: 'Third' }
  ]
  //selected - Filter chip which is currently selected/applied on grid
  //pinned - Filter chips which are pinned for displaying on screen
  //defaultFilter - Filters which user cannot modify/delete,always displayed on screen
  filterList = {
    filters: [
      {
        name: 'Default Chip1',
        defaultFilter: true,
        selected: true,
        pinned: true,
        position: 0
      },
      {
        name: 'Default Chip2',
        defaultFilter: true,
        selected: false,
        pinned: true,
        position: 1
      },
      {
        name: 'Very long label',
        defaultFilter: false,
        selected: false,
        pinned: false,
        position: 2
      },
      {
        name: 'Error B/Ls',
        defaultFilter: false,
        selected: false,
        pinned: false,
        position: 3
      },
      {
        name: 'Errors',
        defaultFilter: false,
        selected: false,
        pinned: true,
        position: 4,
        count: '16'
      },
      {
        name: 'More usual labels',
        defaultFilter: false,
        selected: false,
        pinned: true,
        position: 5
      },
      {
        name: 'Pending B/L List',
        defaultFilter: false,
        selected: false,
        pinned: true,
        position: 6
      },
      {
        name: 'Matched List',
        defaultFilter: false,
        selected: false,
        pinned: true,
        position: 7
      },
      {
        name: 'BP Marine Fuels',
        defaultFilter: false,
        selected: false,
        pinned: true,
        position: 8
      },
      {
        name: 'Physical',
        defaultFilter: false,
        selected: false,
        pinned: false,
        position: 9
      },
      {
        name: 'Shell United State',
        defaultFilter: false,
        selected: false,
        pinned: false,
        position: 10
      }
    ],
    enableMoreFilters: true
  }
  priceForecastList = [
    {
      date: "01/12/2020",
      status: "Priced",
      exposure: "42,000 GAL"
    },
    {
      date: "02/12/2020",
      status: "Priced",
      exposure: "42,000 GAL"
    },
    {
      date: "03/12/2020",
      status: "Priced",
      exposure: "42,000 GAL"
    },
    {
      date: "04/12/2020",
      status: "Priced",
      exposure: "42,000 GAL"
    },
    {
      date: "05/12/2020",
      status: "Unpriced",
      exposure: "42,000 GAL"
    },
    {
      date: "06/12/2020",
      status: "Unpriced",
      exposure: "42,000 GAL"
    },
    {
      date: "7/12/2020",
      status: "Unpriced",
      exposure: "42,000 GAL"
    },
    {
      date: "08/12/2020",
      status: "Unpriced",
      exposure: "42,000 GAL"
    },
    {
      date: "09/12/2020",
      status: "Unpriced",
      exposure: "42,000 GAL"
    },
    {
      date: "10/12/2020",
      status: "Unpriced",
      exposure: "42,000 GAL"
    },
    {
      date: "11/12/2020",
      status: "Unpriced",
      exposure: "42,000 GAL"
    },
    {
      date: "12/12/2020",
      status: "Unpriced",
      exposure: "42,000 GAL"
    },
    {
      date: "13/12/2020",
      status: "Unpriced",
      exposure: "42,000 GAL"
    },
    {
      date: "14/12/2020",
      status: "Unpriced",
      exposure: "42,000 GAL"
    }
  ]
  selectedFieldType = 'input';
  darkThemeOn: boolean;
  switchTheme: boolean;
  componentSource;
  templateSource;
  stylesSource;
  sourceFetchError1: boolean;
  sourceFetchError2: boolean;
  sourceFetchError3: boolean;

  buttonToggleData =
    { names: ['One', 'Two', 'Three', 'Four'] }
  public smartFilterArray = [{ name: "Conract Name", checked: true }, { name: "Company", checked: true }, { name: "Book", checked: false, show: false }]
  // Start of stepper
  progressStepper1 = [
    { name: 'Start Closure', status: 'incomplete', index: 0, class: "incomplete" },
    { name: 'Draft P&L', status: 'incomplete', index: 1, class: "incomplete" },
    { name: 'Final P&L', status: 'incomplete', index: 2, class: "incomplete" }
  ];
  // Start Closure- complete
  progressStepper2 = [
    { name: 'Start Closure', status: 'complete', index: 0, class: "complete light-green" },
    { name: 'Draft P&L', status: 'incomplete', index: 1, class: "incomplete" },
    { name: 'Final P&L', status: 'incomplete', index: 2, class: "incomplete" }
  ];
  //Draft P&L - complete
  progressStepper3 = [
    { name: 'Start Closure', status: 'complete', index: 0, class: "complete light-green" },
    { name: 'Draft P&L', status: 'complete', index: 1, class: "complete medium-green" },
    { name: 'Final P&L', status: 'incomplete', index: 2, class: "incomplete" }
  ];
  //Final P&L - complete
  progressStepper4 = [
    { name: 'Start Closure', status: 'complete', index: 0, class: "complete light-green" },
    { name: 'Draft P&L', status: 'complete', index: 1, class: "complete medium-green" },
    { name: 'Final P&L', status: 'complete', index: 2, class: "complete dark-green" }
  ];


  constructor(public dialog: MatDialog, private readonly snackbar: MatSnackBar,
    private readonly clipboard: Clipboard, private http: HttpClient) {
  }
  ngOnInit(): void {
  }

  searchTrader() {
    const dialogRef = this.dialog.open(TraderSearchPopupComponent, {
      width: '925px',
      height: '470px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showCodeBlock() {
    this.showCode = !this.showCode;
  }

  viewSourceCode() {
    this.showCode = !this.showCode;
    this.http.get("assets/data/source-code/" + this.componentDetails.key + "/component.txt", { responseType: 'text' }).subscribe((data) => {
      this.componentSource = data;
      this.copyTSContent = data;
    }, (error) => {
      this.sourceFetchError1 = true;
    });
    this.http.get("./assets/data/source-code/" + this.componentDetails.key + "/styles.txt", { responseType: 'text' }).subscribe((data) => {
      this.stylesSource = data;
      this.copyCSSContent = data;
    }, (error) => {
      this.sourceFetchError2 = true;
    });
    this.http.get("./assets/data/source-code/" + this.componentDetails.key + "/template.txt", { responseType: 'text' }).subscribe((data) => {
      this.templateSource = data;
      this.copyHTMLContent = data;
    }, (error) => {
      this.sourceFetchError3 = true;
    });

  }
  copySource(text) {
    if (this.clipboard.copy(text)) {
      this.snackbar.open('Code copied', '', { duration: 2500 });
    } else {
      this.snackbar.open('Copy failed. Please try again!', '', { duration: 2500 });
    }
  }


}
