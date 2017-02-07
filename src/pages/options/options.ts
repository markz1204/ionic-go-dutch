import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  goToMemberSearch(){
    this.viewCtrl.dismiss();

    this.navCtrl.push(MemberSearchPage, this.navParams.data);
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
