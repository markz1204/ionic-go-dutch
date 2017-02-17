import {Component} from "@angular/core";
import {SchedulePage} from "../schedule/schedule";
import {ProfilePage} from "../profile/profile";
import {AuthService} from "../../providers/auth-service";
import {App} from "ionic-angular";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  scheduleRoot: any = SchedulePage;
  profileRoot: any = ProfilePage;

  constructor(appCtrl: App, authService: AuthService) {

  }
}
