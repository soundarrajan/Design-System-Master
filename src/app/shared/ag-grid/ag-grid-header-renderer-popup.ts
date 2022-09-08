import { Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
    selector: 'aggrid-header-renderer-popup',
    template: `
             <div class="add-btn add-btn3"></div>
             <div class="expansion-popup" *ngIf="displayPopup">
            <div [ngClass]="!expandProductPopUp ? 'select-product-container' : 'expand-select-product-container'">
                <div class="col-md-12 header-container-product">
                <div class="search-product-container col-md-10">
                    <span class="search-product-lookup">
                    </span>
                    <input matInput
                        placeholder="Search all and select a product"
                        class="search-product-input"
                        (input)="search($event.target.value)">
                        </div>
                <div class="col-md-2">
                    <img class="expand-img" (click)="expandProductPopUp = !expandProductPopUp;" alt="Shiptech"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAEmSURBVFhH7ZahCgJBEIZ9KruYxatiF6vBdsWk2WiyXTGJweIjiMEkglHxKVb+MDCOw84ernhhBr7gzr/Dd3vcYqvdKUKTcCELF7JwIYuoUH8wCuNJqaLlCS0PME/Lc6JCq3UVtJotlmqeQF8rzNPynNpClgyhSWUXuj+eodsbqlkJcsjz+skJXa43Uwp95GRlE8Lx81cQk5IyfG8WIQyj31xqtz+8ZQmsU8m9Xwtpp4DBKSfEZXhPrkmiQv/AhSxcyKK2EL6UaTlXewT6KV+URlRIDqZPWt4xHKyj5NWQ8iAgKoSLjAZzGZQlhJJ7s9zUNDhFhpBStDebEC9LhuBSVNmF/O+HBMd+PJ0/qDZbNU+gr+1Led1RoX/gQhYuZOFCFg0TKsILCN4aRzqXaa8AAAAASUVORK5CYII=">
                </div>
                </div>
                <table class="delivery-products-pop-up col-md-12 no-padding" mat-table [dataSource]="deliverySummaryProducts">
                <!-- Product Column -->
                <ng-container matColumnDef="product">
                    <th mat-header-cell *matHeaderCellDef> Products in order </th>
                    <td mat-cell *matCellDef="let element"> 
                    <mat-option [value]="element">
                        <mat-radio-button [value]="element">   
                        {{element.product}} 
                        </mat-radio-button>
                    </mat-option>
                    </td>
                </ng-container>

                <!-- Product type Column -->
                <ng-container matColumnDef="productType">
                    <th mat-header-cell *matHeaderCellDef> Type </th>
                    <td mat-cell *matCellDef="let element"> 
                    <mat-option>
                        {{element.productType}} 
                    </mat-option>
                    </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                </table>
            </div>
            </div>
             `,
    styles: []
})
export class AggridHeaderRendererPopupComponent {
    params: any;
    displayPopup: boolean = false;
    expandProductPopUp:boolean = false;
    displayedColumns: string[] = ['product', 'productType'];
    deliverySummaryProducts = [
        {'product': 'RMG 380 MAX 050', 'productType': 'VLSFO'},
        {'product': 'DMA 0.1%', 'productType': 'DOGO'},
    ];
    constructor() {
    }
    agInit(params: any): void {
        this.params = params;
    }

   /*  showPopup(){
        this.displayPopup = !this.displayPopup;
    } */

    search(value: string): void {
        let filterSummaryProducts = this.deliverySummaryProducts.filter((summaryProd) => summaryProd.product.toLowerCase().includes(value));
        this.deliverySummaryProducts = [ ... filterSummaryProducts];
    
        this.deliverySummaryProducts = [
          {'product': 'RMG 380 MAX 050', 'productType': 'VLSFO'},
          {'product': 'RMG 380 MAX 0502', 'productType': 'VLSFO2'},
        ];
    }

}
