import { Directive, HostListener } from '@angular/core';

import * as screenfull from "screenfull";
import {Screenfull} from "screenfull";

@Directive({
  selector: '[appToggleFullscreen]'
})
export class ToggleFullscreenDirective {

  @HostListener('click') onClick() {
    let sf = <Screenfull>screenfull;
    if (sf.enabled) {
    sf.toggle();
    }
  }
}
