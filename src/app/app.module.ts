import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { CollectionHubComponent } from './collection-hub/collection-hub.component';
import { PostcardComponent } from './postcard/postcard.component'

import { UserService } from './user.service';
import { AlbumComponent } from './album/album.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { JournalComponent } from './journal/journal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    MainPageComponent,
    LoginComponent,
    FooterComponent,
    SignupComponent,
    CollectionHubComponent,
    PostcardComponent,
    AlbumComponent,
    ContactUsComponent,
    UserSettingsComponent,
    JournalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
