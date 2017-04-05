import {Component} from "@angular/core";
import {NavController, ViewController} from "ionic-angular";
import {MemberSearchPage} from "../member-search/member-search";

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

  constructor(public navCtrl: NavController, private viewCtrl: ViewController) {
  }

  goToMemberSearch(){
    this.viewCtrl.dismiss();

    this.navCtrl.push(MemberSearchPage);
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
