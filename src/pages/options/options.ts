import {Component} from "@angular/core";
import {NavController, ViewController, NavParams, ToastController} from "ionic-angular";
import {MemberSearchPage} from "../member-search/member-search";
import {MemberCostService} from "../../providers/member-cost-service";
import {SessionService} from "../../providers/session-service";
import {Session} from "../../models/session.model";

/*
  Generated class for the Options page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-options',
  templateUrl: 'options.html'
})
export class OptionsPage {

  session: Session;

  constructor(public navCtrl: NavController, private viewCtrl: ViewController, private toastCtrl: ToastController, private navParams: NavParams, private sessionService: SessionService, private memberCostService: MemberCostService) {
    this.sessionService.currentSession.subscribe((session)=>{
      this.session = session;
    });
  }

  goToMemberSearch(){
    this.viewCtrl.dismiss();

    this.navCtrl.push(MemberSearchPage, {memberCosts: this.navParams.get("memberCosts")});

  }

  close(){
    this.viewCtrl.dismiss();
  }

  record(){

    this.sessionService.isDirtySession = false;

    let memberCosts = this.navParams.get("memberCosts");
    this.memberCostService.createOrUpdate(this.session, memberCosts).subscribe((memberCosts)=>{

      this.viewCtrl.dismiss().then(()=>{

        let toast = this.toastCtrl.create({message: 'Collection recorded successfully', duration:2000});

        toast.present();

      });
    });
  }

}
