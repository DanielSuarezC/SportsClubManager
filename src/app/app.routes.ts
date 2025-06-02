import { Routes } from '@angular/router';
import { LoginComponent } from './domains/shared/pages/login/login.component';
import { LayoutadminComponent } from './domains/admin/components/layoutadmin/layoutadmin.component';
import { LayoutplayerComponent } from './domains/player/components/layoutplayer/layoutplayer.component';
import { ClubComponent } from './domains/admin/pages/club/club/club.component';
import { EventsComponent } from './domains/player/pages/events/events/events.component';
import { LandingComponent } from './domains/shared/pages/landing/landing.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'admin',
        component: LayoutadminComponent,
        canActivate: [],
        canActivateChild: [],
        children: [
            {
                path: 'club',
                component: ClubComponent
            }
        ] 
    },
    {
        path:'player',
        component: LayoutplayerComponent,
        canActivate: [],
        canActivateChild: [],
        children: [
            {
                path: 'events',
                component: EventsComponent
            }
        ]
    }
];
