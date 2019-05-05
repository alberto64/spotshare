import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { JournalComponent } from './journal/journal.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CollectionHubComponent } from './collection-hub/collection-hub.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PostcardComponent } from './postcard/postcard.component';
import { AlbumComponent } from './album/album.component';


const routes: Routes = [
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'mainpage', component: MainPageComponent },
  { path: 'collection-hub', component: CollectionHubComponent },
  { path: 'album/:type', component: AlbumComponent },
  { path: 'postcard/:type/:pPos', component: PostcardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: UserSettingsComponent },
  { path: 'journal', component: JournalComponent },
  { path: '**', redirectTo: '/mainpage', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
