import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {AuthService} from "../providers/auth-service";
import {SessionsPage} from "../pages/sessions/sessions";
import {SessionPage} from "../pages/session/session";
import {OptionsPage} from "../pages/options/options";
import {MemberSearchPage} from "../pages/member-search/member-search";
import {UserService} from "../providers/user-service";
import {MemberCostService} from "../providers/member-cost-service";
import {SessionCreatePage} from "../pages/session-create/session-create";
import {JwtService} from "../providers/jwt-service";
import {ProfilePage} from "../pages/profile/profile";
import {SessionService} from "../providers/session-service";
import {ApiService} from "../providers/api-service";
import {MomentModule} from "angular2-moment";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {QRCodeModule} from "../appmodule/angular2-qrcode";
import {EqualValidatorDirective} from "../directives/equal.directive";
import {AppStatus} from "../providers/app-status";
import {QrcodePage} from "../pages/qrcode/qrcode";
import {Facebook} from "ionic-native";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    SessionsPage,
    SessionPage,
    OptionsPage,
    SessionCreatePage,
    MemberSearchPage,
    TabsPage,
    ProfilePage,
    QrcodePage,
    EqualValidatorDirective
  ],
  imports: [
    MomentModule,
    QRCodeModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    SessionsPage,
    SessionPage,
    OptionsPage,
    SessionCreatePage,
    MemberSearchPage,
    TabsPage,
    ProfilePage,
    QrcodePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              AuthService,
              UserService,
              MemberCostService,
              JwtService,
              SessionService,
              ApiService,
              CookieService,
              AppStatus,
              Facebook]
})
export class AppModule {}
