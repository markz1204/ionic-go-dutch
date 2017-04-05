import {Component} from "@angular/core";
import {ProfilePage} from "../profile/profile";
import {App} from "ionic-angular";
import {SessionsPage} from "../sessions/sessions";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  sessionsRoot: any = SessionsPage;
  profileRoot: any = ProfilePage;

  constructor(appCtrl: App) {

  }
}
