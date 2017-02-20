import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
import {SchedulePage} from "../pages/schedule/schedule";
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {AuthService} from "../providers/auth-service";
import {ScheduleService} from "../providers/schedule-service";
import {SessionsPage} from "../pages/sessions/sessions";
import {SessionPage} from "../pages/session/session";
import {OptionsPage} from "../pages/options/options";
import {MemberSearchPage} from "../pages/member-search/member-search";
import {UserService} from "../providers/user-service";
import {SessionCostService} from "../providers/session-cost-service";
import {MemberCostService} from "../providers/member-cost-service";
import {SessionCreatePage} from "../pages/session-create/session-create";
import {JwtService} from "../providers/jwt-service";
import {ProfilePage} from "../pages/profile/profile";
import {SessionService} from "../providers/session-service";
import {ApiService} from "../providers/api-service";
import {MomentModule} from 'angular2-moment';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    SchedulePage,
    SessionsPage,
    SessionPage,
    OptionsPage,
    SessionCreatePage,
    MemberSearchPage,
    TabsPage,
    ProfilePage
  ],
  imports: [
    MomentModule,
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
    SessionCreatePage,
    MemberSearchPage,
    TabsPage,
    ProfilePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              AuthService,
              ScheduleService,
              UserService,
              SessionCostService,
              MemberCostService,
              JwtService,
              SessionService,
              ApiService]
})
export class AppModule {}
