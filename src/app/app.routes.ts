import { Routes } from '@angular/router';
import { LoginComponent } from './domains/shared/pages/login/login.component';
import { LayoutadminComponent } from './domains/admin/components/layoutadmin/layoutadmin.component';
import { LayoutplayerComponent } from './domains/player/components/layoutplayer/layoutplayer.component';
import { ClubComponent } from './domains/admin/pages/club/club/club.component';
import { EventsComponent } from './domains/player/pages/events/events/events.component';
import { LandingComponent } from './domains/shared/pages/landing/landing.component';
import { CreateAccountComponent } from './domains/shared/pages/create-account/create-account.component';
import { LayoutComponent } from './domains/shared/components/layout/layout.component';
import { CreateClubComponent } from './domains/shared/pages/create-club/create-club.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path:'home',
                component: LandingComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'create-account',
                component: CreateAccountComponent,
            },
            {
                path: 'create-club',
                component: CreateClubComponent,
            }
        ]
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
