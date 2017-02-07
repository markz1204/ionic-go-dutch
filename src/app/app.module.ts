import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SchedulePage } from '../pages/schedule/schedule';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import {AuthService} from '../providers/auth-service'
import {ScheduleService} from "../providers/schedule-service";
import {SessionsPage} from "../pages/sessions/sessions";
import {SessionPage} from "../pages/session/session";
import {OptionsPage} from "../pages/options/options";
import {MemberSearchPage} from "../pages/member-search/member-search";
import {UserService} from "../providers/user-service";


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    SchedulePage,
    SessionsPage,
    SessionPage,
    OptionsPage,
    MemberSearchPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    SchedulePage,
    SessionsPage,
    SessionPage,
    OptionsPage,
    MemberSearchPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              AuthService,
              ScheduleService,
              UserService]
})
export class AppModule {}
