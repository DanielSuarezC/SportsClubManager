import { Routes } from '@angular/router';
import { LoginComponent } from './domains/shared/pages/login/login.component';
import { LayoutadminComponent } from './domains/admin/components/layoutadmin/layoutadmin.component';
import { LayoutplayerComponent } from './domains/player/components/layoutplayer/layoutplayer.component';
import { LandingComponent } from './domains/shared/pages/landing/landing.component';
import { CreateAccountComponent } from './domains/shared/pages/create-account/create-account.component';
import { LayoutComponent } from './domains/shared/components/layout/layout.component';
import { CreateClubComponent } from './domains/shared/pages/create-club/create-club.component';
import { MembersComponent } from './domains/admin/pages/members/members.component';
import { EventsAdminComponent } from './domains/admin/pages/events-admin/events-admin.component';
import { EventsCreateComponent } from './domains/admin/pages/events-create/events-create.component';
import { EventsPlayerComponent } from './domains/player/pages/events-player/events-player.component';
import { HomeClubComponent } from './domains/shared/pages/home-club/home-club.component';

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
                path: 'create-club/:id',
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
                path: 'club/:UserId',
                component: HomeClubComponent
            },
            {
                path: 'club/:id',
                component: CreateClubComponent,
            },
            {
                path: 'members',
                component: MembersComponent
            },
            {
                path: 'events',
                component: EventsAdminComponent
            },
            {
                path: 'events-create/:eventType',
                component: EventsCreateComponent
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
                component: EventsPlayerComponent
            },
            {
                path: 'club/:typeUser',
                component: HomeClubComponent
            }
        ]
    }
];
