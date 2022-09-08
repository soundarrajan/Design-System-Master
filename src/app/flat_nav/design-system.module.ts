import {NgModule} from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MenuItems } from '../shared/menu-items/menu-items';

@NgModule({

    declarations: [],
    imports: [CommonModule, RouterModule, SharedModule],
    exports: [ SharedModule],
    providers: [MenuItems]
})

export class DesignSystemModule{

}
