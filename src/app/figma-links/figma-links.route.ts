import { Routes } from '@angular/router';
import { FigmaLinksScreenComponent } from './figma-links-screen/figma-links-screen.component';



export const FigmaLinkScreenRoutes: Routes = [
    {
        path: '**',        
        component: FigmaLinksScreenComponent,
        data : {breadCrumb1 : 'Figma Links'}
    }
];