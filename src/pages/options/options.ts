import {Component} from "@angular/core";
import {NavController, ViewController, NavParams, ToastController, Platform} from "ionic-angular";
import {MemberSearchPage} from "../member-search/member-search";
import {MemberCostService} from "../../providers/member-cost-service";
import {SessionService} from "../../providers/session-service";
import {Session} from "../../models/session.model";
import {AppStatus} from "../../providers/app-status";
import {BarcodeScanner} from 'ionic-native';

@Component({
  selector: 'page-options',
  templateUrl: 'options.html'
})
export class OptionsPage {

  session: Session;

  constructor(public navCtrl: NavController, private viewCtrl: ViewController, private toastCtrl: ToastController,
              private navParams: NavParams, private sessionService: SessionService, private memberCostService: MemberCostService,
              private appStatus: AppStatus, private platform: Platform) {
    this.sessionService.currentSession.subscribe((session) => {
      this.session = session;
    });
  }

  goToMemberSearch() {
    this.viewCtrl.dismiss();

    this.navCtrl.push(MemberSearchPage, {memberCosts: this.navParams.get("memberCosts")});

  }

  scan() {
    this.platform.ready().then(() => {
      BarcodeScanner.scan().then((result)=>{
        if (!result.cancelled) {
          console.log(result.text);
        }else{
          console.log(result);
        }
      });
    }).catch((err)=>{
      console.log(err);
    });
  }

  record() {

    this.appStatus.isDirtySession = false;

    let memberCosts = this.navParams.get("memberCosts");

    this.memberCostService.createOrUpdate(this.session, memberCosts).subscribe((memberCosts) => {

      this.viewCtrl.dismiss().then(() => {

        let toast = this.toastCtrl.create({message: 'Successfully recorded', duration: 2000});

        toast.present();

      });
    });
  }

}
